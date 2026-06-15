//? LeetCode #1249
//? Minimum Remove to Make Valid Parentheses

// Given a string s of '(' , ')' and lowercase English characters.

// Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

// Formally, a parentheses string is valid if and only if:

// It is the empty string, contains only lowercase characters, or
// It can be written as AB (A concatenated with B), where A and B are valid strings, or
// It can be written as (A), where A is a valid string.

//? Example 1:
// Input: s = "lee(t(c)o)de)"
// Output: "lee(t(c)o)de"
// Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.

//? Example 2:
// Input: s = "a)b(c)d"
// Output: "ab(c)d"

//? Example 3:
// Input: s = "))(("
// Output: ""
// Explanation: An empty string is also valid.

//? Constraints:
// 1 <= s.length <= 105
// s[i] is either '(' , ')', or lowercase English letter.

//? Approach:
// We can use a stack to keep track of the indices of the open parentheses.
// When we encounter a closing parenthesis, we check if the stack is empty.
// If the stack is empty, it means the closing parenthesis is not balanced, so we remove it.
// If the stack is not empty, we pop the top element from the stack, which means the closing parenthesis is balanced.
// After iterating through the string, we check if the stack is empty.
// If the stack is not empty, it means the open parentheses are not balanced, so we remove them.

//? Code:
var minRemoveToMakeValid = function (s) {
  let arr = s.split("");
  let stack = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(") {
      stack.push(i);
    } else if (arr[i] === ")") {
      if (stack.length) {
        stack.pop();
      } else {
        arr[i] = "";
      }
    }
  }

  while (stack.length) {
    arr[stack.pop()] = "";
  }

  return arr.join("");
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
