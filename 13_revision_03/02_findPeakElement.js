//? LeetCode #162
//? Find Peak Element

// A peak element is an element that is strictly greater than its neighbors.

// Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

// You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

// You must write an algorithm that runs in O(log n) time.

//? Example 1:
// Input: nums = [1,2,3,1]
// Output: 2
// Explanation: 3 is a peak element and your function should return the index number 2.

//? Example 2:
// Input: nums = [1,2,1,3,5,6,4]
// Output: 5
// Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.

//? Approach:
// We use binary search to find a peak efficiently.
// Initialize l = 0 and r = arr.length - 1.
// While l < r:
// Find middle: m = l + floor((r - l) / 2)
// If arr[m] < arr[m + 1] → we are in ascending slope → shift l = m + 1.
// Else → we are in descending slope or peak → move r = m.
// Loop ends when l == r, that’s the index of a peak.

var findPeakElement = function (arr) {
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    let m = l + Math.floor((r - l) / 2);
    if (arr[m] < arr[m + 1]) {
      l = m + 1;
    } else {
      r = m;
    }
  }
  return l;
};

//? Time Complexity: O(logn)
//? Space Complexity: O(1)
