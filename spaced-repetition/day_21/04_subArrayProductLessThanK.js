//? LeetCode #713
//? Subarray Product Less Than K

// Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.

//? Example 1:
// Input: nums = [10,5,2,6], k = 100
// Output: 8
// Explanation: The 8 subarrays that have product less than 100 are:
// [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
// Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.

//? Example 2:
// Input: nums = [1,2,3], k = 0
// Output: 0

//? Constraints:
// 1 <= nums.length <= 3 * 104
// 1 <= nums[i] <= 1000
// 0 <= k <= 106

//? Approach:
// Use a sliding window approach to find all contiguous subarrays with a product less than k.
// Initialize two pointers i and j to represent the current window, and a variable prod to keep track of the product of the elements in the window.
// Iterate through the array with pointer j, multiplying the current element to prod.
// If prod becomes greater than or equal to k, move pointer i to the right, dividing prod by nums[i] until prod is less than k again.
// For each valid window (where prod < k), add the number of subarrays that can be formed with the current window size (j - i + 1) to the count.
// Continue this process until j reaches the end of the array.

//? Code:
var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) return 0;
  let count = 0;
  let prod = 1;

  let i = 0;
  let j = 0;
  while (j < nums.length) {
    //* add current element in window
    prod = prod * nums[j];

    //* shrink window untill it becomes valid again
    while (prod >= k) {
      prod = prod / nums[i];
      i++;
    }

    //* adding valid substrings of window to answer
    count = count + (j - i + 1);
    j++;
  }

  return count;
};

//? Time Complexity = O(n)
//? Space Complexity = O(1)
