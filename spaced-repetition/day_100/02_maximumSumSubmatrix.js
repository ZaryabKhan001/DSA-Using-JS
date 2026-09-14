//? Maximum Sum Submatrix (gfg)

// Given a 2D matrix mat[][] with dimensions n×m. Find the maximum possible sum of any submatrix within the given matrix.

//? Examples:

// Input: mat[][] = [[1, 2, -1, -4, -20], [-8, -3, 4, 2, 1], [3, 8, 10, 1, 3], [-4, -1, 1, 7, -6]]
// Output: 29
// Explanation: The matrix is as follows and the green rectangle denotes the maximum sum rectangle which is equal to 29.

// Input: mat[][] = [[-1, -2], [-3, -4]]
// Output: -1
// Explanation: Taking only the first cell is the optimal choice.

//? Constraints:
// 1 ≤ n, m ≤ 300
// -1000 ≤ mat[i][j] ≤ 1000

//? Thought Process:
// 1. We know Kadane's Algorithm can find the maximum sum in a 1D array.
// 2. So, try to convert the 2D matrix problem into a 1D problem.
// 3. Fix a top row and a bottom row.
// 4. Add all values between these two rows column-wise into `temp`.
// 5. Now `temp` represents the sum of each column inside that row range.
// 6. Run Kadane's Algorithm on `temp` to find the best consecutive columns.
// 7. Those consecutive columns \+ our fixed rows form a rectangle.
// 8. Try every possible `top` and `bottom` pair.
// 9. Keep updating the maximum sum found.
// 10. Remember: Fix 2 rows → compress → Kadane → repeat.

//? Code:
class Solution {
  maxRectSum(mat) {
    const maxSumSubarray = (arr) => {
      let n = arr.length;
      let max = arr[0];
      let result = arr[0];

      for (let i = 1; i < n; i = i + 1) {
        let choice1 = max + arr[i];
        let choice2 = arr[i];

        max = Math.max(choice1, choice2);
        result = Math.max(result, max);
      }

      return result;
    };

    let rows = mat.length;
    let cols = mat[0].length;
    let result = -Infinity;

    // Fix the top row
    for (let top = 0; top < rows; top = top + 1) {
      let temp = new Array(cols).fill(0);

      // Fix the bottom row
      for (let bottom = top; bottom < rows; bottom = bottom + 1) {
        // Add current row to our compressed array
        for (let col = 0; col < cols; col = col + 1) {
          temp[col] = temp[col] + mat[bottom][col];
        }

        // Find maximum subarray in compressed array
        let sumOfCurrentCell = maxSumSubarray(temp);

        result = Math.max(result, sumOfCurrentCell);
      }
    }

    return result;
  }
}

//? Time Complexity: O(R² × C)
//? Space Complexity: O(C)
