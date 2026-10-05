//? Divide and Subtract Game (gfg)

// Jon and Arya are playing a game. The rules of the game are as follows:

// They start with a single number n. Both players make alternate moves, with Jon making the first move.

// In each move, a player can perform exactly one of the following operations:

// Divide the current number by 2, 3, 4, or 5 and take the floor value of the result.
// Subtract 2, 3, 4, or 5 from the current number.
// If after making a move the number becomes 1, the player who made that move automatically loses the game.

// The game ends when the number becomes 0.

// If a player cannot make a valid move, that player loses the game, determine the winner assuming both players play optimally.

//? Examples:

// Input: n = 3
// Output: "Jon"
// Explanation: Jon can subtract 3 from the initial number. The number becomes 0, and Arya has no valid move. Therefore, Jon wins.

// Input: n = 6
// Output: "Arya"
// Explanation: Jon can divide 6 by 3, making the number 2. Arya can then subtract 2, making the number 0. Hence, Jon loses and Arya wins.

//? Constraints:
// 2 ≤ n ≤ 105

//? Thought Process:
// This problem is simple. The main thing is understanding the problem correctly.

// Jon starts the game, and we have to predict who will win if both
// players play optimally.

// Let's understand the important rules first.

// If we are given 0:
// We have no valid moves left, so the player whose turn it is loses.
//?Therefore, 0 is a losing state.

// If we are given 1:
// The player who moves the value to 1 automatically loses.
// So if it is already 1, it means the previous player made the move
// that resulted in 1 and already lost.
// Therefore, 1 behaves like a winning state for the current player.

// For every other number, we have multiple choices:
// 1. Divide by 2, 3, 4, or 5 (using floor).
// 2. Subtract 2, 3, 4, or 5.

// For every choice, we check the state we reach after making that move.
// If we find ANY choice that takes the opponent to a losing state,
// then hum woh move choose kar lenge because opponent will lose.
// Therefore, our current state becomes a winning state.

// But there is one special case:
// If our move makes the number 1, we immediately lose.
// So any move that gives us 1 is a BAD choice and we simply ignore it.

// Because we need to check previous/computed states after every
// division and subtraction, we use DP to store whether each state
// is winning or losing.

//? DP meaning:
// dp[i] = if n is i, current player will lose or win.

//? Code:
class Solution {
  divAndSub(n) {
    let dp = new Array(n + 1).fill(0);
    dp[1] = 1;

    for (let i = 2; i <= n; i = i + 1) {
      for (let move = 2; move <= 5; move = move + 1) {
        let next = Math.floor(i / move);
        if (next != 1 && dp[next] == 0) {
          dp[i] = 1;
          break;
        }

        if (i - move >= 0) {
          let next = i - move;
          if (next != 1 && dp[next] == 0) {
            dp[i] = 1;
            break;
          }
        }
      }
    }

    return dp[n] == 1 ? "Jon" : "Arya";
  }
}

//? Time Complexity: O(n) //
//? Space Complexity: O(n) // For DP States
