//? LeetCode #209
//? Minimum Size Subarray Sum

// Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

//? Example 1:
// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.

//? Example 2:
// Input: target = 4, nums = [1,4,4]
// Output: 1

//? Example 3:
// Input: target = 11, nums = [1,1,1,1,1,1,1,1]
// Output: 0

//? Constraints:
// 1 <= target <= 109
// 1 <= nums.length <= 105
// 1 <= nums[i] <= 104

//? Approach: Sliding Window
// We can use a sliding window to keep track of the sum of the current window. We can expand the right pointer of the window until the sum is greater than or equal to target. Once we have a valid window, we can update our answer and then shrink the left pointer of the window to try to find a smaller valid window.

//? Code:
var minSubArrayLen = function (target, nums) {
  let sum = 0;
  let minLen = Infinity;

  let i = 0;
  let j = -1;
  while (j < nums.length) {
    if (sum < target) {
      j++;
      sum = sum + nums[j];
    } else {
      minLen = Math.min(minLen, j - i + 1);
      sum = sum - nums[i];
      i++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
};

//? Time Complexity: O(n) where n is the length of the input array nums. We traverse the array once with the right pointer j, and the left pointer i also moves at most n times in total.
//? Space Complexity: O(1) since we are using only a constant amount of extra space to store the variables sum, minLen, i, and j.
