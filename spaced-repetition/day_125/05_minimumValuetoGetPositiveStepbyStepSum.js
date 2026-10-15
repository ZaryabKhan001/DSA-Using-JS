//? LeetCode #1413
//? Minimum Value to Get Positive Step by Step Sum

// Given an array of integers nums, you start with an initial positive value startValue.

// In each iteration, you calculate the step by step sum of startValue plus elements in nums (from left to right).

// Return the minimum positive value of startValue such that the step by step sum is never less than 1.

//? Example 1:
// Input: nums = [-3,2,-3,4,2]
// Output: 5
// Explanation: If you choose startValue = 4, in the third iteration your step by step sum is less than 1.
// step by step sum
// startValue = 4 | startValue = 5 | nums
//   (4 -3 ) = 1  | (5 -3 ) = 2    |  -3
//   (1 +2 ) = 3  | (2 +2 ) = 4    |   2
//   (3 -3 ) = 0  | (4 -3 ) = 1    |  -3
//   (0 +4 ) = 4  | (1 +4 ) = 5    |   4
//   (4 +2 ) = 6  | (5 +2 ) = 7    |   2

//? Example 2:
// Input: nums = [1,2]
// Output: 1
// Explanation: Minimum start value should be positive.

//? Example 3:
// Input: nums = [1,-2,-3]
// Output: 5

//? Constraints:
// 1 <= nums.length <= 100
// -100 <= nums[i] <= 100

//? Thought Process:
// 1. We need to find the minimum starting value so that the running sum never goes below 1.
// 2. The running sum changes after adding each element of nums.
// 3. We need to find the minimum prefix sum because it is the lowest point our running sum reaches.
// 4. prefixSum represents the running sum after adding the current element, so it includes the current element.
// 5. minimumPrefixSum stores the smallest running sum found so far.
// 6. We initialize minimumPrefixSum with 0 because the starting point before processing any element is 0.
// 7. We start the loop from i = 1 and use nums[i - 1] to access every element.
// 8. After adding each element, we update minimumPrefixSum if the current prefixSum is smaller.
// 9. If the minimum prefix sum is -4, we need a starting value of 5 because 5 + (-4) = 1.
// 10. Therefore, the answer is 1 - minimumPrefixSum.
// 11. If minimumPrefixSum is 0 or positive, the answer is 1 because the starting value must be positive.
// 12. Time complexity: O(n), because we traverse the array once.
// 13. Space complexity: O(1), because we use only a few variables.

//? Code:
var minStartValue = function (nums) {
  let prefixSum = 0;
  let minimumPrefixSum = 0;

  for (let i = 0; i < nums.length; i = i + 1) {
    prefixSum = prefixSum + nums[i];
    minimumPrefixSum = Math.min(minimumPrefixSum, prefixSum);
  }

  return Math.max(1, Math.abs(minimumPrefixSum) + 1);
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
