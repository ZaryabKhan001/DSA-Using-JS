//? LeetCode #1025
//? Divisor Game

// Alice and Bob take turns playing a game, with Alice starting first.

// Initially, there is a number n on the chalkboard. On each player's turn, that player makes a move consisting of:

// Choosing any integer x with 0 < x < n and n % x == 0.
// Replacing the number n on the chalkboard with n - x.
// Also, if a player cannot make a move, they lose the game.

// Return true if and only if Alice wins the game, assuming both players play optimally.

//? Example 1:
// Input: n = 2
// Output: true
// Explanation: Alice chooses 1, and Bob has no more moves.

//? Example 2:
// Input: n = 3
// Output: false
// Explanation: Alice chooses 1, Bob chooses 1, and Alice has no more moves.

//? Constraints:
// 1 <= n <= 1000

//? Thought Process:
// Very easy problem. When I run the question implementation on different n values, from 1 to 8,
// everything becomes crystal clear.

// For odd values, the second player wins, and for even values, the first player wins.

//* Why does the first player win for every even value of n?

// 2 is a winning state for Player 1 because he can choose 1.
// 2 - 1 = 1, and 1 is a losing state for Player 2.

// Since 2 is a winning state, let's look at the next even numbers.

// For every even n, Player 1 can always choose 1.
// This changes n into n - 1, which is an odd number.

// Odd numbers are losing states, so Player 1 can always give
// a losing state to Player 2.

// Therefore, every even number is a winning state,
// and every odd number is a losing state.

//? Code:
var divisorGame = function (n) {
  return n % 2 === 0;
};

//? Time Complexity: O(1)
//? Space Complexity: O(1)
