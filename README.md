# ArrowScript

### Authors

María Alejandra Pestana Viso A00824367
Armando Roque Villasana A01138717

### Objective

Compiler's class final project

### Changelog

AS_Syntax_Diagrams in https://lucid.app/lucidchart/89702a55-72f8-44ad-88f8-5bdccaf2084a/view?page=0_0#

AS_Documentation in https://docs.google.com/document/d/1jp9XdFYVZX3s2JJBVLnCjyrrhKkWSDo-thGA6Bn1scY/edit?usp=sharing

##### 1st delivery

| Files changed          |                           Functionalities delivered |
| :--------------------- | --------------------------------------------------: |
| Package.json           |                                      Project set up |
| parser.js              |                          Lexer and scanner in Jison |
| parser.js              |                                        Syntax tests |
| README.md              |                   Project description and changelog |
| sample.as              |                                     Example program |
| AS_Language_Definition |                     ArrowScript language definition |
| AS_Tokens&Grammar      | ArrowScript tokens and grammar with syntax diagrams |
| AS_Syntax_Diagrams     |                         ArrowScript syntax diagrams |

##### 2nd delivery

| Files changed          |                                        Functionalities delivered |
| :--------------------- | ---------------------------------------------------------------: |
| functions/semantics.js |                        Global, var and class directory functions |
| parser.js              |                                    Add semantic actions to rules |
| tests/all.js           |                                   Unify all tests in single file |
| tests/classes.js       |                             Class tests for new semantic actions |
| tests/funcs.js         |                             Funcs tests for new semantic actions |
| tests/globalVars.js    |                       Global vars tests for new semantic actions |
| tests/syntax.js        |                            Separate syntax tests in another file |
| AS_Semantic_Rules      | ArrowScript semantic rules (operator precedence & type matching) |
| AS_Syntax_Diagrams     |                               Update ArrowScript syntax diagrams |

##### 3rd delivery

| Files changed              |                        Functionalities delivered |
| :------------------------- | -----------------------------------------------: |
| parser.js                  |    Add semantic actions for expressions to rules |
| functions/semantics.js     |  Functions for expressions and linear statements |
| functions/cube.js          |                             Create semantic cube |
| functions/helpers/queue.js |                      Create queue data structure |
| functions/helpers/stack.js |                      Create stack data structure |
| tests/expressions.js       |       Expressions tests for new semantic actions |
| tests/linearStmts.js       | Linear statements tests for new semantic actions |
| tests/all.js               |                                 Import new tests |
| AS_Semantic_Rules          |  Update ArrowScript semantic rules for int logic |
| AS_Syntax_Diagrams         |               Update ArrowScript syntax diagrams |
| AS_Documentation           |           Start ArrowScript formal documentation |

##### 4th delivery

| Files changed          |                                           Functionalities delivered |
| :--------------------- | ------------------------------------------------------------------: |
| parser.js              |             Add semantic actions for control and iteration to rules |
| functions/semantics.js | Functions for control (if-else) and iteration (while and for loops) |
| tests/control.js       |                              Control tests for new semantic actions |
| tests/iteration.js     |                            Iteration tests for new semantic actions |
| tests/all.js           |                                                    Import new tests |
| AS_Syntax_Diagrams     |                                  Update ArrowScript syntax diagrams |
| AS_Documentation       |                             Update ArrowScript formal documentation |

##### 5th delivery

| Files changed                      |                                         Functionalities delivered |
| :--------------------------------- | ----------------------------------------------------------------: |
| parser.js                          |     Add semantic actions to rules for func calls and declarations |
| functions/semantics.js             | Functions for func calls and declarations (both void and nonvoid) |
| tests/funcs.js                     |                       Update funcs tests for new semantic actions |
| tests/classes.js                   |                                         Fix failing classes tests |
| functions/virtualMemory.js         |             Specify virtual memory addresses and access functions |
| functions/opcodes.js               |                          Specify operation opcodes used by the VM |
| functions/debug/reverse_opcodes.js |     Reverse the numeric opcode to string representation for debug |
| AS_Syntax_Diagrams                 |                                Update ArrowScript syntax diagrams |
| AS_Documentation                   |                           Update ArrowScript formal documentation |

##### 6th delivery

| Files changed                      |                                         Functionalities delivered |
| :--------------------------------- | ----------------------------------------------------------------: |
| ArrowScript.js                     |       Receive input from user, parse it and start execution in VM |
| virtual_machine.js                 |     Start working on virtual machine to execute intermediate code |
| parser.js                          |     Add semantic actions to rules for func calls and declarations |
| functions/semantics.js             | Functions for func calls and declarations (both void and nonvoid) |
| tests/funcs.js                     |                       Update funcs tests for new semantic actions |
| functions/virtualMemory.js         |                            Add methods for estimating memory size |
| functions/opcodes.js               |                       Specify operation opcodes used by functions |
| functions/debug/reverse_opcodes.js |     Reverse the numeric opcode to string representation for debug |
| input.txt                          |                                    Sample user input program file |
| AS_Syntax_Diagrams                 |                                Update ArrowScript syntax diagrams |
| AS_Documentation                   |                           Update ArrowScript formal documentation |

##### 7th delivery
| Files changed                      |                                         Functionalities delivered |
| :--------------------------------- | ----------------------------------------------------------------: |
| functions/debug/reverse_opcodes.js |     Reverse the numeric opcode to string representation for debug |
| functions/helpers/memory.js        |                                        Define class for VM memory |
| functions/helpers/queue.js         |                                                    Add get method |
| functions/opcodes.js               |                          Specify operation opcodes used by arrays |
| functions/semantics.js             |               Functions for arrays/matrices calls and definitions |
| functions/virtualMemory.js         |                                        Add addresses for pointers |
| inputs/arrays.txt                  |                                     Add test program using arrays |
| inputs/conditionals.txt            |                               Add test program using conditionals |
| inputs/expressions.txt             |                      Add test program using different expressions |
| inputs/fibonacci.txt               |                  Add test program calculating recursive fibonacci |
| inputs/funcs.txt                   |                             Add test program with functions calls |
| inputs/linear_statements.txt       |                           Add test program with linear statements |
| inputs/loops.txt                   |                 Add test program with loop statements (while/for) |
| inputs/recursiveFunc1.txt          |                     Add test program with recursive function call |
| inputs/rel_expressions.txt         |                      Add test program with relational expressions |
| inputs/void_func_stack_overflow.txt|                Add test program with infinite recursive func call |
| parser.js                          |   Add semantic actions to rules for arrays calls and declarations |
| tests/all.js                       |                                  Include array and matrices tests |
| tests/arraysMatrices.js            |                                      Add array and matrices tests |
| tests/expressions.js               |                                          Modify expressions tests |
| tests/funcs.js                     |                                            Modify functions tests |
| virtual_machine.js                 |        Execute intermediate for everything except arrays/matrices |
