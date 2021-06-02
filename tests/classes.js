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
    attributes <- int age; float height; ->
    methods <- ->
  }

  var <- Person person1, person2; ->

  main() {
    person1.age = 15 + 5;
    print(person1.age);
    person2.height = 1;
    print(person2.height);
  }`)
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

console.log('\n\nERROR TEST 6 - Too many classes defined (+11)')
const program6 = `
program prog1; 

class Person {
  attributes <- int age; float height; ->
  methods <- ->
}

class Animal {
  attributes <- int age; float height; ->
  methods <- ->
}

class Object {
  attributes <- int age; float height; ->
  methods <- ->
}

class Car {
  attributes <- int age; float height; ->
  methods <- ->
}

class Industry {
  attributes <- int age; float height; ->
  methods <- ->
}

class Job {
  attributes <- int age; float height; ->
  methods <- ->
}

class Vehicle {
  attributes <- int age; float height; ->
  methods <- ->
}

class Student {
  attributes <- int age; float height; ->
  methods <- ->
}

class Teacher {
  attributes <- int age; float height; ->
  methods <- ->
}

class Anything {
  attributes <- int age; float height; ->
  methods <- ->
}

class Bye {
  attributes <- int age; float height; ->
  methods <- ->
}

main() {}`
// const test6 = parser.parse(program6)
// console.log('--> ' + (test6 ? 'yes :)' : 'no :('))

console.log('\n\nTEST 7 - lass with method that returns attribute')
const test7 = parser.parse(`
  program prog1; 

  class Person {
    attributes <- int age; float height; ->
    methods <-
    int func getAge()
      {
        return age;
      }
    ->
  }

  var <- Person person1, person2; ->

  main() {
    person1.age = 15 + 5;
    print(1);
    person2.height = 1;
    print(person2.height);
  }`)
console.log('--> ' + (test7 ? 'yes :)' : 'no :('))

console.log('\n\nTEST 8 - Call class method that returns something')
const test8 = parser.parse(`
  program prog1; 

  class Person {
    attributes <- int age; float height; ->
    methods <-
    int func getAge(var <- int x; ->)
      {
        return age;
      }
    ->
  }

  var <- Person person1, person2; ->

  main() {
    person1.age = 15 + 5;
    print(person1.getAge(1));
    person2.height = 1;
    print(person2.height);
  }`)
console.log('--> ' + (test8 ? 'yes :)' : 'no :('))

console.log('\n\nTEST 9 - Call void class method')
const test9 = parser.parse(`
  program prog1; 

  class Person {
    attributes <- int age; float height; ->
    methods <-
    void func getAge(var <- int x; float y; ->)
      {
        print(age);
      }
    ->
  }

  var <- Person person1, person2; ->

  main() {
    person1.age = 15 + 5;
    person1.getAge(1, 2);
    person2.height = 1;
    print(person2.height);
  }`)
console.log('--> ' + (test9 ? 'yes :)' : 'no :('))
