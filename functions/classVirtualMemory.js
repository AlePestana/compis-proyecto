// Class virtual memory addresses
// Specifies the range of virtual memory addresses that can be assigned during compilation for classes
// Inputs: does not receive parameters
// Output: funcs
// Used by: semantics.js
class_virtual_memory_addresses = {
	// For attributes
	global: {
		int: {
			perm: {
				start: 5000,
				limit: 7999,
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
		},
	},
	// For methods
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
}

// Initialize/reset counters
initialize_counters = () => {
	for (const scope in class_virtual_memory_addresses) {
		for (const type in class_virtual_memory_addresses[scope]) {
			for (const duration in class_virtual_memory_addresses[scope][type]) {
				class_virtual_memory_addresses[scope][type][duration].count =
					class_virtual_memory_addresses[scope][type][duration].start
			}
		}
	}
}

initialize_counters() // Initialize for first time

// Ask for a virtual memory address
get_address = (scope, type, duration) => {
	const count = class_virtual_memory_addresses[scope][type][duration].count
	const limit = class_virtual_memory_addresses[scope][type][duration].limit
	class_virtual_memory_addresses[scope][type][duration].count++ // Prepare for next var
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
	if (
		last_address <= class_virtual_memory_addresses[scope][type][duration].limit
	) {
		class_virtual_memory_addresses[scope][type][duration].count =
			last_address + 1
		return base_address
	} else {
		throw `ERROR - Too many variables of SCOPE: ${scope}, TYPE: ${type}, DURATION: ${duration}`
	}
}

// Erase local scope virtual memory
reset_local_addresses = () => {
	for (const type in class_virtual_memory_addresses.local) {
		for (const duration in class_virtual_memory_addresses.local[type]) {
			class_virtual_memory_addresses.local[type][duration].count =
				class_virtual_memory_addresses.local[type][duration].start
		}
	}
}

// Function to check if a given address is within a range
function isBetween(x, min, max) {
	return x >= min && x <= max
}

// Function to check if an address belongs to any listed addresses of those specified as temp
is_local_temp_address = (address) => {
	const local_int = class_virtual_memory_addresses.local.int.temp
	const local_float = class_virtual_memory_addresses.local.float.temp
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
