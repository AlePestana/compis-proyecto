// Classes tests

const parser = require('../parser')

console.log('TEST - Empty class declaration')
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

console.log('TEST - Class with attributes declaration')
const test2 = parser.parse(`
  program prog1; 

  class Person {
    attributes <- int x; ->
    methods <- 
      int func one(var <- int x; ->)
      {
        return (age - x);
      }
    ->
  }

  var <- float y[2]; ->

  void func myFunc1 (var <- int x; ->)
  var <- float y; ->
  { }

  main() {}`)
console.log('--> ' + (test2 ? 'yes :)' : 'no :('))
