//? LeetCode #790
//? Domino and Tromino Tiling

// You have two types of tiles: a 2 x 1 domino shape and a tromino shape. You may rotate these shapes.

// Given an integer n, return the number of ways to tile an 2 x n board. Since the answer may be very large, return it modulo 109 + 7.

// In a tiling, every square must be covered by a tile. Two tilings are different if and only if there are two 4-directionally adjacent cells on the board such that exactly one of the tilings has both squares occupied by a tile.

//? Example 1:
// Input: n = 3
// Output: 5
// Explanation: The five different ways are shown above.

//? Example 2:
// Input: n = 1
// Output: 1

//? Constraints:
// 1 <= n <= 1000

//? Thought Process:
// First understand the problem. We have a 2 x n board and we can tile it using dominoes (2 x 1) and trominoes (L-shaped tiles). The goal is to find the number of ways to completely tile the board.
// Also one most important thing to note is that we can rotate the tiles. So, we can place the dominoes either vertically or horizontally and the trominoes can be placed in 4 different orientations.

// We have to fill board completely, and return the number of ways to do that.

//* It looks a very difficult problem but it is not start from last and comes forward and take choices for filling.

// Take r1 and r2 as the number of rows left to fill in the first and second row respectively.

//* If r1 == r2, we can fill the first row and second row with dominoes or trominoes. So, we have 4 choices to fill the board.
// choice 1 = fill both rows with dominoes vertically, which will reduce r1 and r2 by 1.
// choice 2 = fill both rows with dominoes horizontally, which will reduce r1 and r2 by 2.
// choice 3 = fill row with mirror of L-shaped tromino and first row with domino, which will reduce r1 by 1 and r2 by 2.
// choice 4 = fill row with inverted L-shaped tromino and first row with domino, which will reduce r1 by 2 and r2 by 1.

//* If r1 > r2, we can fill the first row with dominoes or trominoes. So, we have 2 choices to fill the board.
// choice 1 = fill horizontal dominoe in the first row, which will reduce r1 by 2. r2 will remain same.
// choice 2 = fill row with tromino which will reduce r1 by 2 and r2 by 1.

//* If r1 < r2, we can fill the second row with dominoes or trominoes. So, we have 2 choices to fill the board.
// choice 1 = fill second row with dominoes horizontally, which will reduce r2 by 2. r1 will remain same.
// choice 2 = fill first row L-shaped tromino, which will reduce r1 by 1 and r2 by 2.

//* We can use memoization to store the results of subproblems and avoid recomputation. We can use a 2D array dp[r1][r2] to store the number of ways to fill the board with r1 rows left in the first row and r2 rows left in the second row.

//? Code:
var numTilings = function (n) {
    const MOD = 1000000007;
    let dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(undefined));
    const solve = (r1, r2) => {
        if (r1 === 0 && r2 === 0) {
            return 1;
        }
        if (r1 <= 0 || r2 <= 0) {
            return 0;
        }

        if (dp[r1][r2] !== undefined) {
            return dp[r1][r2];
        }

        if (r1 === r2) {
            return dp[r1][r2] = (solve(r1 - 1, r2 - 1) + solve(r1 - 2, r2 - 2) + solve(r1 - 1, r2 - 2) + solve(r1 - 2, r2 - 1)) % MOD;
        }
        else if (r1 > r2) {
            return dp[r1][r2] = (solve(r1 - 2, r2) + solve(r1 - 2, r2 - 1)) % MOD;
        }
        else {
            return dp[r1][r2] = (solve(r1, r2 - 2) + solve(r1 - 1, r2 - 2)) % MOD;
        }
    };

    return solve(n, n);
};

//? Time Complexity: O(n^2) - We are using a 2D DP array of size n x n, and each state is computed in constant time.
//? Space Complexity: O(n^2) - We are using a 2D DP array of size n x n to store the results of subproblems.