//? LeetCode #287
//? Find the Duplicate Number

// Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

// There is only one repeated number in nums, return this repeated number.

// You must solve the problem without modifying the array nums and using only constant extra space.

//? Example 1:
// Input: nums = [1,3,4,2,2]
// Output: 2

//? Example 2:
// Input: nums = [3,1,3,4,2]
// Output: 3

//? Example 3:
// Input: nums = [3,3,3,3,3]
// Output: 3

//? Approach (Two Phases)
//? Phase 1: Detect the cycle
// slow moves 1 step
// fast moves 2 steps
// They will meet inside the cycle

//? Phase 2: Find cycle entry
// Move one pointer to the start
// Move both 1 step at a time
// Meeting point = duplicate number

//? Code:
var findDuplicate = function (nums) {
  let slow = nums[0];
  let fast = nums[0];

  // Phase 1: Detect cycle
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // Phase 2: Find entry of cycle
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow; // duplicate number
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
