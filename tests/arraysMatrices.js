// Arrays and matrices tests
// All tests to verify the declaration and use of arrays and matrices
// Inputs: receives the parser
// Output: does not return anything (only displays on console the results of the tests)
// Used by: all.js (calls all the test files)

const parser = require('../parser')

console.log('TEST 1 - Simple array declaration')
const test1 = parser.parse(`
	program prog1; 
    var <- float y[2], p; int x[5], z; ->

	main() {
    y[1] = 2.2;
    p = 10.2;
    x[4] = 1;
    z = 2;
  }`)
console.log('--> ' + (test1 ? 'yes :)' : 'no :('))
