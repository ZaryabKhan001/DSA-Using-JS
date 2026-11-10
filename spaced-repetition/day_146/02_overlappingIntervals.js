//? Overlapping Intervals (gfg)

// You are given a 2D array arr[][] which represents a set of intervals, where each element arr[i] = [start, end] defines an interval.
// Your task is to determine if any two intervals in the given set overlap.

// Note: Two intervals [a, b] and [c, d] overlap if they have at least one common value, i.e., a ≤ d and c ≤ b.

//? Examples:
// Input: n = 4, arr[][] = [[1, 3], [5, 7], [2, 4], [6, 8]]
// Output: true
// Explanation: The intervals [1, 3] and [2, 4] overlap.

// Input: n = 4, arr[][] = [[1, 3], [7, 9], [4, 6], [10, 13]]
// Output: false
// Explanation: No pair of intervals overlap.

//? Constraints:
// 1 ≤ arr[i][0] < arr[i][1] ≤ 105
// 2 ≤ arr.size() ≤ 105

//? Thought Process:
// Very Easy
// 1. Sort the intervals based on the start time.
// 2. Iterate through the intervals and check if the end time of the previous interval is greater than or equal to the start time of the current interval.
// 3. If yes, return true (overlap exists).
// 4. If no overlap is found after checking all intervals, return false.

//? Code:
class Solution {
	isIntersect(intervals) {
		let n = intervals.length;
		intervals.sort((a, b) => a[0] - b[0]);
		
		let start1 = intervals[0][0];
		let end1 = intervals[0][1];
		
		for (let i = 1; i < n; i = i + 1) {
			let start2 = intervals[i][0];
			let end2 = intervals[i][1];
			
			if (end1 >= start2) {
				return true;
			}
			
			start1 = start2;
			end1 = end2;
		};
		
		return false;
	}
}

//? Time Complexity: O(n log n)
//? Space Complexity: O(1)
