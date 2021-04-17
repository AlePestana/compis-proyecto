// Func tests

const parser = require('../parser')

console.log('TEST 1 - Func declaration with parameters')
const test1 = parser.parse(`
	program prog1; 
	void func myFunc1 (var <- int id1; ->) { }
	main() {}`)
console.log('--> ' + (test1 ? 'yes :)' : 'no :('))

console.log('\n\nTEST 2 - Func declaration with parameters and vars')
const test2 = parser.parse(`
	program prog1; 
    var <- float y[2]; ->
	void func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { }
	main() {}`)
console.log('--> ' + (test2 ? 'yes :)' : 'no :('))

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
console.log('--> ' + (test3 ? 'yes :)' : 'no :('))

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
