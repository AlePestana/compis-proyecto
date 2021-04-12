// Semantics

// Declare function directory variable
func_directory = null

create_func_directory = function () {
	func_directory = new Map()
}

add_program_id = (program_id) => {
	currentFunc = program_id
	func_directory[program_id] = { type: 'program', ref: new Map() }
}

// Example to add id
// add_id_func_dir = function (id) {
//func_directory.set(id, {ref: new Map(), type: 'cool'});
// func_directory[id] = { ref: new Map(), type: 'cool' }
// func_directory[id].ref['hola'] = { ref: new Map() }
// console.log(func_directory)
// console.log(func_directory[id].ref)
// }

add_id = (id) => {
	func_directory[currentFunc].ref[id] = { type: 'currentType' }
	console.log(func_directory)
	console.log(func_directory[currentFunc].ref)
}

delete_func_directory = function () {
	func_directory = null
}
