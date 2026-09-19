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
// At first, this problem looks extremely difficult, but once I understand what the problem is actually asking, it becomes much simpler.

// I have to build an array of size `n`, where every element can be a number from `1` to `m`.
// While building the array, I need to keep track of the `searchCost`.
// Whenever I choose a number greater than the current `maxSoFar`, the maximum value changes, so the search cost increases by 1.
// At the end, if `searchCost === k`, I have found a valid array, so I return 1. Otherwise, I return 0.
// For every index, I have `m` choices: I can choose any number from `1` to `m`. Therefore, recursion can explore all possible arrays.

// However, different choices can lead to the same state:
// `solve(index, maxSoFar, searchCost)`
// Once I reach the same state, the remaining problem is exactly the same. Therefore, there are overlapping subproblems, so recursion + memoization is a good fit.

//* The important observation is that `searchCost` is similar to the idea of LIS.

// Every time I choose a value greater than the current maximum, I am essentially extending the sequence of maximum values.

// So a valid array is one where this increasing maximum sequence has exactly `k` changes.
// I don't actually need to calculate LIS separately. That would add unnecessary work.
// Instead, I can simply maintain `maxSoFar` and `searchCost` while building the array.
// This allows me to track the required cost directly during recursion.

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
