//? LeetCode #139
//? Word Break

// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

// Note that the same word in the dictionary may be reused multiple times in the segmentation.

//? Example 1:
// Input: s = "leetcode", wordDict = ["leet","code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".

//? Example 2:
// Input: s = "applepenapple", wordDict = ["apple","pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
// Note that you are allowed to reuse a dictionary word.

//? Example 3:
// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// Output: false

//? Constraints:
// 1 <= s.length <= 300
// 1 <= wordDict.length <= 1000
// 1 <= wordDict[i].length <= 20
// s and wordDict[i] consist of only lowercase English letters.
// All the strings of wordDict are unique.

//? Approach:
// Use recursion to try breaking the string s into valid dictionary words.
// At each step, check all prefixes of the remaining string.
// If the prefix is in wordDict, recursively check the rest of the string.
// Use a memoization map dp to store results for substrings to avoid repeated works.
// If any split leads to the entire string being segmented into valid words, return true; otherwise return false.

//? Code:
var wordBreak = function (s, wordDict) {
    let n = s.length;
    let dp = new Array(n).fill(null);

    const isValid = (choice) => {
        for (let word of wordDict) {
            if (word === choice) {
                return true;
            };
        };
        return false;
    };

    const backTrack = (start) => {
        //* base case
        if (start === n) {
            return true;
        }

        //* recursive solution
        for (let end = start; end < n; end = end + 1) {
            //* check from dp if this is already computed or not
            if (dp[start] != null) {
                return dp[start];
            }

            let choice = s.substring(start, end + 1);

            if (isValid(choice)) {
                let canBreak = backTrack(end + 1);

                if (canBreak === true) {
                    dp[start] = true;
                    return dp[start];
                }
            }
        }

        dp[start] = false;
        return dp[start];
    };

    return backTrack(0);
};

//? Time Complexity: O(n2)
//? Space Complexity: O(n)
