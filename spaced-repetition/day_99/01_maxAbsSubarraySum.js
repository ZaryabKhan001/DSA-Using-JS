//? LeetCode #1749
//? Maximum Absolute Sum of Any Subarray

// You are given an integer array nums. The absolute sum of a subarray [numsl, numsl+1, ..., numsr-1, numsr] is abs(numsl + numsl+1 + ... + numsr-1 + numsr).

// Return the maximum absolute sum of any (possibly empty) subarray of nums.

// Note that abs(x) is defined as follows:

// If x is a negative integer, then abs(x) = -x.
// If x is a non-negative integer, then abs(x) = x.

//? Example 1:
// Input: nums = [1,-3,2,3,-4]
// Output: 5
// Explanation: The subarray [2,3] has absolute sum = abs(2+3) = abs(5) = 5.

//? Example 2:
// Input: nums = [2,-5,1,-4,3,-2]
// Output: 8
// Explanation: The subarray [-5,1,-4] has absolute sum = abs(-5+1-4) = abs(-8) = 8.

//? Constraints:
// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104

//? Thought Process:
// To find the maximum absolute sum of any subarray, we can break the problem into two parts:
// 1. Find the maximum sum of any subarray (maxSum).
// 2. Find the minimum sum of any subarray (minSum).
// The maximum absolute sum will be the maximum of the absolute values of these two results.

// We can use a variation of Kadane's algorithm to find both maxSum and minSum in O(n) time complexity.

//? Code:
const maxSum = (nums) => {
    let n = nums.length;
    let result = nums[0];
    let max = nums[0];

    for (let i = 1; i < n; i = i + 1) {
        let choice1 = nums[i];
        let choice2 = max + nums[i];
        max = Math.max(choice1, choice2);
        result = Math.max(result, max);
    }

    return result;
};

const minSum = (nums) => {
    let n = nums.length;
    let result = nums[0];
    let min = nums[0];

    for (let i = 1; i < n; i = i + 1) {
        let choice1 = nums[i];
        let choice2 = min + nums[i];
        min = Math.min(choice1, choice2);
        result = Math.min(result, min);
    }

    return result;
};

var maxAbsoluteSum = function (nums) {
    let max = maxSum(nums);
    let min = minSum(nums);

    return Math.max(Math.abs(max), Math.abs(min));
};

//? Time Complexity: O(n) - We traverse the array twice, once for maxSum and once for minSum.
//? Space Complexity: O(1) - We use a constant amount of space for variables.