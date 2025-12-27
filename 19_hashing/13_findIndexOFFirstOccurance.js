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

//? Approach 1
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

//? Approach 2:
// Build LPS (Longest Prefix Suffix) Array for the needle:
// Helps in skipping repeated characters when a mismatch happens.
// lps[i] stores the length of the longest proper prefix which is also a suffix for needle[0...i].
// Search in haystack using LPS:
// Compare characters of haystack and needle.
// On mismatch, use the LPS array to shift the needle efficiently without rechecking characters.

var strStr = function (haystack, needle) {
  let n = haystack.length;
  let m = needle.length;
  let lps = [0];
  let i = 0;
  let j = 1;
  while (j < m) {
    if (needle[i] === needle[j]) {
      lps[j] = i + 1;
      ++i;
      ++j;
    } else {
      if (i == 0) {
        lps[j] = 0;
        ++j;
      } else {
        i = lps[i - 1];
      }
    }
  }
  i = j = 0;
  while (i < n) {
    if (haystack[i] === needle[j]) {
      ++i;
      ++j;
    } else {
      if (j == 0) {
        ++i;
      } else {
        j = lps[j - 1];
      }
    }
    if (j === m) {
      return i - m;
    }
  }
  return -1;
};

//? Time Complexity = O(n)
//? Space Complexity = O(m)
