// Semantics
// Includes all semantic actions to be included in the parser
// Inputs: receives the oracle (semantic cube), the Stack and Queue data structures
// Output: does not return something since all actions are global
// Used by: parser.js (since it specifies the actions to be executed by it)

// Semantic cube
const oracle = require('./cube')

// Opcodes
const get_opcode = require('./opcodes')

// Virtual Memory Addresses
const virtual_memory = require('./virtualMemory')

// Helper structures
const Stack = require('./helpers/stack.js')
const Queue = require('./helpers/queue.js')

// Debug helper functions
const get_string_opcode = require('./debug/reverse_opcodes')

// Virtual machine information
virtual_machine_info = null

// Declare quadruples
let quads = new Queue()

// Declare all helper stacks
let operators = new Stack()
let operands = new Stack()
let jumps = new Stack()
let forStack = new Stack()

// Additional helpers
let current_simple_id = null
let current_func_name = null
let params_count = null
let params_types = null

// -> Global semantic actions

// Declare function directory variable
func_directory = null

// Declare class directory variable
class_directory = null

// Variable to keep reference to global scope
global_func = null

// Declare params directory variable
params_directory = null

// Declare func size directory variable
func_size_directory = null

// Declare constants directory variable
constants_directory = null

// Semantic action that creates a new empty instance of the global function directory
// Does not receive any parameters
// Does not return anything
create_func_directory = function () {
	func_directory = new Map()
}

// Semantic action that creates a new empty instance of the constants directory
// Does not receive any parameters
// Does not return anything
create_constants_directory = () => {
	constants_directory = new Map()
}

// Semantic action that inserts the initial goto quad to go to the main program quads
// Does not receive any parameters
// Does not return anything
insert_goto_main_quad = () => {
	const operator = 'goto'
	const left_operand = null
	const right_operand = null
	const result = 'pending'
	quads.push({
		operator: get_opcode(operator),
		left_operand,
		right_operand,
		result,
	})
}

// Semantic action that fills the initial goto (main) with the next quad counter
// Does not receive any parameters
// Does not return anything
fill_goto_main = () => {
	quads.data[0].result = quads.count
}

// Semantic action that adds the final end quad
// Does not receive any parameters
// Does not return anything
mark_main_end = () => {
	operator = 'end'
	quads.push({
		operator: get_opcode(operator),
		left_operand: null,
		right_operand: null,
		result: null,
	})
}

// Semantic action that adds the program name to the function directory and sets both the global and current function variables
// Receives the program name
// Does not return anything
add_program_id = (program_id) => {
	global_func = program_id
	current_func = program_id
	func_directory.set(program_id, { type: 'program', var_directory: new Map() })
}

// Semantic action that adds a function name to the global function directory, sets the current function variable and creates a new instance of a variable directory for the object.
// In case it has a return type it adds that space to the global variables space
// Receives the function name
// Does not return anything
add_func_id = (func_id) => {
	current_func = func_id

	if (current_class != null) {
		// We are in a method declaration
		if (class_directory.get(current_class).method_directory.has(func_id)) {
			console.log('ERROR - Method already exists')
			throw 'ERROR - Method already exists'
		}
		class_directory.get(current_class).method_directory.set(func_id, {
			type: currentType,
			var_directory: new Map(),
		})
	} else {
		if (func_directory.has(func_id)) {
			console.log('ERROR - Function already exists')
			throw 'ERROR - Function already exists'
		}
		func_directory.set(func_id, { type: currentType, var_directory: new Map() })
		if (currentType !== 'void') {
			func_directory.get(global_func).var_directory.set(func_id, {
				type: currentType,
				virtual_address: virtual_memory.get_address(
					'global',
					currentType,
					'perm'
				),
			})
		}
	}
}

// Semantic action that sets the current type variable (for later use to add variable names)
// Receives the type
// Does not return anything
set_current_type = (type) => {
	currentType = type
}

// Semantic action that adds a variable name to the class or global function directory (depending on the previously set variables) and verifies it is not duplicated
// Receives the variable name
// Does not return anything
add_id = (id) => {
	is_id_duplicated(id)
	if (current_class != null) {
		// Adding var in class
		if (is_attr_dec) {
			class_directory.get(current_class).attr_directory.set(id, {
				type: currentType,
				virtual_address: virtual_memory.get_address(
					'global',
					currentType,
					'perm'
				),
			}) // ???
		} else {
			// Is method declaration
			class_directory
				.get(current_class)
				.method_directory.get(current_func)
				.var_directory.set(id, {
					type: currentType,
					virtual_address: virtual_memory.get_address(
						'local',
						currentType,
						'perm'
					),
				})
		}
	} else {
		// Adding var in func / global var
		const scope = current_func == global_func ? 'global' : 'local'
		if (
			currentType === 'int' ||
			currentType === 'float' ||
			currentType === 'char'
		) {
			// Basic type
			func_directory.get(current_func).var_directory.set(id, {
				type: currentType,
				virtual_address: virtual_memory.get_address(scope, currentType, 'perm'),
			})
		} else {
			// Instance of a class, do not add virtual memory address
			func_directory
				.get(current_func)
				.var_directory.set(id, { type: currentType })
		}
	}
}

// Semantic action that adds an array variable name to the class or global function directory (depending on the previously set variables) and verifies it is not duplicated
// Receives the variable name and size of the array
// Does not return anything
add_id_array = (id, size) => {
	is_id_duplicated(id)
	if (current_class != null) {
		// Adding var in class
		if (is_attr_dec) {
			class_directory
				.get(current_class)
				.attr_directory.set(id, { type: `${currentType}[${size}]` })
		} else {
			// Is method declaration
			class_directory
				.get(current_class)
				.method_directory.get(current_func)
				.var_directory.set(id, { type: `${currentType}[${size}]` })
		}
	} else {
		func_directory
			.get(current_func)
			.var_directory.set(id, { type: `${currentType}[${size}]` })
		// console.log('received array with id = ' + id + ' and size of = ' + size)
		// console.log(func_directory.get(current_func).var_directory)
	}
}

// Semantic action that adds a matrix variable name to the class or global function directory (depending on the previously set variables) and verifies it is not duplicated
// Receives the variable name and size of the matrix (number of rows and columns)
// Does not return anything
add_id_matrix = (id, sizeR, sizeC) => {
	is_id_duplicated(id)
	if (current_class != null) {
		// Adding var in class
		if (is_attr_dec) {
			class_directory
				.get(current_class)
				.attr_directory.set(id, { type: `${currentType}[${sizeR}][${sizeC}]` })
		} else {
			// Is method declaration
			class_directory
				.get(current_class)
				.method_directory.get(current_func)
				.var_directory.set(id, { type: `${currentType}[${sizeR}][${sizeC}]` })
		}
	} else {
		func_directory.get(current_func).var_directory.set(id, {
			type: `${currentType}[${sizeR}][${sizeC}]`,
		})
		// console.log(
		// 	'received matrix with id = ' +
		// 		id +
		// 		' and sizeR of = ' +
		// 		sizeR +
		// 		' and sizeC of = ' +
		// 		sizeC
		// )
		// console.log(func_directory.get(current_func).var_directory)
	}
}

// Semantic action that marks the end of a function by setting the current function variable to the global function variable (the program's name)
// Does not receive any parameters
// Does not return anything
finish_func_dec = () => {
	current_func = global_func
}

// Semantic action that deletes the function directory after the program finishes and resets all the additional data structures used in the actions
// Does not receive any parameters
// Does not return anything
delete_func_directory = function () {
	// Set virtual machine information object before clearing structures
	virtual_machine_info = {
		quads,
		func_directory,
		constants_directory,
	}
	console.log('Func directory before exit')
	console.log(func_directory)
	func_directory = null
	console.log('Quads before exit')
	print_quads(quads)
	quads = new Queue()
	operators = new Stack()
	operands = new Stack()
	jumps = new Stack()
	forStack = new Stack()
}

// Semantic action that deletes the constants directory after the program finishes
// Does not receive any parameters
// Does not return anything
delete_constants_directory = () => {
	console.log('constants_directory before exit')
	console.log(constants_directory)
	constants_directory = null
}

// Semantic action that resets virtual memory addresses
// Does not receive any parameters
// Does not return anything
reset_virtual_memory = () => {
	virtual_memory.initialize_counters()
}

// -> Class semantic actions

// Semantic action that creates a new empty instance of a global class directory
// Does not receive any parameters
// Does not return anything
create_class_directory = () => {
	class_directory = new Map()
	current_class = null
}

// Semantic action that adds a class name to the class directory, sets the current class variable and creates new instances of both attribute and methods directory for the object
// Receives the class name
// Does not return anything
add_class_id = (class_id) => {
	current_class = class_id

	class_directory.set(class_id, {
		type: 'class',
		attr_directory: new Map(),
		method_directory: new Map(),
	})
}

// Semantic action that sets the flag to mark that attribute declarations for a class has started
// Does not receive any parameters
// Does not return anything
start_attributes_dec = () => {
	is_attr_dec = true
}

// Semantic action that sets the flag to mark that attribute declarations for a class has ended
// Does not receive any parameters
// Does not return anything
finish_attr_dec = () => {
	is_attr_dec = false
}

// Semantic action that sets the flag to mark that a class declaration has ended by setting the current class variable to null
// Does not receive any parameters
// Does not return anything
finish_class_dec = () => {
	current_class = null
}

// Semantic action that deletes the class directory after the program finishes
// Does not receive any parameters
// Does not return anything
delete_class_directory = () => {
	console.log('Class directory before exit')
	console.log(class_directory)
	class_directory = null
}

// -> Expressions semantic actions

// Semantic action that sets the current_simple_id variable with the provided id
// Receives the id
// Does not return anything
set_simple_id = (id) => {
	current_simple_id = id
}

// Semantic action that adds the current_simple_id variable to the operands stack and sets its value to null
// Does not receive any parameters
// Does not return anything
add_simple_id_operand = () => {
	add_operand(current_simple_id, 'var')
	current_simple_id = null
}

// Semantic action that adds an operand to the operands stack by checking its type from either the class or global function directory
// Receives the operand and its type (which only specifies if it's a variable or not)
// Does not return anything
add_operand = (operand, type) => {
	if (type === 'var') {
		if (current_class != null) {
			const is_inside_class_method =
				class_directory
					.get(current_class)
					.method_directory.get(current_func)
					.var_directory.get(operand) != null
			// If variable is not inside the function variables, then it must be part of the class' attributes
			type = is_inside_class_method
				? class_directory
						.get(current_class)
						.method_directory.get(current_func)
						.var_directory.get(operand).type
				: class_directory.get(current_class).attr_directory.get(operand).type
			operand = is_inside_class_method
				? class_directory
						.get(current_class)
						.method_directory.get(current_func)
						.var_directory.get(operand).virtual_address
				: class_directory.get(current_class).attr_directory.get(operand)
						.virtual_address
		} else {
			// Search in current var_directory
			const is_inside_current_func =
				func_directory.get(current_func).var_directory.get(operand) != null

			// If not found, search in global scope
			const is_inside_global_scope =
				func_directory.get(global_func).var_directory.get(operand) != null

			if (is_inside_current_func) {
				type = func_directory.get(current_func).var_directory.get(operand).type
				operand = func_directory
					.get(current_func)
					.var_directory.get(operand).virtual_address
			} else if (is_inside_global_scope) {
				type = func_directory.get(global_func).var_directory.get(operand).type
				operand = func_directory
					.get(global_func)
					.var_directory.get(operand).virtual_address
			} else {
				type = 'undefined'
			}
		}
	} else {
		// It is a constant
		switch (type) {
			case 'int':
				operand = parseInt(operand)
				break
			case 'float':
				operand = parseFloat(operand)
				break
		}
		operand = get_constant_virtual_address(operand, type)
	}
	operands.push({ operand, type })
}

// Semantic action that adds an operator to the operators stack
// Receives the operator
// Does not return anything
add_operator = (operator) => {
	// console.log('adding operator = ' + operator)
	operators.push(operator)
}

// Semantic action that generates the quadruple for either a multiplication or division operation by popping from both the operands and operators stack or throws if there's a type mismatch
// Does not receive any parameters
// Does not return anything
add_mult_div_operation = () => {
	// console.log('inside add_mult_div_operation')
	if (operators.top() === '*' || operators.top() === '/') {
		const right = operands.pop()
		const right_operand = right.operand
		const left = operands.pop()
		const left_operand = left.operand
		const operator = operators.pop()

		const result_type = oracle(left.type, right.type, operator)

		if (result_type !== 'error') {
			const scope = current_func == global_func ? 'global' : 'local'
			const result = virtual_memory.get_address(scope, result_type, 'temp')
			quads.push({
				operator: get_opcode(operator),
				left_operand,
				right_operand,
				result,
			})
			operands.push({ operand: result, type: result_type })
		} else {
			console.log('ERROR - Type mismatch')
			throw 'ERROR - Type mismatch'
		}
	}
}

// Semantic action that generates the quadruple for either an addition or subtraction operation by popping from both the operands and operators stack or throws if there's a type mismatch
// Does not receive any parameters
// Does not return anything
add_sum_sub_operation = () => {
	// console.log('inside add_sum_sub_operation')
	if (operators.top() === '+' || operators.top() === '-') {
		const right = operands.pop()
		const right_operand = right.operand
		const left = operands.pop()
		const left_operand = left.operand
		const operator = operators.pop()

		const result_type = oracle(left.type, right.type, operator)

		if (result_type !== 'error') {
			const scope = current_func == global_func ? 'global' : 'local'
			const result = virtual_memory.get_address(scope, result_type, 'temp')
			quads.push({
				operator: get_opcode(operator),
				left_operand,
				right_operand,
				result,
			})
			operands.push({ operand: result, type: result_type })
		} else {
			console.log('ERROR - Type mismatch')
			throw 'ERROR - Type mismatch'
		}
	}
}

// Semantic action that adds a false bottom (a left or starting parenthesis) to the operators stack to mark that a new subexpression has started
// Does not receive any parameters
// Does not return anything
start_subexpression = () => {
	// console.log('inside start_subexpression')
	operators.push('(')
}

// Semantic action that removes the false bottom (a left or starting parenthesis) from the operators stack to mark that the subexpression has ended
// Does not receive any parameters
// Does not return anything
end_subexpression = () => {
	// console.log('inside end_subexpression')
	operators.pop()
}

// Semantic action that generates the quadruple for all relational operations (<, >, !=, ==) by popping from both the operands and operators stack or throws if there's a type mismatch
// Does not receive any parameters
// Does not return anything
add_rel_operation = () => {
	// console.log('inside add_rel_operation')
	if (
		operators.top() === '>' ||
		operators.top() === '<' ||
		operators.top() === '==' ||
		operators.top() === '!='
	) {
		const right = operands.pop()
		const right_operand = right.operand
		const left = operands.pop()
		const left_operand = left.operand
		const operator = operators.pop()

		const result_type = oracle(left.type, right.type, operator)

		if (result_type !== 'error') {
			const scope = current_func == global_func ? 'global' : 'local'
			const result = virtual_memory.get_address(scope, result_type, 'temp')
			quads.push({
				operator: get_opcode(operator),
				left_operand,
				right_operand,
				result,
			})
			operands.push({ operand: result, type: result_type })
		} else {
			console.log('ERROR - Type mismatch')
			throw 'ERROR - Type mismatch'
		}
	}
}

// Semantic action that generates the quadruple for the AND logical operation by popping from both the operands and operators stack or throws if there's a type mismatch
// Does not receive any parameters
// Does not return anything
add_and_operation = () => {
	// console.log('inside add_and_operation')
	if (operators.top() === '&') {
		const right = operands.pop()
		const right_operand = right.operand
		const left = operands.pop()
		const left_operand = left.operand
		const operator = operators.pop()

		const result_type = oracle(left.type, right.type, operator)

		if (result_type !== 'error') {
			const scope = current_func == global_func ? 'global' : 'local'
			const result = virtual_memory.get_address(scope, result_type, 'temp')
			quads.push({
				operator: get_opcode(operator),
				left_operand,
				right_operand,
				result,
			})
			operands.push({ operand: result, type: result_type })
		} else {
			console.log('ERROR - Type mismatch')
			throw 'ERROR - Type mismatch'
		}
	}
}

// Semantic action that generates the quadruple for the OR logical operation by popping from both the operands and operators stack or throws if there's a type mismatch
// Does not receive any parameters
// Does not return anything
add_or_operation = () => {
	// console.log('inside add_or_operation')
	if (operators.top() === '|') {
		const right = operands.pop()
		const right_operand = right.operand
		const left = operands.pop()
		const left_operand = left.operand
		const operator = operators.pop()

		const result_type = oracle(left.type, right.type, operator)

		if (result_type !== 'error') {
			const scope = current_func == global_func ? 'global' : 'local'
			const result = virtual_memory.get_address(scope, result_type, 'temp')
			quads.push({
				operator: get_opcode(operator),
				left_operand,
				right_operand,
				result,
			})
			operands.push({ operand: result, type: result_type })
		} else {
			console.log('ERROR - Type mismatch')
			throw 'ERROR - Type mismatch'
		}
	}
}

// -> IO semantic actions

// Semantic action that generates the quadruple for the printing operation of an expression by popping the operand to print from the operands stack
// Does not receive any parameters
// Does not return anything
print_expression = () => {
	// console.log('inside print_expression')

	const operator = 'print'
	const res = operands.pop()
	const result = res.operand

	const left_operand = null
	const right_operand = null

	quads.push({
		operator: get_opcode(operator),
		left_operand,
		right_operand,
		result,
	})
}

// Semantic action that generates the quadruple for the printing operation of a constant string
// Receives the string to print
// Does not return anything
print_string = (string) => {
	// console.log('inside print_string')

	const operator = 'print'

	// Get string virtual address
	const result = get_constant_virtual_address(string, 'string')

	const left_operand = null
	const right_operand = null

	quads.push({
		operator: get_opcode(operator),
		left_operand,
		right_operand,
		result,
	})
}

// Semantic action that generates the quadruple for the reading operation to a variable or throws if the given variable is not found within scope
// Receives the variable name
// Does not return anything
read_var = (variable) => {
	// console.log('inside read_var')

	// if variable is within scope
	if (is_var_in_scope(variable)) {
		const operator = 'read'
		const result = variable

		const left_operand = null
		const right_operand = null

		quads.push({
			operator: get_opcode(operator),
			left_operand,
			right_operand,
			result,
		})
	} else {
		console.log(`ERROR - "${variable}" not found within scope`)
		throw `ERROR - "${variable}" not found within scope`
	}
}

// Semantic action that generates the quadruple for the assignment of a variable by popping from both the operands and operators stack or throws if there's a type mismatch
// Does not receive any parameters
// Does not return anything
assign_exp = () => {
	// console.log('inside assign_exp')

	const res = operands.pop()
	const result = res.operand

	const right_operand = null

	const left = operands.pop()
	const left_operand = left.operand

	const operator = operators.pop()

	console.log(res, left)
	if (res.type === left.type) {
		quads.push({
			operator: get_opcode(operator),
			left_operand: result,
			right_operand,
			result: left_operand,
		})
	} else {
		console.log('ERROR - Type mismatch')
		throw 'ERROR - Type mismatch'
	}
}

// -> Control semantic actions

// Semantic action that generates the quadruple for the goToFalse for an if condition by popping from the operands stack or throwing a type mismatch, plus it pushes to the jumps stack to mark where an empty space must be filled
// Does not receive any parameters
// Does not return anything
mark_if_condition = () => {
	// console.log('inside mark_if_condition')

	const cond = operands.pop()
	if (cond.type !== 'int') {
		console.log('ERROR - Type mismatch')
		throw 'ERROR - Type mismatch'
	} else {
		const operator = 'gotoF'
		const left_operand = cond.operand
		const right_operand = null
		const result = 'pending'
		quads.push({
			operator: get_opcode(operator),
			left_operand,
			right_operand,
			result,
		})
		jumps.push(quads.count - 1)
	}
}

// Semantic action that fills in the blank of the goToFalse quadruple for the if condition by popping the index from the jumps stack
// Does not receive any parameters
// Does not return anything
mark_if_end = () => {
	// console.log('inside mark_if_end')

	const end = jumps.pop()
	quads.data[end].result = quads.count
}

// Semantic action that generates the quadruple for the goTo for an the else of an if condition and pushes to the jumps stack to mark where an empty space must be filled, plus it fills in the blank of the goToFalse quadruple for the if condition by popping the index from the jumps stack
// Does not receive any parameters
// Does not return anything
mark_else = () => {
	// console.log('inside mark_else')

	const false_jump = jumps.pop()

	const operator = 'goto'
	const left_operand = null
	const right_operand = null
	const result = 'pending'
	quads.push({
		operator: get_opcode(operator),
		left_operand,
		right_operand,
		result,
	})

	jumps.push(quads.count - 1)

	quads.data[false_jump].result = quads.count
}

// -> Iteration semantic actions

// Semantic action that marks the place where the goTo quadruple of the while loop should return to by pushing the current counter to the jumps stack
// Does not receive any parameters
// Does not return anything
mark_while_start = () => {
	// console.log('inside mark_while_start')

	jumps.push(quads.count)
}

// Semantic action that generates the quadruple for the goToFalse for a while loop by popping from the operands stack or throwing a type mismatch, plus it pushes to the jumps stack to mark where an empty space must be filled
// Does not receive any parameters
// Does not return anything
mark_while_condition = () => {
	// console.log('inside mark_while_condition')

	const cond = operands.pop()
	if (cond.type !== 'int') {
		console.log('ERROR - Type mismatch')
		throw 'ERROR - Type mismatch'
	} else {
		const operator = 'gotoF'
		const left_operand = cond.operand
		const right_operand = null
		const result = 'pending'
		quads.push({
			operator: get_opcode(operator),
			left_operand,
			right_operand,
			result,
		})
		jumps.push(quads.count - 1)
	}
}

// Semantic action that generates the quadruple for the goTo for a while loop and pushes to the jumps stack to mark where an empty space must be filled
// Does not receive any parameters
// Does not return anything
mark_while_end = () => {
	// console.log('inside mark_while_end')

	const false_jump = jumps.pop()
	const return_jump = jumps.pop()

	const operator = 'goto'
	const left_operand = null
	const right_operand = null
	const result = return_jump
	quads.push({
		operator: get_opcode(operator),
		left_operand,
		right_operand,
		result,
	})

	quads.data[false_jump].result = quads.count
}

// Semantic action that pushes to the for stack the last variable (the result stored in the quadruple before)
// Does not receive any parameters
// Does not return anything
for_start_exp = (control_variable) => {
	forStack.push(control_variable)
}

// Semantic action that adds to the operands stack the top of the for stack (the last variable) and the < operator to the operators stack, plus it marks a false bottom on the operators stack
// Does not receive any parameters
// Does not return anything
mark_until = () => {
	jumps.push(quads.count)
	add_operand(forStack.top(), 'var')
	add_operator('<')
	start_subexpression()
}

// Semantic action that generates the quadruple for the goToFalse for a for loop by removing the false bottom and adding the relational operation, plus it pushes to the jumps stack to mark where an empty space must be filled
// Does not receive any parameters
// Does not return anything
mark_for_condition = () => {
	end_subexpression()
	add_rel_operation()

	const cond = operands.pop()
	// No need to check cond type, HAS to be boolean
	const operator = 'gotoF'
	const left_operand = cond.operand
	const right_operand = null
	const result = 'pending'
	quads.push({
		operator: get_opcode(operator),
		left_operand,
		right_operand,
		result,
	})
	jumps.push(quads.count - 1)
}

// Semantic action that generates the quadruple for the increase in 1 of the last variable for a while loop by adding the sum operation and fills in the blank for the goToFalse of the for loop
// Does not receive any parameters
// Does not return anything
mark_for_end = () => {
	const varFor = forStack.pop()

	// generate quad --> { varFor = varFor + 1 }
	add_operand(varFor, 'var')
	add_operator('=')
	add_operand(varFor, 'var')
	add_operator('+')
	add_operand('1', 'int')
	add_sum_sub_operation()
	assign_exp()

	const false_jump = jumps.pop()
	const return_jump = jumps.pop()

	const operator = 'goto'
	const left_operand = null
	const right_operand = null
	const result = return_jump
	quads.push({
		operator: get_opcode(operator),
		left_operand,
		right_operand,
		result,
	})
	quads.data[false_jump].result = quads.count
}

// -> Funcs declaration semantic actions

// Semantic action that creates the params_directory for a func and adds all its params with their corresponding types (by copying the current var_directory of the current_func)
// Does not receive any parameters
// Does not return anything
create_params_directory = () => {
	// console.log('inside create_params_directory')
	if (current_class == null) {
		// The var_directory of the function at this point only has the parameters
		params_directory = new Map(func_directory.get(current_func).var_directory)
		let params_type_list = new Array()
		for (let [param, info] of params_directory) {
			params_type_list.push(info.type)
		}
		//console.log(params_type_list)
		func_directory.get(current_func).params_type_list = params_type_list
	}
}

// Semantic action that marks the number of params of a function in its size_directory
// Does not receive any parameters
// Does not return anything
mark_params_size = () => {
	// console.log('inside mark_params_size')

	if (current_class == null) {
		func_size_directory = new Map()
		let params_size = { int: 0, float: 0, char: 0 }

		for (let type of func_directory.get(current_func).params_type_list) {
			if (type === 'int') {
				params_size.int += 1
			} else if (type === 'float') {
				params_size.float += 1
			} else if (type === 'char') {
				params_size.char += 1
			}
		}
		func_size_directory.set('params_size', params_size)
	}
}

// Semantic action that marks the number of local variables of a function in its size_directory
// Does not receive any parameters
// Does not return anything
mark_local_vars_size = () => {
	// console.log('inside mark_local_vars_size')
	if (current_class == null) {
		let local_vars_size = { int: 0, float: 0, char: 0 }

		// Turn current variable directory into array in order to be able to iterate over it
		const all_vars = Array.from(func_directory.get(current_func).var_directory)

		// Filter variable directory by creating a new array of variables (removing the params)
		const local_vars = all_vars.filter(
			(var_name) => !params_directory.has(var_name[0])
		)

		// Each local_var has the form -> [ 'k', {type: 'int'} ]
		for (let local_var of local_vars) {
			if (local_var[1].type === 'int') {
				local_vars_size.int += 1
			} else if (local_var[1].type === 'float') {
				local_vars_size.float += 1
			} else if (local_var[1].type === 'char') {
				local_vars_size.char += 1
			}
		}

		func_size_directory.set('local_vars_size', local_vars_size)
	}
}

// Semantic action that marks the start of a function by adding the current quadruples counter to a new attribute 'starting_point' in the global func directory
// Does not receive any parameters
// Does not return anything
mark_func_start = () => {
	// console.log('inside mark_func_start')
	// Mark where the current function starts
	if (current_class == null) {
		func_directory.get(current_func).starting_point = quads.count
	}
}

// Semantic action that marks the end of a function by releasing the var_directory, generating the endfunc quadruple and marking the number of temp variables of the function in its size_directory
// Does not receive any parameters
// Does not return anything
mark_func_end = () => {
	// console.log('inside mark_func_end')

	if (current_class == null) {
		// Release current var_directory
		func_directory.get(current_func).var_directory = null

		// Release temp params_directory
		params_directory = null

		// Generate quad -> ENDFUNC, null, null, null
		const operator = 'endfunc'
		quads.push({
			operator: get_opcode(operator),
			left_operand: null,
			right_operand: null,
			result: null,
		})

		// Mark the number of temp variables of a function in the size_directory

		// Slice quads to get only the current func quads
		const starting_quad = func_directory.get(current_func).starting_point
		const func_quads = quads.data.slice(starting_quad)

		let temps_size = { total: 0 }

		func_quads.forEach((quad) => {
			if (
				quad.result !== null &&
				virtual_memory.is_local_temp_address(quad.result)
			) {
				temps_size.total += 1
			}
		})

		func_size_directory.set('temps_size', temps_size)
		func_directory.get(current_func).func_size_directory = func_size_directory
		func_size_directory = null
	}
}

// Semantic action that verifies that a return expression matches the function's type and generates the 'return' quad
// Does not receive any parameters
// Does not return anything
assign_return = () => {
	const operator = 'return'
	const result = operands.pop()

	if (current_class == null) {
		const func_return_type = func_directory.get(current_func).type
		if (func_return_type === 'void') {
			console.log('ERROR - Void function cannot have return expression')
			throw 'ERROR - Void function cannot have return expression'
		}
		if (func_return_type !== result.type) {
			console.log('ERROR - Return type mismatch')
			throw 'ERROR - Return type mismatch'
		}
	}

	quads.push({
		operator: get_opcode(operator),
		left_operand: null,
		right_operand: null,
		result: result.operand,
	})
}

// -> Funcs call semantic actions

// Semantic action that checks if the function that was called exists in the global function directory and throws otherwise
// Does not receive any parameters
// Does not return anything
mark_func_call_start = () => {
	// console.log('inside mark_func_call_start')

	if (current_class == null) {
		current_func_name = current_simple_id
		current_simple_id = null

		if (!func_directory.has(current_func_name)) {
			console.log('ERROR - Function not defined')
			throw 'ERROR - Function not defined'
		}
	}
}

// Semantic action that marks the start of the params of a function call by creating the era quad and starting the parameter counter
// Does not receive any parameters
// Does not return anything
mark_call_params_start = () => {
	// console.log('inside mark_call_params_start')

	if (current_class == null) {
		// Generate era quad -> era, func_name, null, null
		const operator = 'era'
		quads.push({
			operator: get_opcode(operator),
			left_operand: current_func_name,
			right_operand: null,
			result: null,
		})

		// Start parameter counter to 1
		params_count = 1

		// Generate array of parameters types
		params_types = func_directory.get(current_func_name).params_type_list
	}
}

// Semantic action that verifies a function call's argument and generates it param quad
// Does not receive any parameters
// Does not return anything
add_call_param = () => {
	// console.log('inside add_call_param')

	if (current_class == null) {
		const current_argument = operands.pop()

		// More parameters were sent
		if (params_count - 1 >= params_types.length) {
			console.log('ERROR - Number of parameters required does not match')
			throw 'ERROR - Number of parameters required does not match'
		}

		if (current_argument.type !== params_types[params_count - 1]) {
			console.log('ERROR - Parameter type does not match')
			throw 'ERROR - Parameter type does not match'
		} else {
			const operator = 'param'
			const left_operand = current_argument.operand
			const result = 'param' + params_count
			quads.push({
				operator: get_opcode(operator),
				left_operand: left_operand,
				right_operand: null,
				result: result,
			})
		}
	}
}

// Semantic action that moves the params_count forward to allow iteration over params call
// Does not receive any parameters
// Does not return anything
mark_next_call_param = () => {
	// console.log('inside mark_next_call_param')

	if (current_class == null) {
		params_count++
	}
}

// Semantic action that verifies the number of defined parameters and the ones send is equal
// Does not receive any parameters
// Does not return anything
verify_call_params_size = () => {
	// console.log('inside verify_call_params_size')

	// More parameters were declared than sent
	if (current_class == null) {
		if (params_count - 1 !== params_types.length) {
			console.log('ERROR - Number of parameters required does not match')
			throw 'ERROR - Number of parameters required does not match'
		}
	}
}

// Semantic action that generates the 'gosub' quad
// Does not receive any parameters
// Does not return anything
mark_func_call_end = () => {
	// console.log('inside mark_func_call_end')

	if (current_class == null) {
		// Generate gosub quad -> gosub, func_name, null, starting_point
		const operator = 'gosub'
		quads.push({
			operator: get_opcode(operator),
			left_operand: current_func_name,
			right_operand: null,
			result: func_directory.get(current_func_name).starting_point,
		})
	}
}

// Semantic action that checks that the called function is non void, adds the assignment quad for the return value, and pushes it to the operands stack
// Does not receive any parameters
// Does not return anything
add_func_return = () => {
	if (func_directory.get(current_func_name).type === 'void') {
		console.log('ERROR - Calling void function in expression')
		throw 'ERROR - Calling void function in expression'
	}

	if (current_class == null) {
		// Generate temp assignment quad -> =, func_name, null, temp_var

		const result_type = func_directory.get(current_func_name).type
		const scope = current_func == global_func ? 'global' : 'local'

		const operator = '='
		const left_operand = func_directory
			.get(global_func)
			.var_directory.get(current_func_name).virtual_address
		const result = virtual_memory.get_address(scope, result_type, 'temp')
		quads.push({
			operator: get_opcode(operator),
			left_operand: left_operand,
			right_operand: null,
			result: result,
		})
		operands.push({ operand: result, type: result_type })
	}
}

// Semantic action that clears all current function related variables
// Does not receive any parameters
// Does not return anything
reset_func_call_helpers = () => {
	current_func_name = null
	params_count = null
	params_types = null
}

// -> Helper functions

// Function that checks if a variable name is already declared in the program
// Receives the id to check
// Does not return anything since it only throws if the name is duplicated
const is_id_duplicated = (id) => {
	if (current_class != null) {
		// We are in a class var declaration
		if (is_attr_dec) {
			// We are in attributes declaration
			if (class_directory.get(current_class).attr_directory.has(id)) {
				console.log('ERROR - Attribute already exists')
				throw 'ERROR - Attribute already exists'
			}
		} else {
			// Is in method declaration
			if (class_directory.get(current_class).method_directory.has(id)) {
				if (func_directory.get(current_func).var_directory.has(id)) {
					console.log('ERROR - Variable already exists in method')
					throw 'ERROR - Variable already exists in method'
				}
			}
		}
	} else {
		// We are in a func var/param or global var declaration
		// Check if id already exists
		if (func_directory.get(current_func).var_directory.has(id)) {
			console.log('ERROR - Variable already exists')
			throw 'ERROR - Variable already exists'
		}
	}
}

// Function that checks if a variable name is within scope (which means either the class directory in the current class or the global function directory in the current function contains it)
// Receives the variable name to check
// Returns true if variable is found within scope, false if not
is_var_in_scope = (variable) => {
	if (current_class != null) {
		// Search within class
		if (
			class_directory
				.get(current_class)
				.method_directory.get(current_func)
				.var_directory.has(variable)
		) {
			return true
		} else {
			return class_directory.get(current_class).attr_directory.has(variable)
		}
	} else {
		// Search in var_directory
		if (func_directory.get(current_func).var_directory.has(variable)) {
			return true
		} else {
			return func_directory.get(global_func).var_directory.has(variable)
		}
	}
}

// Function that checks if a constant value is already in the constants directory and returns its value or inserts it and generates a new value
// Receives the constant and its type
// Returns the virtual memory address for the constant
get_constant_virtual_address = (constant, type) => {
	if (constants_directory.has(constant)) {
		return constants_directory.get(constant)
	} else {
		const result = virtual_memory.get_address('constant', type, 'null')
		constants_directory.set(constant, result)
		return result
	}
}

// Function that prints the quadruples to the console
// Receives the quadruples
// Does not return anything since it only throws if the name is duplicated
print_quads = (quads) => {
	quads.data.forEach((value, index) => {
		console.log(`${index} - { ${get_single_quad_string(value)} }`)
	})
}

// Function that generates a user friendly string with the information inside a quadruple
// Receives the quadruple
// Returns the string
get_single_quad_string = (quad) => {
	let string = ''
	for (let [key, value] of Object.entries(quad)) {
		if (key == 'operator') {
			value = get_string_opcode(value)
		}
		string += `${key}: ${value}     `
	}
	return string
}
