operations = {
  '+': 1,
  '-': 2,
  '*': 3,
  '/': 4,
  '<': 5,
  '>': 6,
  '==': 7,
  '!=': 8,
  '&': 9,
  '|': 10,
  '=': 11,
  'print': 12,
  'read': 13,
  'gotoV': 14,
  'gotoF': 15,
  'goto': 16,
}
get_opcode = (operation) => {
  return operations[operation]
}

module.exports = get_opcode
