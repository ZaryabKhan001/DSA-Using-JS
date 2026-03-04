//? LeetCode #300
//? Longest Increasing Subsequence

// Given an integer array nums, return the length of the longest strictly increasing subsequence.

//? Example 1:
// Input: nums = [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

//? Example 2:
// Input: nums = [0,1,0,3,2,3]
// Output: 4

// Example 3:
// Input: nums = [7,7,7,7,7,7,7]
// Output: 1

//? Constraints:
// 1 <= nums.length <= 2500
// -104 <= nums[i] <= 104

//? Approach:
// Use Dynamic Programming (DP) to compute the Longest Increasing Subsequence (LIS).
// Create a dp array where dp[i] stores the length of the LIS ending at index i.
// Initialize all dp[i] = 1 (each element alone is an LIS).
// For each element arr[i], check all previous elements arr[j] (0 ≤ j < i):
// If arr[j] < arr[i], update dp[i] = max(dp[i], dp[j] + 1).
// Keep track of the maximum LIS length while filling dp.
// Return the maximum LIS length.

//? Code:
var lengthOfLIS = function (arr) {
  let n = arr.length;
  let dp = Array(n).fill(1);
  dp[0] = 1;
  let lisLength = 1;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        lisLength = Math.max(lisLength, dp[i]);
      }
    }
  }
  return lisLength;
};

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)
