// Expressions tests
// All tests to verify the declaration of expressions
// Inputs: receives the parser
// Output: does not return anything (only displays on console the results of the tests)
// Used by: all.js (calls all the test files)

const parser = require('../parser')

console.log('TEST 1 - Simple greater than expression')
// const test1 = parser.parse(`
// 	program prog1;
// 	var <- int x; ->
// 	main() { x = 3 > 1; }`)
// console.log('--> ' + (test1 ? 'yes :)' : 'no :('))

console.log('\nTEST 2 - Add expression')
// const test2 = parser.parse(`
// 	program prog1;
// 	var <- int x, y; ->
// 	main() { y = 3; x = y + 1; }`)
// console.log('--> ' + (test2 ? 'yes :)' : 'no :('))

console.log('\nTEST 3 - Multiplication and division expression')
const test3 = parser.parse(`
	program prog1;
	var <- float x; ->
	main() { x = 10 / 5 * 1; }`)
console.log('--> ' + (test3 ? 'yes :)' : 'no :('))

console.log('\nERROR TEST 4 - Multiplication expression with type mismatch')
// const test4 = parser.parse(`
// 	program prog1;
// 	var <- int x; char y; ->
// 	main() { x = 10 * y; }`)
// console.log('--> ' + (test4 ? 'yes :)' : 'no :('))

console.log('\nTEST 5 - Addition and subtraction expression')
const test5 = parser.parse(`
	program prog1;
	var <- int x; ->
	main() { x = 10 - 8 + 4; }`)
console.log('--> ' + (test5 ? 'yes :)' : 'no :('))

console.log('\nTEST 6 - Multiplication, division and addition expression')
const test6 = parser.parse(`
	program prog1;
	var <- int x; ->
	main() { x = 7 - 5 * 1 + 8; }`)
console.log('--> ' + (test6 ? 'yes :)' : 'no :('))

console.log('\nTEST 7 - Mixed expression with parenthesis')
const test7 = parser.parse(`
	program prog1;
	var <- int x; ->
	main() { x = (7 - 5) * 1 + 8; }`)
console.log('--> ' + (test7 ? 'yes :)' : 'no :('))

console.log('\nTEST 8 - Mixed expression with multiple parenthesis')
const test8 = parser.parse(`
	program prog1;
	var <- int x; ->
	main() { x = (10 - 5) * (2 + 8); }`)
console.log('--> ' + (test8 ? 'yes :)' : 'no :('))

console.log('\nTEST 9 - Mixed relational expression')
const test9 = parser.parse(`
	program prog1;
	var <- int x; ->
	main() { x = 10 - 5 > 2 + 8; }`)
console.log('--> ' + (test9 ? 'yes :)' : 'no :('))

console.log('\nTEST 10 - Mixed relational expression with parenthesis')
const test10 = parser.parse(`
	program prog1;
	var <- int x; ->
	main() { x = (10 - 5) * 2 != 2 + 8 / 4; }`)
console.log('--> ' + (test10 ? 'yes :)' : 'no :('))

console.log(
	'\nERROR TEST 11 - Mixed relational expression with multiple rel symbols'
)
// const test11 = parser.parse(`
// 	program prog1;
// 	var <- int x; ->
// 	main() { x = (11 - 5) < 2 != 2 + 8 > 4; }`)
// console.log('--> ' + (test11 ? 'yes :)' : 'no :('))
// Caught by syntax

console.log('\nTEST 12 - Mixed AND expression')
const test12 = parser.parse(`
	program prog1;
	var <- int x; ->
	main() { x = 10 - 5 & 2 + 8; }`)
console.log('--> ' + (test12 ? 'yes :)' : 'no :('))

console.log('\nTEST 13 - Mixed OR expression')
const test13 = parser.parse(`
	program prog1;
	var <- int x; ->
	main() { x = 10 - 5 | 2 + 8; }`)
console.log('--> ' + (test13 ? 'yes :)' : 'no :('))

console.log('\nTEST 14 - Mixed AND OR expression')
const test14 = parser.parse(`
	program prog1;
	var <- int x; ->
	main() { x = 10 - 5 & 12 | 2 + 8; }`)
console.log('--> ' + (test14 ? 'yes :)' : 'no :('))

console.log('\nTEST 15 - Simple AND OR expression with parenthesis')
const test15 = parser.parse(`
	program prog1;
	var <- int x; ->
	main() { x = 5 & 12 | 8; }`)
console.log('--> ' + (test15 ? 'yes :)' : 'no :('))

console.log('\nTEST 16 - Mixed AND OR expression with parenthesis')
const test16 = parser.parse(`
	program prog1;
	var <- int x; ->
	main() { x = 5 & (12 | 8); }`)
console.log('--> ' + (test16 ? 'yes :)' : 'no :('))

// Expressions inside classes
console.log('\nTEST 17 - Multiplication expression inside class method')
const test17 = parser.parse(`
  program prog1;

  class Person {
    attributes <- float x; ->
    methods <-
      int func mult(var <- int y; ->)
      {
        return x * y;
      }
    ->
  }

  var <- float y; Person person1; ->

  main() {}`)
console.log('--> ' + (test17 ? 'yes :)' : 'no :('))

// Expressions inside funcs
console.log('\nTEST 18 - Multiplication expression inside func')
const test18 = parser.parse(`
	program prog1; 
    var <- float z; ->

	void func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { return x / y; }

	main() {}`)
console.log('--> ' + (test18 ? 'yes :)' : 'no :('))

console.log('\nTEST 19 - Multiplication expression inside func with global var')
const test19 = parser.parse(`
	program prog1; 
    var <- float z; ->
	
	void func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { return z / y * x; }

	main() {}`)
console.log('--> ' + (test19 ? 'yes :)' : 'no :('))

console.log('\nERROR TEST 20 - Relational expression with double symbols')
// const test20 = parser.parse(`
// 	program prog1;
// 	var <- int x, y; ->
// 	main() { x = 10 > y > x; }`)
// console.log('--> ' + (test20 ? 'yes :)' : 'no :('))
// Caught by syntax
