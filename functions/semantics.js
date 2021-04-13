// Semantics

// Declare function directory variable
func_directory = null

create_func_directory = function () {
	func_directory = new Map()
}

add_program_id = (program_id) => {
	currentFunc = program_id
	func_directory.set(program_id, { type: 'program', ref: new Map() })
}

add_class_id = (class_id) => {
	currentFunc = class_id
	func_directory.set(class_id,  { type: 'class', ref: new Map() })
}

add_func_id = (func_id) => {
	currentFunc = func_id
	func_directory.set(func_id, { type: currentType, ref: new Map() })
}

set_current_type = (type) => {
	currentType = type
}

add_id = (id) => {
	// Check if id already exists
	// CHECK WHY HAS MARKS FALSE
	// ADD SAME LOGIC TO FUNC AND CLASS
	//console.log(func_directory.get(currentFunc).ref.has(id))
	if (func_directory.get(currentFunc).ref.has(id)) {
		console.log('ERROR - Variable already exists')
		throw 'ERROR - Variable already exists'
	} else {
		func_directory.get(currentFunc).ref.set(id, { type: currentType })
		console.log(func_directory)
		console.log(func_directory.get(currentFunc).ref)
	}
	//console.log(func_directory.get(currentFunc).has('set'))
	
}

add_id_array = (id, size) => {
	func_directory.get(currentFunc).ref.set(id, { type: `${currentType}[${size}]` })
	// console.log('received array with id = ' + id + ' and size of = ' + size)
	console.log(func_directory.get(currentFunc).ref)
}

add_id_matrix = (id, sizeR, sizeC) => {
	func_directory.get(currentFunc).ref.set(id, {
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
	console.log(func_directory.get(currentFunc).ref)
}

delete_func_directory = function () {
	console.log("---Final state of func_directory---")
	console.log(func_directory)
	func_directory = null
}

// Example to add id
// add_id_func_dir = function (id) {
//func_directory.set(id, {ref: new Map(), type: 'cool'});
// func_directory[id] = { ref: new Map(), type: 'cool' }
// func_directory[id].ref['hola'] = { ref: new Map() }
// console.log(func_directory)
// console.log(func_directory[id].ref)
// }
