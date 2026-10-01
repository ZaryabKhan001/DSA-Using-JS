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

//? Thought Process:
// The problem is similar to the maximum subarray sum problem, but instead of summing the elements, we are multiplying them. The challenge here is that multiplying by a negative number can turn a small product into a large one and vice versa. Therefore, we need to keep track of both the maximum and minimum products at each step.

//? Code:
var maxProduct = function (nums) {
    let n = nums.length;
    let maxProd = nums[0];
    let minProd = nums[0];
    let result = nums[0];

    for (let i = 1; i < n; i = i + 1) {
        let choice1 = minProd * nums[i];
        let choice2 = maxProd * nums[i];
        let choice3 = nums[i];

        minProd = Math.min(choice1, choice2, choice3);
        maxProd = Math.max(choice1, choice2, choice3);

        result = Math.max(result, maxProd);
    }

    return result;
};

//? Time Complexity: O(n) - We traverse the array once, performing constant time operations for each element.
//? Space Complexity: O(1) - We use a constant amount of space for variables, regardless of the input size.