// Memory
// Memory data structure declaration
// Inputs: receives the offsets for each scope and type
// Output: the Memory data structure
// Used by: virtual_machine.js

// Function to check if a given address is within a range
function isBetween(x, min, max) {
	return x >= min && x < max
}

class Memory {
	constructor(
		{
			int_vars_size = 0,
			float_vars_size = 0,
			char_vars_size = 0,
			int_temps_size = 0,
			float_temps_size = 0,
			int_pointers_size = 0,
			float_pointers_size = 0,
			char_pointers_size = 0,
			objects_size = 0,
		},
		{
			int_vars_offset,
			float_vars_offset,
			char_vars_offset,
			int_temps_offset,
			float_temps_offset,
			int_pointers_offset,
			float_pointers_offset,
			char_pointers_offset,
		}
	) {
		// Memory array
		this.memory = [
			// vars
			[
				new Array(int_vars_size),
				new Array(float_vars_size),
				new Array(char_vars_size),
			],
			// temps
			[new Array(int_temps_size), new Array(float_temps_size)],
			// pointers
			[
				new Array(int_pointers_size),
				new Array(float_pointers_size),
				new Array(char_pointers_size),
			],
			// classes
			// objects_size is an object with the form --> { 46000: 2, 45000: 1 }
			new Array(Object.keys(objects_size).length),
			,
		]

		// Indexes
		this.vars = 0
		this.temps = 1
		this.pointers = 2
		this.objects = 3
		this.int = 0
		this.float = 1
		this.char = 2

		// Offsets
		this.int_vars_offset = int_vars_offset
		this.float_vars_offset = float_vars_offset
		this.char_vars_offset = char_vars_offset
		this.int_temps_offset = int_temps_offset
		this.float_temps_offset = float_temps_offset
		this.int_pointers_offset = int_pointers_offset
		this.float_pointers_offset = float_pointers_offset
		this.char_pointers_offset = char_pointers_offset
		this.objects_offset = 45000

		// Counters
		this.int_vars_count = 0
		this.float_vars_count = 0
		this.char_vars_count = 0
		this.int_temps_count = 0
		this.float_temps_count = 0
		this.int_pointers_count = 0
		this.float_pointers_count = 0
		this.char_pointers_count = 0

		// Initialize empty object memory spaces
		for (let [class_address, object_count] of Object.entries(objects_size)) {
			// 45000 --> 45
			class_address = parseInt(class_address) // parse as int since object keys are considered strings
			const index = class_address / 1000 - this.objects_offset / 1000
			this.memory[this.objects][index] = new Array(object_count)
		}
	}

	// Get the index for each corresponding type
	get_type_index(type) {
		if (type === 'int') {
			return this.int
		} else if (type === 'float') {
			return this.float
		} else {
			return this.char
		}
	}

	// Get the index for each corresponding scope
	get_scope_index(scope) {
		if (scope === 'vars') {
			return this.vars
		} else if (scope === 'temps') {
			return this.temps
		} else {
			return this.pointers
		}
	}

	// Push a parameter value to the memory
	add_parameter(value, type) {
		let index = 0
		const scope_index = this.vars
		const type_index = this.get_type_index(type)

		if (type === 'int') {
			index = this.int_vars_count
			this.int_vars_count++
		} else if (type === 'float') {
			index = this.float_vars_count
			this.float_vars_count++
		} else {
			index = this.char_vars_count
			this.char_vars_count++
		}

		this.memory[scope_index][type_index][index] = value
	}

	// Get the offset according to scope of variable and type
	get_offset(scope, type) {
		if (scope === 'vars') {
			if (type === 'int') {
				return this.int_vars_offset
			} else if (type === 'float') {
				return this.float_vars_offset
			} else {
				return this.char_vars_offset
			}
		} else if (scope === 'temps') {
			if (type === 'int') {
				return this.int_temps_offset
			} else {
				return this.float_temps_offset
			}
		} else {
			if (type === 'int') {
				return this.int_pointers_offset
			} else if (type === 'float') {
				return this.float_pointers_offset
			} else {
				return this.char_pointers_offset
			}
		}
	}

	// Get a value from an address
	// Scope = vars, temps or pointers
	// Type = int, float or char
	get(address, scope, type) {
		const index = address - this.get_offset(scope, type)
		const scope_index = this.get_scope_index(scope)
		const type_index = this.get_type_index(type)

		return this.memory[scope_index][type_index][index]
	}

	// Dependending on the provided address, returns the type of variable (according to the scopes and offsets specified)
	get_address_type(address, scope) {
		if (scope === 'vars') {
			if (isBetween(address, this.int_vars_offset, this.float_vars_offset)) {
				return 'int'
			} else if (
				isBetween(address, this.float_vars_offset, this.char_vars_offset)
			) {
				return 'float'
			} else {
				return 'char'
			}
		} else if (scope === 'temps') {
			if (isBetween(address, this.int_temps_offset, this.float_temps_offset)) {
				return 'int'
			} else {
				return 'float'
			}
		} else {
			if (
				isBetween(address, this.int_pointers_offset, this.float_pointers_offset)
			) {
				return 'int'
			} else if (
				isBetween(
					address,
					this.float_pointers_offset,
					this.char_pointers_offset
				)
			) {
				return 'float'
			} else {
				return 'char'
			}
		}
	}

	// Update the value from a given address
	set(value, address, scope) {
		const type = this.get_address_type(address, scope)
		const scope_index = this.get_scope_index(scope)
		const type_index = this.get_type_index(type)
		const index = address - this.get_offset(scope, type)

		this.memory[scope_index][type_index][index] = value

		// Update counters
		if (scope === 'vars') {
			if (type === 'int') {
				this.int_vars_count++
			} else if (type === 'float') {
				this.float_vars_count++
			} else {
				this.char_vars_count++
			}
		} else if (scope === 'temps') {
			if (type === 'int') {
				this.int_temps_count++
			} else {
				this.float_temps_count++
			}
		} else {
			if (type === 'int') {
				this.int_pointers_count++
			} else if (type === 'float') {
				this.float_pointers_count++
			} else {
				this.char_pointers_count++
			}
		}
	}

	// Add an object inside the corresponding class array
	add_object(object_address, class_sizes, offsets) {
		// 45001 --> 45.001 --> 45
		const class_address = Math.floor(object_address / 1000)

		const class_index = class_address - this.objects_offset / 1000
		const object_index = object_address - class_address * 1000 // so we can do 46001-46000 = 1

		this.memory[this.objects][class_index][object_index] = new Memory(
			class_sizes,
			offsets
		)
	}

	// Get the address inside an object
	get_object_address(address, scope) {
		const object_address = Math.floor(address) // only interested in the non decimal part
		// 45001 --> 45.001 --> 45 --> 45000
		const class_address = Math.floor(object_address / 1000)
		// Obtain decimal part (since that's the actual address of the attribute)
		const value_address = Math.floor((address % 1) * 10000)

		// Get indexes
		const class_index = class_address - this.objects_offset / 1000
		const object_index = object_address - class_address * 1000

		const type = this.get_address_type(value_address, scope)

		return this.memory[this.objects][class_index][object_index].get(
			value_address,
			scope,
			type
		)
	}

	// Set the address of an object
	set_object_address(value, address, scope) {
		const object_address = Math.floor(address) // only interested in the non decimal part
		// 45001 --> 45.001 --> 45 --> 45000
		const class_address = Math.floor(object_address / 1000)
		// Obtain decimal part (since that's the actual address of the attribute)
		address = Math.floor((address % 1) * 10000)

		// Get indexes
		const class_index = class_address - this.objects_offset / 1000
		const object_index = object_address - class_address * 1000

		return this.memory[this.objects][class_index][object_index].set(
			value,
			address,
			scope
		)
	}
}

module.exports = Memory
