//? LeetCode #201
//? Bitwise AND of Numbers Range

// Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.

//? Example 1:
// Input: left = 5, right = 7
// Output: 4

//? Example 2:
// Input: left = 0, right = 0
// Output: 0

//? Example 3:
// Input: left = 1, right = 2147483647
// Output: 0

//? Constraints:
// 0 <= left <= right <= 231 - 1

//? Thought Process:
// Brute Force:
// Left sy right tak loop chalao aur and krty jao.

// JavaScript bitwise operators work with 32-bit integers.
// >>  : Signed right shift (preserves sign bit).
// >>> : Unsigned right shift (fills empty bits with 0).
// <<  : Left shift (shifts bits to the left).
// >>> 0 : Converts the result into an unsigned 32-bit integer.
// Signed integers can represent negative numbers.
// Unsigned integers represent only non-negative numbers.
// Bitwise operations can produce negative results due to signed interpretation.
// >>> 0 keeps the same 32 bits but interprets them as unsigned.

//? Code:
var rangeBitwiseAnd = function (left, right) {
  let ans = left;

  for (let i = left + 1; i <= right; i = i + 1) {
    ans = ans & i;
  }

  return ans >>> 0;
};

//* Not a good solution. Because even on smaller inputs it is taking too many time.
// For left = 5; right = 7; this code is doing 2 and operations.
// And for this left  = 1000000000; right = 2000000000; this code ends up doing billions of and operations.

//? Time Complexity: O(right - left)
//? Space Complexity: O(1)

//? Optimization:
// Now, let's talk about it's optimization.
// Instead of checking every number, we can right-shift both numbers until they become equal.

// Main Idea:
// When we AND all numbers from left to right, only the common starting bits
// (common prefix) of left and right stay. All bits after that become 0.

// So the code does 3 things:
// 1. Find the common prefix of left and right.
// 2. Count how many bits we removed to reach it.
// 3. Add back that many zeros at the end.

// Example: left = 5, right = 7
//   5 = 101
//   6 = 110
//   7 = 111
//   AND = 100 = 4

// Dry run:
//   start      -> left = 101, right = 111, shifts = 0 (not equal)
//   shift once -> left = 10,  right = 11,  shifts = 1 (not equal)
//   shift again-> left = 1,   right = 1,   shifts = 2 (equal, stop)
//   Common prefix = 1. We removed 2 bits.
//   1 << 2 = 100 = 4

// Why do other bits become 0?
// Look at the first bit where left and right are different.
// left has 0 there and right has 1 (because right is bigger).
// To count from left to right, this bit must change from 0 to 1 at some point.
// When it changes, all bits on its right side reset to 0 (like 0111 -> 1000).
// So in the range there is:
//   - one number where this bit is 0
//   - one number where all lower bits are 0
// AND with even one 0 gives 0.
// So every bit from that position to the end becomes 0. Only the common prefix stays.

// Why is checking only left and right enough?
// We are not checking the numbers in between. But we don't need to.
// Numbers are in order: left <= every middle number <= right.
// So if left and right start with the same bits, every middle number
// must also start with those same bits.

// Example: left = 5 (101), right = 7 (111). Common prefix = 1.
// All 3-bit numbers starting with 1 make one block:
//   100 = 4  <- smallest with prefix 1
//   101 = 5  <- left
//   110 = 6
//   111 = 7  <- right, largest with prefix 1
// left and right are inside this block, so every number between them is also inside it.
// A middle number can't change the prefix, because then it would go
// outside the block (smaller than left or bigger than right).

// Think of page numbers: if first page is 520 and last page is 529,
// every page in between starts with "52". No need to check each page.

// So the middle numbers still matter, but in a different way:
//   - For the prefix: left and right are enough. Middle numbers share it automatically.
//   - For the bits after the prefix: middle numbers make them flip between 0 and 1,
//     so each of them is 0 in at least one number. That is why they become 0.

// One more example: left = 12 (1100), right = 15 (1111)
// Common prefix = 11, removed bits = 2, answer = 1100 = 12

// Note: >>> is unsigned right shift. For positive numbers it works same as >>.
// In this problem numbers are never negative, so both are fine.

//? Code:
var rangeBitwiseAnd = function (left, right) {
    let shifts = 0;

    while (left !== right) {
        left = left >>> 1;
        right = right >>> 1;

        shifts++;
    }

    return left << shifts;
};

//? Time Complexity: (O(log(text{right})))
// - In every iteration, we divide both numbers by 2 using right shift.
// - We continue until left === right.
// - At most, we need (O(log(text{right}))) shifts.

//? Space Complexity: (O(1))
// - We only use two variables: shifts and the input variables.
// - No extra data structures.
