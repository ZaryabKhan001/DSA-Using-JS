//? LeetCode #3612
//? Process String with Special Operations I

// You are given a string s consisting of lowercase English letters and the special characters: *, #, and %.

// Build a new string result by processing s according to the following rules from left to right:

// If the letter is a lowercase English letter append it to result.
// A '*' removes the last character from result, if it exists.
// A '#' duplicates the current result and appends it to itself.
// A '%' reverses the current result.
// Return the final string result after processing all characters in s.

//? Example 1:
// Input: s = "a#b%*"
// Output: "ba"

//? Constraints:
// 1 <= s.length <= 20
// s consists of only lowercase English letters and special characters *, #, and %.

//? Approach:
// We can use an array to store the result.
// We iterate through the string and append the character to the array if it is a lowercase English letter.
// If the character is '*', we pop the last element from the array if it exists.
// If the character is '#', we duplicate the current result and append it to itself.
// If the character is '%', we reverse the current result.

//? Code:
function processStr(s) {
  const res = [];

  for (let char of s) {
    if (char === "*") {
      if (res.length > 0) {
        res.pop();
      }
    } else if (char === "#") {
      res.push(...res);
    } else if (char === "%") {
      res.reverse();
    } else {
      res.push(char);
    }
  }

  return res.join("");
}

//? Time Complexity: O(n) because we are iterating through the string once.
//? Space Complexity: O(n) because we are storing the result in an array.
