//? LeetCode #518
//? Coin Change II

// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

// Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

// You may assume that you have an infinite number of each kind of coin.

// The answer is guaranteed to fit into a signed 32-bit integer.

//? Example 1:
// Input: amount = 5, coins = [1,2,5]
// Output: 4
// Explanation: there are four ways to make up the amount:
// 5=5
// 5=2+2+1
// 5=2+1+1+1
// 5=1+1+1+1+1

//? Example 2:
// Input: amount = 3, coins = [2]
// Output: 0
// Explanation: the amount of 3 cannot be made up just with coins of 2.

//? Example 3:
// Input: amount = 10, coins = [10]
// Output: 1

//? Constraints:
// 1 <= coins.length <= 300
// 1 <= coins[i] <= 5000
// All the values of coins are unique.
// 0 <= amount <= 5000

//? Approach:
// Recursion with Memoization
// Define a function fn(remS, start) → number of ways to make remS using coins from index start onward.
// Use dp[remS][start] to cache results and avoid recomputation.
// Base cases are:
// If remS == 0 → found 1 valid combination → return 1.
// If remS < 0 → no valid way → return 0.
// From index start to end, try picking each coin: combinations += fn(remS - coins[i], i) // i instead of i+1 because coins[i] can be reused
// At last, Call fn(amount, 0) → total number of unique combinations to make amount.

//? Code:
var change = function (amount, coins) {
  let n = coins.length;

  const dp = Array.from({ length: amount + 1 }, () =>
    new Array(n).fill(undefined),
  );

  const traversal = (remainingSum, startIndex) => {
    //* base case
    if (remainingSum === 0) return 1;
    if (remainingSum < 0) return 0;

    //* using memoization
    if (dp[remainingSum][startIndex] != undefined)
      return dp[remainingSum][startIndex];

    //* processing
    let combinations = 0;
    for (let i = startIndex; i < n; i = i + 1) {
      combinations = combinations + traversal(remainingSum - coins[i], i);
    }
    dp[remainingSum][startIndex] = combinations;
    return combinations;
  };

  return traversal(amount, 0);
};

//? Time Complexity: O(amount * n)
//? Space Complexity: O(amount * n)
