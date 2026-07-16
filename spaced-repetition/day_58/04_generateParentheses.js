//? LeetCode: 22
//? Generate Parentheses

// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

//? Example 1:
// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]

//? Example 2:
// Input: n = 1
// Output: ["()"]

//? Constraints:
// 1 <= n <= 8

//? Approach:
// We can use recursion to solve this problem.
// We can use a helper function that takes the input string and the output string as parameters.
// The helper function will recursively call itself with the remaining input string and the output string.
// The base case is when the input string is empty, in which case we add the output string to the result array.
// In the recursive step, we have two choices:
// 1. Add '(' to the output string.
// 2. Add ')' to the output string.
// But we can only add ')' if the number of open parentheses is greater than the number of closed parentheses.

//? Code:
var generateParenthesis = function (n) {
  let result = [];

  const recursive = (o, c, output) => {
    if (o === 0 && c === 0) {
      result.push(output);
      return;
    }
    if (o === c) {
      recursive(o - 1, c, output + "(");
    } else if (o === 0) {
      recursive(o, c - 1, output + ")");
    } else {
      recursive(o - 1, c, output + "(");
      recursive(o, c - 1, output + ")");
    }
  };

  recursive(n, n, "");
  return result;
};

//? Time Complexity: O(N * Cn) Cn * N are total calls and N is for string concatenation in each call
//? Space Complexity: O(N * Cn) where Cn are the leaf node calls and saving result and n is for storing output string
