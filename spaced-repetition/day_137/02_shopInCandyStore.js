//? Shop in Candy Store (gfg)

// In a candy store, there are different types of candies available and prices[i] represent the price of  ith types of candies. You are now provided with an attractive offer.
// For every candy you buy from the store, you can get up to k other different candies for free. Find the minimum and maximum amount of money needed to buy all the candies.
// Note: In both cases, you must take the maximum number of free candies possible during each purchase.

// Examples :

// Input: prices[] = [3, 2, 1, 4], k = 2
// Output: [3, 7]
// Explanation: As according to the offer if you buy one candy you can take at most k more for free. So in the first case, you buy the candy worth 1 and takes candies worth 3 and 4 for free, also you need to buy candy worth 2. So min cost: 1+2 = 3. In the second case, you can buy the candy worth 4 and takes candies worth 1 and 2 for free, also you need to buy candy worth 3. So max cost: 3+4 = 7.

// Input: prices[] = [3, 2, 1, 4, 5], k = 4
// Output: [1, 5]
// Explanation: For minimimum cost buy the candy with the cost 1 and get all the other candies for free. For maximum cost buy the candy with the cost 5 and get all other candies for free.

//? Constraints:
// 1 ≤ prices.size() ≤ 105
// 0 ≤ k ≤ prices.size()
// 1 ≤ prices[i] ≤ 104

//? Thought Process:
// Greedy Approach:
// 1. Sort candy prices in ascending order.
// 2. For minimum cost, buy the cheapest candy and get up to k most expensive candies for free.
// 3. For maximum cost, buy the most expensive candy and get up to k cheapest candies for free.
// 4. Repeat until all candies are collected.

//? Code:
class Solution {
  minMaxCandy(prices, k) {
    prices.sort((a, b) => a - b);

    let n = prices.length;
    let minAmountNeededForBuying = 0;
    let maxAmountNeededForBuying = 0;

    let left = 0;
    let right = n - 1;

    // Minimum cost: buy the cheapest candy
    while (left <= right) {
      minAmountNeededForBuying += prices[left];
      left++;
      right -= k;
    }

    left = 0;
    right = n - 1;

    // Maximum cost: buy the most expensive candy
    while (left <= right) {
      maxAmountNeededForBuying += prices[right];
      right--;
      left += k;
    }

    return [minAmountNeededForBuying, maxAmountNeededForBuying];
  }
}

//? Time Complexity: O(n log n) nlogn for sorting and n for greedy traversal.
//? Space Complexity: O(1)
