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

//? Thought Process:
// We are given a sum which we need to check how many ways do we have to build using coins array.
// Becuase for each and every coin we have choices given to us so it is giving us hint to use recursion over here.
// We have 2 choices for each and every coin to include this or not in case where coin is smaller or equal to remaining Sum, and just excluding is the option in case where coin is greater than remaining Sum.
// It geniuenly boils down to a very simple solution which is knapsack
// It is a unbounded knapsack becuase we are able to use same coin multiple times.
// Ver simple

//? Code:
var change = function (amount, coins) {
    let n = coins.length;
    let dp = Array.from({ length: n + 1 }, () => new Array(amount + 1).fill(undefined));

    const solve = (n, amount) => {
        if (n === 0 && amount === 0) {
            return 1;
        }
        if (n === 0) {
            return 0;
        }
        if (amount === 0) {
            return 1;
        }

        if (dp[n][amount] !== undefined) {
            return dp[n][amount];
        }

        if (coins[n - 1] <= amount) {
            return dp[n][amount] = solve(n - 1, amount) + solve(n, amount - coins[n - 1]);
        }
        else {
            return dp[n][amount] = solve(n - 1, amount);
        }
    };

    return solve(n, amount);
};
//? Time Complexity: O(amount * n)
//? Space Complexity: O(amount * n)


//? Bottom Up Approach

//? Code:
var change = function (amount, coins) {
    let n = coins.length;
    let dp = Array.from({ length: n + 1 }, () => new Array(amount + 1).fill(0));

    for (let i = 0; i <= n; i = i + 1) {
        dp[i][0] = 1;
    }

    for (let i = 1; i <= n; i = i + 1) {
        for (let j = 1; j <= amount; j = j + 1) {
            if (coins[i - 1] <= j) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
            }
            else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[n][amount];
};

//? Time Complexity: O(amount * n)
//? Space Complexity: O(amount * n)