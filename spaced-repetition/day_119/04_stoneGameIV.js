//? LeetCode #1510
//? Stone Game IV

// Alice and Bob take turns playing a game, with Alice starting first.

// Initially, there are n stones in a pile. On each player's turn, that player makes a move consisting of removing any non-zero square number of stones in the pile.

// Also, if a player cannot make a move, he/she loses the game.

// Given a positive integer n, return true if and only if Alice wins the game otherwise return false, assuming both players play optimally.

//? Example 1:
// Input: n = 1
// Output: true
// Explanation: Alice can remove 1 stone winning the game because Bob doesn't have any moves.

//? Example 2:
// Input: n = 2
// Output: false
// Explanation: Alice can only remove 1 stone, after that Bob removes the last one winning the game (2 -> 1 -> 0).

//? Example 3:
// Input: n = 4
// Output: true
// Explanation: n is already a perfect square, Alice can win with one move, removing 4 stones (4 -> 0).

//? Constraints:
// 1 <= n <= 105

//? Thought Process:
// solve(n) = Can the CURRENT PLAYER win with n stones?

// Base case:
// n = 0 -> no move possible -> current player loses.

// Try every possible move:
// Remove 1, 4, 9, 16... stones.

// Key idea:
// If ANY move makes the opponent lose,
// current player can choose that move and WIN.

// So:
// solve(remaining) === false -> I WIN.
// If all possible moves make opponent win -> I LOSE.

// DP is needed because the same n can be reached many times.

// dp[n] = whether current player can win with n stones.

// Remember:
// "I don't look for a state where I win.
// I look for a move that puts my opponent in a losing state."

//? Code:
var winnerSquareGame = function (n) {
  const dp = new Array(n + 1).fill(undefined);

  const solve = (n) => {
    // No number left -> current player loses
    if (n === 0) {
      return false;
    }

    // Already calculated
    if (dp[n] !== undefined) {
      return dp[n];
    }

    // Try every possible square number
    for (let k = 1; k * k <= n; k = k + 1) {
      // If opponent loses after our move,
      // current player wins
      if (solve(n - k * k) === false) {
        return (dp[n] = true);
      }
    }

    // No winning move found
    return (dp[n] = false);
  };

  return solve(n);
};

//? Time Complexity: O(n * sqrt(n))
//? Space Complexity: O(n)
