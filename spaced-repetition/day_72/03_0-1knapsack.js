//? 0 - 1 Knapsack Problem (gfg)

// Given two arrays, val[] and wt[], where each element represents the value and weight of an item respectively, and an integer W representing the maximum capacity of the knapsack (the total weight it can hold).

// The task is to put the items into the knapsack such that the total value obtained is maximum without exceeding the capacity W.

// Note: You can either include an item completely or exclude it entirely — fractional selection of items is not allowed. Each item is available only once.

//? Examples :

// Input: W = 4, val[] = [1, 2, 3], wt[] = [4, 5, 1]
// Output: 3
// Explanation: Choose the last item, which weighs 1 unit and has a value of 3.

// Input: W = 3, val[] = [1, 2, 3], wt[] = [4, 5, 6]
// Output: 0
// Explanation: Every item has a weight exceeding the knapsack's capacity (3).

// Input: W = 5, val[] = [10, 40, 30, 50], wt[] = [5, 4, 2, 3]
// Output: 80
// Explanation: Choose the third item (value 30, weight 2) and the last item (value 50, weight 3) for a total value of 80.

//? Constraints:
// 1 ≤ val.size() = wt.size() ≤ 103
// 1 ≤ W ≤ 103
// 1 ≤ val[i] ≤ 103
// 1 ≤ wt[i] ≤ 103

//? Thought Process:
// In this question we are given choices of items to put in a knapsack. Each item has a weight and a value. We want to maximize the total value of the items we put in the knapsack without exceeding its weight capacity.
// Two trigger points are there for dp.
// 1: find maxProfit (optimization)
// 2: find the items that are included in the knapsack (backtracking) (choices)

// Build recursive tree first. If we start from last item, and try choices of including it or excluding it, and making input array items smaller and smaller, we can reach base case of 0 items or 0 capacity. Then we can build the solution from Top down. We can use memoization to store already computed values to avoid recomputation.

//? Code:
class Solution {
  knapsack(W, val, wt) {
    const dp = Array.from({ length: val.length + 1 }, () =>
      new Array(W + 1).fill(-1),
    );

    const backTrack = (n, capacity) => {
      // base case
      if (n == 0 || capacity == 0) {
        return 0;
      }

      // already computed
      if (dp[n][capacity] != -1) {
        return dp[n][capacity];
      }

      // can't take current item
      if (wt[n - 1] > capacity) {
        return (dp[n][capacity] = backTrack(n - 1, capacity));
      } else {
        // Take or don't take
        return (dp[n][capacity] = Math.max(
          backTrack(n - 1, capacity),
          val[n - 1] + backTrack(n - 1, capacity - wt[n - 1]),
        ));
      }
    };

    return backTrack(val.length, W);
  }
}

//? Time Complexity: O(n * W)
//? Space Complexity: O(n * W)

//? Bottom UP (Tabulation) Approach:

//? Code:
class Solution {
  knapsack(W, val, wt) {
    let n = val.length;
    const dp = Array.from({ length: val.length + 1 }, () =>
      new Array(W + 1).fill(-1),
    );

    // initialization
    // fill first row
    for (let i = 0; i <= W; i = i + 1) {
      dp[0][i] = 0;
    }

    // fill first column
    for (let i = 0; i <= n; i = i + 1) {
      dp[i][0] = 0;
    }

    // fill whole matrix based on previously filled values
    for (let i = 1; i <= n; i = i + 1) {
      for (let capacity = 1; capacity <= W; capacity = capacity + 1) {
        if (wt[i - 1] <= capacity) {
          dp[i][capacity] = Math.max(
            val[i - 1] + dp[i - 1][capacity - wt[i - 1]],
            dp[i - 1][capacity],
          );
        } else {
          dp[i][capacity] = dp[i - 1][capacity];
        }
      }
    }

    return dp[n][W];
  }
}

//? Time Complexity: O(n * W)
//? Space Complexity: O(n * W)
