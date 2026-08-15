//? LeetCode #1143
//? Longest Common Subsequence

// Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

// A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

// For example, "ace" is a subsequence of "abcde".
// A common subsequence of two strings is a subsequence that is common to both strings.

//? Example 1:
// Input: text1 = "abcde", text2 = "ace"
// Output: 3
// Explanation: The longest common subsequence is "ace" and its length is 3.

//? Example 2:
// Input: text1 = "abc", text2 = "abc"
// Output: 3
// Explanation: The longest common subsequence is "abc" and its length is 3.

//? Example 3:
// Input: text1 = "abc", text2 = "def"
// Output: 0
// Explanation: There is no such common subsequence, so the result is 0.

//? Constraints:
// 1 <= text1.length, text2.length <= 1000
// text1 and text2 consist of only lowercase English characters.

//? Thought Process:
// For LCS, think like this:
// 1. We compare the last characters of both strings.
// 2. If they match: that character is part of LCS → `1 + solve(n-1, m-1)`.
// 3. If they don't match: we have two choices → remove one character from either string and take the better result:
//    `max(solve(n-1,m), solve(n,m-1))`.
// 4. Base case: if either string becomes empty, LCS is `0`.

// In short:

// > Match → take it.
// > No match → try both possibilities and take the maximum.
// > Empty string → 0.

//? Code:
var longestCommonSubsequence = function (text1, text2) {
  let n = text1.length;
  let m = text2.length;

  const solve = (n, m) => {
    if (n === 0 || m === 0) {
      return 0;
    }

    if (text1[n - 1] === text2[m - 1]) {
      return 1 + solve(n - 1, m - 1);
    } else {
      return Math.max(solve(n - 1, m), solve(n, m - 1));
    }
  };

  return solve(n, m);
};

//? Time Complexity: O(2^min(n, m)) 2 branches are atmost created at eaach step in worst case also we take min becuase new branch creation demands n and m to be greater than zero.
//? Space Complexity: O(n + m)

//? Because this code keeps on solving same sub problems again and again so that is why, we are implementing dp over here.

//* Memoization Code:
var longestCommonSubsequence = function (text1, text2) {
  let n = text1.length;
  let m = text2.length;

  let dp = Array.from({ length: n + 1 }, () =>
    new Array(m + 1).fill(undefined),
  );

  const solve = (n, m) => {
    if (n === 0 || m === 0) {
      return 0;
    }

    if (dp[n][m] !== undefined) {
      return dp[n][m];
    }

    if (text1[n - 1] === text2[m - 1]) {
      return (dp[n][m] = 1 + solve(n - 1, m - 1));
    } else {
      return (dp[n][m] = Math.max(solve(n - 1, m), solve(n, m - 1)));
    }
  };

  return solve(n, m);
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)

//* Bottom Up (Tabulation) Code:
var longestCommonSubsequence = function (text1, text2) {
  let n = text1.length;
  let m = text2.length;

  let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i = i + 1) {
    for (let j = 1; j <= m; j = j + 1) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[n][m];
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)
