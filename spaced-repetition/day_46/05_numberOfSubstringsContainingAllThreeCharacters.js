//? LeetCode #1358
//? Number of Substrings Containing All Three Characters

// Given a string s consisting only of characters a, b and c.

// Return the number of substrings containing at least one occurrence of all these characters a, b and c.

//? Example 1:
// Input: s = "abcabc"
// Output: 10
// Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again).

//? Example 2:
// Input: s = "aaacb"
// Output: 3
// Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb".

//? Example 3:
// Input: s = "abc"
// Output: 1

//? Constraints:
// 3 <= s.length <= 5 x 10^4
// s only consists of a, b or c characters.

//? Approach:
//? We use a sliding window approach.
//? We maintain a window [i...j] and a frequency map of characters in the window.
//? We expand the window by incrementing j.
//? If the window is valid (contains all three characters), we shrink it by incrementing i.
//? For each valid window, we add i to the answer.

//? Code:
var numberOfSubstrings = function (s) {
  let hash = [0, 0, 0];
  let ans = 0;

  let i = 0;
  let j = 0;
  while (j < s.length) {
    //* add current char into window
    hash[s.charCodeAt(j) - 97]++;

    //* shrink from left if it is a valid window
    while (hash[0] > 0 && hash[1] > 0 && hash[2] > 0) {
      hash[s.charCodeAt(i) - 97]--;
      i++;
    }

    //* for invalid valid window, expand from right to make it valid again

    //* [i...j] is invalid
    //* then, [i-1...j] is valid
    ans = ans + i; //* i represents all valid starting points of [i-1...j]

    j++;
  }

  return ans;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
