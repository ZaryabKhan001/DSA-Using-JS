//? Largest number in K swaps (gfg)

// Given a number k and string s of digits denoting a positive integer, build the largest number possible by performing swap operations on the digits of s at most k times.

//? Examples :

// Input: s = "1234567", k = 4
// Output: 7654321
// Explanation: Three swaps can make the input 1234567 to 7654321, swapping 1 with 7, 2 with 6 and finally 3 with 5.

// Input: s = "3435335", k = 3
// Output: 5543333
// Explanation: Three swaps can make the input 3435335 to 5543333, swapping 3 with 5, 4 with 5 and finally 3 with 4.

// Input: s = "1034", k = 2
// Output: 4301
// Explanation: Two swaps can make the input 1034 to 4301, swapping 1 with 4 and finally 0 with 3.

//? Constraints:
// 1 ≤ s.size() ≤ 15
// 1 ≤ k ≤ 7

//? Approach:
// 1. We can use a recursive approach to generate all possible numbers by swapping the digits of the string s at most k times.
// 2. We will keep track of the maximum number found during the recursion.
// 3. At each step, we will swap the current digit with the maximum digit that comes after it and recursively call the function with k decremented by 1.
// 4. If k reaches 0, we will compare the current number with the maximum number found so far and update it if necessary.
// 5. Finally, we will return the maximum number found.

//? Code:
class Solution {
  findMaximumNum(s, k) {
    let result = s;
    let arr = s.split("");

    const backTrack = (start, k) => {
      const current = arr.join("");
      if (current > result) {
        result = current;
      }

      if (k == 0 || start == arr.length - 1) {
        return;
      }

      let maxDigit = arr[start];
      for (let i = start + 1; i < arr.length; i++) {
        if (arr[i] > maxDigit) {
          maxDigit = arr[i];
        }
      }

      if (maxDigit == arr[start]) {
        backTrack(start + 1, k);
        return;
      }

      for (let i = start + 1; i < arr.length; i++) {
        if (arr[i] == maxDigit) {
          [arr[start], arr[i]] = [arr[i], arr[start]];

          backTrack(start + 1, k - 1);

          [arr[start], arr[i]] = [arr[i], arr[start]];
        }
      }
    };

    backTrack(0, k);
    return result;
  }
}

//? Time Complexity: O(n^k) k swaps, where n is the length of the string s. In the worst case, we may have to explore all possible combinations of swaps, which can lead to an exponential number of possibilities.
//? Space Complexity: O(n) for the recursion stack, where n is the length of the string s.
