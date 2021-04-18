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
    },
  },
  char: {
    int: {
      '+': 'error',
    },
  }
}

