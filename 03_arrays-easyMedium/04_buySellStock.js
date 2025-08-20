//? LeetCode: #121

//* Best Time to Buy and Sell Stock

let prices = [7, 1, 5, 3, 6, 4];

var maxProfit = function (prices) {
  let buyDate = prices[0];
  let profit = 0;
  let maxProfit = 0;
  let arrayLength = prices.length;
  for (let i = 1; i < arrayLength; i = i + 1) {
    if (prices[i] < buyDate) {
      buyDate = prices[i];
    } else {
      profit = prices[i] - buyDate;
      if (profit > maxProfit) {
        maxProfit = profit;
      }
    }
  }
  return maxProfit;
};

console.log(maxProfit(prices));
