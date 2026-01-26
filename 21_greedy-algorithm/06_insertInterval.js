//? LeetCode #57
//? Insert Interval

// You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

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

//? Approach:
// Add intervals before x Push all intervals ending before x starts (i.e., arr[i][1] < x[0]).
// Merge overlapping intervals with x: While intervals overlap (arr[i][0] <= x[1]), expand x by updating:
// x[0] = min(x[0], arr[i][0])
// x[1] = max(x[1], arr[i][1])
// Insert merged interval x: Push the merged interval into result.
// Add remaining intervals: Push all intervals that come after x.

//? Code:
var insert = function (arr, x) {
  let n = arr.length;
  let ans = [];

  let i = 0;
  while (i < n && arr[i][1] < x[0]) {
    ans.push(arr[i]);
    ++i;
  }

  while (i < n && arr[i][0] <= x[1]) {
    x[0] = Math.min(x[0], arr[i][0]);
    x[1] = Math.max(x[1], arr[i][1]);
    ++i;
  }
  ans.push(x);

  while (i < n) {
    ans.push(arr[i]);
    ++i;
  }
  return ans;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
