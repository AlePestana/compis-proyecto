// Func tests
// All tests to verify the declaration of functions
// Inputs: receives the parser
// Output: does not return anything (only displays on console the results of the tests)
// Used by: all.js (calls all the test files)

const parser = require('../parser')

console.log('TEST 1 - Func declaration with parameters')
const test1 = parser.parse(`
	program prog1; 
	void func myFunc1 (var <- int id1; ->) { }
	main() {}`)
// console.log('--> ' + (test1 ? 'yes :)' : 'no :('))

console.log('\n\nTEST 2 - Func declaration with parameters and vars')
const test2 = parser.parse(`
	program prog1; 
    var <- float y[2]; ->
	void func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { }
	main() {}`)
// console.log('--> ' + (test2 ? 'yes :)' : 'no :('))

console.log('\n\nTEST 3 - Func declarations with parameters and vars')
const test3 = parser.parse(`
	program prog1; 
    var <- float y[2][3]; ->
	void func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { }

    int func myFunc2 (var <- int z; ->)
    var <- char k; ->
    { }
	main() {}`)
// console.log('--> ' + (test3 ? 'yes :)' : 'no :('))

console.log(
	'\n\nERROR TEST 4 - Func declaration with duplicated parameters and vars'
)
const program4 = `
    program prog1; 
    var <- float y[2]; ->
    void func myFunc1 (var <- int x; ->)
    var <- float x; ->
    { }
    main() {}`
// const test4 = parser.parse(program4)
// console.log('--> ' + (test4 ? 'yes :)' : 'no :('))

console.log('\n\nERROR TEST 5 - Duplicated func declaration and vars')
const program5 = `
    program prog1;
    var <- float y[2]; ->

    void func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { }

    void func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { }

    main() {}`
// const test5 = parser.parse(program5)
// console.log('--> ' + (test5 ? 'yes :)' : 'no :('))

console.log(
	'\n\nERROR TEST 6 - Duplicated func declaration with dif. return type and vars'
)
const program6 = `
    program prog1;
    var <- float y[2]; ->

    void func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { }

    float func myFunc1 (var <- float y; ->)
    var <- float z; ->
    { }

    main() {}`
// const test6 = parser.parse(program6)
// console.log('--> ' + (test6 ? 'yes :)' : 'no :('))

console.log('\n\nERROR TEST 7 - Function with compound return type')
const program7 = `
    program prog1;
    var <- float y[2]; ->

    Person func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { }

    main() {}`
// const test7 = parser.parse(program7)
// console.log('--> ' + (test7 ? 'yes :)' : 'no :('))
// Syntax catches this error

console.log('\n\nTEST 8 - Void func with parameters and variables')
const test8 = parser.parse(`
	program prog1; 
    var <- int x, y; ->

    void func surprise (var <- int z; ->)
    var <- int k; ->
    {
        print("inside void function");
        print("setting global y var");
        y = y * 2;
        print("setting local k var");
        k = z + y + 3;
        print("end surprise");
    }

	main() {
        x = 5;
        y = 6;
        surprise(x);
        print("end program");
    }`)
console.log('--> ' + (test8 ? 'yes :)' : 'no :('))

console.log('\n\nTEST 9 - Two void funcs with parameters and variables')
const test9 = parser.parse(`
	program prog1; 
    var <- int x, y; float a; ->

    void func surprise1(var <- int z; ->)
    var <- int k; ->
    {
        print("inside surprise1 function");
        print("end surprise 1");
    }

    void func surprise2(var <- float z; ->)
    var <- float k; ->
    {
        print("inside surprise2 function");
        print("end surprise 2");
    }

	main() {
        x = 5;
        y = 6;
        surprise1(x);
        surprise2(a);
        print("end program");
    }`)
console.log('--> ' + (test9 ? 'yes :)' : 'no :('))

console.log('\n\nTEST 10 - Int func with parameters and variables')
const test10 = parser.parse(`
	program prog1; 
    var <- int x, y; ->

    int func surprise (var <- int z; ->)
    var <- int k; ->
    {
        print("inside int function");
        print("setting global y var");
        y = y * 2;
        print("setting local k var");
        k = z + y + 3;
        print("returning k");
        return k;
    }

	main() {
        x = 5;
        y = 6;
        x = y;
        x = surprise(1);
        print("end program");
    }`)
console.log('--> ' + (test10 ? 'yes :)' : 'no :('))

console.log('\n\nERROR TEST 11 - Call a function that is not declared')
// const test11 = parser.parse(`
// 	program prog1;
//     var <- int x, y; ->

//     int func superPower (var <- int x; float z; ->)
//     var <- int k; ->
//     {
//         return k;
//     }

// 	main() {
//         x = 5;
//         y = 6;
//         x = y;
//         x = surprise(1);
//         print("end program");
//     }`)
// console.log('--> ' + (test11 ? 'yes :)' : 'no :('))

console.log('\n\nTEST 12 - Void func with multiple parameters')
const test12 = parser.parse(`
	program prog1; 
    var <- int x; float y; ->

    void func surprise (var <- int z; float k; ->)
    {
        k = 9.5;
        z = 4 + 5 - 5;
    }

	main() {
        x = 5;
        y = 6.5;
        surprise(x, y);
        print("end program");
    }`)
console.log('--> ' + (test12 ? 'yes :)' : 'no :('))

console.log('\n\nERROR TEST 13 - Different parameter type')
// const test13 = parser.parse(`
// 	program prog1;
//     var <- int x; char y; ->

//     void func surprise (var <- int z; float k; ->)
//     {
//         k = 9.5;
//         z = 4;
//     }

// 	main() {
//         x = 5;
//         surprise(x, y);
//         print("end program");
//     }`)
// console.log('--> ' + (test13 ? 'yes :)' : 'no :('))

console.log(
	'\n\nERROR TEST 14 - Different parameter size (additional parameter sent)'
)
// const test14 = parser.parse(`
// 	program prog1;
//     var <- int x; float y, z; ->

//     void func surprise (var <- int z; float k; ->)
//     {
//         k = 9.5;
//         z = 4;
//     }

// 	main() {
//         x = 5;
//         y = 5.5;
//         z = 6.5;
//         surprise(x, y, z);
//         print("end program");
//     }`)
// console.log('--> ' + (test14 ? 'yes :)' : 'no :('))

console.log(
	'\n\nERROR TEST 15 - Different parameter size (additional parameter declared)'
)
// const test15 = parser.parse(`
// 	program prog1;
//     var <- int x; float y; ->

//     void func surprise (var <- int z; float k, j; ->)
//     {
//         k = 9.5;
//         z = 4;
//     }

// 	main() {
//         x = 5;
//         y = 5.5;
//         surprise(x, y);
//         print("end program");
//     }`)
// console.log('--> ' + (test15 ? 'yes :)' : 'no :('))
