//? LeetCode #53:
//? Maximum Subarray

// Given an integer array nums, find the subarray with the largest sum, and return its sum.

//? Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.

//? Example 2:
// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum 1.

//? Example 3:
// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

//? Constraints
// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104

//? Approach:
// Initialize two variables:
// currSum = arr[0] → keeps track of the maximum subarray sum ending at the current index.
// maxSum = arr[0] → keeps track of the global maximum subarray sum found so far.
// Iterate through the array starting from index 1:
// For each element arr[i]:
// Decide whether to extend the previous subarray (currSum + arr[i]) or start a new subarray from this element (arr[i]). → currSum = Math.max(currSum + arr[i], arr[i]);
// Update the global maximum:
// After updating currSum, compare it with the global maximum and update if larger: → maxSum = Math.max(maxSum, currSum);
// After traversing the entire array, maxSum will contain the largest sum of any contiguous subarray.

//? Code:
function maxSubArray(arr) {
  let currSum = arr[0];
  let maxSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    currSum = Math.max(currSum + arr[i], arr[i]);
    maxSum = Math.max(currSum, maxSum);
  }

  return maxSum;
}

//? Time Complexity: O(n)
//? Space Complexity: O(1)
