//? Two ways to implement Dynamic Programming:

//? 1. Bottom-Up (Tabulation): This approach uses iteration to solve the problem.

//? 2. Top-Down (Memoization): This approach uses recursion along with memoization.>

//? Top-Down Approach

// The image with fib(6) demonstrates the Top-Down approach using recursion and memoization.

// Where should we store the values?

// We can store them in an array, map, object, or other data structures. Fetching data from a map or object is generally very fast.

// Now, let’s solve the Fibonacci number problem using the Top-Down approach.

//? Problem Statement
// The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

// F(0) = 0, F(1) = 1 F(n) = F(n - 1) + F(n - 2), for n > 1.

// Given n, calculate F(n).

//? Code:

//             let store = {}
//             var fib = function(n) {
//                 if(n <= 1) {
//                     return n;
//                 }
//                 if(!store[n]){
//                     store[n] = fib(n - 1) + fib(n - 2);
//                 }
//                 return store[n];
//             };

//? Bottom Up Approach
// This approach uses iteration.

// E.g: Fibonacci series: 0, 1, 1, 2, 3, 5, 8, 13,. . .

// When we build the solution in this way, it is called the Bottom-Up approach.
// Basically, we move from 0 to n (instead of n to 0, which we use in the Top-Down recursive approach). For iteration, we typically use loops such as for or while.
// Problem Statement
// The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

// Fib(i) = fib(i-1) + fib(i-2)

//? Code:
//     var fib = function(n) {
//         let dp = [0, 1];
//         for(let i=2; i<=n; i++){
//             dp[i] = dp[i-1] + dp[i-2];
//         }
//         return dp[n];
//     };

// This approach is known as Bottom-Up.
