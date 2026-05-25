//? LeetCode #438
//? Find All Anagrams in a String

// Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.

//? Example 1:
// Input: s = "cbaebabacd", p = "abc"
// Output: [0,6]
// Explanation:
// The substring with start index = 0 is "cba", which is an anagram of "abc".
// The substring with start index = 6 is "bac", which is an anagram of "abc".

//? Example 2:
// Input: s = "abab", p = "ab"
// Output: [0,1,2]
// Explanation:
// The substring with start index = 0 is "ab", which is an anagram of "ab".
// The substring with start index = 1 is "ba", which is an anagram of "ab".
// The substring with start index = 2 is "ab", which is an anagram of "ab".

//? Constraints:
// 1 <= s.length, p.length <= 3 * 104
// s and p consist of lowercase English letters.

//? Approach:
// We use a fixed-size sliding window of length `p.length` over string `s`.
// First, we store the frequency of characters in `p`.
// Then we maintain a window frequency while moving through `s`.
// At each step, we update the window by adding the new character and removing the old one.
// If both frequency arrays match, we store the starting index.

//? Code:
var findAnagrams = function (s, p) {
  let result = [];

  if (p.length > s.length) return result;

  let pCount = new Array(26).fill(0);
  let sCount = new Array(26).fill(0);

  let a = "a".charCodeAt(0);

  // frequency of p
  for (let ch of p) {
    pCount[ch.charCodeAt(0) - a]++;
  }

  let i = 0;

  for (let j = 0; j < s.length; j++) {
    // add current char to window
    sCount[s[j].charCodeAt(0) - a]++;

    // shrink window if size exceeds p.length
    if (j - i + 1 > p.length) {
      sCount[s[i].charCodeAt(0) - a]--;
      i++;
    }

    // check match
    if (j - i + 1 === p.length && isSame(pCount, sCount)) {
      result.push(i);
    }
  }

  return result;
};

// helper function
function isSame(a, b) {
  for (let i = 0; i < 26; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

//? Time Complexity: O(n)
//? Space Complexity: O(1) (fixed 26-size arrays)
