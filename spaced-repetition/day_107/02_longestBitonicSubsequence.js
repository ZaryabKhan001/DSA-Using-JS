//? Longest Bitonic Subsequence (gfg)

// Given an array of positive integers. Find the maximum length of Bitonic subsequence.  A subsequence of array is called Bitonic if it is first strictly increasing, then strictly decreasing. Return the maximum length of bitonic subsequence.

// Note : A strictly increasing or a strictly decreasing sequence should not be considered as a bitonic sequence

//? Examples :
// Input: n = 5, nums[] = [1, 2, 5, 3, 2]
// Output: 5
// Explanation: The sequence [1, 2, 5] is increasing and the sequence [3, 2] is decreasing so merging both we will get length 5.

// Input: n = 8, nums[] = [1, 11, 2, 10, 4, 5, 2, 1]
// Output: 6
// Explanation: The bitonic sequence [1, 2, 10, 4, 2, 1] has length 6.

// Input: n = 3, nums[] = [10, 20, 30]
// Output: 0
// Explanation: The decreasing or increasing part cannot be empty.

// Input: n = 3, nums[] = [10, 10, 10]
// Output: 0
// Explanation: No strictly increasing or decreasing sequence exists.

//? Constraints:
// 1 ≤ length of array ≤ 103
// 1 ≤ arr[i] ≤ 104

//? Thought Process:
// This problem is not tough.
// Just we need to think properly.
// This problem relates to LIS because the increasing part of a bitonic sequence is exactly an LIS ending at the peak.
// We also need an LDS starting from the same peak to get the decreasing part.
// So, for every index, we calculate `LIS[i]` and `LDS[i]` and treat that index as the possible peak.
// The bitonic length at that peak is `LIS[i] + LDS[i] - 1` because the peak is counted twice.
// Finally, take the maximum over all possible peaks.

//? Code:
class Solution {
	LIS(nums) {
		let n = nums.length;
		let ans = new Array(n).fill(1);
		
		for (let i = 1; i < n; i++) {
			for (let j = 0; j < i; j++) {
				if (nums[j] < nums[i]) {
					if (ans[j] + 1 > ans[i]) {
						ans[i] = ans[j] + 1;
					}
				}
			}
		}
		
		return ans;
	}
	
	LDS(nums) {
		let n = nums.length;
		let ans = new Array(n).fill(1);
		
		for (let i = n - 2; i >= 0; i--) {
			for (let j = i + 1; j < n; j++) {
				if (nums[j] < nums[i]) {
					if (ans[j] + 1 > ans[i]) {
						ans[i] = ans[j] + 1;
					}
				}
			}
		}
		
		return ans;
	}
	
	longestBitonicSequence(n, nums) {
		let lis = this.LIS(nums);
		let lds = this.LDS(nums);
		
		let ans = 0;
		
		for (let i = 0; i < n; i++) {
			// Need both increasing and decreasing parts
			if (lis[i] > 1 && lds[i] > 1) {
				ans = Math.max(ans, lis[i] + lds[i] - 1);
			}
		}
		
		return ans;
	}
}

//? Time Complexity: O(n^2) for LIS, O(n^2) for LDS, O(n) for choosing o to n-1 peak elements.
// It boils down to O(n^2)
//? Space Compleixty: O(n) for lis and lds array