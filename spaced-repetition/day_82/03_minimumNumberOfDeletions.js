//? Minimum number of deletions (gfg)

// Given a string s. The task is to remove or delete the minimum number of characters from the string s, so that the resultant string forms a palindrome. Find the minimum number of characters we need to remove.
// Note: The order of characters should be maintained.

//? Examples:

// Input: s = "aebcbda"
// Output: 2
// Explanation: Remove characters 'e' and 'd'. Resultant string will be "abcba" which is a palindromic string.

// Input: s = "aba"
// Output: 0
// Explanation: We don’t remove any character.

//? Constraints:
// 1 ≤ s.size() ≤ 103

//? Thought Process:

//? Parent Question:
// Minimum Deletions => Input: 1 string, Question: Find minimum deletions
// needed to make the string a palindrome, Output: int

//? How?
// We know:
// LPS(s) = LCS(s, reverse(s))
//
// LPS tells us the maximum number of characters
// we can KEEP while making the string a palindrome.
//
// So, if:
// n   = total number of characters
// lps = maximum characters we can keep
//
// Then the remaining characters must be deleted.
//
// Therefore:
// Minimum Deletions = n - lps

//? Code:
class Solution {
  lcs(s1, s2, n, m) {
    let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i = i + 1) {
      for (let j = 1; j <= m; j = j + 1) {
        if (s1[i - 1] == s2[j - 1]) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    return dp[n][m];
  }
  minDeletions(s) {
    let n = s.length;
    let lps = this.lcs(s, s.split("").reverse().join(""), n, n);

    return n - lps;
  }
}

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)
