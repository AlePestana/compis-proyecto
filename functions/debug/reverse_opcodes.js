// Reverse operation codes
// Reverses the numeric opcode to string representation for debug
// Inputs: does not receive parameters
// Output: get_string_opcode (the function that returns the corresponding numeric opcode for a given opcode)
// Used by: semantics.js
reverse_operations = {
  1: '+',
  2: '-',
  3: '*',
  4: '/',
  5: '<',
  6: '>',
  7: '==',
  8: '!=',
  9: '&',
  10: '|',
  11: '=',
  12: 'print',
  13: 'read',
  14: 'gotoT',
  15: 'gotoF',
  16: 'goto',
}

get_string_opcode = (num_opcode) => {
  return reverse_operations[num_opcode]
}

console.log(get_string_opcode('1'))

module.exports = get_string_opcode
