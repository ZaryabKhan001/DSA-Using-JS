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

    const backTrack = (index, capacity) => {
      // base case
      if (index == val.length || capacity == 0) {
        return 0;
      }

      // can't take current item
      if (wt[index] > capacity) {
        return backTrack(index + 1, capacity);
      } else {
        // Take or don't take
        return Math.max(
          backTrack(index + 1, capacity),
          val[index] + backTrack(index + 1, capacity - wt[index]),
        );
      }
    };

    return backTrack(0, W);
  }
}

//? Time Complexity: O(2^n) (exponential) - because we are making two choices for each item (include or exclude)
//? Space Complexity: O(n) - because of the recursion stack

//? Memoization Approach:
// Everything remins same as above, but we store already computed values in a dp array to avoid recomputation. This reduces the time complexity to O(n * W) and space complexity to O(n * W).

//? Code:
class Solution {
  knapsack(W, val, wt) {
    const dp = Array.from({ length: val.length + 1 }, () =>
      new Array(W + 1).fill(-1),
    );

    const backTrack = (index, capacity) => {
      // base case
      if (index == val.length || capacity == 0) {
        return 0;
      }

      // already computed
      if (dp[index][capacity] != -1) {
        return dp[index][capacity];
      }

      // can't take current item
      if (wt[index] > capacity) {
        return (dp[index][capacity] = backTrack(index + 1, capacity));
      } else {
        // Take or don't take
        return (dp[index][capacity] = Math.max(
          backTrack(index + 1, capacity),
          val[index] + backTrack(index + 1, capacity - wt[index]),
        ));
      }
    };

    return backTrack(0, W);
  }
}

//? Time Complexity: O(n * W)
//? Space Complexity: O(n * W)

//? Bottom UP (Tabulation) Approach:

//? Code:
class Solution {
  knapsack(W, val, wt) {
    let n = val.length;
    let dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(-1));

    // initialization
    for (let i = n; i >= 0; i = i - 1) {
      dp[0][i] = 0;
    }
    for (let i = 0; i <= W; i = i + 1) {
      dp[n][i] = 0;
    }

    // loops to build other cells
    for (let index = n - 1; index >= 0; index--) {
      for (let capacity = 1; capacity <= W; capacity++) {
        let skip = dp[index + 1][capacity];

        let take = 0;

        if (wt[index] <= capacity) {
          take = val[index] + dp[index + 1][capacity - wt[index]];
        }

        dp[index][capacity] = Math.max(skip, take);
      }
    }

    return dp[0][W];
  }
}

//? Time Complexity: O(n * W)
//? Space Complexity: O(n * W)
