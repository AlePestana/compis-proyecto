// Linear statements tests

const parser = require('../parser')

console.log('TEST 1 - Print an expression in main')
const test1 = parser.parse(`
	program prog1; 
  var <- float y; int x; ->

	main() {
    print (y + x);
  }`)
console.log('--> ' + (test1 ? 'yes :)' : 'no :('))

console.log('TEST 2 - Print multiple expressions in main')
const test2 = parser.parse(`
	program prog1; 
  var <- float y; int x; ->

	main() {
    print (y + x, x * y);
  }`)
console.log('--> ' + (test2 ? 'yes :)' : 'no :('))
