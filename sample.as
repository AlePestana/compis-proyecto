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

int func fact(var <- int x; ->) 
var <-
  int y;
->
{
  y = x + (p - x * 2 +  j);
  if (x == 1) {
    return (x);
  }
  else {
    return (x * fact(x - 1));
  }
}

void func pelos(var <- int z; ->)
var <-
  int k;
->
{
  read(student.age);
  k = z;
  while(k < 10) {
    print(student.one(k));
    k = k + 1;
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
