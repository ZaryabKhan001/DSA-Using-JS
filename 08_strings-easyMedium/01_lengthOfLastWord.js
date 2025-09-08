//? LeetCode: #58
//? Length of Last Word

// Given a string s consisting of words and spaces, return the length of the last word in the string.
// A word is a maximal substring consisting of non-space characters only.

//? Example 1:
// Input: s = "Hello World"
// Output: 5
// Explanation: The last word is "World" with length 5.

//? Example 2:
// Input: s = "   fly me   to   the moon  "
// Output: 4
// Explanation: The last word is "moon" with length 4.

//? Example 3:
// Input: s = "luffy is still joyboy"
// Output: 6
// Explanation: The last word is "joyboy" with length 6.

//? Approach 01:
// Start from the end of the string and skip any trailing spaces.
// Count the number of characters in the last word until a space or the beginning of the string is reached.
// This ensures we efficiently find the last word without extra space.

var lengthOfLastWord = function (s) {
  let sLength = s.length;
  let lastWordLength = 0;
  let i = sLength - 1;
  while (i >= 0) {
    if (s[i] !== " ") break;
    i = i - 1;
  }
  for (let j = i; j >= 0; j = j - 1) {
    if (s[j] === " ") break;
    lastWordLength++;
  }
  return lastWordLength;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)

//? Approach 02:
// Start from the end and skip trailing spaces.
// Count characters until the next space or beginning of string.
// This gives the length of the last word efficiently.

var lengthOfLastWord = function (s) {
  let i = s.length - 1;
  let count = 0;
  while (i >= 0) {
    if (s[i] === " " && count != 0) {
      break;
    } else if (s[i] !== " ") {
      count = count + 1;
    }
    i = i - 1;
  }
  return count;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
