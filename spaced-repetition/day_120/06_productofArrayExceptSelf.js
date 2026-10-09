//? LeetCode #238
//? Product of Array Except Self

// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// You must write an algorithm that runs in O(n) time and without using the division operation.

//? Example 1:
// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]

//? Example 2:
// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]

//? Constraints:
// 2 <= nums.length <= 105
// -30 <= nums[i] <= 30
// The input is generated such that answer[i] is guaranteed to fit in a 32-bit integer.

// Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)

//? Thought Process:
//* Approach 1: Brute Force - O(n^2)

// For every element, multiply all other elements.
// Easy to understand but repeats calculations.
// Handles zeros naturally.
// Slow for large arrays.

//* Approach 2: Total Product + Division - O(n)

// Calculate the product of all elements once.
// Divide total product by each current element.
// Faster than brute force.
// Fails when the current element is zero.
// Also, division is not allowed in this problem.

//* Approach 3: Prefix + Suffix - O(n)

// Prefix stores the product of elements on the left.
// Suffix stores the product of elements on the right.
// Multiply both to get the answer.
// Handles zeros naturally and uses no division.

//* Space optimization:
// Store prefix products in the answer array.
// Use one variable to calculate suffix products.
// Time: O(n)
// Extra space: O(1), excluding the answer array.

//? Code:
var productExceptSelf = function (nums) {
  let n = nums.length;
  let ans = new Array(n).fill(1);

  for (let i = 0; i < n; i = i + 1) {
    let product = 1;
    for (let j = 0; j < n; j = j + 1) {
      if (j !== i) {
        product = product * nums[j];
      }
    }
    ans[i] = product;
  }

  return ans;
};

//* This code might give TLE.
//? Time Complexity: O(n * n)
//? Space Complexity: O(n)

//? Approach 02:
//? Code:
var productExceptSelf = function (arr) {
  let n = arr.length;

  let prefix = new Array(n).fill(1);
  let suffix = new Array(n).fill(1);
  let ans = new Array(n);

  // Calculate prefix products
  for (let i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * arr[i - 1];
  }

  // Calculate suffix products
  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * arr[i + 1];
  }

  // Multiply prefix and suffix
  for (let i = 0; i < n; i++) {
    ans[i] = prefix[i] * suffix[i];
  }

  return ans;
};

//? Time Complexity: O(n) + O(n) + O(n) => O(n)
//? Space Complexity: O(n) + O(n) + O(n) => O(n)

//? Approach 03:
var productExceptSelf = function (arr) {
  let n = arr.length;
  let ans = new Array(n).fill(1);

  // Step 1: Store prefix products in ans
  for (let i = 1; i < n; i++) {
    ans[i] = ans[i - 1] * arr[i - 1];
  }

  // Step 2: Calculate suffix products using one variable
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    ans[i] = ans[i] * suffix;
    suffix = suffix * arr[i];
  }

  return ans;
};

//? Time Complexity: O(n) + O(n) => O(n)
//? Space Complexity: O(n) for ans array.
