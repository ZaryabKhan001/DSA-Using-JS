//? 151
//? Reverse Words in a String

// Given an input string s, reverse the order of the words.

// A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

// Return a string of the words in reverse order concatenated by a single space.

// Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

//? Example 1:
// Input: s = "the sky is blue"
// Output: "blue is sky the"

//? Example 2:
// Input: s = "  hello world  "
// Output: "world hello"
// Explanation: Your reversed string should not contain leading or trailing spaces.

//? Example 3:
// Input: s = "a good   example"
// Output: "example good a"
// Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.

//? Constraints:
// 1 <= s.length <= 104
// s contains English letters (upper-case and lower-case), digits, and spaces ' '.
// There is at least one word in s.

//? Approach:
// 1. Trim the input string to remove leading and trailing spaces.
// 2. Split the trimmed string into an array of words using space as a delimiter.
// 3. Reverse the array of words.
// 4. Join the reversed array of words into a single string with a single space as a separator.
// 5. Return the resulting string.

//* using built-in functions
var reverseWords = function (s) {
  return s.trim().split(/\s+/).reverse().join(" ");
};

//* without using built-in functions
var reverseWords = function (s) {
  let word = "";
  let words = [];

  for (let i = 0; i < s.length; i = i + 1) {
    let char = s[i];
    if (char !== " ") {
      word += char;
    } else {
      if (word !== "") {
        words.unshift(word);
        word = "";
      }
    }
  }
  //* last word
  if (word !== "") {
    words.unshift(word);
  }

  //* build answer
  let ans = "";
  for (let i = 0; i < words.length; i = i + 1) {
    ans += words[i];
    if (i < words.length - 1) ans += " ";
  }

  return ans;
};

//? Time Complexity: O(n * k) where n is the length of the input string and k is the average length of the words.
//? Space Complexity: O(n) where n is the length of the input string, as we are storing the words in an array and the final result string.
