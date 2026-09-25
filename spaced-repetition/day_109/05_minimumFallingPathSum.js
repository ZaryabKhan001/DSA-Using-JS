//? LeetCode #931
//? Minimum Falling Path Sum

// Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.

// A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right. Specifically, the next element from position (row, col) will be (row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).

//? Example 1:
// Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
// Output: 13
// Explanation: There are two falling paths with a minimum sum as shown.

//? Example 2:
// Input: matrix = [[-19,57],[-40,-5]]
// Output: -59
// Explanation: The falling path with a minimum sum is shown.

//? Constraints:
// n == matrix.length == matrix[i].length
// 1 <= n <= 100
// -100 <= matrix[i][j] <= 100

//? Thought Process:
// 1. We need to find the minimum sum path from the top row to the bottom row.
// 2. From any cell (i, j), we can move down-left, down, or down-right.
// 3. There is no fixed starting column, so every cell in the first row can be a starting point.
// 4. There is also no fixed ending column, so every cell in the last row can be an ending point.
// 5. For each cell, I ask: "What is the minimum path sum starting from this cell?"
// 6. From (i, j), there are only three possible next cells.
// 7. So, the answer for a cell is its value plus the minimum of those three next paths.
// 8. When we reach the last row, we cannot move further, so we return matrix[i][j].
// 9. The recursive solution works, but it can calculate the same cell many times.
// 10. For example, different paths can reach the same cell (i, j).
// 11. Once we reach the same cell, the minimum path from that cell onward is always the same.
// 12. This is called an overlapping subproblem.
// 13. So, we store the answer for each cell in dp[i][j].
// 14. If dp[i][j] is already calculated, we simply return it instead of calculating again.
// 15. This technique is called memoization, which is top-down dynamic programming.
// 16. There are n * n cells, and each cell is calculated only once.
// 17. Therefore, the time complexity is O(n^2).
// 18. The DP table uses O(n^2) space, and recursion uses O(n) stack space.
// 19. Finally, we try solve(0, i) for every column in the first row because any column can be the starting point.
// 20. We take the minimum of all those answers to get the minimum falling path sum.

//? Code: (Top Down)
var minFallingPathSum = function (matrix) {
  let n = matrix.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(undefined));

  const solve = (i, j) => {
    if (j < 0 || j >= n) {
      return Infinity;
    }
    if (i === n - 1) {
      return matrix[i][j];
    }

    if (dp[i][j] !== undefined) {
      return dp[i][j];
    }

    return (dp[i][j] =
      matrix[i][j] +
      Math.min(solve(i + 1, j - 1), solve(i + 1, j), solve(i + 1, j + 1)));
  };

  let minPathSum = Infinity;
  for (let i = 0; i < n; i = i + 1) {
    minPathSum = Math.min(minPathSum, solve(0, i));
  }
  return minPathSum;
};

//? Time Complexity: O(n^2) for unique states and O(n) for loop.
// It boils down to O(n^2)
//? Space Complexity: O(n^2) for dp states and O(n) for recursive stack. 
