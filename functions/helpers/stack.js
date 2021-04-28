// Stack
// Stack data structure declaration
// Inputs: does not receive parameters
// Output: the Stack data structure
// Used by: semantics.js

class Stack {
	constructor() {
		this.data = []
		this.count = 0
	}

	push(element) {
		this.data.push(element)
		this.count++
	}

	pop() {
		if (this.count != 0) {
			// check if there's actually an element
			this.count--
			return this.data.pop()
		}
	}

	top() {
		return this.data[this.count - 1]
	}
}

module.exports = Stack
