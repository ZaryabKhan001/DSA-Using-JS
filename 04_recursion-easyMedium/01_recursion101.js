//? Recursion

//* A function calls itself to solve the smaller version of the same problem.

//? Recursion have two parts
//* 01: Base Case (Condition where function calling stops)
//* 02: Recursive Case (part where function calls itself)

//? Real life example
//* 01: Queue of people
//* 02: Comments thread (Reddit)
//* 03: Organizational Heirarchy

//? Recursion Code examples

//? Infinite Loop (5 => -infinity)

// function fun(nums) {
//     console.log(nums);
//     nums = nums - 1;
//     fun(nums);
// }
// fun(5);

//* Base case is so important to tell recursion where to stop, otherwise it keeps going and causing stack overflow because it becomes infinite loop

//? Finite Loop (5 => 1)

// function fun(nums) {
//     if(nums === 0) return;
//     console.log(nums);
//     nums = nums - 1;
//     fun(nums);
// }
// fun(5);

//? Print n to 1 using recursion
// let n = 10;
// function fun() {
//   if (n === 0) return;
//   console.log(n);
//   n = n - 1;
//   fun(n);
// }
// fun();

//? Print 1 to n using recursion
let n = 10;
function fun(i) {
  if (i > n) return;
  console.log(i);
  i = i + 1;
  fun(i);
}
fun(1);
