//? 856. Score of Parentheses

// Given a balanced parentheses string s, return the score of the string.

// The score of a balanced parentheses string is based on the following rule:

// "()" has score 1.
// AB has score A + B, where A and B are balanced parentheses strings.
// (A) has score 2 * A, where A is a balanced parentheses string.

//? Example 1:
// Input: s = "()"
// Output: 1

//? Example 2:
// Input: s = "(())"
// Output: 2

//? Example 3:
// Input: s = "()()"
// Output: 2

//? Constraints:
// 2 <= s.length <= 50
// s consists of only '(' and ')'.
// s is a balanced parentheses string.

//? Approach:
// 1. Use a recursive `dfs()` function to evaluate the score of the current balanced parenthesis block while maintaining a global index `i`.
// 2. When encountering `"()"`, add `1` to the current score; for a nested structure `"(A)"`, recursively compute the inner score and add `2 * innerScore`.
// 3. Each recursive call processes characters until it reaches the matching `')'`, then returns the accumulated score for that block.
// 4. Sequential blocks are naturally handled by summing their scores during the traversal, resulting in an **O(n)** single-pass solution.


//? Code:
var scoreOfParentheses = function (s) {
  let i = 0;

  const dfs = () => {
    let score = 0;

    while (i < s.length) {
      let char = s[i];
      let nextChar = s[i + 1];

      //* char is (
      if (char === "(") {
        if (nextChar === ")") {
          score++;
          i = i + 2;
        } else {
          i++;
          let innerScore = dfs();
          score = score + innerScore * 2;
        }
      } else {
        i++;
        return score;
      }
    }

    return score;
  };

  return dfs();
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
