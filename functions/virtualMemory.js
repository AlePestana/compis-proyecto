// Virtual memory addresses
// Specifies the range of virtual memory addresses that can be assigned during compilation
// Inputs: does not receive parameters
// Output: get_virtual_mem_address (the function to check availability and assign a virtual memory address)
// Used by: semantics.js

// Function to check if a given address is within a range
function isBetween(x, min, max) {
	return x >= min && x <= max
}

class VirtualMemory {
	constructor() {
		this.virtual_memory_addresses = {
			global: {
				int: {
					perm: {
						start: 5000,
						limit: 7999,
						count: null,
					},
					temp: {
						start: 8000,
						limit: 8999,
						count: null,
					},
					pointer: {
						start: 33000,
						limit: 34999,
						count: null,
					},
				},
				float: {
					perm: {
						start: 9000,
						limit: 10999,
						count: null,
					},
					temp: {
						start: 11000,
						limit: 11999,
						count: null,
					},
					pointer: {
						start: 35000,
						limit: 36999,
						count: null,
					},
				},
				char: {
					perm: {
						start: 12000,
						limit: 13999,
						count: null,
					},
					pointer: {
						start: 37000,
						limit: 38999,
						count: null,
					},
					// We cannot create a temporary char variable (semantic cube operations)
				},
			},
			local: {
				int: {
					perm: {
						start: 14000,
						limit: 17999,
						count: null,
					},
					temp: {
						start: 18000,
						limit: 18999,
						count: null,
					},
					pointer: {
						start: 39000,
						limit: 40999,
						count: null,
					},
				},
				float: {
					perm: {
						start: 19000,
						limit: 21999,
						count: null,
					},
					temp: {
						start: 22000,
						limit: 22999,
						count: null,
					},
					pointer: {
						start: 41000,
						limit: 42999,
						count: null,
					},
				},
				char: {
					perm: {
						start: 23000,
						limit: 24999,
						count: null,
					},
					pointer: {
						start: 43000,
						limit: 44999,
						count: null,
					},
				},
				// We cannot create a temporary char variable (semantic cube operations)
			},
			constant: {
				int: {
					start: 25000,
					limit: 26999,
					count: null,
				},
				float: {
					start: 27000,
					limit: 28999,
					count: null,
				},
				char: {
					start: 29000,
					limit: 30999,
					count: null,
				},
				string: {
					start: 31000,
					limit: 32000,
					count: null,
				},
			},
			class: {
				start: 45000,
				limit: 54999,
				count: null,
			},
		}
	}

	// Initialize/reset counters
	initialize_counters() {
		for (const scope in this.virtual_memory_addresses) {
			for (const type in this.virtual_memory_addresses[scope]) {
				if (scope === 'constant') {
					this.virtual_memory_addresses[scope][type].count =
						this.virtual_memory_addresses[scope][type].start
				} else if (scope === 'class') {
					this.virtual_memory_addresses[scope].count =
						this.virtual_memory_addresses[scope].start
				} else {
					for (const duration in this.virtual_memory_addresses[scope][type]) {
						this.virtual_memory_addresses[scope][type][duration].count =
							this.virtual_memory_addresses[scope][type][duration].start
					}
				}
			}
		}
	}

	// initialize_counters() // Initialize for first time

	// console.log(JSON.stringify(this.virtual_memory_addresses)) // debug

	// Ask for a virtual memory address for a class
	get_class_address() {
		const current_count = this.virtual_memory_addresses['class'].count
		if (current_count <= this.virtual_memory_addresses['class'].limit) {
			// Leave 1000 spaces, meaning 1000 objects for each class
			this.virtual_memory_addresses['class'].count += 1000
			return current_count
		} else {
			throw 'ERROR - Too many classes'
		}
	}

	// Ask for a virtual memory address
	get_address(scope, type, duration) {
		let count
		let limit
		if (scope != 'constant') {
			count = this.virtual_memory_addresses[scope][type][duration].count
			limit = this.virtual_memory_addresses[scope][type][duration].limit
			this.virtual_memory_addresses[scope][type][duration].count++ // Prepare for next var
		} else {
			count = this.virtual_memory_addresses[scope][type].count
			limit = this.virtual_memory_addresses[scope][type].limit
			this.virtual_memory_addresses[scope][type].count++ // Prepare for next var
		}
		if (count <= limit) {
			return count
		} else {
			throw `ERROR - Too many variables of SCOPE: ${scope}, TYPE: ${type}, DURATION: ${duration}`
		}
	}

	// Ask for a number of continuous memory addresses
	get_continuous_addresses(scope, type, duration, number_addresses) {
		const base_address = this.get_address(scope, type, duration)
		const last_address = base_address + (number_addresses - 1)
		if (
			last_address <= this.virtual_memory_addresses[scope][type][duration].limit
		) {
			this.virtual_memory_addresses[scope][type][duration].count =
				last_address + 1
			return base_address
		} else {
			throw `ERROR - Too many variables of SCOPE: ${scope}, TYPE: ${type}, DURATION: ${duration}`
		}
	}

	// Erase local scope virtual memory
	reset_local_addresses() {
		for (const type in this.virtual_memory_addresses.local) {
			for (const duration in this.virtual_memory_addresses.local[type]) {
				this.virtual_memory_addresses.local[type][duration].count =
					this.virtual_memory_addresses.local[type][duration].start
			}
		}
	}

	// Function to check if an address belongs to any listed addresses of those specified as temp
	is_local_temp_address(address) {
		const local_int = this.virtual_memory_addresses.local.int.temp
		const local_float = this.virtual_memory_addresses.local.float.temp
		if (
			isBetween(address, local_int.start, local_int.limit) ||
			isBetween(address, local_float.start, local_float.limit)
		) {
			return true
		}
		return false
	}
}

module.exports = VirtualMemory
