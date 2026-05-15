//? LeetCode #242
//? Valid Anagram

// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

//? Example 1:
// Input: s = "anagram", t = "nagaram"
// Output: true

//? Example 2:
// Input: s = "rat", t = "car"
// Output: false

//? Approach:
// First, check if the lengths of both strings are equal. If not, return false.
// Create a hashmap (or character counter) to store the frequency of characters in the first string.
// Iterate over the second string and decrease the corresponding frequency in the map.
// If a character is not found or the count goes below zero, return false.
// If all characters match, return true at the end.

var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  let map = {};

  for (let i = 0; i < s.length; i++) {
    if (!map[s[i]]) {
      map[s[i]] = 1;
    } else {
      ++map[s[i]];
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (!map[t[i]] || map[t[i]] === 0) {
      return false;
    } else {
      --map[t[i]];
    }
  }

  return true;
};

//? Time Complexity: O(n), where n is the length of the strings
//? Space Complexity: O(1), since the character set is limited to 26 lowercase letters
