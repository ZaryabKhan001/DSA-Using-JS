//? LeetCode #79
//? Word Search

// Given an m x n grid of characters board and a string word, return true if word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

//? Example 1:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true

//? Example 2:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true
// Example 3:

// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false

//? Approach:
// Traverse the board cell by cell.
// Whenever the first character of the word matches, start a DFS backtracking search from that cell.
// In DFS:
// Mark the current cell as visited ("#").
// Explore all 4 directions (up, down, left, right) if the next character matches.
// If you reach the end of the word, return true.
// Restore the cell after exploring (backtrack).
// If any DFS path finds the word, return true; otherwise return false.

//? Code:
var exist = function (board, word) {
  let result = false;
  let m = board.length;
  let n = board[0].length;
  let backtrack = (x, y, nextIndex) => {
    if (nextIndex === word.length) {
      result = true;
    }
    let original = board[x][y];
    board[x][y] = "#";
    if (y < n - 1 && board[x][y + 1] === word[nextIndex]) {
      backtrack(x, y + 1, nextIndex + 1);
    }
    if (y > 0 && board[x][y - 1] === word[nextIndex]) {
      backtrack(x, y - 1, nextIndex + 1);
    }
    if (x > 0 && board[x - 1][y] === word[nextIndex]) {
      backtrack(x - 1, y, nextIndex + 1);
    }
    if (x < m - 1 && board[x + 1][y] === word[nextIndex]) {
      backtrack(x + 1, y, nextIndex + 1);
    }
    board[x][y] = original;
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0]) {
        backtrack(i, j, 1);
      }
    }
  }
  return result;
};
