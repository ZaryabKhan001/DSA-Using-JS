//? LeetCode #56
//? Merge Intervals

// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

//? Example 1:
// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

//? Example 2:
// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.

//? Example 3:
// Input: intervals = [[4,7],[1,4]]
// Output: [[1,7]]
// Explanation: Intervals [1,4] and [4,7] are considered overlapping.

//? Approach:
// Sort intervals by their starting point.
// Initialize result with the first interval.
// Traverse intervals one by one:
// If the current interval overlaps with the last interval in the result → merge them (update the end to the max end).
// Otherwise → add it as a new interval.
// Return the merged list.

//? Code:
var merge = function (arr) {
  arr.sort((a, b) => a[0] - b[0]);

  let ans = [arr[0]];

  for (let i = 1; i < arr.length; i = i + 1) {
    if (arr[i][0] <= ans[ans.length - 1][1]) {
      ans[ans.length - 1][1] = Math.max(arr[i][1], ans[ans.length - 1][1]);
    } else {
      ans.push(arr[i]);
    }
  }
  return ans;
};

//? Time Complexity: O(n log n)
//? Space Complexity: O(n)
