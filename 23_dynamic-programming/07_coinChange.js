//? LeetCode #322.
//? Coin Change

// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.

//? Example 1:
// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1

//? Example 2:
// Input: coins = [2], amount = 3
// Output: -1

//? Example 3:
// Input: coins = [1], amount = 0
// Output: 0

//? Approach:
// Use recursion (fn(remAmount)) to try reducing the amount by picking each coin.
// Base cases:
// If remAmount == 0, no coins are needed → return 0.
// If remAmount < 0, invalid case → return -1.
// Store already-computed results in a memo (dp) to avoid re-computation.
// For each coin, recursively compute the minimum coins needed for remAmount - coin.
// If result is valid (!= -1), update the minimum.
// Save the best result in dp[remAmount].
// Final answer is fn(amount) → the minimum number of coins or -1 if impossible.

//? Code:
var coinChange = function (coins, amount) {
  let n = coins.length;
  let dp = {};

  const fn = (remainingAmount) => {
    //* base case
    if (remainingAmount === 0) return 0;
    if (remainingAmount < 0) return -1;

    //* check dp
    if (dp[remainingAmount]) {
      return dp[remainingAmount];
    }

    //* recursive calls
    let minCoins = Infinity;
    for (let i = 0; i < n; i = i + 1) {
      let res = fn(remainingAmount - coins[i]);
      if (res !== -1) {
        minCoins = Math.min(minCoins, res + 1);
      }
    }
    dp[remainingAmount] = minCoins === Infinity ? -1 : minCoins;
    return dp[remainingAmount];
  };

  return fn(amount);
};

//? Time Complexity: O(amount x n)
//? Space Complexity: O(amount)
