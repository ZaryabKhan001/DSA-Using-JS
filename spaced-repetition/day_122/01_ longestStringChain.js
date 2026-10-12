//? LeetCode #1048
//? Longest String Chain

// You are given an array of words where each word consists of lowercase English letters.

// wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere in wordA without changing the order of the other characters to make it equal to wordB.

// For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
// A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1, where word1 is a predecessor of word2, word2 is a predecessor of word3, and so on. A single word is trivially a word chain with k == 1.

// Return the length of the longest possible word chain with words chosen from the given list of words.

//? Example 1:
// Input: words = ["a","b","ba","bca","bda","bdca"]
// Output: 4
// Explanation: One of the longest word chains is ["a","ba","bda","bdca"].

//? Example 2:
// Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
// Output: 5
// Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].

//? Example 3:
// Input: words = ["abcd","dbqca"]
// Output: 1
// Explanation: The trivial word chain ["abcd"] is one of the longest word chains.
// ["abcd","dbqca"] is not a valid word chain because the ordering of the letters is changed.

//? Constraints:
// 1 <= words.length <= 1000
// 1 <= words[i].length <= 16
// words[i] only consists of lowercase English letters.

//? Thought Process:
// This problem looks difficult but it is not. Understand the problem carefully. We have to build longest chain and order does not matter.
// If order does not matter then definitely we have to sort it for sure.
// After sorting, problem reduced to longest chain making linear way. Which is direct variation of LIS. where we make longest increasing subsequence chain.
// Just isPrecedence condition is going to add. otherwise everything is same.

//? Code: Top Down
const isPredecessor = (stringA = "", stringB = "") => {
  if (stringB.length !== stringA.length + 1) {
    return false;
  }

  let i = 0;
  let j = 0;

  while (i < stringA.length && j < stringB.length) {
    if (stringA[i] === stringB[j]) {
      i++;
    }

    j++;
  }

  return i === stringA.length;
};

var longestStrChain = function (words) {
  words.sort((a, b) => a.length - b.length);
  let n = words.length;

  let dp = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(undefined),
  );
  const solve = (index, prev) => {
    if (index === n) {
      return 0;
    }

    if (dp[index][prev + 1] !== undefined) {
      return dp[index][prev + 1];
    }

    if (prev === -1 || isPredecessor(words[prev], words[index])) {
      let choice1 = 1 + solve(index + 1, index);
      let choice2 = solve(index + 1, prev);

      return (dp[index][prev + 1] = Math.max(choice1, choice2));
    } else {
      return (dp[index][prev + 1] = solve(index + 1, prev));
    }
  };

  return solve(0, -1);
};

//? Time Complexity: O(n logn) for sorting O(n^2) unique states and for each state goes O(n) to check for predecessor => O(n^3)
//? Space Complexity: O(n^2) for DP

//? Bottom Up:

//? Code:
// const isPredecessor = (stringA = '', stringB = '') => {
//     if (stringB.length !== stringA.length + 1) {
//         return false;
//     }

//     let i = 0;
//     let j = 0;

//     while (i < stringA.length && j < stringB.length) {
//         if (stringA[i] === stringB[j]) {
//             i++;
//         }

//         j++;
//     }

//     return i === stringA.length;
// };

// var longestStrChain = function (words) {
//     words.sort((a, b) => a.length - b.length);
//     let n = words.length;
//     let dp = new Array(n).fill(1);
//     let maxChain = 1;

//     for (let i = 1; i < n; i = i + 1) {
//         for (let j = 0; j < i; j = j + 1) {
//             if (isPredecessor(words[j], words[i])) {
//                 dp[i] = Math.max(dp[j] + 1, dp[i]);
//             }
//         }
//         maxChain = Math.max(maxChain, dp[i]);
//     }

//     return maxChain;
// };

//? Time Complexity: O(n logn) for sorting O(n^2) unique states and for each state goes O(n) to check for predecessor => O(n^3)
//? Space Complexity: O(n^2) for DP