//? LeetCode #1189
//? Maximum Number of Balloons

// Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.

// You can use each character in text at most once. Return the maximum number of instances that can be formed.

//? Example 1:
// Input: text = "nlaebolko"
// Output: 1

//? Example 2:
// Input: text = "loonbalxballpoon"
// Output: 2

//? Example 3:
// Input: text = "leetcode"
// Output: 0

//? Constraints:
// 1 <= text.length <= 104
// text consists of lower case English letters only.

//? Approach:
// We can solve this problem by counting the frequency of each character in the text.
// Then, we can find the minimum frequency of the characters required to form the word "balloon".
// The word "balloon" requires 1 'b', 1 'a', 2 'l', 2 'o', and 1 'n'.
// So, the minimum frequency of these characters will give us the maximum number of "balloon" instances that can be formed.

//? Code:
var maxNumberOfBalloons = function (text) {
  let freq = {};
  for (let char of text) {
    freq[char] = (freq[char] || 0) + 1;
  }

  return Math.min(
    freq["b"] || 0,
    freq["a"] || 0,
    Math.floor((freq["l"] || 0) / 2),
    Math.floor((freq["o"] || 0) / 2),
    freq["n"] || 0,
  );
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
