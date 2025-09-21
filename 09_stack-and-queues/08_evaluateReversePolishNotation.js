//? LeetCode #150
//? Evaluate Reverse Polish Notation

// You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

// Evaluate the expression. Return an integer that represents the value of the expression.

//? Note that:
// The valid operators are '+', '-', '*', and '/'.
// Each operand may be an integer or another expression.
// The division between two integers always truncates toward zero.
// There will not be any division by zero.
// The input represents a valid arithmetic expression in a reverse polish notation.
// The answer and all the intermediate calculations can be represented in a 32-bit integer.

//? Example 1:
// Input: tokens = ["2","1","+","3","*"]
// Output: 9
// Explanation: ((2 + 1) * 3) = 9

//? Example 2:
// Input: tokens = ["4","13","5","/","+"]
// Output: 6
// Explanation: (4 + (13 / 5)) = 6

//? Example 3:
// Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
// Output: 22
// Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
// = ((10 * (6 / (12 * -11))) + 17) + 5
// = ((10 * (6 / -132)) + 17) + 5
// = ((10 * 0) + 17) + 5
// = (0 + 17) + 5
// = 17 + 5
// = 22

//? Approach:
// Initialize a stack to store operands.
// Define operator functions using a map:
// Each key (+, -, *, /) maps to a function that performs the respective operation on two numbers.
// Loop through each token in the input array:
// If the token is an operator:
// Pop the top two values from the stack.
// Convert them to numbers and apply the operator function.
// Push the result back to the stack
// If the token is a number:
// Push it directly to the stack.
// Return the final result by popping the last element from the stack and converting it to a number.

var evalRPN = function (arr) {
  let stack = [];
  const map = {
    "+": (a, b) => b + a,
    "*": (a, b) => b * a,
    "-": (a, b) => b - a,
    "/": (a, b) => Math.trunc(b / a),
  };
  for (let i = 0; i < arr.length; i++) {
    if (map[arr[i]]) {
      let a = stack.pop();
      let b = stack.pop();
      let ans = map[arr[i]](+a, +b);
      stack.push(ans);
    } else {
      stack.push(arr[i]);
    }
  }
  return Number(stack.pop());
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
