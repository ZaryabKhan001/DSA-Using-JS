//? LeetCode #424
//? Longest Repeating Character Replacement

// You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

// Return the length of the longest substring containing the same letter you can get after performing the above operations.

//? Example 1:
// Input: s = "ABAB", k = 2
// Output: 4
// Explanation: Replace the two 'A's with two 'B's or vice versa.

//? Example 2:
// Input: s = "AABABBA", k = 1
// Output: 4
// Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
// The substring "BBBB" has the longest repeating letters, which is 4.
// There may exists other ways to achieve this answer too.

//? Approach:
// se a sliding window with two pointers i and j to represent the current window.
// Maintain a frequency array map of size 26 for uppercase letters.
// At each step, check if the window is valid:
// A window is valid if total letters - max frequent letter ≤ k (i.e., we can change ≤ k chars to make all same).
// If valid, expand the window (j++), else shrink from left (i++).
// Track the maximum valid window size throughout.

var characterReplacement = function (s, k) {
  let i = 0,
    j = 0;
  let map = Array(26).fill(0);
  map[s.charCodeAt(0) - 65] = 1;
  let maxWindow = 0;
  while (j < s.length) {
    if (isWindowValid(map, k)) {
      maxWindow = Math.max(maxWindow, j - i + 1);
      ++j;
      ++map[s.charCodeAt(j) - 65];
    } else {
      --map[s.charCodeAt(i) - 65];
      ++i;
    }
  }
  return maxWindow;
};
var isWindowValid = function (map, k) {
  let totalCount = 0;
  let maxCount = 0;
  for (let i = 0; i < 26; i++) {
    totalCount += map[i];
    maxCount = Math.max(maxCount, map[i]);
  }
  return totalCount - maxCount <= k;
};

//? Time Complexity: O(26 * n)
//? Space Complexity: O(m)
