// Expressions tests

const parser = require('../parser')

console.log('TEST 1 - Add expression')
const test1 = parser.parse(`
	program prog1;
	var <- int x; -> 
	main() { x = 3 > 1; }`)
console.log('--> ' + (test1 ? 'yes :)' : 'no :('))
