// Global variables tests
// All tests to verify the declarations of global variables
// Inputs: receives the parser
// Output: does not return anything (only displays on console the results of the tests)
// Used by: all.js (calls all the test files)

const parser = require('../parser')

console.log('TEST 1 - Global vars')
const test1 = parser.parse(`
	program prog1; 
	var <- int j, x[2][4]; float i[5]; char myChar[3]; ->
	main() {}`)
console.log('--> ' + (test1 ? 'yes :)' : 'no :('))

console.log('ERROR TEST 2 - Global duplicated 2 and 3 dimensional vars')
const program2 = `
	program prog1; 
	var <- int j, x[2][4]; float i[5], x[2][4]; char myChar[3]; ->
	main() {}`
// const test2 = parser.parse(program2)
// console.log('--> ' + (test2 ? 'yes :)' : 'no :('))
