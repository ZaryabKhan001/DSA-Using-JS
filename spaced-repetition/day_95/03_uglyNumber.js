//? LeetCode #263
//? Ugly Number

// An ugly number is a positive integer which does not have a prime factor other than 2, 3, and 5.

// Given an integer n, return true if n is an ugly number.

//? Example 1:
// Input: n = 6
// Output: true
// Explanation: 6 = 2 × 3

//? Example 2:
// Input: n = 1
// Output: true
// Explanation: 1 has no prime factors.

//? Example 3:
// Input: n = 14
// Output: false
// Explanation: 14 is not ugly since it includes the prime factor 7.

//? Constraints:
// -231 <= n <= 231 - 1

//? Thpught Process:
// Very simple problem, we just need to check if the number is divisible by 2, 3, or 5. If it is, we divide it by that number and continue until we reach 1. If we reach a number that is not divisible by 2, 3, or 5, then it is not an ugly number. 

//? Code:
var isUgly = function (n) {
    if (n <= 0) {
        return false;
    }

    while (n % 2 === 0) {
        n = n / 2;
    };

    while (n % 3 === 0) {
        n = n / 3;
    };

    while (n % 5 === 0) {
        n = n / 5;
    };

    return n === 1;
};

//? Time Complexity: O(log2 n) + O(log3 n) + O(log5 n) - The while loops will run until n is reduced to 1, and the number of iterations is proportional to the logarithm of n.
//? Space Complexity: O(1) - The algorithm uses a constant amount of space regardless of the input size.