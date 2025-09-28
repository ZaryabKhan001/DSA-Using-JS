//? LeetCode #20
//? Valid Parentheses

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

//? Example 1:
// Input: s = "()"
// Output: true

//? Example 2:
// Input: s = "()[]{}"
// Output: true

//? Example 3:
// Input: s = "(]"
// Output: false

//? Example 4:
// Input: s = "([])"
// Output: true

//? Example 5:
// Input: s = "([)]"
// Output: false

//? Approach:
// We use a stack to keep track of opening brackets.
// When we encounter a closing bracket, we check if it correctly matches the top element of the stack.
// If all brackets match and the stack is empty at the end, the string is valid.

var isValid = function (s) {
  let stack = [];
  let map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  for (let i = 0; i < s.length; i = i + 1) {
    if (map[s[i]]) {
      stack.push(s[i]);
    } else {
      let top = stack[stack.length - 1];
      if (stack.length === 0) {
        return false;
      } else if (map[top] === s[i]) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
