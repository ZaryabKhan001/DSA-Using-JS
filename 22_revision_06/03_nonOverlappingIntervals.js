//? LeetCode #435
//? Non-overlapping Intervals

// Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

// Note that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.

//? Example 1:
// Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
// Output: 1
// Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.

//? Example 2:
// Input: intervals = [[1,2],[1,2],[1,2]]
// Output: 2
// Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.

//? Example 3:
// Input: intervals = [[1,2],[2,3]]
// Output: 0
// Explanation: You don't need to remove any of the intervals since they're already non-overlapping.

//? Approach:
// Sort intervals by end time → This ensures we always keep the interval that finishes earliest.
// Track the end of the last chosen interval (k) → Start with -Infinity.
// Iterate over intervals:
// If the current interval starts before k, it overlaps → increment removeCount (we “remove” this one).
// Else, update k to the current interval’s end (keep it).
// Return the total removeCount.

//? Code:
var eraseOverlapIntervals = function (arr) {
  arr.sort((a, b) => a[1] - b[1]);
  let removeCount = 0;
  let k = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] < k) {
      ++removeCount;
    } else {
      k = arr[i][1];
    }
  }
  return removeCount;
};

//? Time Complexity: O(n log n)
//? Space Complexity: O(1)
