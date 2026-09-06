//? LeetCode #264:
//?  Ugly Number II

// An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

// Given an integer n, return the nth ugly number.

//? Example 1:
// Input: n = 10
// Output: 12
// Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.

//? Example 2:
// Input: n = 1
// Output: 1
// Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.

//? Constraints:
// 1 <= n <= 1690

//? Thought Process:
// This problem is very much similar to ugly number 1, but instead of checking if a number is ugly, we need to generate the nth ugly number.
// Brute force approach can be used to generate all ugly numbers up to the nth one.
// So, what i'll do is to loop from 1 to n and check if the number is ugly or not using the isUgly function from the previous problem. If it is, then we will increment a counter and when the counter reaches n, we will return that number.

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

var nthUglyNumber = function (n) {
    let count = 0;
    let i = 1;

    while (count < n) {
        if (isUgly(i)) {
            count++;
        }

        if (count === n) {
            return i;
        }
        i++;
    }
};

//? Time Complexity: O(n * root(n)) - The while loop runs n times and for each iteration, we check if the number is ugly or not which takes O(root(n)) time.
//? Space Complexity: O(1) - The algorithm uses a constant amount of space regardless of the input size.

//* Not a good solution, but it works. The time complexity is not optimal and can be improved. Also get TLE for large inputs.

//* We are going to use Heap.