//? LeetCode #28
//? Find the Index of the First Occurrence in a String

// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

//? Example 1:
// Input: haystack = "sadbutsad", needle = "sad"
// Output: 0
// Explanation: "sad" occurs at index 0 and 6.
// The first occurrence is at index 0, so we return 0.

//? Example 2:
// Input: haystack = "leetcode", needle = "leeto"
// Output: -1
// Explanation: "leeto" did not occur in "leetcode", so we return -1.

//? Approach
// Loop through each index i in haystack where needle could start (0 to n - m).
// For each i, compare needle with the substring starting at i.
// If all characters match, return i.
// If no match is found, return -1.

var strStr = function (haystack, needle) {
  let n = haystack.length;
  let m = needle.length;

  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    for (j = 0; j < m; j++) {
      if (haystack[i + j] !== needle[j]) {
        break;
      }
    }
    if (j === m) {
      return i;
    }
  }
  return -1;
};

//? Time Complexity = O(n * m)
//? Space Complexity = O(1)
