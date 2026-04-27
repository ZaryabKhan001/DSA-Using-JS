//? LeetCode #394
//? Decode String

// Given an encoded string, return its decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

// You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].

// The test cases are generated so that the length of the output will never exceed 105.

//? Example 1:
// Input: s = "3[a]2[bc]"
// Output: "aaabcbc"

//? Example 2:
// Input: s = "3[a2[c]]"
// Output: "accaccacc"

//? Example 3:
// Input: s = "2[abc]3[cd]ef"
// Output: "abcabccdcdcdef"

//? Constraints:
// 1 <= s.length <= 30
// s consists of lowercase English letters, digits, and square brackets '[]'.
// s is guaranteed to be a valid input.
// All the integers in s are in the range [1, 300].

//? Approach: Recursion with Index Tracking
// This solution uses **recursion with index tracking** to decode nested encoded strings.
// We iterate through the string, building numbers and characters; when we hit `[`, we recursively decode the substring starting from the next index.
// Each recursive call returns both the decoded string and the position where that segment ends (at `]`), allowing the outer call to continue correctly.
// The decoded substring is then repeated based on the parsed number and appended to the result.

//? Code:
var decodeString = function (s, start = 0) {
  let ans = "";
  let number = "";

  for (let i = start; i < s.length; i = i + 1) {
    let char = s[i];

    //* alphabets
    if (char >= "a" && char <= "z") {
      ans += char;
    }

    //* numbers
    else if (char >= "0" && char <= "9") {
      number += char;
    }

    //* for [
    else if (char === "[") {
      let [innerAnswer, nextIndex] = decodeString(s, i + 1);

      let n = Number(number) || 0;
      ans += innerAnswer.repeat(n);

      number = "";
      i = nextIndex;
    }

    //* for ]
    else if (char === "]") {
      return [ans, i];
    }
  }

  return ans;
};

// Time Complexity = O(n x k) where n is length of string and k is max repetition.
// Space Complexity = O(n)
