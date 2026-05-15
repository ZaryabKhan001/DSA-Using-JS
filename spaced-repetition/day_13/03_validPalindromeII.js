//? LeetCode #680
//? Valid Palindrome II

// Given a string s, return true if the s can be palindrome after deleting at most one character from it.

//? Example 1:
// Input: s = "aba"
// Output: true

//? Example 2:
// Input: s = "abca"
// Output: true
// Explanation: You could delete the character 'c'.

//? Example 3:
// Input: s = "abc"
// Output: false

//? Constraints:
// 1 <= s.length <= 105
// s consists of lowercase English letters.

//? Approach:
// We can use two pointers to check if the string is a palindrome. If we find a mismatch, we can try to skip either the left or the right character and check if the remaining substring is a palindrome. If either of the two cases returns true, then the original string can be a palindrome after deleting at most one character.

//? Code:
const isPalindrome = (s, i, j) => {
  while (i < j) {
    if (s[i] !== s[j]) return false;

    i++;
    j--;
  }

  return true;
};

var validPalindrome = function (s) {
  let i = 0;
  let j = s.length - 1;
  if (i === j) return true;

  while (i < j) {
    if (s[i] !== s[j]) {
      return isPalindrome(s, i + 1, j) || isPalindrome(s, i, j - 1);
    }
    i++;
    j--;
  }

  return true;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)

//? Follow-up: What if we are allowed to delete at most k characters from the string? How would you approach the problem then?

//? Follow-up Approach:
// We can modify the previous approach to use a recursive function that takes an additional parameter k, which represents the number of characters we are allowed to delete. If we find a mismatch, we can try to skip either the left or the right character and decrease k by 1. If k becomes negative, it means we have deleted more than the allowed number of characters, and we should return false. If we successfully check the entire string without k becoming negative, then we can return true.

const solve = (s, i, j, k) => {
  while (i < j) {
    if (s[i] === s[j]) {
      i++;
      j--;
    } else {
      if (k === 0) return false;

      return solve(s, i + 1, j, k - 1) || solve(s, i, j - 1, k - 1);
    }
  }
  return true;
};
var validPalindromeK = function (s, k) {
  return solve(s, 0, s.length - 1, k);
};

//? Time Complexity: O(2^k * n)
//? Space Complexity: O(k) due to the recursive call stack.
