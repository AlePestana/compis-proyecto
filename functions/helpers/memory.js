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
			int_vars_size,
			float_vars_size,
			char_vars_size,
			int_temps_size,
			float_temps_size,
			int_pointers_size,
			float_pointers_size,
			char_pointers_size,
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
		this.memory = {
			vars: {
				int: new Array(int_vars_size),
				float: new Array(float_vars_size),
				char: new Array(char_vars_size),
			},
			temps: {
				int: new Array(int_temps_size),
				float: new Array(float_temps_size),
			},
			pointers: {
				int: new Array(int_pointers_size),
				float: new Array(float_pointers_size),
				char: new Array(char_pointers_size),
			},
		}
		this.int_vars_offset = int_vars_offset
		this.float_vars_offset = float_vars_offset
		this.char_vars_offset = char_vars_offset
		this.int_temps_offset = int_temps_offset
		this.float_temps_offset = float_temps_offset
		this.int_pointers_offset = int_pointers_offset
		this.float_pointers_offset = float_pointers_offset
		this.char_pointers_offset = char_pointers_offset
		this.int_vars_count = 0
		this.float_vars_count = 0
		this.char_vars_count = 0
		this.int_temps_count = 0
		this.float_temps_count = 0
		this.int_pointers_count = 0
		this.float_pointers_count = 0
		this.char_pointers_count = 0
	}

	// Add a value to the memory
	// push(value, scope, type) {
	// 	this.memory[scope][type].push(value)
	// }

	// Push a parameter value to the memory
	add_parameter(value, type) {
		let index = 0
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
		this.memory['vars'][type][index] = value
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
	// Scope = vars or temp
	// Type = int, float or char
	get(address, scope, type) {
		const index = address - this.get_offset(scope, type)
		return this.memory[scope][type][index]
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
		const index = address - this.get_offset(scope, type)
		this.memory[scope][type][index] = value

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
}

module.exports = Memory
