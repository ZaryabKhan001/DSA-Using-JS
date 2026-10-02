//? LeetCode #2328
//? Number of Increasing Paths in a Grid

// You are given an m x n integer matrix grid, where you can move from a cell to any adjacent cell in all 4 directions.

// Return the number of strictly increasing paths in the grid such that you can start from any cell and end at any cell. Since the answer may be very large, return it modulo 109 + 7.

// Two paths are considered different if they do not have exactly the same sequence of visited cells.

//? Example 1:
// Input: grid = [[1,1],[3,4]]
// Output: 8
// Explanation: The strictly increasing paths are:
// - Paths with length 1: [1], [1], [3], [4].
// - Paths with length 2: [1 -> 3], [1 -> 4], [3 -> 4].
// - Paths with length 3: [1 -> 3 -> 4].
// The total number of paths is 4 + 3 + 1 = 8.

//? Example 2:
// Input: grid = [[1],[2]]
// Output: 3
// Explanation: The strictly increasing paths are:
// - Paths with length 1: [1], [2].
// - Paths with length 2: [1 -> 2].
// The total number of paths is 2 + 1 = 3.

//? Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 1000
// 1 <= m * n <= 105
// 1 <= grid[i][j] <= 105

//? Thought Process:
// It looks difficult, but it is very easy.
// 1. I need to count all possible increasing paths in the grid.
// 2. A path can start from any cell, so first think: What can I do from one cell?
// 3. From one cell, I can move to its 4 neighbours.
// 4. But I can only move if the next value is greater than my current value.
// 5. So this naturally looks like DFS: start from one cell and explore all valid next cells.
// 6. Now think about one cell, for example (i, j): How many paths can start from here?
// 7. At minimum, the answer is 1, because staying on this cell is already one path.
// 8. If I can move to a greater neighbour, that neighbour already has some paths starting from it.
// 9. So my answer becomes: my own path + all paths from valid greater neighbours.
// 10. Now notice the problem: the same neighbour can be reached from many different cells.
// 11. That means I may calculate the answer for the same cell many times.
// 12. So I ask: Does the answer for (i, j) always mean the same thing?
// 13. Yes → it always means number of increasing paths starting from (i, j).
// 14. Therefore, I can save that answer in dp[i][j].
// 15. Next time I reach (i, j), I don't calculate again; I just return dp[i][j].
// 16. Now I have my state: dp[i][j] = paths starting from this cell.
// 17. My transition is: move to every neighbour where next > current.
// 18. My base idea is already included: current cell itself = 1 path.
// 19. Finally, paths can start anywhere, so I need to add the answer from every cell.
// 20. One important observation: because I only move to a larger value, I can never come back through an increasing path.
// 21. So there is no cycle problem in this DFS.
// 22. DP gives me only n × m unique states.
// 23. Each state checks only 4 neighbours → O(1) work per state.
// 24. Therefore, Time = O(n × m) and Space = O(n × m).


//? Code:
var countPaths = function (grid) {
    let n = grid.length;
    let m = grid[0].length;

    const MOD = 1e9 + 7;

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

    //* Check whether new i and j are inside the grid.
    const isSafe = (i, j) => {
        return i >= 0 && i < n && j >= 0 && j < m;
    };

    //* Check whether we can move from curr to next.
    const isIncreasingPath = (curr, next) => {
        return next > curr;
    };

    //* dp[i][j] = number of increasing paths starting from (i, j)
    let dp = Array.from(
        { length: n },
        () => Array(m).fill(-1)
    );

    //* DFS to find increasing paths starting from (i, j)
    const dfs = (i, j) => {

        //* If already calculated, return stored result.
        if (dp[i][j] !== -1) {
            return dp[i][j];
        }

        //* Current cell itself is one valid path.
        let result = 1;

        for (let dir of directions) {
            let { row: dRow, col: dCol } = dir;

            let newI = i + dRow;
            let newJ = j + dCol;

            if (isSafe(newI, newJ)) {
                if (
                    isIncreasingPath(
                        grid[i][j],
                        grid[newI][newJ]
                    )
                ) {
                    result = (result + dfs(newI, newJ)) % MOD;
                }
            }
        }

        //* Store result for this cell.
        dp[i][j] = result;

        return result;
    };

    //* Count all increasing paths.
    let count = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            count = (count + dfs(i, j)) % MOD;
        }
    }

    return count;
};

//? Time Complexity: O(n * m) for nested loops and O(n * m) for calculating unique states. and work per call is constant.
// O(n * m) + O(n * m) => O(n * m)
//? Space Complexity: O(n * m) for storing dp states.