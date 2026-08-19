//? LeetCode #516 (Longest Palindromic Subsequence)(gfg)
//? Longest Palindromic Subsequence

// Given a string s, find the longest palindromic subsequence's length in s.

// A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

//? Example 1:
// Input: s = "bbbab"
// Output: 4
// Explanation: One possible longest palindromic subsequence is "bbbb".

//? Example 2:
// Input: s = "cbbd"
// Output: 2
// Explanation: One possible longest palindromic subsequence is "bb".

//? Constraints:
// 1 <= s.length <= 1000
// s consists only of lowercase English letters.

//? Thought Process:
// We are given a string and need to find its Longest Palindromic Subsequence (LPS).
// LPS is actually a variation/pattern of the LCS problem.

//? Parent Question:
// LCS => Input: 2 strings, Question: Find LCS, Output: int
// LPS => Input: 1 string, Question: Find LPS, Output: int

//? How?
// We only have one string 'a', but LCS needs two strings.
// So, we create the second string by reversing 'a'.
// Now we have: a and reverse(a).

//? Why does this work?
// A palindrome reads the same from start to end and end to start.
// So, by comparing 'a' with reverse(a), we can find the longest
// sequence that appears in both directions.

// The longest common subsequence between 'a' and reverse(a)
// will be the Longest Palindromic Subsequence of 'a'.

// Therefore:
// LPS(a) = LCS(a, reverse(a))

//? Code:
const lcs = (s1, s2) => {
  let n = s1.length;
  let m = s2.length;

  let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i = i + 1) {
    for (let j = 1; j <= m; j = j + 1) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[n][m];
};

var longestPalindromeSubseq = function (s) {
  return lcs(s, s.split("").reverse().join(""));
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)
