//? Get Longest Increasing Subsequence (gfg)

// Given an array of integers arr[], return the Longest Increasing Subsequence (LIS) of the given array. LIS is the longest subsequence where each element is strictly greater than the previous one.

// If multiple LIS exist, return the one that appears first based on the lexicographical order of indices (i.e., the earliest combination of positions from the original sequence).

//? Examples:

// Input: arr[] = [10, 20, 3, 40]
// Output: [10, 20, 40]
// Explanation: [10, 20, 40] is the longest subsequence where each number is greater than the previous one, maintaining the original order.

// Input: arr[] = [10, 22, 9, 33, 21, 50, 41, 60, 80]
// Output: [10, 22, 33, 50, 60, 80]
// Explanation: There are multiple longest Increasing subsequence of length 6, that is [10, 22, 33, 50, 60, 80] and [10 22 33 41 60 80]. The first one has lexicographic smallest order of indices.

//? Constraints:
// 1 ≤ arr.size() ≤ 5103
// 0 ≤ arr[i] ≤ 109

//? Thought Process:
//  1. First, calculate the normal LIS dp[i] = length of LIS ending at index i.
// 2. To reconstruct the LIS, we need to know where each element came from.
// 3. Create a prev[] array of size n, initially -1.
// 4. When arr[j] < arr[i], check if dp[j] + 1 improves dp[i].
// 5. If it does, set dp[i] = dp[j] + 1.
// 6. At the same time, store prev[i] = j.
// 7. This means: the previous element of arr[i] in the LIS is arr[j].
// 8. Keep lastIndex pointing to the index having the maximum dp value.
// 9. Start from lastIndex and repeatedly follow prev[].
// 10. Add each arr[index] to the answer.
// 11. This gives the LIS backwards, so reverse it at the end.
// 12. Therefore, DP tells us the length, while prev[] tells us the path to reconstruct it.

//? Code:
class Solution {
	getLIS(arr) {
		let n = arr.length;
		let ans = new Array(n).fill(1);
		let prev = new Array(n).fill(-1);
		let maxLength = 1;
		let lastIndex = 0;
		
		for (let i = 1; i < n; i = i + 1) {
			for (let j = 0; j < i; j = j + 1) {
				if (arr[j] < arr[i] && ans[j] + 1 > ans[i]) {
					ans[i] = ans[j] + 1;
					prev[i] = j;
				}
			}
			
			if (ans[i] > maxLength) {
				maxLength = ans[i];
				lastIndex = i;
			}
		}
		
		let lis = [];
		
		while (lastIndex != -1) {
			lis.push(arr[lastIndex]);
			lastIndex = prev[lastIndex];
		}
		
		return lis.reverse();
	}
};

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)