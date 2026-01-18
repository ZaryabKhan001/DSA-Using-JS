//? LeetCode #51:
//? N-Queens

// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

// Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

// Each solution contains a distinct board configuration of the n-queens’ placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

//? Example 1:
// Input: n = 4
// Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above.

//? Example 2:
// Input: n = 1
// Output: [["Q"]]

//? Approach:
// Use backtracking row by row to try placing queens.
// Keep three sets to track conflicts:
// colSet → columns with a queen.
// digSet → diagonals with slope \ (row - col).
// antiDigSet → diagonals with slope / (row + col).
// At each row:
// Try every column.
// If column or diagonals are already attacked, skip.
// Otherwise, place a queen, mark sets, and recurse for the next row.
// If all rows are filled, convert board into string form and add to results.
// After recursion, remove the queen (backtrack) and unmark sets.

//? Code:
var solveNQueens = function (n) {
  let result = [];
  let board = Array.from({ length: n }, () => Array(n).fill("."));
  let backtrack = (board, row, colSet, digSet, antiDigSet) => {
    if (row == n) {
      result.push(transform(board));
    }
    for (let col = 0; col < n; col++) {
      if (
        colSet.has(col) ||
        digSet.has(row - col) ||
        antiDigSet.has(row + col)
      ) {
        continue;
      }
      board[row][col] = "Q";
      colSet.add(col);
      digSet.add(row - col);
      antiDigSet.add(row + col);

      backtrack(board, row + 1, colSet, digSet, antiDigSet);
      board[row][col] = ".";
      colSet.delete(col);
      digSet.delete(row - col);
      antiDigSet.delete(row + col);
    }
  };
  backtrack(board, 0, new Set(), new Set(), new Set());
  return result;
};

let transform = (board) => {
  let newBoard = [];
  for (let i = 0; i < board.length; i++) {
    newBoard.push(board[i].join(""));
  }
  return newBoard;
};

//? Time Complexity = O(n!)
//? Space Complexity = O(n2)
