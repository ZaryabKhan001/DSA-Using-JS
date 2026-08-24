//? Matrix Chain Multiplication (gfg)

// Given an array arr[] which represents the dimensions of a sequence of matrices where the ith matrix has the dimensions (arr[i-1] x arr[i]) for i>=1, find the most efficient way to multiply these matrices together. The efficient way is the one that involves the least number of multiplications.

//? Examples:

// Input: arr[] = [2, 1, 3, 4]
// Output: 20
// Explanation: There are 3 matrices of dimensions 2 × 1, 1 × 3, and 3 × 4, Let this 3 input matrices be M1, M2, and M3. There are two ways to multiply: ((M1 x M2) x M3) and (M1 x (M2 x M3)), note that the result of (M1 x M2) is a 2 x 3 matrix and result of (M2 x M3) is a 1 x 4 matrix.
// ((M1 x M2) x M3)  requires (2 x 1 x 3) + (2 x 3 x 4) = 30
// (M1 x (M2 x M3))  requires (1 x 3 x 4) + (2 x 1 x 4) = 20.
// The minimum of these two is 20.

// Input: arr[] = [1, 2, 3, 4, 3]
// Output: 30
// Explanation: There are 4 matrices of dimensions 1 × 2, 2 × 3, 3 × 4, 4 × 3. Let this 4 input matrices be M1, M2, M3 and M4. The minimum number of multiplications are obtained by ((M1 x M2) x M3) x M4). The minimum number is (1 x 2 x 3) + (1 x 3 x 4) + (1 x 4 x 3) = 30.

// Input: arr[] = [3, 4]
// Output: 0
// Explanation: As there is only one matrix so, there is no cost of multiplication.

//? Constraints:
// 2 ≤ arr.size() ≤ 100
// 1 ≤ arr[i] ≤ 200
// ============================================================
// MATRIX CHAIN MULTIPLICATION — PARTITION DP PATTERN
// ============================================================

//? KEY IDEA:
// In Partition DP, we divide the problem into different parts
// and try every possible partition to find the best answer.
//
// Common examples:
// - Matrix Chain Multiplication
// - Palindrome Partitioning
// - Boolean Parenthesization
// - Burst Balloons
//
// The general idea is:
//
//       i -------- j
//       |    k     |
//       |----|-----|
//          partition
//
// We try every possible k and choose the best answer.

//? STEP 1: Find i and j
// Ask:
// "What part of the array/string am I currently solving?"

// Usually:
//     i = starting point
//     j = ending point

// In MCM:
//     solve(arr, 1, n - 1)

// Why 1?
// Because arr represents dimensions, not matrices directly.

// Example:
// arr = [10, 20, 30, 40]

// Matrices:
// A = 10 × 20
// B = 20 × 30
// C = 30 × 40

// So we solve from matrix 1 to matrix n-1.

//? STEP 2: Find the base case
// "When do I NOT need to partition anymore?"

// If there is only one matrix, there is nothing to multiply.

// Therefore:

//     if (i >= j) return 0;

//? STEP 3: Find the k loop
// k represents the place where we partition.

//     i -------- j
//     |    k     |
//     |----|-----|

// k must go from:

//     i → j - 1

// So:

//     for (let k = i; k < j; k++) {

// We cannot use k = j because then the right side
// would contain nothing.

//? STEP 4: Calculate the temporary answer

// For every k, solve:

//     LEFT  = solve(i, k)
//     RIGHT = solve(k + 1, j)

// Then add the cost of combining the two parts.

// In MCM:

//     temporaryAns =
//         solve(i, k)
//         + multiplication cost
//         + solve(k + 1, j)

// Example:

//     [A B C D]

// If k splits:

//     [A B] | [C D]

// We calculate:

//     cost([A B])
//     + cost of multiplying [A B] and [C D]
//     + cost([C D])

//? STEP 5: Update the main answer
// We try every possible k.

// Since MCM asks for MINIMUM multiplication cost:

//     min = Math.min(min, temporaryAns);

// For other Partition DP problems, it could be different.

//? Then add DP:
//    → Store dp[i][j] so the same subproblem isn't solved again.

//? Code:
class Solution {
  matrixMultiplication(arr) {
    let n = arr.length;
    let dp = Array.from({ length: n }, () => new Array(n).fill(undefined));

    const solve = (arr, i, j) => {
      if (i >= j) {
        return 0;
      }

      if (dp[i][j] != undefined) {
        return dp[i][j];
      }

      let min = Infinity;
      for (let k = i; k < j; k = k + 1) {
        const temporaryAns =
          solve(arr, i, k) +
          arr[i - 1] * arr[k] * arr[j] +
          solve(arr, k + 1, j);
        min = Math.min(min, temporaryAns);
      }

      return (dp[i][j] = min);
    };

    return solve(arr, 1, n - 1);
  }
}

//? Time Complexity: O(n^3) // O(n^2) for dp table and O(n) for k loop.
//? space Complexity: O(n^2) // for dp table.
