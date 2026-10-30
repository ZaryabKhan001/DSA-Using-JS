// Minimum Coins of 1, 2, 5 and 10 (gfg)

// Given an integer n representing a target value and an infinite supply of coins of denominations 1, 2, 5, and 10, find the minimum number of coins required to make the value n.

//? Examples:
// Input: n = 39
// Output: 6
// Explanation: 39 can be formed using 3 coins of 10 rupees, 1 coin of 5 rupees and 2 coins of 2 rupees so minimum coins required are 6.

// Input: n = 121
// Output: 13
// Explanation: 121 can be formed using 12 coins of 10 rupees and 1 coin of 1 rupees.

//? Constraints:
// 1 ≤ n ≤ 106

//? Thought Process:
// Very easy, greedy thinking.
// 1. Always use the largest possible coin denomination first (10, 5, 2, 1).
// 2. Use as many coins of that denomination as possible, then update the remaining amount.
// 3. Repeat for smaller denominations until the remaining amount becomes 0.
// 4. Count all coins used to get the minimum number of coins.

//? Code:
class Solution {
  findMin(n) {
    let coinsUsed = 0;

    while (n / 10 >= 1) {
      coinsUsed += Math.floor(n / 10);
      n = n % 10;
    }
    while (n / 5 >= 1) {
      coinsUsed += Math.floor(n / 5);
      n = n % 5;
    }
    while (n / 2 >= 1) {
      coinsUsed += Math.floor(n / 2);
      n = n % 2;
    }
    while (n / 1 >= 1) {
      coinsUsed += Math.floor(n / 1);
      n = n % 1;
    }

    return coinsUsed;
  }
}

//? Time Complexiy: O(1) because at most 4 divisions happen. Each loop runs only once at max.
//? Space Complexity: O(1)
