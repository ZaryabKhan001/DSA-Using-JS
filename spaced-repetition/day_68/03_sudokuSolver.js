//? LeetCode #37
//? Sudoku Solver

// Write a program to solve a Sudoku puzzle by filling the empty cells.

// A sudoku solution must satisfy all of the following rules:

// Each of the digits 1-9 must occur exactly once in each row.
// Each of the digits 1-9 must occur exactly once in each column.
// Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
// The '.' character indicates empty cells.

//? Example 1:
// Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
// Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
// Explanation: The input board is shown above and the only valid solution is shown below:

//? Constraints:
// board.length == 9
// board[i].length == 9
// board[i][j] is a digit or '.'.
// It is guaranteed that the input board has only one solution.

//? Thought Process:
// We need to fill all empty cells of a 9×9 Sudoku board. For each empty cell, we have choices from digits 1-9.
// But we cannot place every digit; we need to ensure the digit is not present in the same row, column, or 3×3 grid.
// This gives us controlled recursion where we only explore valid choices.
// After placing a valid digit, we recursively try to fill the remaining cells.
// If we reach a point where no valid option exists, we backtrack and undo the previous choice.
// We then try the next possible choice until we find a valid solution.

//? Code:
const isValid = (board, row, col, digit) => {
  let ch = digit.toString();
  //* scan row to find out digit is used somewhere already or not
  for (let i = 0; i < 9; i = i + 1) {
    if (board[row][i] === ch) {
      return false;
    }
  }
  //* scan column to find out digit is used somewhere already or not
  for (let i = 0; i < 9; i = i + 1) {
    if (board[i][col] === ch) {
      return false;
    }
  }
  //* scan 3*3 grid to find out digit is used somewhere already or not
  let rowStart = Math.floor(row / 3) * 3;
  let colStart = Math.floor(col / 3) * 3;
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      if (board[i][j] === ch) {
        return false;
      }
    }
  }
  return true;
};

var solveSudoku = function (board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === ".") {
        //* try digits 1 to 9
        for (let digit = 1; digit <= 9; digit = digit + 1) {
          if (isValid(board, row, col, digit)) {
            board[row][col] = digit.toString();
            if (solveSudoku(board)) {
              return true;
            }
            board[row][col] = ".";
          }
        }

        //* no digits work
        return false;
      }
    }
  }

  //* no empty cell is present in the board
  return true;
};

//? Time Complexity: O(E^9)
//? Space Complexity: O(E) where E is the number of empty cells
