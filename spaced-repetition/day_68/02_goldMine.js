//? Gold Mine Problem (gfg)

// Given a gold mine called mat[][]. Each field in this mine contains a positive integer which is the amount of gold in tons. Initially, the miner can start from any row in the first column. From a given cell, the miner can move -

// to the cell diagonally up towards the right
// to the right
// to the cell diagonally down towards the right
// Find out the maximum amount of gold that he can collect until he can no longer move.

//? Examples:
// Input: mat[][] = [[1, 3, 3], [2, 1, 4], [0, 6, 4]]
// Output: 12
// Explaination: The path is (1, 0) -> (2, 1) -> (2, 2). Total gold collected is 2 + 6 + 4 = 12.

// Input: mat[][] = [[1, 3, 1, 5], [2, 2, 4, 1], [5, 0, 2, 3], [0, 6, 1, 2]]
// Output: 16
// Explaination: The path is (2, 0) -> (3, 1) -> (2, 2) -> (2, 3) or (2, 0) -> (1, 1) -> (1, 2) -> (0, 3). 
// Total gold collected is (5 + 6 + 2 + 3) or (5 + 2 + 4 + 5) = 16.

// Input: mat[][] = [[1, 3, 3], [2, 1, 4], [0, 7, 5]]
// Output: 14
// Explaination: The path is (1,0) -> (2,1) -> (2,2). Total gold collected is 2 + 7 + 5 = 14.

//? Constraints:
// 1 ≤ mat.size(), mat[0].size() ≤ 500
// 0 ≤ mat[i][j] ≤ 100

//? Thought Process:
// Let say if we are given a starting point, how we can reach to max gold collection?
// If we can think properly, we can move in three directions right, diagonally up towards the right, and diagonally down towards the right from any cell. So recursion comes into mind. We have to check all three directions and keep track of the maximum gold we can collect.
// But not all the time, three directions are valid respecting the conditions which are given in the problem. So we have to do a kind of like a controlled recursion called backTracking. We will only move to the valid directions and keep track of the maximum gold we can collect. Once we reach a dead end, we will backtrack to the previous cell and check for other directions. We will keep track of the maximum gold we can collect from all the starting points in the grid.

//? But the real problem is we are not sure about the starting point. Maximum gold collection happens could be started from any point on column 1. So we have to check all the rows elements in the first column and keep track of the maximum gold we can collect from all the starting points.

// Then we see that there are multiple overlapping subproblems. So we can use memoization to store the results of the subproblems and avoid recomputation.

//? Code:
class Solution {
	dfs(mat, rowIndex, colIndex, dp) {
		let n = mat.length;
		let m = mat[0].length;
		
		if (dp[rowIndex][colIndex] != -1) {
			return dp[rowIndex][colIndex];
		}
		
		const choices = [
		{
			row: 0,
			col: +1,
		},
		{
			row: -1,
			col: +1,
		},
		{
			row: +1,
			col: +1,
		},
		];
		
		const isValid = (row, col) => {
			return row >= 0 && row < n && col >= 0 && col < m;
		}
		
		const backTrack = (rowIndex, colIndex) => {
			if (dp[rowIndex][colIndex] != -1) {
				return dp[rowIndex][colIndex];
			}
			
			let best = 0;
			
			for (let choice of choices) {
				let newRowIndex = rowIndex + choice.row;
				let newColIndex = colIndex + choice.col;
				
				if (isValid(newRowIndex, newColIndex)) {
					best = Math.max(best, backTrack(newRowIndex, newColIndex));
				}
				
			}
			
			dp[rowIndex][colIndex] = mat[rowIndex][colIndex] + best;
			return dp[rowIndex][colIndex];
			
		}
		return	backTrack(rowIndex, colIndex);
	}
	maxGold(mat) {
		let n = mat.length;
		let m = mat[0].length;
		let maxGoldCollected = 0;
		const dp = Array.from({ length: n }, () => Array(m).fill(-1));
		
		for (let row = 0; row < n; row++) {
			maxGoldCollected = Math.max(maxGoldCollected,
			this.dfs(mat, row, 0, dp));
		}
		
		return maxGoldCollected;
	}
}


//? Time Complexity: O(n * m) where n is the number of rows and m is the number of columns
//? Space Complexity: O(n * m) where n is the number of rows and m is the number of columns