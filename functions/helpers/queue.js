// Queue
// Queue data structure declaration
// Inputs: does not receive parameters
// Output: the Queue data structure
// Used by: semantics.js

class Queue {
	constructor() {
		this.data = []
		this.count = 0
	}

	// enqueue
	push(element) {
		this.data[this.count] = element
		this.count++
	}

	// dequeue
	pop() {
		if (this.count != 0) {
			this.count--
			return this.data.shift()
		}
	}

	front() {
		if (this.count != 0) {
			return this.data[0]
		}
	}

	get(index) {
		return this.data[index]
	}
}

module.exports = Queue
