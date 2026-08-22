//? LeetCode #392
//? Is Subsequence

// Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

// A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

//? Example 1:
// Input: s = "abc", t = "ahbgdc"
// Output: true

//? Example 2:
// Input: s = "axc", t = "ahbgdc"
// Output: false

//? Approach 01:
// Use two pointers i (for string s) and j (for string t).
// Traverse through t using j.
// If characters match (s[i] === t[j]), move i to the next character.
// Always move j
// If i reaches the end of s, it means all characters of s are found in t in order.
// Return true if i === s.length, else false.

var isSubsequence = function (s, t) {
  let i = 0;
  let j = 0;

  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i++;
      j++;
    } else {
      j++;
    }
  }

  if (i === s.length) {
    return true;
  }

  return false;
};

//? Time Complexity = O(n)
//? Space Complexity = O(1)

//? Approach 02:
// Using LCS
// Get LCS of s and t and is lcs is equal to s length. It means t completelyb covers s in a sequence.

var isSubsequence = function (s, t) {
  let n = s.length;
  let m = t.length;
  let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i = i + 1) {
    for (let j = 1; j <= m; j = j + 1) {
      if (s[i - 1] == t[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }

  if (dp[n][m] === n) {
    return true;
  }

  return false;
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)
