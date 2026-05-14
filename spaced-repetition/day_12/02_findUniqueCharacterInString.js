//? LeetCode #387
//? First Unique Character in a String

// Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

//? Example 1:
// Input: s = "leetcode"
// Output: 0

// Explanation:
// The character 'l' at index 0 is the first character that does not occur at any other index.

//? Example 2:
// Input: s = "loveleetcode"
// Output: 2

//? Example 3:
// Input: s = "aabb"
// Output: -1

//? Constraints:
// 1 <= s.length <= 105
// s consists of only lowercase English letters.

//? Approach:
// 1. Create a frequency map to count the occurrences of each character in the string.
// 2. Iterate through the string again and check the frequency of each character in the map. The first character with a frequency of 1 is the first unique character, and we return its index.
// 3. If no unique character is found after iterating through the string, return -1.

//? Code:
var firstUniqChar = function (s) {
  let map = {};

  for (let char of s) {
    map[char] = map[char] ? ++map[char] : 1;
  }

  for (let i = 0; i < s.length; i = i + 1) {
    if (map[s[i]] === 1) return i;
  }

  return -1;
};

//? Time Complexity: O(n)
//? Space Complexity: O(k) where k is the number of unique characters in the string.
