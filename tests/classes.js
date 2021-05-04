// Classes tests
// All tests to verify the declaration of classes
// Inputs: receives the parser
// Output: does not return anything (only displays on console the results of the tests)
// Used by: all.js (calls all the test files)

const parser = require('../parser')

console.log('TEST 1 - Empty class declaration')
const test1 = parser.parse(`
  program prog1; 

  class Person {
    attributes <- ->
    methods <- ->
  }

  var <- float y[2]; ->

  void func myFunc1 (var <- int x; ->)
  var <- float y; ->
  { }

  main() {}`)
console.log('--> ' + (test1 ? 'yes :)' : 'no :('))

console.log('\n\nTEST 2 - Class with attributes declaration')
const test2 = parser.parse(`
  program prog1; 

  class Person {
    attributes <- int x; ->
    methods <- ->
  }

  var <- float y[2]; ->

  void func myFunc1 (var <- int x; ->)
  var <- float y; ->
  { }

  main() {}`)
console.log('--> ' + (test2 ? 'yes :)' : 'no :('))

console.log('\n\nTEST 3 - Class with attributes and methods declaration')
const test3 = parser.parse(`
  program prog1; 

  class Person {
    attributes <- int x; ->
    methods <- 
      int func one(var <- int x; ->)
      {
        return (x - 1);
      }
    ->
  }

  var <- float y[2]; Person person1; ->

  void func myFunc1 (var <- int x; ->)
  var <- float y; ->
  { }

  main() {}`)
console.log('--> ' + (test3 ? 'yes :)' : 'no :('))

console.log('\n\nERROR TEST 4 - Class with attribute of another fake class')
const program4 = `
program prog1; 

class Person {
  attributes <- int x; Animal animal1; ->
  methods <- 
    int func one(var <- int x; ->)
    {
      return (age - x);
    }
  ->
}

var <- float y[2]; Person person1; ->

void func myFunc1 (var <- int x; ->)
var <- float y; ->
{ }

main() {}`
// const test4 = parser.parse(program4)
// console.log('--> ' + (test4 ? 'yes :)' : 'no :('))

console.log(
	'\n\nERROR TEST 5 - Class with method of return type of another fake class'
)
const program5 = `
program prog1; 

class Person {
  attributes <- int x; ->
  methods <- 
    Animal func one(var <- int x; ->)
    {
      return (age - x);
    }
  ->
}

var <- float y[2]; Person person1; ->

void func myFunc1 (var <- int x; ->)
var <- float y; ->
{ }

main() {}`
// const test5 = parser.parse(program5)
// console.log('--> ' + (test5 ? 'yes :)' : 'no :('))
// Syntax catches this error
