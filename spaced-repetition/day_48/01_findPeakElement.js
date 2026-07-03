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
// As we know that peak element is greater than its neighbors.
// So we can use binary search to find a peak efficiently.
// check is mid is peak, simply return it
// else if go to greater side becuase we need peak element, respect the elevation

var findPeakElement = function (nums) {
  let n = nums.length;
  let start = 0;
  let end = nums.length;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);

    //* if mid is peak, return it
    let prev = mid > 0 ? nums[mid - 1] : -Infinity;
    let next = mid < n - 1 ? nums[mid + 1] : -Infinity;

    if (nums[mid] > prev && nums[mid] > next) {
      return mid;
    }

    //* go to greater side becuase we need peak element,
    //* respect the elevation
    else if (prev > nums[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
};
//? Time Complexity: O(logn)
//? Space Complexity: O(1)
