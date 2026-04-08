//? LeetCode #05:
//? Longest Palindromic Substring
// Given a string s, return the longest palindromic substring in s.

//? Example 1:
// Input: s = “babad”
// Output: “bab”
// Explanation: “aba” is also a valid answer.

//? Example 2:
// Input: s = “cbbd”
// Output: “bb”

//? Constraints
// 1 <= s.length <= 1000
// s consist of only digits and English letters.

//? Approach:
// Use Dynamic Programming (DP) to check if a substring s[i...j] is a palindrome.
// Maintain a dp[i][j] table where:
// dp[i][j] = true if substring s[i...j] is a palindrome.
// Base cases:
// Single character substrings (dp[i][i] = true) are palindromes.
// Two-character substrings (s[i] == s[i+1]) are palindromes.
// For substrings of length ≥ 3:
// A substring s[i...j] is a palindrome if s[i] == s[j] and dp[i+1][j-1] is true.
// Track the longest palindrome’s start and end indices while filling DP
// Return the longest palindrome substring using substring (ans[0], ans[1] + 1).

//? Code:
var longestPalindrome = function (s) {
  let n = s.length;
  if (n === 0) return "";
  // dp[i][j] will be true if s[i..j] is a palindrome
  let dp = Array.from({ length: n }, () => Array(n).fill(false));
  let ans = [0, 0];
  // Base cases: length 1 and length 2
  for (let i = 0; i < n; i++) {
    dp[i][i] = true; // single char
    if (i < n - 1 && s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      ans = [i, i + 1];
    }
  }
  // Check lengths from 3 to n
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      let j = i + len - 1;
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        ans = [i, j];
      }
    }
  }
  return s.substring(ans[0], ans[1] + 1);
};

//? Time Complexity: O(n2)
//? Space Complexity: O(n2)
