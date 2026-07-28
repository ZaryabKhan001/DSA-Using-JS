//? LeetCode 52
//? N-Queens II

// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

// Given an integer n, return the number of distinct solutions to the n-queens puzzle.

//? Example 1:
// Input: n = 4
// Output: 2
// Explanation: There are two distinct solutions to the 4-queens puzzle as shown.

//? Example 2:
// Input: n = 1
// Output: 1

//? Constraints:
// 1 <= n <= 9


//? Thought Process:
// We have n*n size chess board and we need to place n queens on it such that no two queens attack each other.
// And a queen can attack another queen if they are in the same row, column or diagonal.
// So we need to put the queens in such a way that no two queens are in the same row, column or diagonal.
// but since we are starting from row one, we are not sure on which ccolumn to place the queen, so we will try all the columns and check if it is safe to place the queen in that column or not.

//* Eventually we willl be checking for all the columns for each row, to place queen or not.

// So we use recursion where we are checking all coulmns for each row to place queen or not, but there is a chance that we might not be able to place the queen in any of the columns for that row, so we will backtrack and remove the queen from the previous row and try to place it in the next column of that row.

//? Code:
var totalNQueens = function (n) {
    if (n === 1) {
        return 1;
    }

    const chessBoard = Array.from({ length: n }, () => new Array(n).fill('.'));
    let result = 0;

    //* helper method to check whether a position is safe to place a queen or not
    const isSafePlace = (row, col) => {
        //* It must be no queen present in the same column
        for (let i = row - 1; i >= 0; i = i - 1) {
            if (chessBoard[i][col] === 'Q') {
                return false;
            }
        }

        //* check top left diagnol cells
        let r = row - 1;
        let c = col - 1;
        while (r >= 0 && c >= 0) {
            if (chessBoard[r][c] === 'Q') {
                return false;
            }
            r--;
            c--;
        }

        //* check top right diagnol cells
        r = row - 1;
        c = col + 1;
        while (r >= 0 && c < n) {
            if (chessBoard[r][c] === 'Q') {
                return false;
            }
            r--;
            c++;
        }

        return true;
    };

    const backTrack = (rowIndex) => {
        //* base case
        if (rowIndex === n) {
            result++;
            return;
        }

        //* Explore all colIndexes for each and every rowIndex
        for (let colIndex = 0; colIndex < n; colIndex = colIndex + 1) {
            if (isSafePlace(rowIndex, colIndex)) {
                chessBoard[rowIndex][colIndex] = 'Q';
                backTrack(rowIndex + 1);
                chessBoard[rowIndex][colIndex] = '.';
            }
        }
    };

    backTrack(0);
    return result;
};

//? Time Complexity: O(n!) - Maximum branches we can have is n! because for each row we have n choices and for next row we have n-1 choices and so on.
//? Space Complexity: O(n^2) - We are using a chessBoard of size n*n to store the queens and also we are using recursion stack which can go upto n.

