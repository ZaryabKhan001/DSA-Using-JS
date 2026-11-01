//? LeetCode #204
//? Count Primes

// Given an integer n, return the number of prime numbers that are strictly less than n.

//? Example 1:
// Input: n = 10
// Output: 4
// Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.

//? Example 2:
// Input: n = 0
// Output: 0

//? Example 3:
// Input: n = 1
// Output: 0

//? Constraints:
// 0 <= n <= 5 * 106

//? Thought Process:
// Simple Approach would be to iterate over from 2 to sqrt(n) and check if n is divisble by any ith value from 2 to sqrt(n). If it is not divisible by any value then it is prime. This would be O(n*sqrt(n)) time complexity.

//? Code:
var countPrimes = function (N) {
  if (N < 2) {
    return 0;
  }

  let primeNumbers = 0;
  for (let n = 2; n < N; n = n + 1) {
    let isPrime = true;

    for (let i = 2; i * i < n; i = i + 1) {
      if (n % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primeNumbers++;
    }
  }

  return primeNumbers;
};

// But this gives us TLE.

//? Better Approach
//* Sieve of Eratosthenes
// Used to count all prime numbers strictly smaller than n.

// 1. Create a boolean array and assume all numbers are prime.
// 2. Mark 0 and 1 as non-prime.
// 3. Start checking from 2.
// 4. If isPrime[i] is true:
//    - Current number is prime, increment primeCount.
//    - Mark all its multiples as non-prime.

// WHY j = i * i AND NOT i * 2?
// Multiples smaller than i * i are already marked
// by smaller prime factors.

// Example: i = 5
// 10, 15, 20 are already marked by 2 and 3.
// 25 (5 * 5) is the first multiple we need to mark.

// Starting from i * i avoids redundant operations.

// WHY j < n?
// We only count numbers strictly smaller than n.

//? Code:
var countPrimes = function (n) {
  if (n <= 2) {
    return 0;
  }

  let isPrime = new Array(n).fill(true);
  let primeCount = 0;

  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i < n; i = i + 1) {
    if (isPrime[i]) {
      primeCount++;

      for (let j = i * i; j < n; j = j + i) {
        isPrime[j] = false;
      }
    }
  }

  return primeCount;
};

//? Time Complexity: O(n * log(log(n)))
//? Space Complexity: O(n)
