//? Search in a Row-Column Sorted

// Given a 2D integer matrix mat[][] of size n x m, where every row and column is sorted in increasing order and a number x, the task is to find whether element x is present in the matrix.

//? Examples:

// Input: mat[][] = [[3, 30, 38],[20, 52, 54],[35, 60, 69]], x = 62
// Output: false
// Explanation: 62 is not present in the matrix, so output is false.

// Input: mat[][] = [[18, 21, 27],[38, 55, 67]], x = 55
// Output: true
// Explanation: 55 is present in the matrix.

// Input: mat[][] = [[1, 2, 3],[4, 5, 6],[7, 8, 9]], x = 3
// Output: true
// Explanation: 3 is present in the matrix.

//? Constraints:
// 1 <= n, m <=1000
// 1 <= mat[i][j] <= 109
// 1<= x <= 109

//? Approach:
// Start from the top-right corner of the matrix.
// If the current element is equal to x, return true.
// If the current element is greater than x, move to the left.
// If the current element is less than x, move to the down.
// Repeat until the element is found or the matrix is exhausted.

//? Why top-right corner?
// Reasoning (works for all cases):

// 1. Choose the corner where one move always increases the value and the other always decreases it.
// 2. Compare the current element with x.
// 3. Move in the direction that can still contain x and eliminate the entire row or column in the other direction.
// 4. This guarantees O(n + m) time because one row or one column is discarded in every step.

//? Code:
class Solution {
  matSearch(mat, x) {
    let n = mat.length;
    let m = mat[0].length;

    let row = 0;
    let col = m - 1;

    while (row < n && col >= 0) {
      let mid = mat[row][col];

      if (mid == x) {
        return true;
      } else if (x < mid) {
        col--;
      } else {
        row++;
      }
    }

    return false;
  }
}

//? Time Complexity: O(n + m)
//? Space Complexity: O(1)
