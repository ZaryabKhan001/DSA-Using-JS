//? LeetCode #1420
//? Build Array Where You Can Find The Maximum Exactly K Comparisons

// You are given three integers n, m and k. Consider the following algorithm to find the maximum element of an array of positive integers:

// You should build the array arr which has the following properties:

// arr has exactly n integers.
// 1 <= arr[i] <= m where (0 <= i < n).
// After applying the mentioned algorithm to arr, the value search_cost is equal to k.
// Return the number of ways to build the array arr under the mentioned conditions. As the answer may grow large, the answer must be computed modulo 109 + 7.

//? Example 1:
// Input: n = 2, m = 3, k = 1
// Output: 6
// Explanation: The possible arrays are [1, 1], [2, 1], [2, 2], [3, 1], [3, 2] [3, 3]

//? Example 2:
// Input: n = 5, m = 2, k = 3
// Output: 0
// Explanation: There are no possible arrays that satisfy the mentioned conditions.

//? Example 3:
// Input: n = 9, m = 1, k = 1
// Output: 1
// Explanation: The only possible array is [1, 1, 1, 1, 1, 1, 1, 1, 1]

//? Constraints:
// 1 <= n <= 50
// 1 <= m <= 100
// 0 <= k <= n

//? Thought Process:
// The important observation is that searchCost tracks the number of times we encounter a new maximum while building the array.

// For example, consider:

// [3, 1, 2, 4]

// The maximum changes like this:

// 3 → 4

// So the search cost is 2.

// This is related to the idea of an increasing sequence, but it is not the same as LIS. The LIS of [3, 1, 2, 4] is [1, 2, 4], which has length 3, while the search cost is only 2.

// Therefore, I don't need to calculate LIS separately. I only need to maintain:

// index — where I am in the array

// maxSoFar — the maximum value encountered so far

// searchCost — how many times the maximum has changed

// Whenever I choose a value greater than maxSoFar, I update maxSoFar and increase searchCost by 1.

// If I reach the end of the array with searchCost === k, I have found a valid array.

// Since the same state

// solve(index, maxSoFar, searchCost)

// can be reached through different choices, the remaining problem is identical. Therefore, there are overlapping subproblems, making recursion + memoization (DP) a natural solution.

//? Code:
var numOfArrays = function (n, m, k) {
  const MOD = 10 ** 9 + 7;

  let memo = new Map();

  const solve = (index, maxSoFar, searchCost) => {
    if (index === n) {
      if (searchCost === k) {
        return 1;
      }
      return 0;
    }

    let key = `${index}_${maxSoFar}_${searchCost}`;

    if (memo.has(key)) {
      return memo.get(key);
    }

    let ways = 0;

    for (let i = 1; i <= m; i = i + 1) {
      if (i > maxSoFar) {
        ways = (ways + solve(index + 1, i, searchCost + 1)) % MOD;
      } else {
        ways = (ways + solve(index + 1, maxSoFar, searchCost)) % MOD;
      }
    }

    memo.set(key, ways);
    return ways;
  };

  return solve(0, 0, 0);
};

//? Time Complexity: O(n × m × k) × O(m)
//? Space Complexity: O(n  m  k)
