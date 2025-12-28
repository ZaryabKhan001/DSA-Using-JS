//? LeetCode #567
//? Permutation in String

// Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

// In other words, return true if one of s1's permutations is the substring of s2.

//? Example 1:
// Input: s1 = "ab", s2 = "eidbaooo"
// Output: true
// Explanation: s2 contains one permutation of s1 ("ba").

//? Example 2:
// Input: s1 = "ab", s2 = "eidboaoo"
// Output: false

//? Approach:
// Use two frequency arrays hashS and hashW of size 26 to count character occurrences (assuming lowercase English letters).
// Fill both arrays with frequencies from s1 and the first window of s2 of length equal to s1.
// Slide the window across s2 one character at a time:
// At each step, compare the two frequency arrays using isHashSame().
// If they match, it means a permutation of s1 is present in s2, so return true.
// Otherwise, update the window by removing the leftmost character and adding the next character.
// If no match is found till the end, return false.

var checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false;
  let hashS = Array(26).fill(0);
  let hashW = Array(26).fill(0);
  let windowLength = s1.length;
  for (let i = 0; i < windowLength; i++) {
    hashS[s1.charCodeAt(i) - 97]++;
    hashW[s2.charCodeAt(i) - 97]++;
  }
  let i = 0;
  let j = windowLength - 1;

  while (j < s2.length) {
    if (isHashSame(hashS, hashW)) {
      return true;
    }
    hashW[s2.charCodeAt(i) - 97]--;
    i++;
    j++;
    if (j < s2.length) {
      hashW[s2.charCodeAt(j) - 97]++;
    }
  }
  return false;
};
var isHashSame = function (hashS, hashW) {
  for (let i = 0; i < 26; i++) {
    if (hashS[i] !== hashW[i]) {
      return false;
    }
  }
  return true;
};

//? Time Complexity = O(n)
//? Space Complexity = O(1)
