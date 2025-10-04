//? LeetCode #34
//? Find First and Last Position of Element in Sorted Array

// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

// If target is not found in the array, return [-1, -1].

// You must write an algorithm with O(log n) runtime complexity.

//? Example 1:
// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]

//? Example 2:
// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]

//? Example 3:
// Input: nums = [], target = 0
// Output: [-1,-1]

//? Approach 1:
// Use binary search twice.
// Once to find the **first occurrence** (left bound).
// Once to find the **last occurrence** (right bound).
// Store results in ans[0] and ans[1].

var searchRange = function (arr, target) {
  let l = 0;
  let r = arr.length - 1;
  let ans = [-1, -1];
  while (l < r) {
    let m = l + Math.floor((r - l) / 2);
    if (arr[m] < target) l = m + 1;
    else r = m;
  }
  if (arr[l] === target) ans[0] = l;

  l = 0;
  r = arr.length - 1;
  while (l < r) {
    let m = l + Math.ceil((r - l) / 2);
    if (arr[m] > target) r = m - 1;
    else l = m;
  }
  if (arr[l] === target) ans[1] = l;
  return ans;
};

//? Time Complexity: O(logn)
//? Space Complexity: O(1)
