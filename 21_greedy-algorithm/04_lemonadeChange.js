//? LeetCode #860
//? Lemonade Change
// At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.

// Note that you do not have any change in hand at first.

// Given an integer array bills where bills[i] is the bill the ith customer pays, return true if you can provide every customer with the correct change, or false otherwise.

//? Example 1:
// Input: bills = [5,5,5,10,20]
// Output: true
// Explanation:
// From the first 3 customers, we collect three $5 bills in order.
// From the fourth customer, we collect a $10 bill and give back a $5.
// From the fifth customer, we give a $10 bill and a $5 bill.
// Since all customers got correct change, we output true.

//? Example 2:
// Input: bills = [5,5,10,10,20]
// Output: false
// Explanation:
// From the first two customers in order, we collect two $5 bills.
// For the next two customers in order, we collect a $10 bill and give back a $5 bill.
// For the last customer, we can not give the change of $15 back because we only have two $10 bills.
// Since not every customer received the correct change, the answer is false.

//? Approach:
// Maintain a wallet to track count of $5 and $10 bills.
// Iterate over each customer’s bill:
// If bill is $5 → add to wallet.
// If bill is $10 → give one $5 as change and add one $10.
// If bill is $20 →
// Prefer giving one $10 + one $5 if possible.
// Otherwise, give three $5.
// After each transaction, if wallet runs out of required bills (negative count), return false.
// If all transactions succeed, return true.

//? Code:
var lemonadeChange = function (bills) {
  let wallet = [0, 0];
  for (let i = 0; i < bills.length; ++i) {
    if (bills[i] === 5) {
      wallet[0]++;
    } else if (bills[i] === 10) {
      wallet[1]++;
      wallet[0]--;
    } else {
      // bill is 20
      if (wallet[1] > 0) {
        wallet[1]--;
        wallet[0]--;
      } else {
        wallet[0] -= 3;
      }
    }
    if (wallet[0] < 0) {
      return false;
    }
  }
  return true;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
