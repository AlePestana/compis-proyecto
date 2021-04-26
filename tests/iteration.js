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

console.log('\nTEST 2 - Simple while (false)')
const test2 = parser.parse(`
	program prog1; 
    var <- int x, y; ->

	main() {
        x = 5;
        y = 6;
        while(y < x) {
            print("inside while");
            y = 5;
        }
        print("outside while");
    }`)
console.log('--> ' + (test2 ? 'yes :)' : 'no :('))

console.log('\nTEST 3 - Simple while with complex condition (false)')
const test3 = parser.parse(`
	program prog1; 
    var <- int x, y; ->

	main() {
        x = 5;
        y = 6;
        while(y > x & 7 < 8) {
            print("inside while");
            y = 5;
        }
        print("outside while");
    }`)
console.log('--> ' + (test3 ? 'yes :)' : 'no :('))

console.log('\nTEST 4 - Simple for loop')
const test4 = parser.parse(`
	program prog1; 
    var <- int i; ->

	main() {
        for (i = 1 until 10) {
            print("inside for");
        }
        print("outside for");
    }`)
console.log('--> ' + (test4 ? 'yes :)' : 'no :('))

console.log('\nTEST 5 - Nested for loop')
const test5 = parser.parse(`
	program prog1; 
    var <- int i, j; ->

	main() {
        for (i = 1 until 10) {
            print("inside first for");
            for (j = 1 until  10)  {
                print("inside second for");
            }
            print("outside second for");
        }
        print("outside first for");
    }`)
console.log('--> ' + (test5 ? 'yes :)' : 'no :('))
console.log('\nTEST 6 - Nested while (true)')
const test6 = parser.parse(`
	program prog1; 
    var <- int x, y; ->

	main() {
        x = 5;
        y = 6;
        while(y > x) {
            print("inside while");
            y = 5;
            while(y == x) {
                print("inside second while");
            }
            print("outside second while");
        }
        print("outside while");
    }`)
console.log('--> ' + (test6 ? 'yes :)' : 'no :('))

console.log('\nTEST 7 - Nested if else inside while (true)')
const test7 = parser.parse(`
	program prog1; 
    var <- int x, y; ->

	main() {
        x = 5;
        y = 6;
        while(y > x) {
            print("inside while");
            y = 5;
            if(x == y) {
                print("inside if");
            } else {
                print("inside else");
            }
            print("outside if else");
        }
        print("outside while");
    }`)
console.log('--> ' + (test7 ? 'yes :)' : 'no :('))

console.log('\nTEST 8 - Nested if else inside while (true)')
const test8 = parser.parse(`
	program prog1; 
    var <- int x, y; ->

	main() {
        x = 5;
        y = 6;
        while(y > x) {
            print("inside while");
            y = 5;
            if(x == y) {
                print("inside if");
                while(y == x) {
                    print("inside second while");
                    y = 7;
                }
            } else {
                print("inside else");
            }
            print("outside if else");
        }
        print("outside while");
    }`)
console.log('--> ' + (test8 ? 'yes :)' : 'no :('))
