//? Subset Sum Problem (gfg)

// Given an array of positive integers arr[] and a value sum, determine if there is a subset of arr[] with sum equal to given sum. 

//? Examples:

// Input: arr[] = [3, 34, 4, 12, 5, 2], sum = 9
// Output: true 
// Explanation: Here there exists a subset with target sum = 9, 4+3+2 = 9.

// Input: arr[] = [3, 34, 4, 12, 5, 2], sum = 30
// Output: false
// Explanation: There is no subset with target sum 30.

// Input: arr[] = [1, 2, 3], sum = 6
// Output: true
// Explanation: The entire array can be taken as a subset, giving 1 + 2 + 3 = 6.

//? Constraints:
// 1 ≤ arr.size() ≤ 200
// 1 ≤ arr[i] ≤ 200
// 1 ≤ sum ≤ 104

//? Thought Process:
// In this question we are given an array of positive integers and a target sum. We want to determine if there exists a subset of the array that sums up to the target sum.
// We can use a recursive approach to explore all possible subsets of the array and check if any of them sum up to the target sum. We can also use memoization to store already computed values to avoid recomputation.

//? Code:
class Solution {
	isSubsetSum(arr, sum) {
		const dp = Array.from(
		{ length: arr.length + 1 },
		() => Array(sum + 1).fill(undefined)
		);
		const solve = (i, target) => {
			if (target == 0) {
				return true;
			}
			if (i == 0) {
				return false;
			}
			
			if (dp[i][target] != undefined) {
				return dp[i][target];
			}
			
			if (arr[i - 1] > target) {
				return dp[i][target] = solve(i - 1, target);
			}
			else {
				return dp[i][target] = solve(i - 1, target) ||
				solve(i - 1, target - arr[i - 1]);
			}
		}
		return solve(arr.length, sum);
	}
}

//? Time Complexity: O(n * sum) - where n is the number of elements in the array and sum is the target sum. This is because we are solving subproblems for each element and each possible sum up to the target sum.
//? Space Complexity: O(n * sum) - for the dp array used to store the results of subproblems.

//? Bottom Up (Tabulation) Approach:
class Solution {
	isSubsetSum(arr, sum) {
		let n = arr.length;
		
		const dp = Array.from(
		{ length: arr.length + 1 },
		() => Array(sum + 1).fill(false)
		);
		
		// * initialization
		for (let i = 0; i <= n; i = i + 1) {
			dp[i][0] = true;
		}
		
		// * computing
		for (let i = 1; i <= n; i = i + 1) {
			for (let j = 1; j <= sum; j = j + 1) {
				if (arr[i - 1] > j) {
					dp[i][j] = dp[i - 1][j];
				}
				else {
					dp[i][j] = dp[i - 1][j] ||
					dp[i - 1][j - arr[i - 1]];
				}
			}
		}
		return dp[n][sum];
	}
}

//? Time Complexity: O(n * sum) - where n is the number of elements in the array and sum is the target sum. This is because we are solving subproblems for each element and each possible sum up to the target sum.
//? Space Complexity: O(n * sum) - for the dp array used to store the results of subproblems.