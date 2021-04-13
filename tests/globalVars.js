
const parser = require('../parser')

console.log('TEST - Global vars')
const test1 = parser.parse(`
	program prog1; 
	var <- int j, x[2][4]; float i[5]; char myChar[3]; ->
	main() {}`)
console.log('--> ' + (test1 ? 'yes :)' : 'no :('))
