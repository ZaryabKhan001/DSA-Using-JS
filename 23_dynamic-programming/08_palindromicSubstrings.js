//? LeetCode #647
//? Palindromic Substrings

// Given a string s, return the number of palindromic substrings in it.

// A string is a palindrome when it reads the same backward as forward.

// A substring is a contiguous sequence of characters within the string.

//? Example 1:
// Input: s = "abc"
// Output: 3
// Explanation: Three palindromic strings: "a", "b", "c".

//? Example 2:
// Input: s = "aaa"
// Output: 6
// Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

//? Approach:
// A 2D DP table dp[i][j] is used, where dp[i][j] = true if substring s[i..j] is a palindrome.
// All single characters (s[i]) are palindromes → mark dp[i][i] = true.
// Check substrings of length 2 → if two consecutive characters are equal, mark them as palindromes.
// For substrings of length ≥ 3 → a substring s[i..j] is palindrome if
// The first and last characters match (s[i] == s[j]).
// The inner substring s[i+1..j-1] is palindrome (dp[i+1][j-1] = true).
// Count all palindromic substrings while filling the table.
// Return the total count of palindromic substrings.

//? Code:
var countSubstrings = function (s) {
  let n = s.length;
  let dp = Array.from({ length: n }, () => Array(n).fill(null));
  let ans = 0;

  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
    ++ans;
    if (i < n - 1 && s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      ++ans;
    }
  }
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      let j = i + len - 1;
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        ++ans;
      }
    }
  }
  return ans;
};

//? Time Complexity: O(n^2)
//? Space Complexity: O(n^2)
