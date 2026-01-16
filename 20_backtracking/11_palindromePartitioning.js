//? LeetCode #131
//? Palindrome Partitioning
// Medium
// Topics
// premium lock icon
// Companies
// Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

//? Example 1:
// Input: s = "aab"
// Output: [["a","a","b"],["aa","b"]]

//? Example 2:
// Input: s = "a"
// Output: [["a"]]

//? Approach
// Backtracking – We try to partition the string into all possible substrings.
// t each step, take a prefix (choice = s[0..i])
// If it’s a palindrome, include it in the current path and recursively partition the remaining string.
// If not, skip it.
// When the remaining string becomes empty, we’ve found a valid partition → add it to the result.
// Use backtracking to explore all possibilities (push → recurse → pop).
// isPalindrome is used to check substrings in O(n) time.

//? Code:
var partition = function (s) {
  let result = [];

  let isPalindrome = (str) => {
    let i = 0;
    let j = str.length - 1;

    while (i < j) {
      if (str[i++] !== str[j--]) return false;
    }
    return true;
  };

  let backtrack = (path, remainingString) => {
    if (!remainingString.length) {
      result.push([...path]);
      return;
    }

    for (let i = 1; i <= remainingString.length; i++) {
      let choice = remainingString.substring(0, i);

      if (!isPalindrome(choice)) continue;

      path.push(choice);
      backtrack(path, remainingString.substring(i));
      path.pop();
    }
  };

  backtrack([], s);
  return result;
};

//? Time Complexity = O(n * 2n)
//? Space Complexity = O(n)
