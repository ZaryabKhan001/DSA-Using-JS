//? LeetCode #1219
//? Path with Maximum Gold

// In a gold mine grid of size m x n, each cell in this mine has an integer representing the amount of gold in that cell, 0 if it is empty.

// Return the maximum amount of gold you can collect under the conditions:

// Every time you are located in a cell you will collect all the gold in that cell.
// From your position, you can walk one step to the left, right, up, or down.
// You can't visit the same cell more than once.
// Never visit a cell with 0 gold.
// You can start and stop collecting gold from any position in the grid that has some gold.

//? Example 1:
// Input: grid = [[0,6,0],[5,8,7],[0,9,0]]
// Output: 24
// Explanation:
// [[0,6,0],
//  [5,8,7],
//  [0,9,0]]
// Path to get the maximum gold, 9 -> 8 -> 7.

//? Example 2:
// Input: grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
// Output: 28
// Explanation:
// [[1,0,7],
//  [2,0,6],
//  [3,4,5],
//  [0,3,0],
//  [9,0,20]]
// Path to get the maximum gold, 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.

//? Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 15
// 0 <= grid[i][j] <= 100
// There are at most 25 cells containing gold.

//? Thought Process:
// Let say if we are given a starting point, how we can reach to max gold collection?
// If we can think properly, we can move in four directions left, right, up and down from any cell. So recursion comes into mind. We have to check all four directions and keep track of the maximum gold we can collect.
// But not all the time, four directions are valid respecting the conditions which are given in the problem. So we have to do a kind of like a controlled recursion called backTracking. We will only move to the valid directions and keep track of the maximum gold we can collect. Once we reach a dead end, we will backtrack to the previous cell and check for other directions. We will keep track of the maximum gold we can collect from all the starting points in the grid.

//? But the real problem is we are not sure about the starting point. Maximum gold collection happens could be started from any non-zero cell. So we have to check all the non-zero cells in the grid and keep track of the maximum gold we can collect from all the starting points.

//? Code:
const dfs = (row, col, grid, n, m) => {
    let pathSum = 0;

    const choices = [
        {
            row: 0,
            col: -1,
        }, {
            row: 0,
            col: +1,
        }, {
            row: -1,
            col: 0,
        }, {
            row: +1,
            col: 0,
        }
    ];

    const isValid = (rowIndex, colIndex) => {
        if (rowIndex < 0 || rowIndex >= n) {
            return false;
        }
        else if (colIndex < 0 || colIndex >= m) {
            return false;
        }
        else if (grid[rowIndex][colIndex] === 0) {
            return false;
        }
        else {
            return true;
        }
    }

    const backTrack = (rowIndex, colIndex, currentSum) => {
        pathSum = Math.max(pathSum, currentSum);

        //* mark the current cell as visited
        const gold = grid[rowIndex][colIndex];
        grid[rowIndex][colIndex] = 0;

        //* exploring choices
        for (let choice of choices) {
            const newRowIndex = rowIndex + choice.row;
            const newColIndex = colIndex + choice.col;
            if (isValid(newRowIndex, newColIndex)) {
                currentSum += grid[newRowIndex][newColIndex];
                backTrack(newRowIndex, newColIndex, currentSum);
                currentSum -= grid[newRowIndex][newColIndex];
            }
        }

        //* restore gold for next paths
        grid[rowIndex][colIndex] = gold;
    };

    backTrack(row, col, grid[row][col]);
    return pathSum;
};

var getMaximumGold = function (grid) {
    let maxGoldCollected = 0;
    let n = grid.length;
    let m = grid[0].length;

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < m; col++) {
            if (grid[row][col] !== 0) {
                maxGoldCollected = Math.max(maxGoldCollected, dfs(row, col, grid, n, m));
            };
        }
    }

    return maxGoldCollected;
};

//? Time Complexity: O(k * 3^k) where k is the number of cells with gold
//? Space Complexity: O(k) where k is the number of cells with gold
