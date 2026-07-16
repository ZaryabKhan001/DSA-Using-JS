//? All String Permutations in Sorted Order (gfg)

// Given a string s. Find all permutations  of a given string. Return the permutations in lexicographically non-decreasing order.

//? Examples :

// Input: s = "AA"
// Output: ["AA", "AA"]
// Explanation: There are total 2 permutations, as given in the output.

// Input: s = "ABC"
// Output: ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]
// Explanation: There are total 6 permutations, as given in the output.

//? Constraints:
// 1 ≤ s.size() ≤ 5

//? Approach 01: IP/OP (Input/Output) Recursion
// The idea is to use recursion to generate all permutations of the string. We will keep track of the characters we have used in the current permutation to avoid duplicates.

//? Code:
class Solution {
  permutation(s) {
    let result = [];

    const permutate = (input, output) => {
      let usedChoices = new Set();
      if (input == "") {
        result.push(output);
        return;
      }

      for (let i = 0; i < input.length; i = i + 1) {
        let choice = input[i];

        if (!usedChoices.has(choice)) {
          let newInput = input.slice(0, i) + input.slice(i + 1);
          let newOutput = output + choice;

          usedChoices.add(choice);

          permutate(newInput, newOutput);
        }
      }
    };
    permutate(s, "");
    return result;
  }
}

//? Time Complexity: O(n! * n^2) where n is the length of the string. The number of permutations of a string of length n is n!, and for each permutation, we are creating a new string which takes O(n) time.
//? Space Complexity: O(n! + n^2) for the recursion stack and for storing all permutations in the result array.

//? Approach 02: Backtracking
// The idea is to use backtracking to generate all permutations of the string. We will swap characters in the string to generate permutations and backtrack to restore the original string after exploring each permutation.

//? Code:
class Solution {
  permutation(s) {
    let result = [];
    let arr = s.split("");

    const backTrack = (start) => {
      if (start == arr.length) {
        result.push(arr.join(""));
        return;
      }

      for (let i = start; i < arr.length; i = i + 1) {
        [arr[i], arr[start]] = [arr[start], arr[i]];
        backTrack(start + 1);
        [arr[i], arr[start]] = [arr[start], arr[i]];
      }
    };

    backTrack(0);
    return result;
  }
}

//? Time Complexity: O(n! * n) where n is the length of the string. The number of permutations of a string of length n is n!, and for each permutation, we are creating a new string which takes O(n) time.
//? Space Complexity: O(n! + n) for the recursion stack and for storing all permutations in the result array.
