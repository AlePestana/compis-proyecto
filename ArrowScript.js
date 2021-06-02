// ArrowScript
// Receives input from user, parses it and executes it on the virtual machine
// Inputs: receives the parser (which includes the semantic actions) and virtual machine
// Output: prints in the console the outputs of the execution of the user input
// Used by: all test files (/tests/*)

const fs = require('fs')
const parser = require('./parser')
const { execute_virtual_machine } = require('./virtual_machine')

// Helper function to await reading input from user
async function readFile(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', function (err, data) {
			if (err) {
				reject(err)
			}
			resolve(data)
		})
	})
}

async function execute() {
	// Check if user wrote filename on command line
	if (process.argv.length < 3) {
		console.log(
			'No file name was provided. Please input the name of the file you want ArrowScript to execute.'
		)
		process.exit(1)
	}

	// Read input from user
	const filename = process.argv[2]
	const input = await readFile(filename)

	const result = parser.parse(input)

	// If parser does not throw any errors, execute virtual machine
	if (result) {
		execute_virtual_machine(virtual_machine_info) // the virtual_machine_info is a global object that stores all the relevant information the vm needs
	}
}

execute()
