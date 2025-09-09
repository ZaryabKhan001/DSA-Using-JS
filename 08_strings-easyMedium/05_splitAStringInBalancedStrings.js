//? LeetCode #1221
//? Split a String in Balanced Strings

// Balanced strings are those that have an equal quantity of 'L' and 'R' characters.
// Given a balanced string s, split it into some number of substrings such that:
// Each substring is balanced.
// Return the maximum number of balanced strings you can obtain.

//? Example 1:
// Input: s = "RLRRLLRLRL"
// Output: 4
// Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.

//? Example 2:
// Input: s = "RLRRRLLRLL"
// Output: 2
// Explanation: s can be split into "RL", "RRRLLRLL", each substring contains same number of 'L' and 'R'.
// Note that s cannot be split into "RL", "RR", "RL", "LR", "LL", because the 2nd and 5th substrings are not balanced.

//? Example 3:
// Input: s = "LLLLRRRR"
// Output: 1
// Explanation: s can be split into "LLLLRRRR".

//? Approach 1:
// use l and r pointers to calculate L and R.
// wen both becomes equal it means now we have balance string
// simple update count and return at last

var balancedStringSplit = function (s) {
  let l = 0;
  let r = 0;
  let count = 0;
  for (let i = 0; i < s.length; i = i + 1) {
    if (s[i] === "L") {
      l = l + 1;
    } else {
      r = r + 1;
    }
    if (l === r) {
      count = count + 1;
      l = 0;
      r = 0;
    }
  }
  return count;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)

//? Approach 2:
// use temp pointer, traverse s
// increment it when found L, and decrement it when found R
// when temp becomes zero, it means we have got the balanced string

var balancedStringSplit = function (s) {
  let temp = 0;
  let count = 0;
  for (let i = 0; i < s.length; i = i + 1) {
    if (s[i] === "L") {
      temp++;
    } else {
      temp--;
    }
    if (temp === 0) {
      count = count + 1;
    }
  }
  return count;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
