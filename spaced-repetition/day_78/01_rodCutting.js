//? Rod Cutting (gfg)

// Solved
// Given a rod of length n inches and an array price[], where price[i] denotes the value of a piece of length i (1-based Index). Determine the maximum value obtainable by cutting up the rod and selling the pieces.

// Note: The value of n is equal to the size of price array.

// Example:

// Input: price[] = [1, 5, 8, 9, 10, 17, 17, 20]
// Output: 22
// Explanation: The maximum obtainable value is 22 by cutting in two pieces of lengths 2 and 6, i.e., 5 + 17 = 22.

// Input: price[] = [3, 5, 8, 9, 10, 17, 17, 20]
// Output: 24
// Explanation: The maximum obtainable value is 24 by cutting the rod into 8 pieces of length 1, i.e, 8*price[1] = 8*3 = 24.

// Input: price[] = [3]
// Output: 3
// Explanation: There is only 1 way to pick a piece of length 1.

//? Constraints:
// 1 ≤ price.size() ≤ 103
// 1 ≤ price[i] ≤ 106

//? Thought Process:
// 1. Rod Cutting is similar to Knapsack because for every length we have two choices: take or don't take.
// 2. Don't take:
//    solve(n - 1, remaining)
// 3. Take:
//    price[n - 1] + solve(n, remaining - length[n - 1])
// 4. It is Unbounded Knapsack because after taking a length, we keep n the same:
//    solve(n, ...)
//    This allows us to use the same length multiple times.
// 5. DP state is dp[n][remaining], where n is the available lengths and remaining is the remaining rod length.

//? Code:
class Solution {
  cutRod(price) {
    let n = price.length;
    let length = Array.from({ length: n }, (_, index) => index + 1);
    let dp = Array.from({ length: n + 1 }, () =>
      new Array(n + 1).fill(undefined),
    );

    const solve = (n, remaining) => {
      if (n == 0) {
        return 0;
      }

      if (remaining == 0) {
        return 0;
      }

      if (dp[n - 1][remaining] != undefined) {
        return dp[n - 1][remaining];
      }

      if (length[n - 1] <= remaining) {
        return (dp[n - 1][remaining] = Math.max(
          solve(n - 1, remaining),
          price[n - 1] + solve(n, remaining - length[n - 1]),
        ));
      } else {
        return (dp[n - 1][remaining] = solve(n - 1, remaining));
      }
    };

    return solve(n, n);
  }
}

//? Time Complexity: O(n^2)
//? Space Complexity: O(n^2)
