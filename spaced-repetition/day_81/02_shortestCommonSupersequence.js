//? Shortest Common Supersequence (gfg)

// Given two strings s1 and s2, find the length of the smallest string which has both s1 and s2 as its sub-sequences.
// Note: s1 and s2 can have both uppercase and lowercase English letters.

//? Examples:

// Input: s1 = "geek", s2 = "eke"
// Output: 5
// Explanation: String "geeke" has both string "geek" and "eke" as subsequences.

// Input: s1 = "AGGTAB", s2 = "GXTXAYB"
// Output: 9
// Explanation: String "AGXGTXAYB" has both string "AGGTAB" and "GXTXAYB" as subsequences.

// Input: s1 = "geek", s2 = "ek"
// Output: 4
// Explanation: String "geek" has both string "geek" and "ek" as subsequences.

//? Constraints:
// 1 ≤ s1.size(), s2.size() ≤ 500

//? Thought Process:
// Worst case: no common characters → take both strings → n + m.
// If characters are common: we can use the same character once instead of twice.
// We want to maximize these shared characters in the same order.
// That's exactly LCS (Longest Common Subsequence).
// So:
// Answer = n + m - LCS
// Remember:

// SCS = Total length − Common overlap
// Overlap = LCS
// SCS = n + m - LCS

//? Code:
class Solution {
  lcs(s1, s2) {
    let n = s1.length;
    let m = s2.length;

    let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i = i + 1) {
      for (let j = 1; j <= m; j = j + 1) {
        if (s1[i - 1] == s2[j - 1]) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
        }
      }
    }

    return dp[n][m];
  }
  minSuperSeq(s1, s2) {
    let n = s1.length;
    let m = s2.length;
    let lcs = this.lcs(s1, s2);

    return n + m - lcs;
  }
}

//? Time Complexity: O(n * m) where n is length of s1 and s2 is the length of s2
//? Space Complexity: O(n * m)
