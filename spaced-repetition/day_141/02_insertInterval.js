//? LeetCode #57
//? Insert Interval

// You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

// Two intervals are considered overlapping if they share at least one point.

// Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

// Return intervals after the insertion.

// Note that you don't need to modify intervals in-place. You can make a new array and return it.

//? Example 1:
// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]

//? Example 2:
// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

//? Constraints:
// 0 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 105
// intervals is sorted by starti in ascending order.
// newInterval.length == 2
// 0 <= start <= end <= 105

//? Thought Process:
// The first thing that comes to mind is to add the new interval to the intervals array and then sort the intervals array by the start time. After that, we can iterate through the intervals and merge the overlapping intervals.
// The merging of the intervals can be done by checking if the current interval's start time is less than or equal to the previous interval's end time. If it is, then we can merge the two intervals by taking the minimum of the previous interval's start time and the current interval's start time as the new start time, and the maximum of the previous interval's end time and the current interval's end time as the new end time. If the current interval's start time is greater than the previous interval's end time, then we can add the previous interval to the new intervals array and update the previous interval to be the current interval.

//? Code:
var insert = function (intervals, newInterval) {
  intervals.push(newInterval);
  intervals.sort((a, b) => a[0] - b[0]);
  let newIntervals = [];
  newIntervals.push(intervals[0]);

  for (let i = 1; i < intervals.length; i = i + 1) {
    let prevInterval = newIntervals[newIntervals.length - 1];
    let currInterval = intervals[i];

    //* Agar current interval ka start previous interval k end sy bara hai, isy add krlo.
    if (currInterval[0] > prevInterval[1]) {
      newIntervals.push(currInterval);
    }

    //* Agar dono overlapping hain tu Dono intervals ko merge kardo, first ka start and second ka end.
    else if (
      currInterval[0] <= prevInterval[1] &&
      currInterval[1] >= prevInterval[1]
    ) {
      newIntervals.pop();
      newIntervals.push([prevInterval[0], currInterval[1]]);
    }
  }

  return newIntervals;
};

//? Time Complexity: O(n log n) - Sorting the intervals takes O(n log n) time, and iterating through the intervals takes O(n) time.
//? Space Complexity: O(n) - We are using a new array to store the merged intervals.

//* We don't actually need to sort the intervals array after adding the new interval, because the intervals array is already sorted. We can just find the correct position to insert the new interval and then merge the overlapping intervals. This will reduce the time complexity to O(n) and space complexity to O(n).

//? Approach (3 steps)
// 1. Add all intervals that come before newInterval.
// 2. Merge all intervals that overlap with newInterval.
// 3. Add all remaining intervals.

//? Code:
var insert = function (intervals, newInterval) {
  let newIntervals = [];
  let i = 0;

  // 1. Add intervals that come before newInterval
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    newIntervals.push(intervals[i]);
    i = i + 1;
  }

  // 2. Merge overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i = i + 1;
  }

  newIntervals.push(newInterval);

  // 3. Add remaining intervals
  while (i < intervals.length) {
    newIntervals.push(intervals[i]);
    i = i + 1;
  }

  return newIntervals;
};

//? Time Complexity: O(n) - We are iterating through the intervals array once.
//? Space Complexity: O(n) - We are using a new array to store the merged intervals.
