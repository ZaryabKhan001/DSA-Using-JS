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
