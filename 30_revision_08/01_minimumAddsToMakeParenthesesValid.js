//? LeetCode #921
//? Minimum Add to Make Parentheses Valid

// A parentheses string is valid if and only if:

// It is the empty string,
// It can be written as AB (A concatenated with B), where A and B are valid strings, or
// It can be written as (A), where A is a valid string.
// You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string.

// For example, if s = "()))", you can insert an opening parenthesis to be "(()))" or a closing parenthesis to be "())))".
// Return the minimum number of moves required to make s valid.

//? Example 1:
// Input: s = "())"
// Output: 1

//? Example 2:
// Input: s = "((("
// Output: 3

//? Constraints:
// 1 <= s.length <= 1000
// s[i] is either '(' or ')'.

//? Approach:
// We traverse the string and keep a counter open to track unmatched '('.
// For every '(', we increment open, and for every ')', we try to match it by decrementing open.
// If open is 0 and we see ')', it means it's invalid, so we increment moves (we need to add '(').
// After traversal, any remaining open represents unmatched '(' that need closing.
// So, the final answer is moves + open.

//? Code:
var minAddToMakeValid = function (s) {
  let opening = (moves = 0);

  for (let i = 0; i < s.length; i = i + 1) {
    if (s[i] === "(") {
      opening++;
    } else {
      if (opening === 0) {
        moves++;
      } else {
        opening--;
      }
    }
  }
  return opening + moves;
};

//? Time Complexity: O(n), where n is the length of the string.
//? Space Complexity: O(1), we are using only a constant amount of space.
