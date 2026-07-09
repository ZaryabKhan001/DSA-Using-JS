//? Permutation with Spaces (gfg)

// Given a string s, you need to print all possible strings that can be made by placing spaces (zero or one) in between them. The output should be printed in sorted increasing order of strings.

//? Example 1:
// Input:
// s = "ABC"
// Output: (A B C)(A BC)(AB C)(ABC)
// Explanation:
// ABC
// AB C
// A BC
// A B C
// These are the possible combination of "ABC".

//? Example 2:
// Input:
// s = "BBR"
// Output: (B B R)(B BR)(BB R)(BBR)

//? Your Task:
// You don't need to read input or print anything. Your task is to complete the function permutation() which takes the string s as input parameters and returns the sorted array of the string denoting the different permutations (DON'T ADD '(' and ')' it will be handled by the driver code only).

//? CONSTRAINTS:
// 1 <= |s| < 10
// s only contains lowercase and Uppercase English letters.

//? Approach:
// We can use recursion to solve this problem.
// We can use a helper function that takes the input string and the output string as parameters.
// The helper function will recursively call itself with the remaining input string and the output string.
// The base case is when the input string is empty, in which case we add the output string to the result array.
// In the recursive step, we have two choices:
// 1. Add the current character to the output string without a space.
// 2. Add the current character to the output string with a space.

//? Code:
class Solution {
  permutation(s) {
    let result = [];

    const recursive = (input, output) => {
      if (input.length == 0) {
        result.push(output);
        return;
      }

      let op1 = output + input[0];
      let op2 = output + " " + input[0];
      let remaining = input.slice(1);

      if (output.length == 0) {
        recursive(remaining, op1);
        return;
      }
      recursive(remaining, op1);
      recursive(remaining, op2);
    };

    recursive(s, "");
    return result.sort();
  }
}

//? Time Complexity: O(m log m) where m is 2^n.
//? Space Complexity: O(n * 2^n)
