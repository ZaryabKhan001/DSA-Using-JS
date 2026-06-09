//? LeetCode #227
//? Basic Calculator II

// Given a string s which represents an expression, evaluate this expression and return its value.

// The integer division should truncate toward zero.

// You may assume that the given expression is always valid. All intermediate results will be in the range of [-231, 231 - 1].

// Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

//? Example 1:
// Input: s = "3+2*2"
// Output: 7

//? Example 2:
// Input: s = " 3/2 "
// Output: 1

//? Example 3:
// Input: s = " 3+5 / 2 "
// Output: 5

//? Constraints:
// 1 <= s.length <= 3 * 105
// s consists of integers and operators ('+', '-', '*', '/') separated by some number of spaces.
// s represents a valid expression.
// All the integers in the expression are non-negative integers in the range [0, 231 - 1].
// The answer is guaranteed to fit in a 32-bit integer.

//? Approach:
// We can use a stack to keep track of the numbers and the operations. We can iterate through the string and for each character, we can check if it is a number or an operator. If it is a number, we can keep track of it until we encounter an operator. If it is an operator, we can perform the operation on the last number in the stack and the current number and push the result back to the stack. At the end, we can sum up all the numbers in the stack to get the final result.

//? Code:
var calculate = function (s) {
  let stack = [];
  let num = 0;
  let op = "+";
  for (let i = 0; i < s.length; i = i + 1) {
    let char = s[i];

    //* if character is number
    if (char <= "9" && char >= "0") {
      num = num * 10 + Number(char);
    }

    //* if character is a sign
    if ((char !== " " && (char < "0" || char > "9")) || i === s.length - 1) {
      if (op === "+") {
        stack.push(num);
      } else if (op === "-") {
        stack.push(-num);
      } else if (op === "*") {
        stack.push(stack.pop() * num);
      } else if (op === "/") {
        let last = stack.pop();
        stack.push(Math.trunc(last / num));
      }

      op = char;
      num = 0;
    }
  }

  return stack.reduce((a, b) => a + b, 0);
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
