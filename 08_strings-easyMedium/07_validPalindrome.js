//? LeetCode: 125
//? Valid Palindrome

// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
// Given a string s, return true if it is a palindrome, or false otherwise.

//? Example 1:
// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.

//? Example 2:
// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.

//? Example 3:
// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.

//? Approach 01:
// Convert this string into array also only allow alphanumeric values.
// traverse on array and find it is palindrome or not.

var isPalindrome = function (s) {
  let array = [];
  for (let i = 0; i < s.length; i = i + 1) {
    if (
      (s[i] <= "z" && s[i] >= "a") ||
      (s[i] <= "Z" && s[i] >= "A") ||
      (s[i] >= "0" && s[i] <= "9")
    ) {
      array.push(s[i].toLowerCase());
    }
  }
  let arrayLength = array.length;
  for (let i = 0; i < Math.floor(arrayLength / 2); i = i + 1) {
    if (array[i] !== array[arrayLength - i - 1]) return false;
  }
  return true;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)

//? Approach 02:
// We use two pointers (`p1` from start, `p2` from end) to compare characters.
// If a character is not alphanumeric, we skip it and move the respective pointer.
// If characters differ (ignoring case), return false; otherwise continue until pointers meet, then return true.

var isPalindrome = function (s) {
  let length = s.length;
  let p1 = 0;
  let p2 = length - 1;
  while (p2 > p1) {
    if (!s[p1].match(/[a-zA-Z0-9]/)) {
      p1++;
    } else if (!s[p2].match(/[a-zA-Z0-9]/)) {
      p2--;
    } else {
      if (s[p1].toLowerCase() !== s[p2].toLowerCase()) {
        return false;
      } else {
        p1++;
        p2--;
      }
    }
  }
  return true;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
