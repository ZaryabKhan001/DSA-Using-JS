//? Longest Common Substring (gfg)

// Given two strings s1 and s2, determine the length of the longest substring that appears in both strings.

//? Examples:

// Input: s1 = "ABCDGH", s2 = "ACDGHR"
// Output: 4
// Explanation: The longest common substring is "CDGH" with a length of 4.

// Input: s1 = "abc", s2 = "acb"
// Output: 1
// Explanation: The longest common substrings are "a", "b", "c" all having length 1.

// Input: s1 = "YZ", s2 = "yz"
// Output: 0
// Explanation: Comparison is case-sensitive, so 'Y' ≠ 'y' and 'Z' ≠ 'z'. Hence, no common substring exists.

//? Constraints:
// 1 ≤ s1.size(), s2.size() ≤ 103
// Both strings consist only of uppercase and lowercase English letters.

//? Thought Process:
// I initially thought Longest Common Substring was just a variation of Longest Common Subsequence, because the recursion looks very similar.

// The important difference is continuity:

// * LCS: characters don't match → `max(top, left)`
// * Substring: characters don't match → `0` because the continuous substring is broken.

// ### Mistakes I made

// 1. Returned `dp[n][m]`

//    * Wrong because the longest substring can occur anywhere in the DP table.
//    * Need to track `max`.

// 2. In recursion, only tracked `count`

//    * `count` is the current matching substring length.
//    * We also need to keep the maximum found so far.

// ### Final mental model

// ```text
// Match     → diagonal + 1
// Mismatch  → 0
// Answer    → maximum found anywhere
// ```

// The biggest lesson:

// > LCS can skip characters; Longest Common Substring cannot.

//? Specifically in this problem recursive solution is so easy, but implementing memoization is very tough. So bottom up approach is recommended. Also if we somehow attach memoization still gfg gives TLE. 

//? Code:
class Solution {
	longCommSubstr(s1, s2) {
		let n = s1.length;
		let m = s2.length;
		
		let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
		
		let max = 0;
		for (let i = 1; i <= n; i = i + 1) {
			for (let j = 1; j <= m; j = j + 1) {
				if (s1[i - 1] == s2[j - 1]) {
					dp[i][j] = 1 + dp[i - 1][j - 1];
					max = Math.max(dp[i][j], max);
				} else {
					dp[i][j] = 0;
				}
			}
		}
		
		return max;
		
	}
}

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)