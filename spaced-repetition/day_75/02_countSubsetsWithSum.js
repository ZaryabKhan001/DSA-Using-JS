//? Count Subsets with Sum (gfg)

// Given an array arr of non-negative integers and an integer target, the task is to count all subsets of the array whose sum is equal to the given target.

//? Examples:

// Input: arr[] = [5, 2, 3, 10, 6, 8], target = 10
// Output: 3
// Explanation: The subsets {5, 2, 3}, {2, 8}, and {10} sum up to the target 10.

// Input: arr[] = [2, 5, 1, 4, 3], target = 10
// Output: 3
// Explanation: The subsets {2, 1, 4, 3}, {5, 1, 4}, and {2, 5, 3} sum up to the target 10.

// Input: arr[] = [5, 7, 8], target = 3
// Output: 0
// Explanation: There are no subsets of the array that sum up to the target 3.

// Input: arr[] = [35, 2, 8, 22], target = 0
// Output: 1
// Explanation: The empty subset is the only subset with a sum of 0.

//? Constraints:
// 1 ≤ arr.size() ≤ 103
// 0 ≤ arr[i] ≤ 103
// 0 ≤ target ≤ 103

//? Thought Process:
// First of all if we think properly about the solution so it means we need to get the count of all subsets whose sum is equal to the given target.
// This is the exact copy question of subset sum problem but instead of returning true or false we need to return the count of all subsets whose sum is equal to the given target.
// Also we can use the same approach of recursion and memoization to solve this problem. We can use a 2D array to store the results of subproblems and avoid recalculating them. The base cases will be when the target is 0 (we found a valid subset) and when there are no items left to consider (we can't form any more subsets).

//* One thing to note is that if the target is 0, we can always form an empty subset, so we should return 1 in that case. If there are no items left to consider and the target is not 0, we should return 0.

//? Code:
class Solution {
	perfectSum(arr, target) {
		const n = arr.length;
		
		let dp = Array.from({length: n + 1}, () =>
		new Array(target + 1).fill(undefined));
		
		const solve = (noOfItemsUsed, target) => {
			if (target == 0 && noOfItemsUsed == 0)
				return 1;
			
			if (noOfItemsUsed == 0)
				return 0;
			
			if (dp[noOfItemsUsed][target] != undefined) {
				return dp[noOfItemsUsed][target] ;
			}
			
			if (arr[noOfItemsUsed - 1] > target) {
				return dp[noOfItemsUsed][target] = solve(noOfItemsUsed - 1, target);
			}
			
			return dp[noOfItemsUsed][target] = solve(noOfItemsUsed - 1, target) +
			solve(noOfItemsUsed - 1, target - arr[noOfItemsUsed - 1]);
		};
		
		return solve(n, target);
	}
}

//? Tme Complexity: O(n * target)
//? Space Complexity: O(n * target)

//? Bottom UP Approach:

//? Code:
class Solution {
	perfectSum(arr, target) {
		const n = arr.length;
		
		let dp = Array.from({length: n + 1}, () =>
		new Array(target + 1).fill(undefined));
		
		dp[0][0] = 1;
		
		for (let i = 1; i <= target; i = i + 1) {
			dp[0][i] = 0;
		}
		
		for (let i = 1; i <= n; i = i + 1) {
			for (let j = 0; j <= target; j = j + 1) {
				if (arr[i - 1] > j) {
					dp[i][j] = dp[i - 1][j];
				}
				else {
					dp[i][j] = dp[i - 1][j] +
					dp[i - 1][j - arr[i - 1]];
				}
			}
		}
		
		return dp[n][target];
	}
}

//? Time Complexity: O(n * target)
//? Space Complexity: O(n * target)

//? Confusion Addressing:
// Your confusion is because recursion and tabulation look like they are moving in opposite directions. In recursion, we start from the final answer (`dp[n][target]`) and go backwards to smaller problems because we ask, "what values do I need to calculate this answer?" In tabulation, we start from the base cases and move forward because we need to calculate the smaller states first before using them. The direction of the loop is decided by the dependency of the current state, not by the direction of recursive calls. Since `dp[i][j]` depends on `dp[i-1][...]`, we must fill rows from `0` to `n`, not from `n` to `0`.
