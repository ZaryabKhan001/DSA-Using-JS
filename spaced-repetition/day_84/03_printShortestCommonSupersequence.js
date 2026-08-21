//? LeetCode #1092
//? Shortest Common Supersequence

// Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences. If there are multiple valid strings, return any of them.

// A string s is a subsequence of string t if deleting some number of characters from t (possibly 0) results in the string s.

//? Example 1:
// Input: str1 = "abac", str2 = "cab"
// Output: "cabac"
// Explanation:
// str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
// str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
// The answer provided is the shortest such string that satisfies these properties.

//? Example 2:
// Input: str1 = "aaaaaaaa", str2 = "aaaaaaaa"
// Output: "aaaaaaaa"

//? Constraints:
// 1 <= str1.length, str2.length <= 1000
// str1 and str2 consist of lowercase English letters.

//? Thought Process:

//? Parent problem is LCS.
// SCS is closely related to LCS.

// LCS → find the longest common subsequence.
// SCS → build the shortest string containing both strings as subsequences.

// The common characters should be used only once.
// Therefore:

// SCS length = str1.length + str2.length - LCS length.

// But this problem asks for the actual string,
// so we first build the LCS DP table.

//? What does dp[i][j] mean?
// dp[i][j] stores the LCS length for the first i characters
// of str1 and the first j characters of str2.

//? Why n + 1 and m + 1?
// The extra row and column represent empty strings.

//? Why str1[i - 1] and str2[j - 1]?
// DP uses 1-based positions,
// but JavaScript strings use 0-based indexing.

//* If characters match:
// They can be shared by both strings.
// Add the character only once.
// Move diagonally:

// i--;
// j--;

//* If characters don't match:
// We cannot use both characters as the same character.

// Check the two LCS possibilities:

// grid[i][j - 1]
// grid[i - 1][j]

// Move toward the larger LCS value.

// If left is larger:
// Add str2[j - 1].
// Move j--.

// Otherwise:
// Add str1[i - 1].
// Move i--.

//? Why add a character when they don't match?
// Unlike LCS, SCS must contain characters from BOTH strings.
// So whichever character we move past must be included.

//? Why backtrack from bottom-right?
// grid[n][m] represents both complete strings.
// So start from (n, m) and work backwards.

//? Why unshift?
// Backtracking goes from right to left.
// We discover the answer in reverse order.
// unshift() puts each character at the front,
// keeping the final string in the correct order.

//? Why the extra while loops?
// The main loop stops when either string becomes empty.
// The remaining characters of the other string
// still need to be added.

//* Final idea:
// Build LCS DP first
// → backtrack from bottom-right
// → matching characters: add once + move diagonally
// → non-matching characters: follow larger LCS direction
// → add the character from the direction we move past
// → add remaining characters
// → join the array.

// Time: O(n * m)
// Space: O(n * m)

//? Code:
const lcs = (str1, str2, n, m) => {
  let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i = i + 1) {
    for (let j = 1; j <= m; j = j + 1) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }

  return dp;
};

var shortestCommonSupersequence = function (str1, str2) {
  let n = str1.length;
  let m = str2.length;
  let grid = lcs(str1, str2, n, m);
  let scs = [];

  let i = n;
  let j = m;

  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      scs.unshift(str1[i - 1]);
      i--;
      j--;
    } else {
      if (grid[i][j - 1] > grid[i - 1][j]) {
        scs.unshift(str2[j - 1]);
        j--;
      } else {
        scs.unshift(str1[i - 1]);
        i--;
      }
    }
  }

  while (i > 0) {
    scs.unshift(str1[i - 1]);
    i--;
  }

  while (j > 0) {
    scs.unshift(str2[j - 1]);
    j--;
  }

  return scs.join("");
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)
