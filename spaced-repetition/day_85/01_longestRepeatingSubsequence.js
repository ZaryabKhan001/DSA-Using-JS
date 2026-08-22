//? Longest Repeating Subsequence (gfg)

// Given string str, find the length of the longest repeating subsequence such that it can be found twice in the given string.

// The two identified subsequences A and B can use the same ith character from string s if and only if that ith character has different indices in A and B. For example, A = "xax" and B = "xax" then the index of the first "x" must be different in the original string for A and B.

//? Examples:

// Input: s = "axxzxy"
// Output: 2

// Explanation: The given array with indexes looks like
// a x x z x y
// 0 1 2 3 4 5
// The longest subsequence is "xx". It appears twice as explained below.
// subsequence A
// x x
// 0 1  <-- index of subsequence A
// ------
// 1 2  <-- index of s
// subsequence B
// x x
// 0 1  <-- index of subsequence B
// ------
// 2 4  <-- index of s
// We are able to use character 'x' (at index 2 in s) in both subsequences as it appears on index 1 in subsequence A and index 0 in subsequence B.

// Input: s = "axxxy"
// Output: 2

//? Constraints:
// 1 <= s.size() <= 103

//? Thought Process:
// 1. We need a subsequence that appears at least twice in the same string.
// 2. Since it is a subsequence problem, think about LCS.
// 3. We can compare the string with itself: `LCS(S, S)`.
// 4. But normal LCS has a problem: it can match the same index with itself.
// 5. So we need one extra condition: `i != j`.
// 6. Define `dp[i][j]` = LRS length using the first `i` and `j` characters.
// 7. If `S[i-1] == S[j-1]` and `i != j`, we can take the character: `dp[i][j] = 1 + dp[i-1][j-1]`.
// 8. Otherwise, skip one character from either side: `max(dp[i-1][j], dp[i][j-1])`.
// 9. Base case: if either length is `0`, answer is `0`.
// 10. This is basically LCS + the condition that the two positions must be different.
// 11. There are `n × n` states, and each takes `O(1)` work.
// 12. Time = O(n²), Space = O(n²); space can be optimized to `O(n)` using two rows.
// 13. Key takeaway: Don't memorize LRS; derive it as "LCS of the string with itself, but don't match the same index."

//? Code:
class Solution {
  longestRepSubseq(s) {
    let n = s.length;
    let dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= n; i = i + 1) {
      for (let j = 1; j <= n; j = j + 1) {
        if (s[i - 1] == s[j - 1] && i != j) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
        }
      }
    }

    return dp[n][n];
  }
}

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)
