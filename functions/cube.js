// Semantic cube

cube = {
  int: {
    int: {
      '+': 'int',
      '-': 'int',
      // and so on
    },
    float: {
      '+': 'int',
      '-': 'float',
    },
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

