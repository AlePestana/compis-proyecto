program AS_Program;

class Person
{
  attributes <-
    int age;
    char name[30];
  ->

  methods <-
    int func one(var <- int x; ->)
    {
      return (age - x);
    }
  ->
}

var <-
  int i, j, p;
  Person student;
->

int func fact(var <- int j; ->) 
var <-
  int i;
->
{
  i = j + (p - j * 2 +  j);
  if (j == 1) {
    return (j);
  }
  else {
    return (j * fact(j - 1));
  }
}

func pelos(var <- int y; ->)
var <-
  int x;
->
{
  read(student.age);
  x = y;
  while(x < 10) {
    print(student.one(x));
    x = x + 1;
  }
}

main()
{
  read(p);
  j = p * 2;
  i = fact(p);
  read(student.name);
  hairs(p);
  for (i = 1 until 10)
  {
    print("HelloWorld", student.name, fact(student.age));
  }
}
