//? LeetCode #509
//? Fibonacci Number

// The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

// F(0) = 0, F(1) = 1
// F(n) = F(n - 1) + F(n - 2), for n > 1.
// Given n, calculate F(n).

// Example 1:

// Input: n = 2
// Output: 1
// Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

//? Without Memoization

// var fib = function (n) {
//   if (n <= 1) return n;
//   return fib(n - 1) + fib(n - 2);
// };

// console.log(fib(5));

//? Time Complexity = O(2^n)
//? Space Complexity = O(1)

//* So bad time complexity. We have two options to improve it.
//* 1: Memoization
//* 2: Dynamic Programming

//? Memoization

// let fibSeries = { 0: 0, 1: 1 };
// var fib = (function () {
//   return function calculateFib(n) {
//     if (fibSeries[n] != undefined) return fibSeries[n];
//     return (fibSeries[n] = fib(n - 1) + fib(n - 2));
//   };
// })();

// console.log(fib(5));

//* Putting fib series object in global scope is so bad. So we use closure.

var fib = (function () {
  let fibSeries = { 0: 0, 1: 1 };
  return function calculateFib(n) {
    if (fibSeries[n] != undefined) return fibSeries[n];
    return (fibSeries[n] = fib(n - 1) + fib(n - 2));
  };
})();

console.log(fib(5));

//? Time Complexity = O(n)
//? Space Complexity = O(1)
