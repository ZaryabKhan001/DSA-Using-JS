//? LeetCode #191
//? Number of 1 Bits

// Given a positive integer n, write a function that returns the number of set bits in its binary representation (also known as the Hamming weight).

//? Example 1:
// Input: n = 11
// Output: 3

// Explanation:
// The input binary string 1011 has a total of three set bits.

//? Example 2:
// Input: n = 128
// Output: 1

// Explanation:
// The input binary string 10000000 has a total of one set bit.

//? Example 3:
// Input: n = 2147483645
// Output: 30

// Explanation:
// The input binary string 1111111111111111111111111111101 has a total of thirty set bits.

//? Constraints:
// 1 <= n <= 231 - 1
// Follow up: If this function is called many times, how would you optimize it?

//? Thought Proces:
//* Simple Process:
// Divide the number by 2.
// Remainder tells us the last binary bit.
// If remainder is 1, increase our count.
// Divide the number by 2 to remove the last bit.
// Repeat until number becomes 0.

//? Code:
var hammingWeight = function (n) {
  let bits = 0;

  while (n > 0) {
    let bit = n % 2;

    if (bit === 1) {
      bits++;
    }

    n = Math.floor(n / 2);
  }

  return bits;
};

//? Time Complexity: O(log n)
//? Space Complexity: O(1)

//? Thought Process:
// n & (n - 1) removes the rightmost set bit (1).
// Keep removing the rightmost set bit.
// Every time we remove a set bit, increase our count.
// When n becomes 0, all set bits are removed.
// Return the total count.

// This is Brian Kernighan's Algorithm.

var hammingWeight = function (n) {
  let bits = 0;

  while (n > 0) {
    bits++;

    n = n & (n - 1);
  }

  return bits;
};

//? Time Complexity: O(k)
//? Space Complexity: O(1)
