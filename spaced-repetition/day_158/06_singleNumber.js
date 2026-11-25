//? LeetCode #136
//? Single Number

// Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

// You must implement a solution with a linear runtime complexity and use only constant extra space.

//? Example 1:
// Input: nums = [2,2,1]
// Output: 1

//? Example 2:
// Input: nums = [4,1,2,1,2]
// Output: 4.

//? Example 3:
// Input: nums = [1]
// Output: 1

//? Constraints:
// 1 <= nums.length <= 3 * 104
// -3 * 104 <= nums[i] <= 3 * 104
// Each element in the array appears twice except for one element which appears only once.

//? Thought Process:
// XOR of two same numbers is 0.
// XOR of a number with 0 gives the same number.

// Traverse the array.

// XOR every number with ans.

// Duplicate numbers cancel each other because a ^ a = 0.

// The number that appears only once remains.

// Return ans.

//? Code:
var singleNumber = function (nums) {
  let ans = 0;

  for (let i = 0; i < nums.length; i = i + 1) {
    ans = ans ^ nums[i];
  }

  return ans;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
