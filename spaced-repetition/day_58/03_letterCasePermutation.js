//? LeetCode: 784
//? Letter Case Permutation

// Given a string s, you can transform every letter individually to be lowercase or uppercase to create another string.

// Return a list of all possible strings we could create. Return the output in any order.

//? Example 1:
// Input: s = "a1b2"
// Output: ["a1b2","a1B2","A1b2","A1B2"]

//? Example 2:
// Input: s = "3z4"
// Output: ["3z4","3Z4"]

//? Constraints:
// 1 <= s.length <= 12
// s consists of lowercase English letters, uppercase English letters, and digits.

//? Approach:
// We can use recursion to solve this problem.
// We can use a helper function that takes the input string and the output string as parameters.
// The helper function will recursively call itself with the remaining input string and the output string.
// The base case is when the input string is empty, in which case we add the output string to the result array.
// In the recursive step, we have two choices for alphabets:
// 1. Add the current character to the output string with lower case.
// 2. Add the current character to the output string with upper case.
// If the current character is a digit, we only have one choice: add the current character to the output string.

//? Code:
var letterCasePermutation = function (s) {
  let result = [];

  const recursive = (input, output) => {
    if (input.length === 0) {
      result.push(output);
      return;
    }

    let char = input[0];
    let remaining = input.slice(1);
    if (char >= "0" && char <= "9") {
      recursive(remaining, output + char);
    } else {
      recursive(remaining, output + char.toLowerCase());
      recursive(remaining, output + char.toUpperCase());
    }
  };

  recursive(s, "");
  return result;
};

//? Time Complexity: O(2^N * N)
//? Space Complexity: O(2^N * N)
