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

//? Thought Process:
// We are given a sum which we need to check how many min no of coins do we need to build it.
// Becuase for each and every coin we have choices given to us so it is giving us hint to use recursion over here.
// We have 2 choices for each and every coin to include this or not in case where coin is smaller or equal to remaining Sum, and just excluding is the option in case where coin is greater than remaining Sum.
// It geniuenly boils down to a very simple solution which is knapsack
// It is a unbounded knapsack becuase we are able to use same coin multiple times.
// Ver simple

//? Top Down Approach:

//? Code:
var coinChange = function (coins, amount) {
    let n = coins.length;
    let dp = Array.from({ length: n + 1 }, () => new Array(amount + 1).fill(undefined));

    const solve = (n, amount) => {
        if (amount === 0) {
            return 0;
        }
        if (n === 0) {
            return Infinity;
        }

        if (dp[n][amount] !== undefined) {
            return dp[n][amount];
        }

        if (coins[n - 1] <= amount) {
            return dp[n][amount] = Math.min(solve(n - 1, amount), 1 + solve(n, amount - coins[n - 1]));
        }
        else {
            return dp[n][amount] = solve(n - 1, amount);
        }
    };

    let answer = solve(n, amount);
    return answer === Infinity ? -1 : answer;
};

//? Time Complexity: O(amount * n)
//? Space Complexity: O(amount * n)

//? Bottom Up Approach (Tabulation)
//? Code:
var coinChange = function (coins, amount) {
    let n = coins.length;
    let dp = Array.from({ length: n + 1 }, () => new Array(amount + 1).fill(0));

    for (let i = 1; i <= amount; i = i + 1) {
        dp[0][i] = Infinity;
    }

    for (let i = 1; i <= n; i = i + 1) {
        for (let j = 1; j <= amount; j = j + 1) {
            if (coins[i - 1] <= j) {
                dp[i][j] = Math.min(dp[i - 1][j], 1 + dp[i][j - coins[i - 1]]);
            }
            else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    let answer = dp[n][amount];
    return answer === Infinity ? -1 : answer;
};

//? Time Complexity: O(amount * n)
//? Space Complexity: O(amount * n)
