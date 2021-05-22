// Arrays and matrices tests
// All tests to verify the declaration and use of arrays and matrices
// Inputs: receives the parser
// Output: does not return anything (only displays on console the results of the tests)
// Used by: all.js (calls all the test files)

const parser = require('../parser')

console.log('TEST 1 - Simple array declaration with assignment')
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

console.log('\nTEST 2 - Simple matrix declaration with assignment')
const test2 = parser.parse(`
	program prog1; 
    var <- float y[2][3], p; int x[5][10], z; ->

	main() {
    y[1][0] = 2.2;
    p = 10.2;
    x[4][8] = 1;
    z = 2;
  }`)
console.log('--> ' + (test2 ? 'yes :)' : 'no :('))

console.log('\nERROR TEST 3 - Trying to index an array as a matrix')
// const test3 = parser.parse(`
// 	program prog1;
//     var <- float x[3]; ->

// 	main() {
//     x[0][1] = 2.2;
//     x[1][0] = 4.4;
//     print(x[1][0]);
//   }`)
// console.log('--> ' + (test3 ? 'yes :)' : 'no :('))

console.log('\nERROR TEST 4 - Simple array declaration with float index number')
// const test4 = parser.parse(`
// 	program prog1;
//     var <- float x[3]; ->

// 	main() {
//     x[0.5][1] = 2.2;
//   }`)
// console.log('--> ' + (test4 ? 'yes :)' : 'no :('))

console.log('\nERROR TEST 5 - Indexing variable that has no dimensions')
// const test5 = parser.parse(`
// 	program prog1;
//     var <- int x; ->

// 	main() {
//     x[0][1] = 2;
//   }`)
// console.log('--> ' + (test5 ? 'yes :)' : 'no :('))

console.log('\nTEST 6 - Printing matrix value')
const test6 = parser.parse(`
	program prog1; 
    var <- float x[3][2]; ->

	main() {
    x[0][1] = 2.2;
    x[1][0] = 4.4;
    print(x[1][0]);
  }`)
console.log('--> ' + (test6 ? 'yes :)' : 'no :('))
