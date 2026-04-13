//? LeetCode #45
//? Jump Game II

// You are given a 0-indexed array of integers nums of length n. You are initially positioned at index 0.

// Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at index i, you can jump to any index (i + j) where:

// 0 <= j <= nums[i] and
// i + j < n
// Return the minimum number of jumps to reach index n - 1. The test cases are generated such that you can reach index n - 1.

//? Example 1:
// Input: nums = [2,3,1,1,4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

//? Example 2:
// Input: nums = [2,3,0,1,4]
// Output: 2

//? Constraints:
// 1 <= nums.length <= 104
// 0 <= nums[i] <= 1000
// It's guaranteed that you can reach nums[n - 1].

//? Approach: Greedy
// Traverse the array while tracking the maximum index reachable from the current positions.
// Use three variables:
// farthest → the farthest index that can be reached from the current range.
// currEnd → the end of the current jump range.
// jumps → number of jumps taken.
// For each index i, update the farthest reachable position using farthest = Math.max(farthest, i + nums[i]).
// When i reaches currEnd, it means the current jump range is exhausted, so:
// Increase currEnd.
// Update currEnd to farthest to start the next jump range.
// Continue this process until the second last index, since the last index does not require another jump.

//? Code:
var jump = function (nums) {
  let currEnd = 0,
    farthest = 0,
    jumps = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i == currEnd) {
      currEnd = farthest;
      jumps++;
    }
  }
  return jumps;
};

//? Time Complexity = O(n)
//? Space Complexity = O(1)
