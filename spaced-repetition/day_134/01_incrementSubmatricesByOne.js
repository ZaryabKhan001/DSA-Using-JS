//? LeetCode #2536
//? Increment Submatrices by One

// You are given a positive integer n, indicating that we initially have an n x n 0-indexed integer matrix mat filled with zeroes.

// You are also given a 2D integer array query. For each query[i] = [row1i, col1i, row2i, col2i], you should do the following operation:

// Add 1 to every element in the submatrix with the top left corner (row1i, col1i) and the bottom right corner (row2i, col2i). That is, add 1 to mat[x][y] for all row1i <= x <= row2i and col1i <= y <= col2i.
// Return the matrix mat after performing every query.

//? Example 1:
// Input: n = 3, queries = [[1,1,2,2],[0,0,1,1]]
// Output: [[1,1,0],[1,2,1],[0,1,1]]
// Explanation: The diagram above shows the initial matrix, the matrix after the first query, and the matrix after the second query.
// - In the first query, we add 1 to every element in the submatrix with the top left corner (1, 1) and bottom right corner (2, 2).
// - In the second query, we add 1 to every element in the submatrix with the top left corner (0, 0) and bottom right corner (1, 1).

//? Example 2:
// Input: n = 2, queries = [[0,0,1,1]]
// Output: [[1,1],[1,1]]
// Explanation: The diagram above shows the initial matrix and the matrix after the first query.
// - In the first query we add 1 to every element in the matrix.

//? Constraints:
// 1 <= n <= 500
// 1 <= queries.length <= 104
// 0 <= row1i <= row2i < n
// 0 <= col1i <= col2i < n

//? Thought Process:
//* Brute Force Approach:
// Step 1: Create an n x n grid filled with 0.
// Step 2: For every query, get row1, col1, row2 and col2.
// Step 3: Traverse every cell inside the given rectangle.
// Step 4: Increment every cell by 1.
// Step 5: Return the final grid.

//* Problem:
// We are updating every cell inside the rectangle.
// If multiple queries cover the same cells, we keep updating them again and again.
// We can optimize this.

//* Optimized Approach Using Difference Array:
// Step 1: Instead of updating every cell, we will mark where the increment starts and where it stops.
// Step 2: For every query, traverse only the rows from row1 to row2.
// Step 3: In every affected row, increment grid[row][col1] by 1.
// This means the increment starts from this column.
// Step 4: If col2 + 1 is within the grid, decrement grid[row][col2 + 1] by 1.
// This means the increment should stop after col2.
// Step 5: After processing all queries, traverse every row from left to right.
// Step 6: Calculate the prefix sum by adding the previous column's value to the current column.
// This will spread the increment across the required range.
// Step 7: Return the final grid.

//* Why does this work?
// Instead of updating every cell inside a range, we mark the starting and ending positions.
// Prefix sum then applies the increments to all the cells between those positions.

//* Time Complexity: O(N² + Q * N)
// Space Complexity: O(N²)

//* Note:
// This approach optimizes the brute force solution using a 1D difference array for each row.
// We can optimize it further using a 2D difference array, which processes each query in O(1) time.

//? Code:
var rangeAddQueries = function (n, queries) {
  const grid = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 0; i < queries.length; i = i + 1) {
    let [row1, col1, row2, col2] = queries[i];

    for (let row = row1; row <= row2; row++) {
      grid[row][col1] += 1;

      if (col2 + 1 < n) {
        grid[row][col2 + 1] -= 1;
      }
    }
  }

  // Calculate prefix sums horizontally
  for (let row = 0; row < n; row++) {
    for (let col = 1; col < n; col++) {
      grid[row][col] += grid[row][col - 1];
    }
  }

  return grid;
};

//? Time Complexity: O((q * n) + (n * n)) where n is the length of rows and cols in grid and q is the length of queries.
//? Space Complexity: O(n * n) just for grid size. but our solution needs no extra space.
