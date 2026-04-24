//? LeetCode #1781
//? Sum of Beauty of All Substrings

// The beauty of a string is the difference in frequencies between the most frequent and least frequent characters.

// For example, the beauty of "abaacc" is 3 - 1 = 2.
// Given a string s, return the sum of beauty of all of its substrings.

//? Example 1:
// Input: s = "aabcb"
// Output: 5
// Explanation: The substrings with non-zero beauty are ["aab","aabc","aabcb","abcb","bcb"], each with beauty equal to 1.

//? Example 2:
// Input: s = "aabcbaa"
// Output: 17

//? Constraints:
// 1 <= s.length <= 500
// s consists of only lowercase English letters.

//? Approach:
// Iterate over all possible substrings using two loops → Use an outer loop to fix the starting index and an inner loop to expand the substring one character at a time.
// Initialize a frequency array → For each starting index, create a frequency array of size 26 (for lowercase English letters) initialized with 0.
// Expand the substring → As the inner loop progresses, include one character at a time in the substring and update its frequency in the array.
// For every substring:
// Update frequency → Increment the count of the current character in the frequency array.
// Find maximum and minimum frequency → Traverse the frequency array to determine:
// max → highest frequency of any character.
// min → lowest frequency excluding 0 (ignore characters not present in the substring).
// Calculate beauty → Add (max - min) to the result for the current substring.
// Accumulate result → Keep adding the beauty value of each substring to a running total.
// Return the final sum → After processing all substrings, return the accumulated result.

//? Code:
var beautySum = function (s) {
  let n = s.length;
  let beautySum = 0;
  for (let i = 0; i < n; i = i + 1) {
    let freq = new Array(26).fill(0);
    for (let j = i; j < n; j = j + 1) {
      let char = s[j];
      let index = char.charCodeAt(0) - "a".charCodeAt(0);
      freq[index]++;

      let min = Infinity;
      let max = 0;

      for (let k = 0; k < freq.length; k = k + 1) {
        if (freq[k] > 0) {
          min = Math.min(min, freq[k]);
          max = Math.max(max, freq[k]);
        }
      }
      beautySum = beautySum + (max - min);
    }
  }
  return beautySum;
};

//? Time Complexity: O(n^2) - We have two nested loops to generate all substrings, and the innermost loop to calculate max and min frequencies runs in O(1) time since it iterates over a fixed size array of 26 characters.
//? Space Complexity: O(1) - The frequency array size is constant (26 letters).
