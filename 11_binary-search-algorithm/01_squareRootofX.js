//? LeetCode #69
//? Sqrt(x)

// Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.
// You must not use any built-in exponent function or operator.
// For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.

//? Example 1:
// Input: x = 4
// Output: 2
// Explanation: The square root of 4 is 2, so we return 2.

//? Example 2:
// Input: x = 8
// Output: 2
// Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.

//? Approach:
// If x is 0 or 1, return x.
// Set the binary search range: l = 2, r = floor(x / 2).
// Use binary search to find the greatest number m such that m * m ≤ x.
// If m * m === x, return m.
// If m * m > x, search left side.
// If m * m < x, search right side.
// Return r as the floor square root.

var mySqrt = function (x) {
  if (x < 2) return x;
  let l = 2;
  let r = Math.floor(x / 2);
  while (l <= r) {
    let m = Math.floor((l + r) / 2);
    if (x === m * m) {
      return m;
    } else if (x < m * m) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  return r;
};

//? Time Complexity: O(logx)
//? Space Complexity: O(1)
