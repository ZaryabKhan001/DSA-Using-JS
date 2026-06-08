//? LeetCode #3
//? Longest Substring Without Repeating Characters

// Given a string s, find the length of the longest substring without duplicate characters.

//? Example 1:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.

//? Example 2:
// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.

//? Example 3:
// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

var lengthOfLongestSubstring = function (s) {
  let i = 0;
  let j = 0;
  let map = new Map();
  let maxW = 0;
  while (j < s.length) {
    if (map.has(s[j]) && map.get(s[j]) >= i) {
      i = map.get(s[j]) + 1;
    }
    map.set(s[j], j);
    maxW = Math.max(maxW, j - i + 1);
    j++;
  }
  return maxW;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1) or maybe O(n)
