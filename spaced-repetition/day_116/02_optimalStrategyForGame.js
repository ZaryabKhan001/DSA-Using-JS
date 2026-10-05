//? Optimal Strategy For A Game (gfg)

// Given an integer array arr[] of size n. The array elements represent n coins of values v1, v2, ....vn.
// You play against an opponent in an alternating way. In each turn, a player selects either the first or last coin from the row, removes it from the row permanently, and receives the coin's value.
// Find the maximum possible amount of money you can win if you go first.
// Note: Both the players are playing optimally.

//? Examples:

// Input: arr[] = [5, 3, 7, 10]
// Output: 15
// Explanation: The user collects the maximum value as 15(10 + 5). It is guaranteed that we cannot get more than 15 by any possible moves.

// Input: arr[] = [8, 15, 3, 7]
// Output: 22
// Explanation: The user collects the maximum value as 22(7 + 15). It is guaranteed that we cannot get more than 22 by any possible moves.

//? Constraints:
// 2 ≤ n ≤ 103
// 1 ≤ arr[i] ≤ 106

//? Thought Process:
//* Main idea
// There are 2 players and BOTH play optimally.
// I want to maximize my score.
// The opponent also wants to maximize their score.
// So from my perspective:

// MY TURN       → MAX
// OPPONENT TURN → MIN

//* Why MIN?
// Suppose I choose the left element.
// Now it is the opponent's turn.
// The opponent will choose the move that is BEST FOR THEM.
// That means they will leave me with the WORST possible future result.
// Therefore, from my perspective, I take MIN.

// So:
// My choice → MAX
// Opponent's response → MIN

//* Why not Greedy?
// Greedy says:
// "Pick the biggest value right now."
// But in games, my current choice affects future choices.
// The opponent also makes optimal decisions.
// Therefore:
// Best current choice ≠ Best final result
// We need to consider the opponent's response before deciding.

//* General thought process
// 1. What choices do I have?
// 2. What happens after each choice?
// 3. What is the opponent's best response?
// 4. Assume the opponent will hurt my result as much as possible.
// 5. Choose the option that gives me the best final result.

//* Pattern (Called mini-max strategy) (Prepare for the worst and hope fot the best.)
// MY CHOICE
// ↓
// OPPONENT'S BEST RESPONSE
// ↓
// Worst result for me → MIN
// ↓
// Choose best among my choices → MAX

// Therefore:
// MAX(
// my choice + MIN(opponent's responses)
// )

//* When to think about Minimax?
// Think about it when:

// * There are 2 players.
// * Players take turns.
// * Both play optimally.
// * Each player's decision affects the other.
// * The problem asks for maximum guaranteed score / winner / optimal result.

// Easy memory:
// "I choose MAX, assuming the opponent chooses MIN for me."

//? Code:
class Solution {
  maximumAmount(arr) {
    let n = arr.length;

    const dp = Array.from({ length: n }, () => new Array(n).fill(undefined));

    const solve = (i, j) => {
      // No elements
      if (i > j) {
        return 0;
      }

      // One element
      if (i === j) {
        return arr[i];
      }

      // Already calculated
      if (dp[i][j] !== undefined) {
        return dp[i][j];
      }

      const choice1 = arr[i] + Math.min(solve(i + 2, j), solve(i + 1, j - 1));

      const choice2 = arr[j] + Math.min(solve(i + 1, j - 1), solve(i, j - 2));

      dp[i][j] = Math.max(choice1, choice2);

      return dp[i][j];
    };

    return solve(0, n - 1);
  }
}

//? Time Complexity: O(n * n) unique states to solve
//? Space Complexity: O(n * n) for dp states
