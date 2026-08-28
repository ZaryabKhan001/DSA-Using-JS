//? LeetCode #132
//? Palindrome Partitioning II

// Given a string s, partition s such that every substring of the partition is a palindrome.

// Return the minimum cuts needed for a palindrome partitioning of s.

//? Example 1:
// Input: s = "aab"
// Output: 1
// Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.

//? Example 2:
// Input: s = "a"
// Output: 0

//? Example 3:
// Input: s = "ab"
// Output: 1

//? Constraints:
// 1 <= s.length <= 2000
// s consists of lowercase English letters only.

//? Thought Process
// solve(i) → minimum cuts needed for s[i...n-1].
// For every j from i → n-1, check if s[i...j] is a palindrome.
// If it is, make a cut after j and solve the remaining part:
// 1 + solve(j + 1)

// Take the minimum over all possible j.
// Why dp[i]?

// The same solve(i) can be reached multiple times, so memoize it:

// dp[i] = answer for s[i...n-1]

// Why pal[i][j]?

// Checking a palindrome with a normal while loop can take O(n), causing O(n³) overall.

// Instead:

// isPalindrome(i, j)


// uses:

// s[i] === s[j]
//         &&
// isPalindrome(i+1, j-1)


// and memoizes every (i,j).

// So one call like:

// isPalindrome(0,6)
//  → (1,5)
//  → (2,4)
//  → (3,3)


// covers and stores all nested states.

//? Remember
// solve(i) = WHERE to cut
// pal(i,j) = WHETHER we can cut there

//? Code:
var minCut = function (s) {
  const n = s.length;

  const dp = new Array(n).fill(-1);
  const pal = Array.from({ length: n }, () => new Array(n).fill(undefined));

  const isPalindrome = (i, j) => {
    if (i >= j) {
      return true;
    }

    if (pal[i][j] !== undefined) {
      return pal[i][j];
    }

    if (s[i] !== s[j]) {
      return (pal[i][j] = false);
    }

    return (pal[i][j] = isPalindrome(i + 1, j - 1));
  };

  const solve = (i) => {
    // Whole remaining string is one partition
    if (i === n) {
      return -1;
    }

    // Already calculated
    if (dp[i] !== -1) {
      return dp[i];
    }

    let min = Infinity;

    for (let j = i; j < n; j++) {
      if (isPalindrome(i, j)) {
        const cuts = 1 + solve(j + 1);
        min = Math.min(min, cuts);
      }
    }

    return (dp[i] = min);
  };

  return solve(0);
};

//? Time Complexity: O(n²)
// solve(i) has O(n) states, and for each i, the loop checks up to O(n) values of j → O(n²).
// isPalindrome(i,j) has O(n²) possible (i,j) states, and each state is memoized and computed only once → O(n²).

//? Space Complexity: O(n²)
// pal[i][j] is an n × n table, so it uses O(n²) space.
// dp uses O(n) and recursion uses O(n), which is dominated by pal → O(n²) overall.
