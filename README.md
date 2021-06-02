# ArrowScript

## Authors

María Alejandra Pestana Viso A00824367
Armando Roque Villasana A01138717

## Objective

Compiler's class final project


AS_Syntax_Diagrams in https://lucid.app/lucidchart/89702a55-72f8-44ad-88f8-5bdccaf2084a/view?page=0_0#

AS_Documentation in https://docs.google.com/document/d/1jp9XdFYVZX3s2JJBVLnCjyrrhKkWSDo-thGA6Bn1scY/edit?usp=sharing

AS_Demo_Video in https://drive.google.com/drive/folders/1h6GLuofDwk_ip7JT_6Mz-Sv1rirtXh3K

***
## ArrowScript User Manual
### →Script - Language definition

Comments are indicated by <— —>

#### General language structure

The general program structure of ArrowScript is of the following:

```jsx
program ProgName;

<class declarations>
<global vars>
<function declarations>

<-- comments -->

main() 
{
	<statements>
}
```

Most importantly, we have variable declarations (which can be local or global)

```jsx
var <-
	<type> ids;
	<type> ids; 
	[...]
->
```

→ For the type, we accept either:

```jsx
int | float | char | ClassName
```

→ For the ids we accept a list of id separated by commas

→ For each id

- Can have 1 or 2 dimensions
- Must start with lower case letter, followed by letters (lower and capital) and numbers
- Should be written in camelCase

→ Examples:

```jsx
Person id1, id2;   /-> two objects of the Person class
int id3, id4[2];   /-> a single-valued variable and an array of size 2
float id5[3][5];   /-> matrix of 3 rows and 5 columns
```

→ Multi-dimensional structures (arrays and matrices) can only be declared with *int_cte* (integer constants) but they can be indexed or calles using variables (see below)

##### Class declarations (0-n)

A basic class declaration (0-n) looks like the following:

```jsx
class ClassName
{
	attributes 
		<vars>

	methods <- 
		<funcs>
	->
}
```

→ All attributes and methods are public

→ For each ClassName

- Must start with capital case letter, followed by letters (lower and capital) and numbers
- Should be CamelCase only

##### Function declarations (0-n)

Function declarations (0-n) have the form:

```jsx
<return_type> func funcName( <params> )
<vars>
{
	<statements>
}
```

→ They support recursion

→ A funcName

- Must start with lower case letter, followed by letters (lower and capital) and numbers
- Should be camelCase only

→ The vars have the same format specified in Variable declarations

→ For the returnType we accept any of:

```jsx
int | float | char | void
```

→ For the params

- Have same format as <vars>
- Only provide variables with initial values

#### Statements

The basic piece of the language consists of statements, which can be of several types.

##### Assignment

An assignment statement saves the result of the expression in a var’s memory.

```jsx
<var> = <expression>;
```

The expression's value can come from calling a function or method that returns a value.

```jsx
<var> = funcName( <params> ) <expression>;

<var> = objectName.funcName( <params> ) <expression>;
```

→ The var being assigned to can be any of the following:

```jsx
varName | varName[2] | varName[n][m] |          
objectName.attribute
```

→ The params that a function or method receives can be:

- A list of param separated by commas, where each param is an expression.

##### Functions

**Calling void functions**

A function call can look like the following (one is a function and the other one is a method):

```jsx
funcName( <params> );

objectName.funcName( <params> );
```

→ For the params that a function receives we can have:

- A list of param separated by commas, where each param is an expression

**As long as the expression resolved to the specified variable type, then it is accepted*

##### I/O

**Input (Read)**

ArrowScript can read from the console and store values to variables using the **read** statement.

```jsx
read(<varNames>);
```

→ For varNames

- A list of varName separated by commas
- For each varName we can accept any of:

```jsx
varName | varName[2] | varName[n][m] |          
objectName.attribute
```

**Output (Write)**

Values can also be printed to the standard output using the **print** statement

```jsx
read(<varNames>);
```

→ For the outputVars we can have

- A list of outputVar separated by commas, which can be any of:

```jsx
string_cte 

<expression>

<varName>
```

→ string_cte consist of:

- Letters, digits, and spaces (tab, newline, or whitespace) enclosed by **" "**

→ For varName we can have any of:

```jsx
varName | varName[2] | varName[n][m] |          
objectName.attribute
```

##### Control *statements*

We can control the execution flow in the form of **if...else** statements:

```jsx
if(<expression>) 
{
	<statements>
}
else
{
	<statements>
}
```

##### Iteration *statements*

A key feature is the ability to iterate over a certain part of code.

**While loop**

The most general way to do this is with a *traditional* **while** loop.

```jsx
while(<expression>)
{
	<statements>
}
```

→ Repeat *statements* while expression evaluates to true

**For loop**

Or we can iterate a determined number of times with a **for until** loop

```jsx
for(<numericAssignment> until <expression>)
{
	<statements>
}
```

→ Repeat *statements* while expression evaluates to true

→ Adds 1 to the variable inside numericAssignment on each iteration

→ For numericAssignment we have a statement with the following form:

```jsx
<numericAssignment> = <numericExpression>
```

→ For numericVarName we accept:

- Any <varName> that is of <numericType>

→ For numericExpression we accept:

- Any <expression> that returns or evaluates to a number of <numericType>

→ For numericType we accept:

```jsx
int
```

##### Return statement

A function or method can return a value to its calling context with the **return** statement

```jsx
return <expression>;
```

→ The *return* statement can only be used inside functions that have a return type other than *void*.

##### Expressions

In ArrowScript, traditional expressions like those in C and Java are accepted.

An expression can contain:

- Arithmetic operators, which are:

    ```jsx
    + | - | * | /
    ```

- Relational operators, which are:

    ```jsx
    > | < | == | !=
    ```

- Logical operators, which are:

    ```jsx
    & | |
    ```

→ And the operands can be any varName

→ So we accept any of:

```jsx
varName | varName[2] | varName[n][m] |          
objectName.attribute
```

#### → Sample Program

Finally, a sample program looks like the following:

```jsx
<-- Example with two classes -->
program personAnimalExample; 
 
<-- Declaring the Person class -->
class Person {
    attributes <- 
        int age; 
        float height; 
        char initial;
    ->
    methods <- 
        int func getAge()
        { 
            return age;
        }
 
        float func getHeight()
        { 
            return height * 100;
        }
    ->
}
 
<-- Declaring the Animal class -->
class Animal {
    attributes <- 
        char initial; 
        int years; 
    ->
    methods <- ->
}
 
var <- Person person1; Animal animal1; int hasDog; ->
 
<-- Function to read the attributes of the Person class -->
void func rdPerson()
{
    print("Input the initial of the person");
    read(person1.initial);
    print("Input the age of the person");
    read(person1.age);
    print("Input the height of the person in meters");
    read(person1.height);
}
 
<-- Function to read the attributes of the Animal class -->
void func rdAnimal()
{
    print("Input the initial of the animal");
    read(animal1.initial);
    print("Input the number of years");
    read(animal1.years);
}
 
<-- Function that calculates the factorial of a number -->
int func factorial (var <- int num; ->)
var <- int result; ->
{
    result = num;
 
    <-- base case -->
    if (num == 0 | num == 1) {
      return 1;
    } 
    
    while(num > 1) {
        num = num - 1;
        result = result * num;
    }
    return result;
}
 
main() {
    rdPerson();
    print("Looks like", person1.initial, "has the following attributes");
    print("age", person1.getAge());
    print("height in cm", person1.getHeight());
    print("This person owns a dog");
    print("Input 1 for yes or 0 for no");
    read(hasDog);
 
    if(hasDog) {
        rdAnimal();
        print("Your dog is likely going to last", factorial(animal1.years), "years");
    }else {
        print("You should pet a dog");
    }
```

***
### Changelog
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

##### 8th and Final delivery
| Files changed                      |                                         Functionalities delivered |
| :--------------------------------- | ----------------------------------------------------------------: |
| functions/helpers/memory.js        |               Change memory to arrays and add support for objects |
| functions/semantics.js             |                     Functions for classes definitions and objects |
| functions/virtualMemory.js         |                                         Add addresses for objects |
| inputs/arrays/*                    |                       Add test programs using arrays and matrices |
| inputs/classes/*                   |                       Add test programs using classes and objects |
| inputs/examples/*                  |                         Add test programs for required test cases |
| inputs/funcs/*                     |                              Add test programs that use functions |
| inputs/linear_statements/*         |                      Add test programs that use linear statements |
| inputs/statements/*                |                     Add test programs that use general statements |
| parser.js                          |  Add semantic actions to rules for classes calls and declarations |
| tests/*                            |                         Add tests for all requirements test cases |
| virtual_machine.js                 |                     Execute code for arrays/matrices, and objects |
