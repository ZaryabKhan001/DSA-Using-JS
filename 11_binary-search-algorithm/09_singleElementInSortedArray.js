//? LeetCode #540
//? Single Element in a Sorted Array

// You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.

// Return the single element that appears only once.

// Your solution must run in O(log n) time and O(1) space.

//? Example 1:
// Input: nums = [1,1,2,3,3,4,4,8,8]
// Output: 2

//? Example 2:
// Input: nums = [3,3,7,7,10,11,11]
// Output: 10

//? Approach:
// Use binary search between left (l) and right (r).
// At each mid (m):
// If arr[m] === arr[m - 1], count elements on the left.
// If that count is odd → single lies left → r = m - 2.
// If count is even → single lies right → l = m + 1.
// Same logic applies if arr[m] === arr[m + 1].
// If neither left nor right match → return arr[m].

var singleNonDuplicate = function (arr) {
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    let m = l + Math.floor((r - l) / 2);
    if (arr[m] === arr[m - 1]) {
      let leftCount = m - l;
      if (leftCount % 2 === 1) {
        r = m - 2;
      } else {
        l = m + 1;
      }
    } else if (arr[m] === arr[m + 1]) {
      let leftCount = m - l;
      if (leftCount % 2 === 1) {
        r = m - 1;
      } else {
        l = m + 2;
      }
    } else {
      return arr[m];
    }
  }
  return arr[l];
};

//? Time Complexity: O(logn)
//? Space Complexity: O(1)
