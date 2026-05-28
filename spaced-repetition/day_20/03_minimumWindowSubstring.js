//? LeetCode #76
//? Minimum Window Substring

// Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

// The testcases will be generated such that the answer is unique.

//? Example 1:
// Input: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"
// Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

//? Example 2:
// Input: s = "a", t = "a"
// Output: "a"
// Explanation: The entire string s is the minimum window.

//? Example 3:
// Input: s = "a", t = "aa"
// Output: ""
// Explanation: Both 'a's from t must be included in the window.
// Since the largest window of s only has one 'a', return empty string.

//? Constraints:
// m == s.length
// n == t.length
// 1 <= m, n <= 105
// s and t consist of uppercase and lowercase English letters.

//? Approach: Sliding Window
// We can use a sliding window to keep track of the characters in the current window and their counts. We will also keep track of the counts of the characters in t. We will expand the right pointer of the window until we have all the characters in t, and then we will try to shrink the left pointer of the window to find the minimum window.

//? Code:
//* utility function
const isValid = (have, need) => {
  for (let key in need) {
    if (!have[key] || have[key] < need[key]) return false;
  }
  return true;
};

var minWindow = function (s, t) {
  let result = "";
  let minLen = Infinity;
  let need = {};

  //* creating needed characters frquency
  for (let ch of t) {
    need[ch] = (need[ch] || 0) + 1;
  }

  let i = 0;
  let j = 0;
  let have = {};
  while (j < s.length) {
    //* add current j to window
    have[s[j]] = (have[s[j]] || 0) + 1;

    while (isValid(have, need)) {
      if (j - i + 1 < minLen) {
        minLen = Math.min(minLen, j - i + 1);
        result = s.substring(i, j + 1);
      }
      have[s[i]]--;
      i++;
    }
    j++;
  }

  return result;
};

//? Time Complexity: O(n * k) where n is the length of s and k is the unique characters in t.
//? Space Complexity: O(m + k) where m is the unique characters in s and k is the unique characters in t.
