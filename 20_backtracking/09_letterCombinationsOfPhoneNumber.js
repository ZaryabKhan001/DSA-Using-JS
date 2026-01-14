//? LeetCode #17
//? Letter Combinations of a Phone Number

// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

// A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

//? Example 1:
// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

//? Example 2:
// Input: digits = "2"
// Output: ["a","b","c"]

//? Approach
// Mapping digits → letters (like on a phone keypad).
// Use backtracking to build all possible strings:
// At each digit, try every possible letter.
// Add the letter to the current path, recurse for the next digit.
// When the path length equals the number of digits → add to result.
// Return the collected results.

//? Code
var letterCombinations = function (digits) {
  if (!digits.length) return [];
  let letters = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  let result = [];
  let backtrack = (path, index) => {
    if (index === digits.length) {
      result.push(path.join(""));
      return;
    }
    let choices = letters[digits[index]];
    for (let i = 0; i < choices.length; i++) {
      path.push(choices[i]);
      backtrack(path, index + 1);
      path.pop();
    }
  };
  backtrack([], 0);
  return result;
};

//? Time Complexity = O(3N * 4M)
//? Space Complexity = O(N) (output) + O(n) (stack)
