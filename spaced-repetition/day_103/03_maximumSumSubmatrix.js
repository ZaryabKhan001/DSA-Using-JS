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

    // Kadane's Algorithm:
    // Finds the maximum sum of a contiguous subarray.
    const kadane = (arr) => {
      let current = arr[0];
      let best = arr[0];

      for (let i = 1; i < arr.length; i++) {

        // Either:
        // 1. Start a new subarray from arr[i]
        // 2. Extend the previous subarray
        current = Math.max(arr[i], current + arr[i]);

        // Keep track of the best sum found so far
        best = Math.max(best, current);
      }

      return best;
    };

    const rows = mat.length;
    const cols = mat[0].length;

    // Stores the maximum rectangle sum found so far
    let answer = -Infinity;

    // Choose the TOP row of the rectangle
    for (let top = 0; top < rows; top++) {

      // temp[col] will store the sum of a column
      // between the current TOP and BOTTOM rows.
      let temp = new Array(cols).fill(0);

      // Move the BOTTOM row downward.
      // Every top-bottom pair represents a possible
      // range of rows for our rectangle.
      for (let bottom = top; bottom < rows; bottom++) {

        // Add the current row into temp.
        //
        // Example:
        //
        // Matrix:
        // 1  2  3
        // 4  5  6
        //
        // top = 0, bottom = 1
        //
        // temp becomes:
        // [1+4, 2+5, 3+6]
        // [5,   7,   9]
        //
        // So temp converts the 2D problem into a 1D problem.
        for (let col = 0; col < cols; col++) {
          temp[col] += mat[bottom][col];
        }

        // Now temp contains the column sums.
        //
        // Kadane finds which consecutive columns
        // should be selected to get the maximum sum.
        //
        // This effectively chooses the LEFT and RIGHT
        // boundaries of our rectangle.
        answer = Math.max(answer, kadane(temp));
      }
    }

    return answer;
  }
}



//? Time Complexity: O(R² × C)
//? Space Complexity: O(C)
