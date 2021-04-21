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

console.log('TEST 7 - Read to a variable in main')
const test7 = parser.parse(`
	program prog1; 
  var <- float y; int x; ->

	main() {
    read(x);
  }`)
console.log('--> ' + (test7 ? 'yes :)' : 'no :('))

console.log('TEST 8 - Read to multiple variables in main')
const test8 = parser.parse(`
	program prog1; 
  var <- float y; int x; ->

	main() {
    read(x, y);
  }`)
console.log('--> ' + (test8 ? 'yes :)' : 'no :('))

console.log('ERROR TEST 9 - Read to a variable not within scope in main')
// const test9 = parser.parse(`
// 	program prog1; 
//   var <- float y; int x; ->

// 	main() {
//     read(x, z);
//   }`)
// console.log('--> ' + (test9 ? 'yes :)' : 'no :('))

console.log('TEST 10 - Read to multiple local variables in function')
const test10 = parser.parse(`
	program prog1; 
  var <- float y; int x; ->

  void func myFunc1 (var <- int i; ->)
  var <- float j; ->
  { 
    read(j, i);
  }

	main() {
  }`)
console.log('--> ' + (test10 ? 'yes :)' : 'no :('))

console.log('TEST 11 - Read to multiple local and global variables in function')
const test11 = parser.parse(`
	program prog1; 
  var <- float y; int x; ->

  void func myFunc1 (var <- int i; ->)
  var <- float j; ->
  { 
    read(j, i, x);
  }

	main() {
  }`)
console.log('--> ' + (test11 ? 'yes :)' : 'no :('))

console.log('ERROR TEST 12 - Read to a variable not within scope in function')
// const test12 = parser.parse(`
// 	program prog1; 
//   var <- float y; int x; ->

//   void func myFunc1 (var <- int i; ->)
//   var <- float j; ->
//   { 
//     read(j, i, z);
//   }

// 	main() {
//   }`)
// console.log('--> ' + (test12 ? 'yes :)' : 'no :('))

console.log('TEST 13 - Read to a local variable in class method')
const test13 = parser.parse(`
  program prog1; 

  class Person {
    attributes <- int x; ->
    methods <- 
      int func one(var <- int y; ->)
      {
        read(y);
      }
    ->
  }

  var <- Person person1; ->

  main() {}`)
console.log('--> ' + (test13 ? 'yes :)' : 'no :('))

console.log('TEST 14 - Read to a local variable and attribute in class method')
const test14 = parser.parse(`
  program prog1; 

  class Person {
    attributes <- int x; ->
    methods <- 
      int func one(var <- int y; ->)
      {
        read(x, y);
      }
    ->
  }

  var <- Person person1; ->

  main() {}`)
console.log('--> ' + (test14 ? 'yes :)' : 'no :('))

console.log('ERROR TEST 15 - Read to a variable not within scope in class method')
// const test15 = parser.parse(`
//   program prog1; 

//   class Person {
//     attributes <- int x; ->
//     methods <- 
//       int func one(var <- int y; ->)
//       {
//         read(x, y, z);
//       }
//     ->
//   }

//   var <- Person person1; ->

//   main() {}`)
// console.log('--> ' + (test15 ? 'yes :)' : 'no :('))
