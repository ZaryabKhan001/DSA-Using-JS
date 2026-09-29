//? LeetCode #329
//? Longest Increasing Path in a Matrix

// Given an m x n integers matrix, return the length of the longest increasing path in matrix.

// From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

//? Example 1:
// Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
// Output: 4
// Explanation: The longest increasing path is [1, 2, 6, 9].

//? Example 2:
// Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
// Output: 4
// Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.

//? Example 3:
// Input: matrix = [[1]]
// Output: 1

//? Constraints:
// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 200
// 0 <= matrix[i][j] <= 231 - 1

//? Thought Process:
// 1. I need to find the longest increasing path in the matrix.
// 2. A path can start from any cell, so first think: What can I do from one cell?
// 3. From one cell, I can move to its 4 neighbours.
// 4. But I can only move if the next value is greater than my current value.
// 5. So this naturally looks like DFS: start from one cell and keep moving to greater values.
// 6. Now think about one cell (i, j): What should dfs(i, j) return?
// 7. It should return the longest increasing path starting from this cell.
// 8. Even if I cannot move anywhere, this cell itself gives me a path of length 1.
// 9. So I start my result with 1.
// 10. Now I check all 4 neighbours one by one.
// 11. If a neighbour is inside the matrix and its value is greater, I can move there.
// 12. After moving there, dfs(newI, newJ) tells me the longest path starting from that neighbour.
// 13. But I am also including my current cell, so my path becomes 1 + dfs(newI, newJ).
// 14. I can have multiple valid neighbours, so I take the maximum among all of them.
// 15. Now notice that the same cell can be reached from different starting cells.
// 16. If I calculate dfs(i, j) again and again, I am doing the same work repeatedly.
// 17. So I ask: Does dfs(i, j) always mean the same thing?
// 18. Yes → it always means the longest increasing path starting from (i, j)
// 19. Therefore, I can store this answer in dp[i][j].
// 20. Next time I reach this cell, I simply return dp[i][j] instead of calculating again.
// 21. Now I have my state: dp[i][j] = longest increasing path starting from this cell.
// 22. Finally, the longest path can start from any cell, so I run dfs from every cell and take the maximum.
// 23. Because I only move from smaller → greater value, I can never come back to an old cell through an increasing path.
// 24. There are n × m unique cells, and each cell checks only 4 neighbours.
// 25. Therefore, Time = O(n × m) and Space = O(n × m).

//? Code:
var longestIncreasingPath = function (matrix) {
    let n = matrix.length;
    let m = matrix[0].length;
    let directions = [
        {
            row: 0,
            col: 1,
        },
        {
            row: 0,
            col: -1,
        },
        {
            row: 1,
            col: 0,
        },
        {
            row: -1,
            col: 0,
        },
    ];

    // Check whether new i and j are inside the matrix.
    const isSafe = (i, j) => {
        return i >= 0 && i < n && j >= 0 && j < m;
    };

    // Check whether we can move from curr to next.
    const isIncreasingPath = (curr, next) => {
        return next > curr;
    };

    // dp[i][j] = longest increasing path starting from (i, j)
    let dp = Array.from(
        { length: n },
        () => Array(m).fill(-1)
    );

    // DFS to find longest increasing path starting from (i, j)
    const dfs = (i, j) => {
        // If already calculated, return stored result.
        if (dp[i][j] !== -1) {
            return dp[i][j];
        }

        // Current cell itself is one valid path.
        let result = 1;
        for (let dir of directions) {
            let { row: dRow, col: dCol } = dir;
            let newI = i + dRow;
            let newJ = j + dCol;

            if (isSafe(newI, newJ)) {
                if (
                    isIncreasingPath(
                        matrix[i][j],
                        matrix[newI][newJ]
                    )
                ) {
                    result = Math.max(result, 1 + dfs(newI, newJ));
                }
            }
        }

        // Store result for this cell.
        dp[i][j] = result;
        return result;
    };

    // Get Longest increasing path from all increasing paths.
    let max = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            max = Math.max(max, dfs(i, j));
        }
    }

    return max;
};

//? Time Complexity: O(n * m) for nested loops and O(n * m) for calculating unique states. and work per call is constant.
// O(n * m) + O(n * m) => O(n * m)
//? Space Complexity: O(n * m) for storing dp states.