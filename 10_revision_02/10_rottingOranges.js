//? LeetCode 994.
//? Rotting Oranges

// You are given an m x n grid where each cell can have one of three values:

// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

//? Example 1:
// Input:
// grid = [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

//? Example 2:
// Input:
// grid = [[0,2]]
// Output: 0
// Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.

//? Approach:
// Identify rotten oranges (2) and push their positions + time ([i, j, 0]) into a queue.
// Use BFS to spread rot in 4 directions (up, down, left, right).
// For each direction: If neighbor is a fresh orange (1), rot it (→ 2) and push it into the queue with time +1.
// Track time with maxMinutes.
// After BFS, if any fresh orange (1) left, return -1.
// Else, return maxMinutes.

var orangesRotting = function (grid) {
  let m = grid.length;
  let n = grid[0].length;
  let queue = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j, 0]);
      }
    }
  }
  let maxMinutes = 0;
  while (queue.length) {
    let [x, y, level] = queue.shift();

    if (x > 0 && grid[x - 1][y] === 1) {
      grid[x - 1][y] = 2;
      queue.push([x - 1, y, level + 1]);
    }
    if (x < m - 1 && grid[x + 1][y] === 1) {
      grid[x + 1][y] = 2;
      queue.push([x + 1, y, level + 1]);
    }
    if (y < n - 1 && grid[x][y + 1] === 1) {
      grid[x][y + 1] = 2;
      queue.push([x, y + 1, level + 1]);
    }
    if (y > 0 && grid[x][y - 1] === 1) {
      grid[x][y - 1] = 2;
      queue.push([x, y - 1, level + 1]);
    }
    maxMinutes = Math.max(level, maxMinutes);
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        return -1;
      }
    }
  }
  return maxMinutes;
};

//? Time Complexity = O(m x n)
//? Space Complexity = O(m x n)
