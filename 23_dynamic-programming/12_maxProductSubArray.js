//? LeetCode #152
//? Maximum Product Subarray

// Given an integer array nums, find a subarray that has the largest product, and return the product.

// The test cases are generated so that the answer will fit in a 32-bit integer.

// Note that the product of an array with a single element is the value of that element.

//? Example 1:
// Input: nums = [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.

//? Example 2:
// Input: nums = [-2,0,-1]
// Output: 0
// Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

//? Constraints:
// 1 <= nums.length <= 2 * 104
// -10 <= nums[i] <= 10
// The product of any subarray of nums is guaranteed to fit in a 32-bit integer.

//? Approach 01:
// Start with the first element as:
// maxProdSoFar → maximum product ending at current index.
// minProdSoFar → minimum product ending at current index (important because multiplying with a negative can flip it).
// totalMax → overall maximum product.
// Iterate through the array:
// For each element arr[i] (from index 1 to end):
// Store the previous maxProdSoFar in a temporary variable (maxProdSoFarCopy).
// Update maxProdSoFar as the maximum among:
// Current element alone (arr[i])
// Product of current element with previous max product (maxProdSoFar * arr[i])
// Product of current element with previous min product (minProdSoFar * arr[i])
// Update minProdSoFar as the minimum among the same three values.
// Update totalMax as the maximum between current totalMax and maxProdSoFar.
// After traversing the whole array, totalMax holds the maximum product of any subarray.

//? Code:
var maxProduct = function (arr) {
  if (!arr || arr.length === 0) return 0; // defensive
  let maxProdSoFar = arr[0];
  let minProdSoFar = arr[0];
  let totalMax = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    const prevMax = maxProdSoFar;

    maxProdSoFar = Math.max(current, prevMax * current, minProdSoFar * current);
    minProdSoFar = Math.min(current, prevMax * current, minProdSoFar * current);

    totalMax = Math.max(totalMax, maxProdSoFar);
  }

  return totalMax;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)

//? Approach 02:
// Initialize Variables
// ltrProd = 1 → product when traversing left to right.
// rtlProd = 1 → product when traversing right to left.
// finalMax = -Infinity → to keep track of the maximum product found.
// Two-way traversal logic
// Since the maximum product subarray can break due to negative numbers and zeros, we handle it by multiplying in both directions:
// LTR (left-to-right): multiply each element into ltrProd.
// RTL (right-to-left): multiply each element from the back into rtlProd.
// Update maximum, After each step, check the maximum value among finalMax, ltrProd, and rtlProd.
// Handle zero reset
// If at any point the product becomes 0, reset it to 1.
// This is because any product involving 0 will be 0, but a new subarray can start after zero.
// After completing the single loop, finalMax will contain the maximum product subarray.

//? Code:
var maxProduct = function (arr) {
  let n = arr.length;
  let ltrProd = 1,
    rtlProd = 1;
  let finalMax = -Infinity;

  for (let i = 0; i < n; i++) {
    ltrProd = ltrProd * arr[i];
    rtlProd = rtlProd * arr[n - i - 1];

    finalMax = Math.max(finalMax, ltrProd, rtlProd);

    if (ltrProd === 0) ltrProd = 1;
    if (rtlProd === 0) rtlProd = 1;
  }

  return finalMax;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
