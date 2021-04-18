// Semantic cube

cube = {
  int: {
    int: {
      '+': 'int',
      '-': 'int',
      '*': 'int',
      '/': 'float',
      '>': 'int',
      '<': 'int',
      '==': 'int',
      '!=': 'int',
      '&': 'error',
      '|': 'error',
    },
    float: {
      '+': 'float',
      '-': 'float',
      '*': 'float',
      '/': 'float',
      '>': 'int',
      '<': 'int',
      '==': 'int',
      '!=': 'int',
      '&': 'error',
      '|': 'error',
    },
    char: {
      '+': 'error',
      '-': 'error',
      '*': 'error',
      '/': 'error',
      '>': 'error',
      '<': 'error',
      '==': 'error',
      '!=': 'error',
      '&': 'error',
      '|': 'error',
    }
  },
  float: {
    int: {
      '+': 'float',
      '-': 'float',
      '*': 'float',
      '/': 'float',
      '>': 'int',
      '<': 'int',
      '==': 'int',
      '!=': 'int',
      '&': 'error',
      '|': 'error',
    },
    float: {
      '+': 'float',
      '-': 'float',
      '*': 'float',
      '/': 'float',
      '>': 'int',
      '<': 'int',
      '==': 'int',
      '!=': 'int',
      '&': 'error',
      '|': 'error',
    },
    char: {
      '+': 'error',
      '-': 'error',
      '*': 'error',
      '/': 'error',
      '>': 'error',
      '<': 'error',
      '==': 'error',
      '!=': 'error',
      '&': 'error',
      '|': 'error',
    }
  },
  char: {
    int: {
      '+': 'error',
      '-': 'error',
      '*': 'error',
      '/': 'error',
      '>': 'error',
      '<': 'error',
      '==': 'error',
      '!=': 'error',
      '&': 'error',
      '|': 'error',
    },
    float: {
      '+': 'error',
      '-': 'error',
      '*': 'error',
      '/': 'error',
      '>': 'error',
      '<': 'error',
      '==': 'error',
      '!=': 'error',
      '&': 'error',
      '|': 'error',
    },
    char: {
      '+': 'error',
      '-': 'error',
      '*': 'error',
      '/': 'error',
      '>': 'error',
      '<': 'error',
      '==': 'int',
      '!=': 'int',
      '&': 'error',
      '|': 'error',
    }
  }
}

operationSem = (operand1, operand2, operator) => {
  return cube[operand1][operand2][operator]
}

//console.log(operationSem('int', 'float', '+'));
