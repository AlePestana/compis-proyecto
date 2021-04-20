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
    print (y, y + x, x * y);
  }`)
console.log('--> ' + (test2 ? 'yes :)' : 'no :('))

console.log('TEST 3 - Print string in main')
const test3 = parser.parse(`
	program prog1; 
  var <- float y; int x; ->

	main() {
    print ("HiMom");
  }`)
console.log('--> ' + (test3 ? 'yes :)' : 'no :('))

console.log('TEST 4 - Print multiple strings in main')
const test4 = parser.parse(`
	program prog1; 
  var <- float y; int x; ->

	main() {
    print ("HiMom", "HiDad");
  }`)
console.log('--> ' + (test4 ? 'yes :)' : 'no :('))

console.log('TEST 5 - Print multiple expressions and strings in main')
const test5 = parser.parse(`
	program prog1; 
  var <- float y; int x; ->

	main() {
    print (y + x, "HiMom", x * y, "HiDad", y);
  }`)
console.log('--> ' + (test5 ? 'yes :)' : 'no :('))

console.log('TEST 6 - Print multiple expressions and strings in function')
const test6 = parser.parse(`
	program prog1; 
  var <- float y; int x; ->

  void func myFunc1 (var <- int i; ->)
  var <- float j; ->
  { 
    print(i + j, "HiBro", j * j, "HiSis", j);
  }

	main() {
    print (y + x, "HiMom", x * y, "HiDad", y);
  }`)
console.log('--> ' + (test6 ? 'yes :)' : 'no :('))
