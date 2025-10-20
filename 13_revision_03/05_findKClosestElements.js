//? LeetCode #658
//? Find K Closest Elements

// Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.

// An integer a is closer to x than an integer b if:

// |a - x| < |b - x|, or
// |a - x| == |b - x| and a < b

//? Example 1:
// Input: arr = [1,2,3,4,5], k = 4, x = 3
// Output: [1,2,3,4]

//? Example 2:
// Input: arr = [1,1,2,3,4,5], k = 4, x = -1
// Output: [1,1,2,3]

//? Approach:
// We apply binary search to find the best starting index of the k closest elements window.
// We compare arr[m + k] - x and x - arr[m] to decide whether to shift the window left or right.
// Once we find the optimal window, return the subarray from index l to l + k - 1.

var findClosestElements = function (arr, k, x) {
  let l = 0;
  let r = arr.length - k;
  while (l < r) {
    let m = l + Math.floor((r - l) / 2);
    if (arr[m + k] - x < x - arr[m]) {
      l = m + 1;
    } else {
      r = m;
    }
  }
  let ans = [];
  for (let i = l; i < l + k; i++) {
    ans.push(arr[i]);
  }
  return ans;
};

//? Time Complexity: O(log(n – k) + k)
//? Space Complexity: O(k)
