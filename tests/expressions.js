// Expressions tests

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
	var <- int x; ->
	main() { x = 10 / 5 * 1; }`)
console.log('--> ' + (test3 ? 'yes :)' : 'no :('))

console.log('\nERROR TEST 4 - Multiplication expression with type mismatch')
// const test4 = parser.parse(`
// 	program prog1;
// 	var <- int x; char y; ->
// 	main() { x = 10 * y; }`)
// console.log('--> ' + (test4 ? 'yes :)' : 'no :('))

// Expressions inside classes
console.log('\nTEST 5 - Multiplication expression inside class method')
const test5 = parser.parse(`
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

  var <- float y[2]; Person person1; ->

  main() {}`)
console.log('--> ' + (test5 ? 'yes :)' : 'no :('))

// Expressions inside funcs
console.log('\nTEST 6 - Multiplication expression inside func')
const test6 = parser.parse(`
	program prog1; 
    var <- float z; ->
	void func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { return x / y; }

	main() {}`)
console.log('--> ' + (test6 ? 'yes :)' : 'no :('))
