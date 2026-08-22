//? LeetCode #1312
//? Minimum Insertion Steps to Make a String Palindrome

// Given a string s. In one step you can insert any character at any index of the string.

// Return the minimum number of steps to make s palindrome.

// A Palindrome String is one that reads the same backward as well as forward.

//? Example 1:
// Input: s = "zzazz"
// Output: 0
// Explanation: The string "zzazz" is already palindrome we do not need any insertions.

//? Example 2:
// Input: s = "mbadm"
// Output: 2
// Explanation: String can be "mbdadbm" or "mdbabdm".

//? Example 3:
// Input: s = "leetcode"
// Output: 5
// Explanation: Inserting 5 characters the string becomes "leetcodocteel".

//? Constraints:
// 1 <= s.length <= 500
// s consists of lowercase English letters.

//? Thought Process:
// Very interesting question.
// We have to return minimum no of insertions to make the string a palindrome.

// A very similar question we have already solved is min # of deletions to make string palindrome.

// In previous question:
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

//? Actually min no of insertions = min no of deletions
// Because, if we delete these many elements string becomes palindrome.
// Same, If we add these many elements in right place so the elements required to delete becomes double, results in making the string palindrome.

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
var minInsertions = function (s) {
    let lps = longestPalindromeSubseq(s);

    return s.length - lps;
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)
