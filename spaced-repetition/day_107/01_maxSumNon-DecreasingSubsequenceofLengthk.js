//? Max Sum Non-Decreasing Subsequence of Length k (gfg)

// Given an array arr[] and an integer k, find the maximum possible sum of a non-decreasing subsequence of length exactly k.

// Return the maximum possible sum among all such subsequences. If no non-decreasing subsequence of length k exists, return -1.

//? Examples:
// Input: arr[] = [8, 5, 9, 10, 5, 6, 19, 8], k = 3
// Output: 38
// Explanation: The maximum sum non-decreasing subsequence of length 3 is {9, 10, 19}. Its sum is 38.

// Input: arr[] = [10, 5], k = 2
// Output: -1
// Explanation: The only subsequence of length 2 is {10, 5}, which is not non-decreasing. Hence, the answer is -1.

//? Contraints:
// 1 ≤ n ≤ 100
// 1 ≤ arr[i] ≤ 105

//? Thought Process:
//  It seems to be a LIS variation.
// Just we need to bound length to k.
// And instead of calculating the length of LIS, calculate the accumulated sum.
// One important thing to remember over here is the -Infinity return base case in case of invalid path.
//* Invalid path is the one where i === n but length is still smaller than k, so we are stuck here, return -Infinity.
// why -Infinity because to create a check at last to return -1 if ans = -Infinity at the end. We can also use -1, in case where question gurantees that arr[i] >= 1.

//? Code:
class Solution {
	maxSum(arr, k) {
		let n = arr.length;
		let map = new Map();
		const solve = (i, prev, length) => {
			
			if (length == k) {
				return 0;
			}
			
			if (i == n) {
				return - Infinity;
			}
			let key = i + '#' + prev + '#' + length;
			if (map.has(key)) {
				return map.get(key);
			}
			
			if (prev == -1 || arr[i] >= arr[prev]) {
				let choice1 = arr[i] + solve(i + 1, i, length + 1);
				let choice2 = solve(i + 1, prev, length);
				let max = Math.max(choice1, choice2);
				
				map.set(key, max);
				return max;
			}
			else {
				let max = solve(i + 1, prev, length);
				map.set(key, max);
				return max;
			}
		};
		let ans = solve(0, -1, 0);
		return ans == -Infinity ? -1 : ans;
		
	}
}

//? Time Complexity: O(n) for i, O(n) for prev and O(k) for length
// It sums up to O(n^2 * k)
//? Space Complexity: O(n^2 * k) for storing unique states  in the map. O(n) for recursive stack