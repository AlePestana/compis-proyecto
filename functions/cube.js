// Semantic cube

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
			'&': 'int',
			'|': 'int',
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
			'&': 'int',
			'|': 'int',
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
