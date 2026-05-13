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
