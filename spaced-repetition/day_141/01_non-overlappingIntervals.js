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

//? Constraints:
// 1 <= intervals.length <= 105
// intervals[i].length == 2
// -5 * 104 <= starti < endi <= 5 * 104

//? Thought Process:
// My mind goes in a way to think that maybe we first pick the interval with the smallest start time and then check if it overlaps with the next interval. If it does, we remove the one with the larger end time. But this approach is not optimal because it may lead to a situation where we have to remove more intervals than necessary.

// For example, consider the intervals [[1, 10], [2, 3], [4, 5], [6, 7]]. If we pick the first interval [1, 10], we will have to remove all the other intervals. But if we pick the interval with the smallest end time, we can keep more intervals. In this case, we can keep [2, 3], [4, 5], and [6, 7] and only remove [1, 10].

//* The optimal approach is to sort the intervals by their end time and then iterate through the intervals, keeping track of the previous interval. If the current interval overlaps with the previous interval, we remove the current interval. Otherwise, we update the previous interval to be the current interval. This way, we can ensure that we are always keeping the intervals with the smallest end time, which allows us to keep more intervals and minimize the number of intervals we need to remove.

//? Code:
var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[1] - b[1]);

  let previousInterval = [-Infinity, -Infinity];
  let ignoredIntervals = 0;
  for (let i = 0; i < intervals.length; i = i + 1) {
    let currentInterval = intervals[i];

    if (currentInterval[0] >= previousInterval[1]) {
      previousInterval = currentInterval;
    } else {
      ignoredIntervals++;
    }
  }

  return ignoredIntervals;
};

//? Time Complexity: O(n log n) - Sorting the intervals takes O(n log n) time, and iterating through the intervals takes O(n) time.
//? Space Complexity: O(1) - We are not using any extra space apart from a few variables.
