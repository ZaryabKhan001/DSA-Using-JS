//? LeetCode #64
//? Minimum Path Sum

// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

// Note: You can only move either down or right at any point in time.

//? Example 1:
// Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
// Output: 7
// Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

//? Example 2:
// Input: grid = [[1,2,3],[4,5,6]]
// Output: 12

//? Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 200
// 0 <= grid[i][j] <= 200

//? Thought Process:
// It is same question as unique paths. But here, we are not calculating no of paths but calculating the min Sum.
// dp[i][j]: The minimum path sum from the top-left (0, 0) to the cell (i, j).

//? Code: (Top Down)
var minPathSum = function (grid) {
    let n = grid.length;
    let m = grid[0].length;

    const dp = Array.from({ length: n }, () => new Array(m).fill(undefined));

    const solve = (i, j) => {
        if (i === 0 && j === 0) {
            return grid[0][0];
        }

        if (i < 0 || j < 0) {
            return Infinity;
        }

        if (dp[i][j] !== undefined) {
            return dp[i][j];
        }

        return dp[i][j] = grid[i][j] + Math.min(
            solve(i - 1, j),
            solve(i, j - 1)
        );
    };

    return solve(n - 1, m - 1);
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m) for dp and O(n + m) for recursion stack
// Which boils down to O(n * m)

//? Code: (Bottom Up)
var minPathSum = function (grid) {
    let n = grid.length;
    let m = grid[0].length;
    const dp = Array.from({ length: n }, () => new Array(m).fill(0));

    //* Initialization
    dp[0][0] = grid[0][0];
    for (let i = 1; i < n; i = i + 1) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    };
    for (let i = 1; i < m; i = i + 1) {
        dp[0][i] = dp[0][i - 1] + grid[0][i];
    };

    //* DP Filling
    for (let i = 1; i < n; i = i + 1) {
        for (let j = 1; j < m; j = j + 1) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
    }

    return dp[n - 1][m - 1];
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)

//* In Bottom UP DP Code, just try to think a little about the initialization process and filling recerrence remains same as the recursion recerrence.