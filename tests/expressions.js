// Expressions tests

const parser = require('../parser')

// console.log('TEST 1 - Simple greater than expression')
// const test1 = parser.parse(`
// 	program prog1;
// 	var <- int x; ->
// 	main() { x = 3 > 1; }`)
// console.log('--> ' + (test1 ? 'yes :)' : 'no :('))

console.log('\nTEST 2 - Add expression')
const test2 = parser.parse(`
	program prog1;
	var <- int x, y; -> 
	main() { y = 3; x = y + 1; }`)
console.log('--> ' + (test2 ? 'yes :)' : 'no :('))
