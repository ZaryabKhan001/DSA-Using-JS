//? LeetCode #767
//? Reorganize String

// Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.

// Return any possible rearrangement of s or return "" if not possible.

//? Example 1:
// Input: s = "aab"
// Output: "aba"

//? Example 2:
// Input: s = "aaab"
// Output: ""

//? Constraints:
// 1 <= s.length <= 500
// s consists of lowercase English letters.

//? Approach:
// First, count the frequency of each character in the string and track the maximum frequency.
// If any character appears more than ⌈n/2⌉ times, it is impossible to rearrange the string without adjacent duplicates, so return an empty string.
// Sort the characters in descending order based on their frequency so that the most frequent characters are placed first.
// Create a result array and start filling characters at even indices (0, 2, 4, …). Once even positions are filled, continue filling at odd indices (1, 3, 5, …).
// This placement ensures that the same characters are spaced apart, preventing adjacent duplicates.
// Finally, join the array to form the reorganized string.

//? Code:
var reorganizeString = function (s) {
  let n = s.length;
  let freq = {};
  let maxFreq = 0;
  let result = new Array(n).fill(0);

  for (let c of s) {
    freq[c] = (freq[c] || 0) + 1;
    maxFreq = Math.max(maxFreq, freq[c]);
  }

  if (maxFreq > Math.ceil(n / 2)) return "";

  const chars = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);
  //* filling result array
  let i = 0;
  for (let char of chars) {
    let count = freq[char];
    while (count > 0) {
      if (i >= n) {
        i = 1;
      }
      result[i] = char;
      count--;
      i = i + 2;
    }
  }

  return result.join("");
};

//? Time Complexity: O(n + k log k) due to sorting the characters by frequency.
//? Space Complexity: O(n) for the result array and frequency map.
