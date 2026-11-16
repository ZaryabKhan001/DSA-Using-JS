//? LeetCode #986
//? Interval List Intersections

// You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.

// Return the intersection of these two interval lists.

// A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.

// The intersection of two closed intervals is a set of real numbers that are either empty or represented as a closed interval. For example, the intersection of [1, 3] and [2, 4] is [2, 3].

//? Example 1:
// Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
// Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

//? Example 2:
// Input: firstList = [[1,3],[5,9]], secondList = []
// Output: []

//? Constraints:
// 0 <= firstList.length, secondList.length <= 1000
// firstList.length + secondList.length >= 1
// 0 <= starti < endi <= 109
// endi < starti+1
// 0 <= startj < endj <= 109
// endj < startj+1

//? Thought Process:
// Problem: Interval List Intersections
// Approach: Two Pointers

// 1. We have two sorted lists of intervals.
// 2. Each interval has a start and an end.
// 3. We need to find all overlapping intervals between both lists.

// Example:
// firstList  = [[0,2], [5,10], [13,23], [24,25]]
// secondList = [[1,5], [8,12], [15,24], [25,26]]

// --------------------------------------------------
// STEP 1: USE TWO POINTERS
// --------------------------------------------------

// i = 0; points to the current interval in firstList.
// j = 0; points to the current interval in secondList.

// We will compare one interval from each list.

// Continue while both pointers are within their arrays.

// --------------------------------------------------
// STEP 2: GET START AND END OF BOTH INTERVALS
// --------------------------------------------------

// first interval:
// start1 = firstList[i][0]
// end1   = firstList[i][1]

// second interval:
// start2 = secondList[j][0]
// end2   = secondList[j][1]

// --------------------------------------------------
// STEP 3: CHECK WHETHER BOTH INTERVALS OVERLAP
// --------------------------------------------------

// Find the possible overlapping range.

// newStart = Math.max(start1, start2)
// newEnd   = Math.min(end1, end2)

// Why?

// The overlapping range must start from the bigger start value.
// The overlapping range must end at the smaller end value.

// CASE 1: Both intervals overlap.

// If newStart <= newEnd:

// Push [newStart, newEnd] into the result.

// Example:
// [0, 5] and [2, 7]

// newStart = 2
// newEnd   = 5

// Overlapping interval = [2, 5]

// CASE 2: Both intervals do NOT overlap.

// If newStart > newEnd:

// There is no common range.
// Do not push anything into the result.
// Simply move forward using the pointer logic.

// Example:
// [1, 3] and [5, 7]

// newStart = 5
// newEnd   = 3

// No overlap.

// IMPORTANT:
// If newStart === newEnd, it is still an overlap.

// Example:
// [1, 5] and [5, 8]

// Overlapping interval = [5, 5]

// --------------------------------------------------
// STEP 4: DECIDE WHICH POINTER TO MOVE
// --------------------------------------------------

// Now we need to decide which interval is finished.

// CASE 1: end1 <= end2

// The first interval ends before or at the same time
// as the second interval.

// So, the first interval cannot overlap with any future
// interval in secondList.

// Move the first pointer.

// i++;

// CASE 2: end1 > end2

// The second interval ends before the first interval.

// So, the second interval cannot overlap with any future
// interval in firstList.

// Move the second pointer.

// j++;

// IMPORTANT:
// We always move the pointer whose interval ends first.
// This helps us avoid missing any possible intersections.

// --------------------------------------------------
// STEP 5: REPEAT
// --------------------------------------------------

// Keep comparing intervals until:
// i reaches the end of firstList OR
// j reaches the end of secondList.

// Once either list finishes, stop.

// Return the result array.

//? Code:
var intervalIntersection = function (firstList, secondList) {
  let n = firstList.length;
  let m = secondList.length;
  let result = [];

  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    let start1 = firstList[i][0];
    let start2 = secondList[j][0];
    let end1 = firstList[i][1];
    let end2 = secondList[j][1];
    let newStart;
    let newEnd;

    if (start1 <= start2) {
      if (end1 >= start2) {
        newStart = Math.max(start1, start2);
        newEnd = Math.min(end1, end2);
        result.push([newStart, newEnd]);
      }
    } else {
      if (end2 >= start1) {
        newStart = Math.max(start1, start2);
        newEnd = Math.min(end1, end2);
        result.push([newStart, newEnd]);
      }
    }

    if (end1 <= end2) {
      i++;
    } else {
      j++;
    }
  }

  return result;
};

//? Time Complexity: O(n + m)
//? Space Complexity: O(1) excluding the output array

//? One Simpler Code.
// Two intervals intersect if:
// max(start1,start2) <= min(end1,end2)
var intervalIntersection = function (firstList, secondList) {
  let n = firstList.length;
  let m = secondList.length;
  let result = [];

  let i = 0;
  let j = 0;

  while (i < n && j < m) {
    let start1 = firstList[i][0];
    let start2 = secondList[j][0];

    let end1 = firstList[i][1];
    let end2 = secondList[j][1];

    let newStart = Math.max(start1, start2);
    let newEnd = Math.min(end1, end2);

    if (newStart <= newEnd) {
      result.push([newStart, newEnd]);
    }

    if (end1 <= end2) {
      i++;
    } else {
      j++;
    }
  }

  return result;
};
