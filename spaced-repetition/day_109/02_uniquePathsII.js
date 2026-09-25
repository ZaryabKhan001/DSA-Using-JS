//? LeetCode #63
//? Unique Paths II

// You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

// An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

// Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

// The testcases are generated so that the answer will be less than or equal to 2 * 109.

//? Example 1:
// Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
// Output: 2
// Explanation: There is one obstacle in the middle of the 3x3 grid above.
// There are two ways to reach the bottom-right corner:
// 1. Right -> Right -> Down -> Down
// 2. Down -> Down -> Right -> Right

//? Example 2:
// Input: obstacleGrid = [[0,1],[0,0]]
// Output: 1

//? Constraints:
// m == obstacleGrid.length
// n == obstacleGrid[i].length
// 1 <= m, n <= 100
// obstacleGrid[i][j] is 0 or 1.


//? Thought Process:
// Exactly Similar to unique paths I.
// Just we need to make sure that cell having 1 is an obstacle, and it makes path invalid.
// Valid path is the one which has zero cell having 1 value in it.

//* Two ways to achive it.
// 1: Call for that cell has and then check it if invalid cell, return 0.
// 2: First check for that cell value and only calls solve() for a valid cell. (Controlled Recursion).

//? Code: (Top Down)
var uniquePathsWithObstacles = function (obstacleGrid) {
    let n = obstacleGrid.length;
    let m = obstacleGrid[0].length;

    if (obstacleGrid[0][0] === 1) {
        return 0;
    }

    const dp = Array.from({ length: n }, () => new Array(m).fill(undefined));

    const solve = (i, j) => {
        if (i === 0 && j === 0) {
            return 1;
        }
        if (i < 0 || j < 0) {
            return 0;
        }
        if (obstacleGrid[i][j] === 1) {
            return 0;
        }

        if (dp[i][j] !== undefined) {
            return dp[i][j];
        }

        return dp[i][j] = solve(i - 1, j) + solve(i, j - 1);
    };

    return solve(n - 1, m - 1);
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m) and for recursion stack O(n + m) 
// Boils down to O(n * m)

//? Code: (Bottom Up)
var uniquePathsWithObstacles = function (obstacleGrid) {
    let n = obstacleGrid.length;
    let m = obstacleGrid[0].length;

    if (obstacleGrid[0][0] === 1) {
        return 0;
    }

    const dp = Array.from({ length: n }, () => new Array(m).fill(0));
    dp[0][0] = 1;
    //* Initialization
    for (let i = 1; i < n; i = i + 1) {
        if (obstacleGrid[i][0] === 0) {
            dp[i][0] = dp[i - 1][0];
        };
    }
    for (let i = 1; i < m; i = i + 1) {
        if (obstacleGrid[0][i] === 0) {
            dp[0][i] = dp[0][i - 1];
        };
    }

    for (let i = 1; i < n; i = i + 1) {
        for (let j = 1; j < m; j = j + 1) {
            if (obstacleGrid[i][j] === 0) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }

    return dp[n - 1][m - 1];
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)

//* Remember in bottom up dp initialization part if one cell is invalid, next all will become invalid.
//* One important thing to remember over here is what if first cell itself is invalid cell. So, we can't go anywhere. We can't even start our processing. So, return 0 straighaway.

