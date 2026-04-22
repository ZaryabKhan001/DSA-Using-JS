//? LeetCode #686
//? Repeated String Match

// Given two strings a and b, return the minimum number of times you should repeat string a so that string b is a substring of it. If it is impossible for b​​​​​​ to be a substring of a after repeating it, return -1.

// Notice: string "abc" repeated 0 times is "", repeated 1 time is "abc" and repeated 2 times is "abcabc".

//? Example 1:
// Input: a = "abcd", b = "cdabcdab"
// Output: 3
// Explanation: We return 3 because by repeating a three times "abcdabcdabcd", b is a substring of it.

//? Example 2:
// Input: a = "a", b = "aa"
// Output: 2

//? Constraints:
// 1 <= a.length, b.length <= 104
// a and b consist of lowercase English letters.

//? Approach:
// Start with string `a` and keep repeating it until its length becomes at least equal to `b`.
// Track how many times you repeat `a` using a counter.
// Once the length condition is met, check if `b` is a substring.
// If not found, append `a` one more time and check again (to handle overlap cases).
// If still not found, return `-1`.

//? Code:
var repeatedStringMatch = function (a, b) {
  let count = 1;
  let text = a;

  while (text.length < b.length) {
    text = text + a;
    count++;
  }

  if (text.includes(b)) return count;

  text = text + a;
  count++;
  if (text.includes(b)) return count;

  return -1;
};

//? Time Complexity: O(n * m) where n is the length of string `a` and m is the length of string `b` (in the worst case, we may check for substring twice).
//? Space Complexity: O(m) for the repeated string `text` which can grow up to the length of `b` plus one repetition of `a`.
