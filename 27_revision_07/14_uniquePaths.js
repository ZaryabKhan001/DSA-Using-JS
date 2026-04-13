//? LeetCoode #62
//? Unique Paths

// There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

// Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

// The test cases are generated so that the answer will be less than or equal to 2 * 109.

//? Example 1:
// Input: m = 3, n = 7
// Output: 28

//? Example 2:
// Input: m = 3, n = 2
// Output: 3
// Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Down -> Down
// 2. Down -> Down -> Right
// 3. Down -> Right -> Down

//? Constraints:
// 1 <= m, n <= 100

//? Approach 01: DP (Bottom up)
// DP Definition: Let dp[i][j] represent the number of unique paths to reach cell (i,j)
// Bases cases are like this:
// First row → Only one way (all moves right).
// First column → Only one way (all moves down).
// Transition: To reach (i,j), you can come from:
// Above: (i-1, j)
// Left: (i, j-1)
// Final result is at bottom-right cell → dp[m-1][n-1].

//? Code:
var uniquePaths = function (m, n) {
  let uniquePaths = 1;
  const grid = Array.from({ length: m }, () => Array(n).fill(1));

  for (let i = 1; i < m; i = i + 1) {
    for (let j = 1; j < n; j = j + 1) {
      grid[i][j] = grid[i - 1][j] + grid[i][j - 1];
      uniquePaths = grid[i][j];
    }
  }

  return uniquePaths;
};

//? Time Complexity: O(m * n)
//? Space Complexity: O(m * n)

//? Approach 02: DP (Top down)
// DP Definition: Let dp[i][j] represent the number of unique paths to reach cell (i,j)
// Bases cases are like this:
// First row → Only one way (all moves right).
// First column → Only one way (all moves down).
// Transition: To reach (i,j), you can come from:
// Above: (i-1, j)
// Left: (i, j-1)
// Final result is at bottom-right cell → dp[m-1][n-1].

//? Code:
var uniquePaths = function (m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(-1));

  const traversal = (x, y) => {
    //* base case
    if (x === 0 && y === 0) return 1;

    //* edge case
    if (x < 0 || y < 0) return 0;

    //* checking from dp
    if (dp[x][y] !== -1) return dp[x][y];

    //* processing
    return (dp[x][y] = traversal(x - 1, y) + traversal(x, y - 1));
  };

  return traversal(m - 1, n - 1);
};

//? Time Complexity: O(m * n)
//? Space Complexity: O(m * n)
