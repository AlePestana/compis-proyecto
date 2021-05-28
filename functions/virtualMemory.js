// Virtual memory addresses
// Specifies the range of virtual memory addresses that can be assigned during compilation
// Inputs: does not receive parameters
// Output: get_virtual_mem_address (the function to check availability and assign a virtual memory address)
// Used by: semantics.js
virtual_memory_addresses = {
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
}

// Initialize/reset counters
initialize_counters = () => {
	for (const scope in virtual_memory_addresses) {
		for (const type in virtual_memory_addresses[scope]) {
			if (scope != 'constant') {
				for (const duration in virtual_memory_addresses[scope][type]) {
					virtual_memory_addresses[scope][type][duration].count =
						virtual_memory_addresses[scope][type][duration].start
				}
			} else {
				virtual_memory_addresses[scope][type].count =
					virtual_memory_addresses[scope][type].start
			}
		}
	}
}

initialize_counters() // Initialize for first time

// console.log(JSON.stringify(virtual_memory_addresses)) // debug

// Ask for a virtual memory address
get_address = (scope, type, duration) => {
	let count
	let limit
	if (scope != 'constant') {
		count = virtual_memory_addresses[scope][type][duration].count
		limit = virtual_memory_addresses[scope][type][duration].limit
		virtual_memory_addresses[scope][type][duration].count++ // Prepare for next var
	} else {
		count = virtual_memory_addresses[scope][type].count
		limit = virtual_memory_addresses[scope][type].limit
		virtual_memory_addresses[scope][type].count++ // Prepare for next var
	}
	if (count <= limit) {
		return count
	} else {
		throw `ERROR - Too many variables of SCOPE: ${scope}, TYPE: ${type}, DURATION: ${duration}`
	}
}

// Ask for a number of continuous memory addresses
get_continuous_addresses = (scope, type, duration, number_addresses) => {
	const base_address = get_address(scope, type, duration)
	const last_address = base_address + (number_addresses - 1)
	if (last_address <= virtual_memory_addresses[scope][type][duration].limit) {
		virtual_memory_addresses[scope][type][duration].count = last_address + 1
		return base_address
	} else {
		throw `ERROR - Too many variables of SCOPE: ${scope}, TYPE: ${type}, DURATION: ${duration}`
	}
}

// Erase local scope virtual memory
reset_local_addresses = () => {
	for (const type in virtual_memory_addresses.local) {
		for (const duration in virtual_memory_addresses.local[type]) {
			virtual_memory_addresses.local[type][duration].count =
				virtual_memory_addresses.local[type][duration].start
		}
	}
}

// Function to check if a given address is within a range
function isBetween(x, min, max) {
	return x >= min && x <= max
}

// Function to check if an address belongs to any listed addresses of those specified as temp
is_local_temp_address = (address) => {
	const local_int = virtual_memory_addresses.local.int.temp
	const local_float = virtual_memory_addresses.local.float.temp
	if (
		isBetween(address, local_int.start, local_int.limit) ||
		isBetween(address, local_float.start, local_float.limit) ||
		(typeof address === 'string' && address.includes('temp'))
	) {
		return true
	}
	console.log('returning false')
	return false
}

module.exports = {
	initialize_counters,
	get_address,
	get_continuous_addresses,
	reset_local_addresses,
	is_local_temp_address,
}
