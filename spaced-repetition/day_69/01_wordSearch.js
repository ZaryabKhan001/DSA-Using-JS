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

//? Thought Process:
// You can describe the thought process like this:
// Since the word can start from any cell in the board, first check every cell as a possible starting point. If the first character matches, explore from there.
// From a valid starting point, use DFS because each character depends on the previous one, and we need to follow one path at a time.
// Use backtracking because a chosen path may later fail. When that happens, undo the visited mark and try another direction so other paths remain available.
// As soon as one DFS finds the complete word, return `true` immediately because the problem only asks whether the word exists, not how many ways it exists. If any starting point succeeds, the overall answer is `true`; only if all starting points fail do we return `false`.

//? Code:
const dfs = (board, word, startRowIndex, startColIndex) => {
  let m = board.length;
  let n = board[0].length;

  const directions = [
    {
      row: -1,
      col: 0,
    },
    {
      row: +1,
      col: 0,
    },
    {
      row: 0,
      col: -1,
    },
    {
      row: 0,
      col: +1,
    },
  ];

  const isValid = (rowIndex, colIndex, targetChar) => {
    return (
      rowIndex < m &&
      rowIndex >= 0 &&
      colIndex < n &&
      colIndex >= 0 &&
      board[rowIndex][colIndex] === targetChar
    );
  };

  const backTrack = (row, col, index) => {
    //* base case
    if (index === word.length) {
      return true;
    }

    let targetChar = word[index];
    let currentBoardValue = board[row][col];

    //* explore diretcions
    for (let direction of directions) {
      let rowIndex = row + direction.row;
      let colIndex = col + direction.col;

      if (isValid(rowIndex, colIndex, targetChar)) {
        board[row][col] = "#";
        if (backTrack(rowIndex, colIndex, index + 1)) {
          return true;
        }
        board[row][col] = currentBoardValue;
      }
    }

    return false;
  };

  return backTrack(startRowIndex, startColIndex, 1);
};

var exist = function (board, word) {
  let m = board.length;
  let n = board[0].length;

  let startingAlphabet = word[0];

  for (let i = 0; i < m; i = i + 1) {
    for (let j = 0; j < n; j = j + 1) {
      if (board[i][j] === startingAlphabet) {
        if (dfs(board, word, i, j)) {
          return true;
        }
      }
    }
  }

  return false;
};

//? Time Complexity: O((n * m) * 3^L) where L is the length of the word and n*m for the exist loop also in worst case n*m valid starting points exists
//? Space Compelxity: O(L) recursive depth
