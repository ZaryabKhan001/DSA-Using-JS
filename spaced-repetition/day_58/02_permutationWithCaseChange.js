//? Permutation with Case Change

// Given a string s, you need to print all possible strings that can be made by changing the case of the characters in the string.

//? Example 1:
// Input:
// s = "abc"
// Output: abc Abc aBc ABc abC AbC aBC ABC

//? CONSTRAINTS:
// s only contains lowercase and lowerCase English letters.

//? Approach:
// We can use recursion to solve this problem.
// We can use a helper function that takes the input string and the output string as parameters.
// The helper function will recursively call itself with the remaining input string and the output string.
// The base case is when the input string is empty, in which case we add the output string to the result array.
// In the recursive step, we have two choices:
// 1. Add the current character to the output string without changing its case.
// 2. Add the current character to the output string with its case changed.

//? Code:
const permutation = (s) => {
  let result = [];

  const recursive = (input, output) => {
    if (input.length == 0) {
      result.push(output);
      return;
    }

    let op1 = output + input[0];
    let op2 = output + input[0].toUpperCase();
    let remaining = input.slice(1);

    recursive(remaining, op1);
    recursive(remaining, op2);
  };

  recursive(s, "");
  return result;
};

//? Time Complexity: O(n * 2^n)
//? Space Complexity: O(n * 2^n)
