//? LeetCode #980
//? Unique Paths III

// You are given an m x n integer array grid where grid[i][j] could be:

// 1 representing the starting square. There is exactly one starting square.
// 2 representing the ending square. There is exactly one ending square.
// 0 representing empty squares we can walk over.
// -1 representing obstacles that we cannot walk over.
// Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.

//? Example 1:
// Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
// Output: 2
// Explanation: We have the following two paths:
// 1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
// 2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)

//? Example 2:
// Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
// Output: 4
// Explanation: We have the following four paths:
// 1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
// 2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
// 3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
// 4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)

//? Example 3:
// Input: grid = [[0,1],[2,0]]
// Output: 0
// Explanation: There is no path that walks over every empty square exactly once.
// Note that the starting and ending square can be anywhere in the grid.

//? Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 20
// 1 <= m * n <= 20
// -1 <= grid[i][j] <= 2
// There is exactly one starting cell and one ending cell.

//? Thought Process:
// I started by observing that we need to explore all possible paths from the start to the end while visiting every non-obstacle cell exactly once, so DFS with recursion is a natural choice. In each recursive call, I keep track of the current position and the number of cells visited. If I reach the destination, I only count the path when all non-obstacle cells have been covered. From every cell, I try moving in the four possible directions after validating the move. To avoid revisiting cells in the same path, I mark the current cell as visited before recursion and restore it after returning, which is the backtracking step. This allows the algorithm to explore every possible path independently. Since each recursive call can branch into multiple directions, the solution explores all valid combinations and counts every valid path.

//? Code:
const isMoveValid = (grid, rowIndex, colIndex) => {
  let n = grid.length;
  let m = grid[0].length;

  return (
    rowIndex < n &&
    rowIndex >= 0 &&
    colIndex < m &&
    colIndex >= 0 &&
    grid[rowIndex][colIndex] !== -1
  );
};

const findPaths = (grid, startPos, nonObstacleCells) => {
  const startRowIndex = startPos[0];
  const startColIndex = startPos[1];

  const directions = [
    {
      move: "U",
      rowChange: -1,
      colChange: 0,
    },
    {
      move: "D",
      rowChange: 1,
      colChange: 0,
    },
    {
      move: "L",
      rowChange: 0,
      colChange: -1,
    },
    {
      move: "R",
      rowChange: 0,
      colChange: 1,
    },
  ];

  let paths = 0;
  const backTrack = (rowIndex, colIndex, cellsCovered) => {
    if (grid[rowIndex][colIndex] === 2) {
      if (cellsCovered === nonObstacleCells) {
        paths++;
      }
      return;
    }

    for (let direction of directions) {
      const { move, rowChange, colChange } = direction;

      let newRowIndex = rowIndex + rowChange;
      let newColIndex = colIndex + colChange;

      if (isMoveValid(grid, newRowIndex, newColIndex)) {
        grid[rowIndex][colIndex] = -1;
        cellsCovered++;
        backTrack(newRowIndex, newColIndex, cellsCovered);
        grid[rowIndex][colIndex] = 0;
        cellsCovered--;
      }
    }
  };

  backTrack(startRowIndex, startColIndex, 1);
  return paths;
};

const getData = (grid) => {
  let startPos = [];
  let nonObstacleCells = 0;

  let n = grid.length;
  let m = grid[0].length;
  for (let i = 0; i < n; i = i + 1) {
    for (let j = 0; j < m; j = j + 1) {
      if (grid[i][j] === 1) {
        startPos.push(i);
        startPos.push(j);
        nonObstacleCells++;
      } else if (grid[i][j] === 0 || grid[i][j] === 2) {
        nonObstacleCells++;
      }
    }
  }

  return { startPos, nonObstacleCells };
};

var uniquePathsIII = function (grid) {
  const { startPos, nonObstacleCells } = getData(grid);

  const paths = findPaths(grid, startPos, nonObstacleCells);

  return paths;
};

//? Time Complexity: O((n * m) + 3^k) where k is the no of non-obstacles cells
//? Space Complexty: O(k)
