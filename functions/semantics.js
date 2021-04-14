// Semantics

// Helper functions
const isIdDuplicated = (id) => {
	// Check if id already exists
	if (func_directory.get(currentFunc).var_directory.has(id)) {
		console.log('ERROR - Variable already exists')
		throw 'ERROR - Variable already exists'
	}
}
// Declare function directory variable
func_directory = null

create_func_directory = function () {
	func_directory = new Map()
}

add_program_id = (program_id) => {
	currentFunc = program_id
	func_directory.set(program_id, { type: 'program', var_directory: new Map() })
}

add_class_id = (class_id) => {
	currentFunc = class_id
	func_directory.set(class_id, { type: 'class', var_directory: new Map() })
}

add_func_id = (func_id) => {
	currentFunc = func_id

	if (func_directory.has(func_id)) {
		console.log('ERROR - Function already exists')
		throw 'ERROR - Function already exists'
	}
	func_directory.set(func_id, { type: currentType, var_directory: new Map() })
}

set_current_type = (type) => {
	currentType = type
}

add_id = (id) => {
	isIdDuplicated(id)
	func_directory.get(currentFunc).var_directory.set(id, { type: currentType })
}

add_id_array = (id, size) => {
	isIdDuplicated(id)
	func_directory
		.get(currentFunc)
		.var_directory.set(id, { type: `${currentType}[${size}]` })
	// console.log('received array with id = ' + id + ' and size of = ' + size)
	// console.log(func_directory.get(currentFunc).var_directory)
}

add_id_matrix = (id, sizeR, sizeC) => {
	isIdDuplicated(id)
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
