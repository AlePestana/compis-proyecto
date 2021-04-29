// Semantic cube
// Specifies all the possible type matches for the parser
// Inputs: does not receive parameters
// Output: oracle (the function to check if two types match)
// Used by: semantics.js
cube = {
	int: {
		int: {
			'+': 'int',
			'-': 'int',
			'*': 'int',
			'/': 'float',
			'>': 'int',
			'<': 'int',
			'==': 'int',
			'!=': 'int',
			'&': 'int',
			'|': 'int',
		},
		float: {
			'+': 'float',
			'-': 'float',
			'*': 'float',
			'/': 'float',
			'>': 'int',
			'<': 'int',
			'==': 'int',
			'!=': 'int',
			'&': 'error',
			'|': 'error',
		},
		char: {
			'+': 'error',
			'-': 'error',
			'*': 'error',
			'/': 'error',
			'>': 'error',
			'<': 'error',
			'==': 'error',
			'!=': 'error',
			'&': 'error',
			'|': 'error',
		},
	},
	float: {
		int: {
			'+': 'float',
			'-': 'float',
			'*': 'float',
			'/': 'float',
			'>': 'int',
			'<': 'int',
			'==': 'int',
			'!=': 'int',
			'&': 'error',
			'|': 'error',
		},
		float: {
			'+': 'float',
			'-': 'float',
			'*': 'float',
			'/': 'float',
			'>': 'int',
			'<': 'int',
			'==': 'int',
			'!=': 'int',
			'&': 'error',
			'|': 'error',
		},
		char: {
			'+': 'error',
			'-': 'error',
			'*': 'error',
			'/': 'error',
			'>': 'error',
			'<': 'error',
			'==': 'error',
			'!=': 'error',
			'&': 'error',
			'|': 'error',
		},
	},
	char: {
		int: {
			'+': 'error',
			'-': 'error',
			'*': 'error',
			'/': 'error',
			'>': 'error',
			'<': 'error',
			'==': 'error',
			'!=': 'error',
			'&': 'error',
			'|': 'error',
		},
		float: {
			'+': 'error',
			'-': 'error',
			'*': 'error',
			'/': 'error',
			'>': 'error',
			'<': 'error',
			'==': 'error',
			'!=': 'error',
			'&': 'error',
			'|': 'error',
		},
		char: {
			'+': 'error',
			'-': 'error',
			'*': 'error',
			'/': 'error',
			'>': 'error',
			'<': 'error',
			'==': 'int',
			'!=': 'int',
			'&': 'error',
			'|': 'error',
		},
	},
}

oracle = (operand1, operand2, operator) => {
	return cube[operand1][operand2][operator]
}

// Measuring performance
// console.time('oracle')
// oracle('int', 'float', '+')
// console.timeEnd('oracle')

module.exports = oracle
