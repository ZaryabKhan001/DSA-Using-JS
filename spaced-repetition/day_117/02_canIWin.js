//? LeetCode #464
//? Can I Win

// In the "100 game" two players take turns adding, to a running total, any integer from 1 to 10. The player who first causes the running total to reach or exceed 100 wins.

// What if we change the game so that players cannot re-use integers?

// For example, two players might take turns drawing from a common pool of numbers from 1 to 15 without replacement until they reach a total >= 100.

// Given two integers maxChoosableInteger and desiredTotal, return true if the first player to move can force a win, otherwise, return false. Assume both players play optimally.

//? Example 1:
// Input: maxChoosableInteger = 10, desiredTotal = 11
// Output: false

//? Explanation:
// No matter which integer the first player choose, the first player will lose.
// The first player can choose an integer from 1 up to 10.
// If the first player choose 1, the second player can only choose integers from 2 up to 10.
// The second player will win by choosing 10 and get a total = 11, which is >= desiredTotal.
// Same with other integers chosen by the first player, the second player will always win.

//? Example 2:
// Input: maxChoosableInteger = 10, desiredTotal = 0
// Output: true

//? Example 3:
// Input: maxChoosableInteger = 10, desiredTotal = 1
// Output: true

//? Constraints:
// 1 <= maxChoosableInteger <= 20
// 0 <= desiredTotal <= 300

//? Thought Process:
// First, check whether it is even possible to reach desiredTotal.
// If the sum of all available numbers is smaller than desiredTotal,
// then reaching the target is impossible.

// Now, we have a set of available numbers.
// On each turn, the current player can choose any available number.

// After choosing a number, we remove it from the available numbers
// and reduce the remaining target by that number.

// Now it becomes the opponent's turn.

// The main game strategy idea is:
// If I can make a choice such that the opponent reaches a losing state,
// then my current state is a winning state.

// So, for every available number:
// 1. Choose the number.
// 2. Remove it from the available numbers.
// 3. Give the remaining target to the opponent.
// 4. Check whether the opponent can win.

// If the opponent cannot win, I win.

// If every possible choice allows the opponent to win,
// then the current player loses.

// Since the same available-number state can occur multiple times,
// we store the result in a Map using the available numbers as the key.

// This converts the simple recursive Game Strategy solution
// into a DP + Memoization solution.

//? Code:
var canIWin = function (maxChoosableInteger, desiredTotal) {
  let total = (maxChoosableInteger * (maxChoosableInteger + 1)) / 2;

  // Impossible to reach desiredTotal
  if (total < desiredTotal) {
    return false;
  }
  let availableNumbers = [];

  for (let i = 1; i <= maxChoosableInteger; i++) {
    availableNumbers.push(i);
  }

  let memo = new Map();
  function canWin(availableNumbers, remainingTotal) {
    let key = availableNumbers.join(",");

    // Already calculated
    if (memo.has(key)) {
      return memo.get(key);
    }

    for (let i = 0; i < availableNumbers.length; i++) {
      let choice = availableNumbers[i];

      // I can reach the target
      if (choice >= remainingTotal) {
        memo.set(key, true);
        return true;
      }

      // Remove chosen number
      let newAvailable = [...availableNumbers];
      newAvailable.splice(i, 1);

      // Opponent's turn
      let opponentCanWin = canWin(newAvailable, remainingTotal - choice);

      // Opponent loses → I win
      if (!opponentCanWin) {
        memo.set(key, true);
        return true;
      }
    }

    // Every choice allows opponent to win
    memo.set(key, false);
    return false;
  }

  return canWin(availableNumbers, desiredTotal);
};

//? Time Complexity: O(n^2 * 2^n)
// First n for loop.
// Second n for [...availableNumbers].
// 2^n for unique states
//? Space Complxity: O(n * 2^n)
// 2^n for unique states and each state is a string containing available numbers.
