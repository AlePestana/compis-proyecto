// Semantics

// Semantic cube
const oracle = require('./cube')

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
				if (func_directory.get(currentFunc).var_directory.has(id)) {
					console.log('ERROR - Variable already exists in method')
					throw 'ERROR - Variable already exists in method'
				}
			}
		}
	} else {
		// We are in a func var/param or global var declaration
		// Check if id already exists
		if (func_directory.get(currentFunc).var_directory.has(id)) {
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
	currentFunc = program_id
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
	currentFunc = func_id

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
				.method_directory.get(currentFunc)
				.var_directory.set(id, { type: currentType })
		}
	} else {
		// Adding var in func / global var
		func_directory.get(currentFunc).var_directory.set(id, { type: currentType })
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
				.method_directory.get(currentFunc)
				.var_directory.set(id, { type: `${currentType}[${size}]` })
		}
	} else {
		func_directory
			.get(currentFunc)
			.var_directory.set(id, { type: `${currentType}[${size}]` })
		// console.log('received array with id = ' + id + ' and size of = ' + size)
		// console.log(func_directory.get(currentFunc).var_directory)
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
				.method_directory.get(currentFunc)
				.var_directory.set(id, { type: `${currentType}[${sizeR}][${sizeC}]` })
		}
	} else {
		func_directory.get(currentFunc).var_directory.set(id, {
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
		// console.log(func_directory.get(currentFunc).var_directory)
	}
}

finish_func_dec = () => {
	currentFunc = global_func
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
}

// Intermediate generation code for expressions

// Stack
class Stack {
	constructor() {
		this.data = []
		this.size = 0
	}

	push(element) {
		this.data.push(element)
		this.size++
	}

	pop() {
		if (this.size != 0) {
			// check if there's actually an element
			this.size--
			return this.data.pop()
		}
	}

	top() {
		return this.data[this.size - 1]
	}
}

// Declare quadruples
quads = []
operators = new Stack()
operands = new Stack()
res_count = 0

add_operand = (operand, type) => {
	if (type === 'var') {
		if (currentClass != null) {
			type = class_directory
				.get(currentClass)
				.method_directory.get(currentFunc)
				.var_directory.get(operand).type
		} else {
			type = func_directory.get(currentFunc).var_directory.get(operand)
				? func_directory.get(currentFunc).var_directory.get(operand).type
				: 'undefined'
		}
	}
	operands.push({ operand, type })
}

add_operator = (operator) => {
	console.log('adding operator = ' + operator)
	operators.push(operator)
}

add_mult_div_operation = () => {
	console.log('=======')
	console.log('operators')
	console.log(operators)
	console.log('operands')
	console.log(operands)
	if (operators.top() == '*' || operators.top() == '/') {
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
			console.log('quads')
			console.log(quads)
		} else {
			console.log('ERROR - Type mismatch')
			throw 'ERROR - Type mismatch'
		}
	}
}

add_sum_sub_operation = () => {
	console.log('inside add_sum_sub_operation')
}

start_subexpression = () => {
	console.log('inside start_subexpression')
}

end_subexpression = () => {
	console.log('inside end_subexpression')
}

add_rel_operation = () => {
	console.log('inside add_rel_operation')
}

add_and_operation = () => {
	console.log('inside add_and_operation')
}

add_or_operation = () => {
	console.log('inside add_or_operation')
}
