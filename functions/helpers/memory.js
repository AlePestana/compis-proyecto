// Memory
// Memory data structure declaration
// Inputs: receives the offsets for each scope and type
// Output: the Memory data structure
// Used by: virtual_machine.js

class Memory {
	constructor({
		int_vars_offset,
		float_vars_offset,
		char_vars_offset,
		int_temps_offset,
		float_temps_offset,
	}) {
		this.memory = {
			vars: {
				int: [],
				float: [],
				char: [],
			},
			temps: {
				int: [],
				float: [],
			},
		}
		this.int_vars_offset = int_vars_offset
		this.float_vars_offset = float_vars_offset
		this.char_vars_offset = char_vars_offset
		this.int_temps_offset = int_temps_offset
		this.float_temps_offset = float_temps_offset
	}

	// Add a value to the memory
	push(value, scope, type) {
		this.memory[scope][type].push(value)
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
		} else {
			if (type === 'int') {
				return this.int_temps_offset
			} else {
				return this.float_temps_offset
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

	// Update the value from a given address
	update(value, address, scope, type) {
		const index = address - this.get_offset(scope, type)
		this.memory[scope][type][index] = value
	}
}

module.exports = Memory
