//? Print Longest Common Subsequence

// Given two strings str1 and str2, Print the Longest Common Subsequence (LCS) of the two strings.

// A subsequence is a sequence of characters that can be obtained by deleting some characters from a string without changing the order of the remaining characters.

// Return the LCS as a string.

// If there are multiple possible LCS strings, return any one of them.

//? Example 1:

// Input:
// str1 = "abc"
// str2 = "bac"

// Output:
// "ac"

// Explanation:
// The common subsequences include "a", "b", "c", "ac", and "bc".
// The longest length is 2, so "ac" is a valid answer.

//? Example 2:

// Input:
// str1 = "abcde"
// str2 = "ace"

// Output:
// "ace"

// Explanation:
// "ace" appears as a subsequence in both strings and has length 3.

//? Example 3:

// Input:
// str1 = "abc"
// str2 = "def"

// Output:
// ""

// Explanation:
// There are no common characters between the two strings, so the LCS is an empty string.

//? Constraints
// 1 <= str1.length <= 1000
// 1 <= str2.length <= 1000
// str1 and str2 contain only lowercase English letters.
// The answer can be any one of the possible longest common subsequences.

//? Expected Output
// Return a string containing the longest common subsequence of str1 and str2.

//? Thought Process
// Parent problem is simple LCS.
// The matching logic is exactly the same. The only difference is:
// Simple LCS → find length
// This problem → find actual string

// First build the DP table.
// dp[i][j] stores the LCS length for the first i and j characters.

//? Why not build the answer while filling DP?
// Because every dp[i][j] represents the best matching for different prefixes. We only need the length first. Building strings in every cell makes DP more complicated.
// After DP is complete, backtrack.
// Start from bottom-right (n, m) because it represents both complete strings.
// If characters match:
// Add the character and move diagonally:
// i--;
// j--;

//* If they don't match:
// Move toward the larger value:
// dp[i - 1][j] > dp[i][j - 1] ? i-- : j--;

//? Why unshift?
// We are finding characters from right to left, so add each character to the front to maintain the correct order.

//* Remember:
// Build DP first → backtrack from bottom-right → collect matching characters → reverse order using unshift.

//? Code:
const lcs = (str1, str2) => {
  let n = str1.length;
  let m = str2.length;
  let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i = i + 1) {
    for (let j = 1; j <= m; j = j + 1) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp;
};

const printLCS = (str1, str2) => {
  const grid = lcs(str1, str2);
  const result = [];

  let i = str1.length;
  let j = str2.length;

  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      result.unshift(str1[i - 1]);
      i--;
      j--;
    } else {
      if (grid[i - 1][j] > grid[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
  }

  return result.join("");
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)
