// Operation codes
// Specifies all the possible operation codes (opcode) that the VM can execute
// Inputs: does not receive parameters
// Output: get_opcode (the function that returns the corresponding numeric opcode for a given opcode)
// Used by: semantics.js
operations = {
	'+': 1,
	'-': 2,
	'*': 3,
	'/': 4,
	'<': 5,
	'>': 6,
	'==': 7,
	'!=': 8,
	'&': 9,
	'|': 10,
	'=': 11,
	print: 12,
	read: 13,
	gotoT: 14,
	gotoF: 15,
	goto: 16,
	endfunc: 17,
	era: 18,
	gosub: 19,
	param: 20,
	end: 21,
}

get_opcode = (string_opcode) => {
	return operations[string_opcode]
}

module.exports = get_opcode
