// Comments tests
// All tests to verify the use of comments (of the form <- comment ->)
// Inputs: receives the parser
// Output: does not return anything (only displays on console the results of the tests)
// Used by: all.js (calls all the test files)

const parser = require('../parser')

console.log('TEST 1 - Comment inside main')
const test1 = parser.parse(`
	program prog1; 
	main() {
        <- this is a comment ->
    }`)
console.log('--> ' + (test1 ? 'yes :)' : 'no :('))

console.log('\nTEST 2 - Comment inside loop and conditional')
const test2 = parser.parse(`
	program prog1;
	main() {
        while(5 > 1) {
            <- this will crash ->
            if(5 < 1) {
                <- inside if ->
            } else {
                <- inside else ->
            }
        }
    }`)
console.log('--> ' + (test2 ? 'yes :)' : 'no :('))

console.log('\nTEST 3 - Comment inside function')
const test3 = parser.parse(`
	program prog1;

    <- this is a comment before func ->

	void func myFunc1 (var <- int id1; ->) { 
        <- this is a comment inside func ->
    }

    <- this is a comment after func ->

	main() {}`)
console.log('--> ' + (test3 ? 'yes :)' : 'no :('))

console.log('\nTEST 4 - Comment outside main')
const test4 = parser.parse(`
    <- starting program ->
	program prog1; 
    <- after program ->
	main() {
        <- this is a comment ->
    }
    <- after main ->
    `)
console.log('--> ' + (test4 ? 'yes :)' : 'no :('))
