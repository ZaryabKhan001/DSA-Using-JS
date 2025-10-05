//? LeetCode #852
//? Peak Index in a Mountain Array

// You are given an integer mountain array arr of length n where the values increase to a peak element and then decrease.

// Return the index of the peak element.

// Your task is to solve it in O(log(n)) time complexity.

//? Example 1:
// Input: arr = [0,1,0]
// Output: 1

//? Example 2:
// Input: arr = [0,2,1,0]
// Output: 1

//? Example 3:
// Input: arr = [0,10,5,2]
// Output: 1

//? Approach:
// Initialize l = 0 and r = arr.length - 1.
// Use binary search:
// If arr[m + 1] > arr[m], peak is to the right → l = m + 1.
// Else peak is at m or to the left → r = m.
// When loop ends, l (or r) is the peak index.

var peakIndexInMountainArray = function (arr) {
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    let m = l + Math.floor((r - l) / 2);
    if (arr[m + 1] > arr[m]) {
      l = m + 1;
    } else {
      r = m;
    }
  }
  return r;
};

//? Time Complexity: O(logn)
//? Space Complexity: O(1)
