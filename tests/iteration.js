// Iteration statements tests

const parser = require('../parser')

console.log('TEST 1 - Simple while (true)')
const test1 = parser.parse(`
	program prog1; 
    var <- int x, y; ->

	main() {
        x = 5;
        y = 6;
        while(y > x) {
            print("inside while");
            y = 5;
        }
        print("outside while");
    }`)
console.log('--> ' + (test1 ? 'yes :)' : 'no :('))
