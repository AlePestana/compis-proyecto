// Func tests

const parser = require('../parser')

console.log('TEST - Func declaration with parameters')
const test1 = parser.parse(`
	program prog1; 
	void func myFunc1 (var <- int id1; ->) { }
	main() {}`)
console.log('--> ' + (test1 ? 'yes :)' : 'no :('))

console.log('\n\nTEST - Func declaration with parameters and vars')
const test2 = parser.parse(`
	program prog1; 
    var <- float y[2]; ->
	void func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { }
	main() {}`)
console.log('--> ' + (test2 ? 'yes :)' : 'no :('))

console.log('\n\nTEST - Func declarations with parameters and vars')
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

console.log('\n\nTEST - Func declaration with duplicated parameters and vars')
const test4 = parser.parse(`
	program prog1; 
    var <- float y[2]; ->
	void func myFunc1 (var <- int x; ->)
    var <- float x; ->
    { }
	main() {}`)
console.log('--> ' + (test4 ? 'yes :)' : 'no :('))

console.log('\n\nTEST - Duplicated func declaration and vars')
const test5 = parser.parse(`
	program prog1; 
    var <- float y[2]; ->
	
    void func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { }

    void func myFunc1 (var <- int x; ->)
    var <- float y; ->
    { }

	main() {}`)
console.log('--> ' + (test5 ? 'yes :)' : 'no :('))
