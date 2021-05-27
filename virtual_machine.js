// Virtual machine
// Creates a virtual machine to execute all the intermediate code (quadruples generated by the semantics)
// Inputs: receives the quadruples from the parser (which includes the semantic actions)
// Output: prints in the console the outputs of the execution of quadruples
// Used by: ArrowScript.js

// Helper structures
const Memory = require('./functions/helpers/memory.js')
const Stack = require('./functions/helpers/stack')

const readline = require('readline')

const debug = false

// Helpers to read user input
const receive_user_input = () => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	return new Promise((resolve) =>
		rl.question('', (answer) => {
			rl.close()
			resolve(answer)
		})
	)
}

// Determine the offsets for addresses for main (stored as global on parser)
const main_func_offsets = {
	int_vars_offset: 5000,
	float_vars_offset: 9000,
	char_vars_offset: 12000,
	int_temps_offset: 8000,
	float_temps_offset: 11000,
	int_pointers_offset: 33000,
	float_pointers_offset: 35000,
	char_pointers_offset: 37000,
}

// Determine the offsets for addresses for functions (stored as local on parser)
const funcs_offsets = {
	int_vars_offset: 14000,
	float_vars_offset: 19000,
	char_vars_offset: 23000,
	int_temps_offset: 18000,
	float_temps_offset: 22000,
	int_pointers_offset: 39000,
	float_pointers_offset: 41000,
	char_pointers_offset: 43000,
}

// Function that checks if an address belongs to the global scope
const isGlobalVar = (address) => {
	if (address < 14000 || (address >= 33000 && address <= 38999)) {
		return true
	} else {
		return false
	}
}

// Function that checks if an address belongs to a constant (all constants are stored after virtual address 25000)
const isConstant = (address) => {
	return address >= 25000 && address <= 32999
}

// Function that checks if an address belongs to a pointer (all pointers are stored after virtual address 33000)
const isPointer = (address) => {
	return address >= 33000
}

// Function that returns the value of a constant by receiving the constants directory and the address
const getConstant = (map, searchValue) => {
	for (let [key, value] of map.entries()) {
		if (value === searchValue) return key
	}
}

// Function to check if a given address is within a range
function isBetween(x, min, max) {
	return x >= min && x <= max
}

// Function that checks if an address belongs to the spaces of memory designated for temps
const isTempVar = (address) => {
	return (
		isBetween(address, 8000, 8999) ||
		isBetween(address, 11000, 11999) ||
		isBetween(address, 18000, 18999) ||
		isBetween(address, 22000, 22999)
	)
}

// Function that returns the type of a temp var by checking the memory ranges designated for temps
const getTempVarType = (address) => {
	if (isBetween(address, 8000, 8999) || isBetween(address, 18000, 18999)) {
		return 'int'
	} else {
		return 'float'
	}
}

// Function that returns the type of a pointer var by checking the memory ranges designated for pointers
const getPointerVarType = (address) => {
	if (isBetween(address, 33000, 34999) || isBetween(address, 39000, 40999)) {
		return 'int'
	} else if (
		isBetween(address, 35000, 36999) ||
		isBetween(address, 41000, 42999)
	) {
		return 'float'
	} else {
		return 'char'
	}
}

// Function that gets the type of a variable from the var_directory
const getVarType = (var_directory, address) => {
	for (let [, value] of var_directory.entries()) {
		if (value.virtual_address === address) return value.type
	}
}

const getLocalVarType = (address) => {
	if (isBetween(address, 14000, 18999)) {
		return 'int'
	} else if (isBetween(address, 19000, 22999)) {
		return 'float'
	} else {
		return 'char'
	}
}

// Function that executes the virtual machine by creating the data, code, and stack segment
// Receives the relevant information from the parser (quads, func_directory, and constants_directory)
// Does not return anything since it performs the necessary operations inside
async function execute_virtual_machine(virtual_machine_info) {
	if (virtual_machine_info == null) {
		console.log('Expected information from parser inside virtual machine')
		throw 'Expected information from parser inside virtual machine'
	}

	// Retrieve relevant information from parser
	const { quads, func_directory, constants_directory } = virtual_machine_info

	// Declare all necessary types
	const code_segment = quads
	// Create memory map for main
	let current_func = func_directory.entries().next().value[0] // returns the name of the first func inside the current directory
	const main_size_directory =
		func_directory.get(current_func).func_size_directory
	const main_func_sizes = {
		int_vars_count: main_size_directory.get('vars_size').int,
		float_vars_count: main_size_directory.get('vars_size').float,
		char_vars_count: main_size_directory.get('vars_size').char,
		int_temps_count: main_size_directory.get('temps_size').int,
		float_temps_count: main_size_directory.get('temps_size').float,
	}
	const data_segment = new Memory(main_func_sizes, main_func_offsets)
	const exec_stack = new Stack()
	let ip = 0 // instruction pointer

	// Helper structures
	const func_calls_in_build = new Stack()
	let exec_stack_size = 0
	const exec_stack_max_size = 100000

	// Function to look on corresponding memory for a variable's value
	const getOperandValue = (address) => {
		if (isConstant(address)) {
			return getConstant(constants_directory, address)
		} else {
			if (isGlobalVar(address)) {
				// Working with data_segment
				if (isTempVar(address)) {
					// Look for temp value in corresponding memory (since it must have already been stored)
					const temp_type = getTempVarType(address)
					return data_segment.get(address, 'temps', temp_type)
				} else if (isPointer(address)) {
					const pointer_type = getPointerVarType(address)
					const actual_address = getPointingAddress(
						address,
						pointer_type,
						'global'
					)
					return data_segment.get(actual_address, 'vars', pointer_type)
				} else {
					const var_type = getVarType(
						func_directory.get(current_func).var_directory,
						address
					)
					// Look for value in corresponding memory
					return data_segment.get(address, 'vars', var_type)
				}
			} else {
				// Working with exec_stack
				if (isTempVar(address)) {
					// Look for temp value in corresponding memory (since it must have already been stored)
					const temp_type = getTempVarType(address)
					return exec_stack.top().memory.get(address, 'temps', temp_type)
				} else if (isPointer(address)) {
					const pointer_type = getPointerVarType(address)
					const actual_address = getPointingAddress(
						address,
						pointer_type,
						'local'
					)
					return exec_stack
						.top()
						.memory.get(actual_address, 'vars', pointer_type)
				} else {
					const var_type = getLocalVarType(address)
					return exec_stack.top().memory.get(address, 'vars', var_type)
				}
			}
		}
	}

	// Function that gets the address that the pointer is pointing to
	const getPointingAddress = (address, pointer_type, scope) => {
		// Just return the address, not the value
		if (scope === 'global') {
			return data_segment.get(address, 'pointers', pointer_type)
		} else {
			return exec_stack.top().memory.get(address, 'pointers', pointer_type)
		}
	}

	// Function to set to memory a particular value
	const setMemoryValue = (result, address, duration) => {
		if (isGlobalVar(address)) {
			// data_segment
			data_segment.set(result, address, duration)
		} else {
			// exec_stack
			exec_stack.top().memory.set(result, address, duration)
		}
	}

	// Function to calculate the total amount needed for a function
	const getTotalFunctionSize = (func_size_directory) => {
		let total = 0
		for (let [, size_directory] of func_size_directory.entries()) {
			// Add all the values stored for each type of size
			// Example -->
			/*
			{
				'params_size' => { int: 1, float: 0, char: 0 },
				'local_vars_size' => { int: 1, float: 0, char: 0 },
				'temps_size' => { int: 6, float: 0 }
				'pointers_size' => { int: 1, float: 2, char: 0 }
			} 
			*/
			total += Object.values(size_directory).reduce((a, b) => a + b, 0)
		}

		return total
	}

	const getFunctionSizes = (size_directory) => {
		return {
			int_vars_count:
				size_directory.get('params_size').int +
				size_directory.get('local_vars_size').int,
			float_vars_count:
				size_directory.get('params_size').float +
				size_directory.get('local_vars_size').float,
			char_vars_count:
				size_directory.get('params_size').char +
				size_directory.get('local_vars_size').char,
			int_temps_count: size_directory.get('temps_size').int,
			float_temps_count: size_directory.get('temps_size').float,
		}
	}

	let left_operand, right_operand, result, address, duration

	// Execute code_segment
	while (ip != -1) {
		const quad = code_segment.get(ip)
		switch (quad.operator) {
			case 1: // +
				left_operand = getOperandValue(quad.left_operand)
				right_operand = getOperandValue(quad.right_operand)
				result = left_operand + right_operand
				address = quad.result
				if (debug) {
					console.log('+')
				}
				// Save result on memory
				duration = isPointer(address) ? 'pointers' : 'temps'
				setMemoryValue(result, address, duration)
				ip++
				break

			case 2: // -
				left_operand = getOperandValue(quad.left_operand)
				right_operand = getOperandValue(quad.right_operand)
				result = left_operand - right_operand
				address = quad.result
				if (debug) {
					console.log('-')
				}
				// Save result on memory
				setMemoryValue(result, address, 'temps')
				ip++
				break

			case 3: // *
				left_operand = getOperandValue(quad.left_operand)
				right_operand = getOperandValue(quad.right_operand)
				result = left_operand * right_operand
				address = quad.result
				if (debug) {
					console.log('*')
				}
				// Save result on memory
				setMemoryValue(result, address, 'temps')
				ip++
				break

			case 4: // /
				left_operand = getOperandValue(quad.left_operand)
				right_operand = getOperandValue(quad.right_operand)
				result = left_operand / right_operand
				address = quad.result
				if (debug) {
					console.log('/')
				}
				// Save result on memory
				setMemoryValue(result, address, 'temps')
				ip++
				break

			case 5: // <
				left_operand = getOperandValue(quad.left_operand)
				right_operand = getOperandValue(quad.right_operand)
				result = left_operand < right_operand ? 1 : 0
				address = quad.result
				if (debug) {
					console.log('<')
				}
				// Save result on memory
				setMemoryValue(result, address, 'temps')
				ip++
				break

			case 6: // >
				left_operand = getOperandValue(quad.left_operand)
				right_operand = getOperandValue(quad.right_operand)
				result = left_operand > right_operand ? 1 : 0
				address = quad.result
				if (debug) {
					console.log('>')
				}
				// Save result on memory
				setMemoryValue(result, address, 'temps')
				ip++
				break

			case 7: // ==
				left_operand = getOperandValue(quad.left_operand)
				right_operand = getOperandValue(quad.right_operand)
				result = left_operand == right_operand ? 1 : 0
				address = quad.result
				if (debug) {
					console.log('==')
				}
				// Save result on memory
				setMemoryValue(result, address, 'temps')
				ip++
				break

			case 8: // !=
				left_operand = getOperandValue(quad.left_operand)
				right_operand = getOperandValue(quad.right_operand)
				result = left_operand != right_operand ? 1 : 0
				address = quad.result
				if (debug) {
					console.log('!=')
				}
				// Save result on memory
				setMemoryValue(result, address, 'temps')
				ip++
				break

			case 9: // &
				left_operand = getOperandValue(quad.left_operand)
				right_operand = getOperandValue(quad.right_operand)
				result = left_operand & right_operand ? 1 : 0
				address = quad.result
				if (debug) {
					console.log('&')
				}
				// Save result on memory
				setMemoryValue(result, address, 'temps')
				ip++
				break

			case 10: // |
				left_operand = getOperandValue(quad.left_operand)
				right_operand = getOperandValue(quad.right_operand)
				result = left_operand | right_operand ? 1 : 0
				address = quad.result
				if (debug) {
					console.log('|')
				}
				// Save result on memory
				setMemoryValue(result, address, 'temps')
				ip++
				break

			case 11: // =
				result = getOperandValue(quad.left_operand)
				address = quad.result
				if (debug) {
					console.log('=')
				}
				// This will break when assigning values to global variables inside funcs ????
				if (isTempVar(address)) {
					duration = 'temps'
				} else if (isPointer(address)) {
					duration = 'pointers'
				} else {
					duration = 'vars'
				}

				if (duration === 'pointers') {
					// First get the actual address
					const pointer_type = getPointerVarType(address)
					const scope = isGlobalVar(address) ? 'global' : 'local'
					address = getPointingAddress(address, pointer_type, scope)
					// The final address must be a var
					duration = 'vars'
				}

				// Set memory value
				setMemoryValue(result, address, duration)
				ip++
				break

			case 12: // print
				result = getOperandValue(quad.result)
				// Remove "" from constant before printing it
				if (isConstant(quad.result) && typeof result === 'string') {
					result = result.slice(1, -1)
				}
				console.log(result)
				ip++
				break
			case 13: // read
				// Read user input
				result = await receive_user_input()
				// Validate type ???
				switch (result.type) {
					case 'int':
						console.log('Check is int')
						break
					case 'float':
						console.log('Check is float')
						break
					case 'char':
						console.log('Check is char')
						break
				}
				// Look for address in func_directory
				address = func_directory
					.get(current_func)
					.var_directory.get(quad.result).virtual_address // Quad should probably also have an address and not a name?
				// Save result on memory
				setMemoryValue(result, address, 'vars')
				ip++
				break
			case 14: // gotoT
				condition = getOperandValue(quad.left_operand)
				if (condition == 1) {
					ip = quad.result
				} else {
					ip++
				}
				break
			case 15: // gotoF
				condition = getOperandValue(quad.left_operand)
				if (condition == 0) {
					ip = quad.result
				} else {
					ip++
				}
				break
			case 16: // goto
				ip = quad.result
				break
			case 17: // endfunc
				ip = exec_stack.pop().return_address
				break
			case 18: // era
				let curr_function_name = quad.left_operand
				let curr_function_size = getTotalFunctionSize(
					func_directory.get(curr_function_name).func_size_directory
				)
				if (exec_stack_size + curr_function_size > exec_stack_max_size) {
					console.log('ERROR - Stack overflow')
					throw 'ERROR - Stack overflow'
				}
				// Add current function size to total size of execution stack
				exec_stack_size += curr_function_size
				let curr_function_sizes = getFunctionSizes(
					func_directory.get(curr_function_name).func_size_directory
				)
				let func_call_mem = new Memory(curr_function_sizes, funcs_offsets)
				func_calls_in_build.push({
					name: curr_function_name,
					memory: func_call_mem,
					return_address: null,
				})
				ip++
				break
			case 19: // gosub
				// Dunno what the left operand of the gosub is for
				let func_call_to_push = func_calls_in_build.pop()
				func_call_to_push.return_address = ip + 1
				exec_stack.push(func_call_to_push)
				ip = quad.result
				break
			case 20: // param
				const argument = getOperandValue(quad.left_operand)
				const param_num = parseInt(quad.result.slice(5)) // Read after param\

				const argument_type = func_directory.get(func_calls_in_build.top().name)
					.params_type_list[param_num - 1]
				func_calls_in_build.top().memory.add_parameter(argument, argument_type)

				ip++
				break
			case 21: // end
				ip = -1
				break
			case 22: // return
				result = getOperandValue(quad.result)
				address = func_directory.get(exec_stack.top().name).return_address
				setMemoryValue(result, address, 'vars')

				ip = exec_stack.pop().return_address
				break
			case 23: // verify
				ip++
				break
			default:
				ip = -1
				break
		}
	}
}

module.exports = { execute_virtual_machine }
