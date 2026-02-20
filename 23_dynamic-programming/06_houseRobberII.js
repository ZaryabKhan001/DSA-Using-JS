//? LeetCode #213
//? House Robber II

// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

//? Example 1:
// Input: nums = [2,3,2]
// Output: 3
// Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.

//? Example 2:
// Input: nums = [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
// Total amount you can rob = 1 + 3 = 4.

//? Example 3:
// Input: nums = [1,2,3]
// Output: 3

//? Approach:
// Since houses are in a circle, you can’t rob both the first and last house.
// So, split the problem into two linear cases:
// Case 1 → Rob houses from 0 to n-2 (exclude last).
// Case 2 → Rob houses from 1 to n-1 (exclude first).
// For each case, use DP with space optimization (p1, p2) to decide for every house: curr=max(val[i]+p2,p1)
// Rob current house → val[i] + p2
// Skip current house → p1
// Final = max of both cases.

//? Code:
const maxLootedAmount = (start, end, nums) => {
  let p2 = nums[start];
  let p1 = Math.max(nums[start], nums[start + 1]);

  for (let i = start + 2; i <= end; i++) {
    let temp = p1;
    p1 = Math.max(p1, p2 + nums[i]);
    p2 = temp;
  }

  return p1;
};

var rob = function (nums) {
  const n = nums.length;

  if (n === 1) return nums[0];
  if (n === 2) return Math.max(nums[0], nums[1]);

  return Math.max(
    maxLootedAmount(0, n - 2, nums),
    maxLootedAmount(1, n - 1, nums),
  );
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
