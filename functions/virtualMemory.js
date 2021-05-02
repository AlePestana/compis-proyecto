// Virtual memory addresses
// Specifies the range of virtual memory addresses that can be assigned during compilation
// Inputs: does not receive parameters
// Output: get_virtual_mem_address (the function to check availability and assign a virtual memory address)
// Used by: semantics.js
virutal_memory_addresses = {
  global: {
    int: {
      perm: {
        start: 5000,
        limit: 7999,
        count: null
      },
      temp: {
        start: 8000,
        limit: 8999,
        count: null
      } 
    },
    float: {
      perm: {
        start: 9000,
        limit: 10999,
        count: null
      },
      temp: {
        start: 11000,
        limit: 11999,
        count: null
      } 
    }
  },
  local: {
    int: {
      perm: {
        start: 12000,
        limit: 13999,
        count: null
      },
      temp: {
        start: 14000,
        limit: 14999,
        count: null
      } 
    },
    float: {
      perm: {
        start: 15000,
        limit: 16999,
        count: null
      },
      temp: {
        start: 17000,
        limit: 17999,
        count: null
      } 
    }
  },
  constant: {
    int: {
      start: 25000,
      limit: 26999,
      count: null
    },
    float: {
      start: 27000,
      limit: 28999,
      count: null
    },
    string: {
      start: 29000,
      limit: 30000,
      count: null
    }
  }
}

// Initialize counters
for (const scope in virutal_memory_addresses) {
  for (const type in virutal_memory_addresses[scope]) {
    if (scope != 'constant') {
      for (const duration in virutal_memory_addresses[scope][type]) {
        virutal_memory_addresses[scope][type][duration].count = virutal_memory_addresses[scope][type][duration].start
      }  
    } else {
      virutal_memory_addresses[scope][type].count = virutal_memory_addresses[scope][type].start
    }
  }
}

// console.log(JSON.stringify(virutal_memory_addresses)) // debug

get_virtual_mem_address = (scope, type, temporary) => {
  
}
