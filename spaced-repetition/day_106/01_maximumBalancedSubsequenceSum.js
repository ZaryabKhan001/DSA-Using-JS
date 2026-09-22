//? LeetCode #2926
//? Maximum Balanced Subsequence Sum

// You are given a 0-indexed integer array nums.

// A subsequence of nums having length k and consisting of indices i0 < i1 < ... < ik-1 is balanced if the following holds:

// nums[ij] - nums[ij-1] >= ij - ij-1, for every j in the range [1, k - 1].
// A subsequence of nums having length 1 is considered balanced.

// Return an integer denoting the maximum possible sum of elements in a balanced subsequence of nums.

// A subsequence of an array is a new non-empty array that is formed from the original array by deleting some (possibly none) of the elements without disturbing the relative positions of the remaining elements.

//? Example 1:
// Input: nums = [3,3,5,6]
// Output: 14
// Explanation: In this example, the subsequence [3,5,6] consisting of indices 0, 2, and 3 can be selected.
// nums[2] - nums[0] >= 2 - 0.
// nums[3] - nums[2] >= 3 - 2.
// Hence, it is a balanced subsequence, and its sum is the maximum among the balanced subsequences of nums.
// The subsequence consisting of indices 1, 2, and 3 is also valid.
// It can be shown that it is not possible to get a balanced subsequence with a sum greater than 14.

//? Example 2:
// Input: nums = [5,-1,-3,8]
// Output: 13
// Explanation: In this example, the subsequence [5,8] consisting of indices 0 and 3 can be selected.
// nums[3] - nums[0] >= 3 - 0.
// Hence, it is a balanced subsequence, and its sum is the maximum among the balanced subsequences of nums.
// It can be shown that it is not possible to get a balanced subsequence with a sum greater than 13.

//? Example 3:
// Input: nums = [-2,-1]
// Output: -1
// Explanation: In this example, the subsequence [-1] can be selected.
// It is a balanced subsequence, and its sum is the maximum among the balanced subsequences of nums.

//? Constraints:
// 1 <= nums.length <= 105
// -109 <= nums[i] <= 109

//? Thought Process:
// The condition for a balanced subsequence is nums[ij] - nums[ij-1] >= ij - ij-1.
// 1. We can simplify it to be nums[ij] - ij >= nums[ij-1] - ij-1. We need for each j(1 to k - 1) these values, So why not preCalculate these for whole nums.
// 2. So instead of working directly with nums, we transform every value into arr[i] = nums[i] - i.
// 3. Now we need to choose a subsequence where arr is non-decreasing.
// 4. That is exactly the structure of the Longest Increasing Subsequence (LIS) problem.
// 5. The difference is that LIS usually maximizes the length, while here we maximize the sum of the original nums[i].
// 6. Therefore, this is essentially a Maximum Sum Non-Decreasing Subsequence problem.
// 7. solve(i, prev) means: starting from index i, what is the maximum sum we can obtain?
// 8. prev stores the previously selected index, so we can check arr[prev] <= arr[i].
// 9. At every index, we have two choices: take nums[i] if it maintains the non-decreasing order, or skip it.
// 10. dp[i][prev + 1] stores these results so we don't solve the same state repeatedly.
// 11. Thus, the LIS connection comes from transforming nums[i] into nums[i] - i; the DP then finds the maximum-sum valid increasing subsequence.

//? Code:
var maxBalancedSubsequenceSum = function (nums) {
  let n = nums.length;

  let max = nums[0];
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = nums[i] - i;
    max = Math.max(max, nums[i]);
  }

  if (max <= 0) {
    return max;
  }

  let dp = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(undefined),
  );

  const solve = (i, prev) => {
    if (i === n) {
      return 0;
    }

    if (dp[i][prev + 1] !== undefined) {
      return dp[i][prev + 1];
    }

    if (prev === -1 || arr[prev] <= arr[i]) {
      let choice1 = nums[i] + solve(i + 1, i);
      let choice2 = solve(i + 1, prev);

      return (dp[i][prev + 1] = Math.max(choice1, choice2));
    }

    return (dp[i][prev + 1] = solve(i + 1, prev));
  };

  return solve(0, -1);
};

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)
