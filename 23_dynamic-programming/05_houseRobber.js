//? LeetCode #198
//? House Robber

// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

//? Example 1:
// Input: nums = [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
// Total amount you can rob = 1 + 3 = 4.

//? Example 2:
// Input: nums = [2,7,9,3,1]
// Output: 12
// Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
// Total amount you can rob = 2 + 9 + 1 = 12.

//? Approach:
// Choice at each house (i):
// Either rob house i → then you must skip house i-1, so profit = val[i] + dp[i-2].
// Or i → then profit = dp[i-1]
// Take maximum of the two. dp[i]=max(val[i]+dp[i−2],dp[i−1])
//? Base cases:
// If n == 0 → return 0
// If n == 1 → return val[0]
//? Initialize:
// dp[0] = val[0]
// dp[1] = max(val[0], val[1])
//? Optimization:
// Notice that to compute dp[i], we only need the last two states (dp[i-1] and dp[i-2]).
// So instead of a full array, we use two variables:
// p1 → previous (dp[i-1])
// p2 → second previous (dp[i-2])

//? Code:
var rob = function (nums) {
  //? Edge Case
  if (nums.length === 1) return nums[0];

  //? base case
  let first = nums[0];
  let second = Math.max(nums[0], nums[1]);

  //? procesing
  for (let i = 2; i < nums.length; i = i + 1) {
    let temp = second;
    second = Math.max(first + nums[i], second);
    first = temp;
  }

  return second;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
