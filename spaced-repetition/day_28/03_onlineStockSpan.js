//? LeetCode #901
//? Online Stock Span

// Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

// The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

// For example, if the prices of the stock in the last four days is [7,2,1,2] and the price of the stock today is 2, then the span of today is 4 because starting from today, the price of the stock was less than or equal 2 for 4 consecutive days.
// Also, if the prices of the stock in the last four days is [7,34,1,2] and the price of the stock today is 8, then the span of today is 3 because starting from today, the price of the stock was less than or equal 8 for 3 consecutive days.
// Implement the StockSpanner class:

// StockSpanner() Initializes the object of the class.
// int next(int price) Returns the span of the stock's price given that today's price is price.

//? Example:
// Input
// ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
// [[], [100], [80], [60], [70], [60], [75], [85]]
// Output
// [null, 1, 1, 1, 2, 1, 4, 6]

//? Explanation
// StockSpanner stockSpanner = new StockSpanner();
// stockSpanner.next(100); // return 1
// stockSpanner.next(80);  // return 1
// stockSpanner.next(60);  // return 1
// stockSpanner.next(70);  // return 2
// stockSpanner.next(60);  // return 1
// stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
// stockSpanner.next(85);  // return 6

//? Constraints:
// 1 <= price <= 105
// At most 104 calls will be made to next.

//? Approach: Stack
// We can use a stack to keep track of the prices and their corresponding spans. For each new price, we pop from the stack until we find a price that is greater than the current price. The span for the current price will be the sum of the spans of the popped prices plus one (for the current price itself). We then push the current price and its span onto the stack.

//? Code:
class StockSpanner {
  constructor() {
    this.stack = [];
  }

  next(price) {
    let span = 1;
    while (this.stack.length && this.stack[this.stack.length - 1][0] <= price) {
      span += this.stack.pop()[1];
    }

    this.stack.push([price, span]);
    return span;
  }
}

//? Time Complexity: O(n) in the worst case, where n is the number of calls to next. Each price is pushed and popped at most once.
//? Space Complexity: O(n) in the worst case, where n is the number of calls to next. In the worst case, all prices are in increasing order and are stored in the stack.
