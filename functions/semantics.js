// Semantics

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

	class_directory.set(class_id, { type: 'class', attr_directory: new Map(), method_directory: new Map() })

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
		class_directory.get(currentClass).method_directory.set(func_id, { type: currentType, var_directory: new Map() })
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
			class_directory.get(currentClass).attr_directory.set(id, { type: currentType })
		} else {
			// Is method declaration
			class_directory.get(currentClass).method_directory.get(currentFunc).var_directory.set(id, { type: currentType })
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
			class_directory.get(currentClass).attr_directory.set(id, { type: `${currentType}[${size}]` })
		} else {
			// Is method declaration
			class_directory.get(currentClass).method_directory.get(currentFunc).var_directory.set(id, { type: `${currentType}[${size}]` })
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
			class_directory.get(currentClass).attr_directory.set(id, { type: `${currentType}[${sizeR}][${sizeC}]` })
		} else {
			// Is method declaration
			class_directory.get(currentClass).method_directory.get(currentFunc).var_directory.set(id, { type: `${currentType}[${sizeR}][${sizeC}]` })
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


