// Syntax tests

const parser = require('../parser')

// Program
console.log('\n--------------\nProgram')
console.log('TEST - General program structure (empty)')
const test1 = parser.parse('program prog1; main() {}')
console.log('--> ' + (test1 ? 'yes :)' : 'no :('))

// Classes
console.log('\n--------------\nClasses')
console.log('TEST - Class declarations (empty)')
const test2 = parser.parse(`
	program prog1; 
	class myClass1 { attributes <- -> methods <- -> } 
	main() {}`)
console.log('--> ' + (test2 ? 'yes :)' : 'no :('))

console.log('TEST - Class declarations (empty) with father class')
const test3 = parser.parse(`
	program prog1; 
	class myClass1 extends myClass2 { attributes <- -> methods <- -> } 
	main() {}`)
console.log('--> ' + (test3 ? 'yes :)' : 'no :('))

console.log('TEST - Class declarations with variables')
const test3a = parser.parse(`
	program prog1; 
	class myClass1 extends myClass2 { attributes <- int id1; -> methods <- -> } 
	main() {}`)
console.log('--> ' + (test3a ? 'yes :)' : 'no :('))

// Variables
console.log('\n--------------\nVariables')
console.log('TEST - Vars declarations 1 var')
const test4 = parser.parse(`
	program prog1; 
	var <- int id1; -> 
	main() {}`)
console.log('--> ' + (test4 ? 'yes :)' : 'no :('))

console.log('TEST - Vars declarations n vars')
const test5 = parser.parse(`
	program prog1; 
	var <- int id1, id2; float id3; -> 
	main() {}`)
console.log('--> ' + (test5 ? 'yes :)' : 'no :('))

console.log('TEST - Vars declarations n vars with multi-dim vars')
const test6 = parser.parse(`
	program prog1; 
	var <- int id1, id2[1]; float id3, id4[2][3]; -> 
	main() {}`)
console.log('--> ' + (test6 ? 'yes :)' : 'no :('))

// Funcs
console.log('\n--------------\nFuncs')
console.log('TEST - Func declaration (empty)')
const test7 = parser.parse(`
	program prog1; 
	int func myFunc1 () { }
	main() {}`)
console.log('--> ' + (test7 ? 'yes :)' : 'no :('))

console.log('TEST - Void func declaration (empty)')
const test8 = parser.parse(`
	program prog1; 
	void func myFunc1 () { }
	main() {}`)
console.log('--> ' + (test8 ? 'yes :)' : 'no :('))

console.log('TEST - Func declaration with parameters')
const test9 = parser.parse(`
	program prog1; 
	void func myFunc1 (var <- int id1; ->) { }
	main() {}`)
console.log('--> ' + (test9 ? 'yes :)' : 'no :('))

console.log('TEST - Func declaration with parameters and statements')
const test10 = parser.parse(`
	program prog1; 
	void func myFunc1 (var <- int id1; ->) { return id1; }
	main() {}`)
console.log('--> ' + (test10 ? 'yes :)' : 'no :('))

// Statements
console.log('\n--------------\nStatements')

// Assignment
console.log('\n--------------\nAssignment')
console.log('TEST - Assignment of simple variable')
const test11 = parser.parse('program prog1; main() { id1 = id1; }')
console.log('--> ' + (test11 ? 'yes :)' : 'no :('))

console.log('TEST - Assignment of variable of multi-dim struct')
const test12 = parser.parse('program prog1; main() { id1[1][n] = id1; }')
console.log('--> ' + (test12 ? 'yes :)' : 'no :('))

console.log('TEST - Assignment of variable of object')
const test13 = parser.parse(
	'program prog1; main() { object1.attribute1 = id1; }'
)
console.log('--> ' + (test13 ? 'yes :)' : 'no :('))

// Expressions (tested with Assignments)
console.log('\n--------------\nExpression (tested with Assignment)')
console.log('TEST - Expression Parentheses')
const test14 = parser.parse('program prog1; main() { id1 = (id1); }')
console.log('--> ' + (test14 ? 'yes :)' : 'no :('))

console.log('TEST - Expression Multiplication Division')
const test15 = parser.parse(
	'program prog1; main() { id1 = id2 * (id1) / id3; }'
)
console.log('--> ' + (test15 ? 'yes :)' : 'no :('))

console.log('TEST - Expression Addition Substraction')
const test16 = parser.parse(
	'program prog1; main() { id1 = id4 + id2 * (id1) / id3 - id5; }'
)
console.log('--> ' + (test16 ? 'yes :)' : 'no :('))

console.log('TEST - Expression Relop >')
const test17 = parser.parse(
	'program prog1; main() { id1 = id6 > id4 + id2 * (id1) / id3 - id5; }'
)
console.log('--> ' + (test17 ? 'yes :)' : 'no :('))

console.log('TEST - Expression with var name')
const test17a = parser.parse('program prog1; main() { id1 = id6; }')
console.log('--> ' + (test17a ? 'yes :)' : 'no :('))

// Void Func Call
console.log('\n--------------\nVoid Func Call')
console.log('TEST - Calling of a void func without parameters')
const test18 = parser.parse('program prog1; main() { myVoidFunc1(); }')
console.log('--> ' + (test18 ? 'yes :)' : 'no :('))

console.log('TEST - Calling of a void method of class')
const test18a = parser.parse('program prog1; main() { id1.myVoidFunc1(); }')
console.log('--> ' + (test18a ? 'yes :)' : 'no :('))

console.log('TEST - Calling of a void func with parameters')
const test19 = parser.parse(
	'program prog1; main() { myVoidFunc1(2 + 2, id1, myVoidFunc2()); }'
) // Interesting failure, can call an id that starts with int
console.log('--> ' + (test19 ? 'yes :)' : 'no :('))

console.log('TEST - Calling of a void func with parameters with another func')
const test20 = parser.parse(
	'program prog1; main() { myVoidFunc1(2 + 2, id1, idFunc2(2*3, id4)); }'
) // Interesting failure, can call an id that starts with int
console.log('--> ' + (test20 ? 'yes :)' : 'no :('))

// IO
console.log('\n--------------\nIO')

// Read
console.log('\n--------------\nRead')
console.log('TEST - Reading of a single variable')
const test21 = parser.parse('program prog1; main() { read(id1); }')
console.log('--> ' + (test21 ? 'yes :)' : 'no :('))

console.log('TEST - Reading of multiple variables')
const test22 = parser.parse(
	'program prog1; main() { read(id1, id[1], id[2][3], objId.attrId); }'
)
console.log('--> ' + (test22 ? 'yes :)' : 'no :('))

// Print
console.log('\n--------------\nPrint')
console.log('TEST - Printing of a single expression')
const test23 = parser.parse('program prog1; main() { print(id1); }')
console.log('--> ' + (test23 ? 'yes :)' : 'no :('))

console.log('TEST - Printing of multiple expressions')
const test24 = parser.parse(
	'program prog1; main() { print(id1, 2 + 2, id[1], id[2][3], objId.attrId); }'
)
console.log('--> ' + (test24 ? 'yes :)' : 'no :('))

console.log('TEST - Printing a string')
const test25 = parser.parse('program prog1; main() { print("HiMom"); }')
console.log('--> ' + (test25 ? 'yes :)' : 'no :('))

console.log('TEST - Printing a string with expressions')
const test25a = parser.parse(
	'program prog1; main() { print("ByeMom", id1[4]); }'
)
console.log('--> ' + (test25a ? 'yes :)' : 'no :('))

// Control statements
console.log('\n--------------\nControl')
console.log('TEST - if without else')
const test26 = parser.parse(
	'program prog1; main() { if (id1 > id2) { print("HiMom"); } }'
)
console.log('--> ' + (test26 ? 'yes :)' : 'no :('))

console.log('TEST - if with else')
const test27 = parser.parse(
	'program prog1; main() { if (id1 > id2) { print("HiMom"); } else { print("ByeMom"); } }'
)
console.log('--> ' + (test27 ? 'yes :)' : 'no :('))

// Iteration statements
console.log('\n--------------\nIteration')

console.log('\n--------------\nWhile Loop')
console.log('TEST - while loop')
const test28 = parser.parse(
	'program prog1; main() { while (id1 > id2) { id1 = id1 + 1; } }'
)
console.log('--> ' + (test28 ? 'yes :)' : 'no :('))

console.log('\n--------------\nFor Loop')
console.log('TEST - for loop')
const test29 = parser.parse(
	'program prog1; main() { for (id1 = 1 until 5) { print(id1); } }'
)
console.log('--> ' + (test29 ? 'yes :)' : 'no :('))
