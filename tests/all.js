// Run all tests
// Calls all tests files that makes it handy to check that new functionalities don't break the existing tests
// Inputs: receives all tests files
// Output: does not return anything (only displays on console the results of the tests)
// Used by: no file uses this (only called by the user on the terminal)

console.log('\n\n--------------------------------------------------------')
console.log('Syntax Tests')
// require('./syntax')

console.log('\n\n--------------------------------------------------------')
console.log('Global Vars Tests')
require('./globalVars')

console.log('\n\n--------------------------------------------------------')
console.log('Funcs Tests')
require('./funcs')

console.log('\n\n--------------------------------------------------------')
console.log('Classes Tests')
require('./classes')

console.log('\n\n--------------------------------------------------------')
console.log('Expressions Tests')
require('./expressions')

console.log('\n\n--------------------------------------------------------')
console.log('Linear Statements Tests')
require('./linearStmts')

console.log('\n\n--------------------------------------------------------')
console.log('Control Tests')
require('./control')

console.log('\n\n--------------------------------------------------------')
console.log('Iteration Tests')
require('./iteration')

console.log('\n\n--------------------------------------------------------')
console.log('Array/Matrices Tests')
require('./arraysMatrices')
