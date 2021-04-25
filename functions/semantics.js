// Semantics

// Semantic cube
const oracle = require('./cube')
const Stack = require('./helpers/stack.js')
const Queue = require('./helpers/queue.js')

// Declare quadruples
let quads = new Queue()
let operators = new Stack()
let operands = new Stack()
let jumps = new Stack()
let res_count = 0

// Helper functions
const isIdDuplicated = (id) => {
	if (currentClass != null) {
		// We are in a class var declaration
		if (is_attr_dec) {
			// We are in attributes declaration
			if (class_directory.get(currentClass).attr_directory.has(id)) {
				console.log('ERROR - Attribute already exists')
				throw 'ERROR - Attribute already exists'
			}
		} else {
			// Is in method declaration
			if (class_directory.get(currentClass).method_directory.has(id)) {
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
// Declare function directory variable
func_directory = null

// Declare class directory variable
class_directory = null

// Variable to keep reference to global scope
global_func = null

create_func_directory = function () {
	func_directory = new Map()
}

add_program_id = (program_id) => {
	global_func = program_id
	current_func = program_id
	func_directory.set(program_id, { type: 'program', var_directory: new Map() })
}

add_class_id = (class_id) => {
	currentClass = class_id

	class_directory.set(class_id, {
		type: 'class',
		attr_directory: new Map(),
		method_directory: new Map(),
	})

	//func_directory.set(class_id, { type: 'class', var_directory: new Map() })
}

add_func_id = (func_id) => {
	current_func = func_id

	if (currentClass != null) {
		// We are in a method declaration
		if (class_directory.get(currentClass).method_directory.has(func_id)) {
			console.log('ERROR - Method already exists')
			throw 'ERROR - Method already exists'
		}
		class_directory.get(currentClass).method_directory.set(func_id, {
			type: currentType,
			var_directory: new Map(),
		})
	} else {
		if (func_directory.has(func_id)) {
			console.log('ERROR - Function already exists')
			throw 'ERROR - Function already exists'
		}
		func_directory.set(func_id, { type: currentType, var_directory: new Map() })
	}
}

set_current_type = (type) => {
	currentType = type
}

add_id = (id) => {
	isIdDuplicated(id)
	if (currentClass != null) {
		// Adding var in class
		if (is_attr_dec) {
			class_directory
				.get(currentClass)
				.attr_directory.set(id, { type: currentType })
		} else {
			// Is method declaration
			class_directory
				.get(currentClass)
				.method_directory.get(current_func)
				.var_directory.set(id, { type: currentType })
		}
	} else {
		// Adding var in func / global var
		func_directory
			.get(current_func)
			.var_directory.set(id, { type: currentType })
	}
}

add_id_array = (id, size) => {
	isIdDuplicated(id)
	if (currentClass != null) {
		// Adding var in class
		if (is_attr_dec) {
			class_directory
				.get(currentClass)
				.attr_directory.set(id, { type: `${currentType}[${size}]` })
		} else {
			// Is method declaration
			class_directory
				.get(currentClass)
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

add_id_matrix = (id, sizeR, sizeC) => {
	isIdDuplicated(id)
	if (currentClass != null) {
		// Adding var in class
		if (is_attr_dec) {
			class_directory
				.get(currentClass)
				.attr_directory.set(id, { type: `${currentType}[${sizeR}][${sizeC}]` })
		} else {
			// Is method declaration
			class_directory
				.get(currentClass)
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

finish_func_dec = () => {
	current_func = global_func
}

delete_func_directory = function () {
	console.log(func_directory)
	func_directory = null
}

// Example to add id
// add_id_func_dir = function (id) {
//func_directory.set(id, {var_directory: new Map(), type: 'cool'});
// func_directory[id] = { var_directory: new Map(), type: 'cool' }
// func_directory[id].var_directory['hola'] = { var_directory: new Map() }
// console.log(func_directory)
// console.log(func_directory[id].var_directory)
// }

create_class_directory = () => {
	class_directory = new Map()
	currentClass = null
}

start_attributes_dec = () => {
	is_attr_dec = true
}

finish_attr_dec = () => {
	is_attr_dec = false
}

finish_class_dec = () => {
	currentClass = null
}

delete_class_directory = () => {
	console.log(class_directory)
	class_directory = null
	console.log('quads before exit')
	//console.log(quads)
	print_quads(quads)
	quads = new Queue()
	operators = new Stack()
	operands = new Stack()
	jumps = new Stack()
	res_count = 0
}

// Intermediate generation code

add_operand = (operand, type) => {
	if (type === 'var') {
		if (currentClass != null) {
			const is_inside_class_method =
				class_directory
					.get(currentClass)
					.method_directory.get(current_func)
					.var_directory.get(operand) != null
			// If variable is not inside the function variables, then it must be part of the class' attributes
			type = is_inside_class_method
				? class_directory
						.get(currentClass)
						.method_directory.get(current_func)
						.var_directory.get(operand).type
				: class_directory.get(currentClass).attr_directory.get(operand).type
		} else {
			// Search in current var_directory
			const is_inside_current_func =
				func_directory.get(current_func).var_directory.get(operand) != null

			// If not found, search in global scope
			const is_inside_global_scope =
				func_directory.get(global_func).var_directory.get(operand) != null

			if (is_inside_current_func) {
				type = func_directory.get(current_func).var_directory.get(operand).type
			} else if (is_inside_global_scope) {
				type = func_directory.get(global_func).var_directory.get(operand).type
			} else {
				type = 'undefined'
			}
		}
	}
	operands.push({ operand, type })
}

add_operator = (operator) => {
	console.log('adding operator = ' + operator)
	operators.push(operator)
}

add_mult_div_operation = () => {
	console.log('inside add_mult_div_operation')
	if (operators.top() === '*' || operators.top() === '/') {
		const right = operands.pop()
		const right_operand = right.operand
		const left = operands.pop()
		const left_operand = left.operand
		const operator = operators.pop()

		const result_type = oracle(left.type, right.type, operator)

		if (result_type !== 'error') {
			const result = `temp${res_count++}`
			quads.push({ operator, left_operand, right_operand, result })
			operands.push({ operand: result, type: result_type })
		} else {
			console.log('ERROR - Type mismatch')
			throw 'ERROR - Type mismatch'
		}
	}
}

add_sum_sub_operation = () => {
	console.log('inside add_sum_sub_operation')
	if (operators.top() === '+' || operators.top() === '-') {
		const right = operands.pop()
		const right_operand = right.operand
		const left = operands.pop()
		const left_operand = left.operand
		const operator = operators.pop()

		const result_type = oracle(left.type, right.type, operator)

		if (result_type !== 'error') {
			const result = `temp${res_count++}`
			quads.push({ operator, left_operand, right_operand, result })
			operands.push({ operand: result, type: result_type })
		} else {
			console.log('ERROR - Type mismatch')
			throw 'ERROR - Type mismatch'
		}
	}
}

start_subexpression = () => {
	console.log('inside start_subexpression')
	operators.push('(')
}

end_subexpression = () => {
	console.log('inside end_subexpression')
	operators.pop()
}

add_rel_operation = () => {
	console.log('inside add_rel_operation')
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
			const result = `temp${res_count++}`
			quads.push({ operator, left_operand, right_operand, result })
			operands.push({ operand: result, type: result_type })
		} else {
			console.log('ERROR - Type mismatch')
			throw 'ERROR - Type mismatch'
		}
	}
}

add_and_operation = () => {
	console.log('inside add_and_operation')
	if (operators.top() === '&') {
		const right = operands.pop()
		const right_operand = right.operand
		const left = operands.pop()
		const left_operand = left.operand
		const operator = operators.pop()

		const result_type = oracle(left.type, right.type, operator)

		if (result_type !== 'error') {
			const result = `temp${res_count++}`
			quads.push({ operator, left_operand, right_operand, result })
			operands.push({ operand: result, type: result_type })
		} else {
			console.log('ERROR - Type mismatch')
			throw 'ERROR - Type mismatch'
		}
	}
}

add_or_operation = () => {
	console.log('inside add_or_operation')
	if (operators.top() === '|') {
		const right = operands.pop()
		const right_operand = right.operand
		const left = operands.pop()
		const left_operand = left.operand
		const operator = operators.pop()

		const result_type = oracle(left.type, right.type, operator)

		if (result_type !== 'error') {
			const result = `temp${res_count++}`
			quads.push({ operator, left_operand, right_operand, result })
			operands.push({ operand: result, type: result_type })
		} else {
			console.log('ERROR - Type mismatch')
			throw 'ERROR - Type mismatch'
		}
	}
}

// Print semantic actions
print_expression = () => {
	console.log('inside print_expression')

	const operator = 'print'
	const res = operands.pop()
	const result = res.operand

	const left_operand = null
	const right_operand = null

	quads.push({ operator, left_operand, right_operand, result })
}

print_string = (string) => {
	console.log('inside print_string')

	const operator = 'print'
	const result = string

	const left_operand = null
	const right_operand = null

	quads.push({ operator, left_operand, right_operand, result })
}

// Read semantic actions
read_var = (variable) => {
	console.log('inside read_var')

	// if variable is within scope
	if (is_var_in_scope(variable)) {
		const operator = 'read'
		const result = variable

		const left_operand = null
		const right_operand = null

		quads.push({ operator, left_operand, right_operand, result })
	} else {
		console.log(`ERROR - "${variable}" not found within scope`)
		throw `ERROR - "${variable}" not found within scope`
	}
}

is_var_in_scope = (variable) => {
	if (currentClass != null) {
		// Search within class
		if (
			class_directory
				.get(currentClass)
				.method_directory.get(current_func)
				.var_directory.has(variable)
		) {
			return true
		} else {
			return class_directory.get(currentClass).attr_directory.has(variable)
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

assign_exp = () => {
	console.log('inside assign_exp')

	const res = operands.pop()
	const result = res.operand

	const right_operand = null

	const left = operands.pop()
	const left_operand = left.operand

	const operator = operators.pop()

	console.log(res, left)
	if (res.type === left.type) {
		quads.push({
			operator,
			left_operand: result,
			right_operand,
			result: left_operand,
		})
	} else {
		console.log('ERROR - Type mismatch')
		throw 'ERROR - Type mismatch'
	}
}

mark_if_condition = () => {
	console.log('inside mark_if_condition')

	const cond = operands.pop()
	if (cond.type !== 'int') {
		console.log('ERROR - Type mismatch')
		throw 'ERROR - Type mismatch'
	} else {
		const operator = 'gotoF'
		const left_operand = cond.operand
		const right_operand = null
		const result = 'pending'
		quads.push({ operator, left_operand, right_operand, result })
		jumps.push(quads.count - 1)
		//console.log(jumps)
	}
}

mark_if_end = () => {
	console.log('inside mark_if_end')

	const end = jumps.pop()
	quads.data[end].result = quads.count
}

mark_else = () => {
	console.log('inside mark_else')

	const false_jump = jumps.pop()
	
	const operator = 'goto'
	const left_operand = null
	const right_operand = null
	const result = 'pending'
	quads.push({ operator, left_operand, right_operand, result })

	jumps.push(quads.count - 1)

	quads.data[false_jump].result = quads.count
}

mark_while_start = () => {
	console.log('inside mark_while_start')

	jumps.push(quads.count)
}

mark_while_condition = () => {
	console.log('inside mark_while_condition')

	const cond = operands.pop()
	if (cond.type !== 'int') {
		console.log('ERROR - Type mismatch')
		throw 'ERROR - Type mismatch'
	} else  {
		const operator = 'gotoF'
		const left_operand = cond.operand
		const right_operand = null
		const result = 'pending'
		quads.push({ operator, left_operand, right_operand, result })
		jumps.push(quads.count - 1)
	}
}

mark_while_end = () => {
	console.log('inside mark_while_end')

	const false_jump = jumps.pop()
	const return_jump = jumps.pop()

	const operator = 'goto'
	const left_operand = null
	const right_operand = null
	const result = return_jump
	quads.push({ operator, left_operand, right_operand, result })

	quads.data[false_jump].result = quads.count
}

print_quads = (quads) => {
	quads.data.forEach(
		(value, index) => {
			console.log(`${index} - { ${get_single_quad_string(value)} }`)
		}
	)
}

get_single_quad_string = (quad) => {
	let string = ""
	for (let [key, value] of Object.entries(quad)) {
		string += `${key}: ${value}     `
	}
	return string
}
