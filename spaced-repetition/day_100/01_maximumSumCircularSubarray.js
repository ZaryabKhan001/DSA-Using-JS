//? LeetCode #918
//? Maximum Sum Circular Subarray

// Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray of nums.

// A circular array means the end of the array connects to the beginning of the array. Formally, the next element of nums[i] is nums[(i + 1) % n] and the previous element of nums[i] is nums[(i - 1 + n) % n].

// A subarray may only include each element of the fixed buffer nums at most once. Formally, for a subarray nums[i], nums[i + 1], ..., nums[j], there does not exist i <= k1, k2 <= j with k1 % n == k2 % n.

//? Example 1:
// Input: nums = [1,-2,3,-2]
// Output: 3
// Explanation: Subarray [3] has maximum sum 3.

//? Example 2:
// Input: nums = [5,-3,5]
// Output: 10
// Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10.

//? Example 3:
// Input: nums = [-3,-2,-3]
// Output: -2
// Explanation: Subarray [-2] has maximum sum -2.

//? Constraints:
// n == nums.length
// 1 <= n <= 3 * 104
// -3 * 104 <= nums[i] <= 3 * 104

//? Thought Process:
// Because this question has a subarray division based thinking. So this is probably a kadane's algorithm problem.
// We have to found out maximum sum of subarray in circular array.

//* The tricky part over here is array is circular. max Sum may comes linear but may also comes circular few elements from end and few elements from start. So we have to find out both max sum of linear subarray and max sum of circular subarray.

// If maxSum is linear then we can use kadane's algorithm to find out max sum of linear subarray. But if maxSum is circular then we can find out min sum of linear subarray and subtract it from total sum of array. So we have to find out both max sum of linear subarray and min sum of linear subarray.

//? Code:
const maxSumSubArray = (arr) => {
    let n = arr.length;
    let max = arr[0];
    let result = arr[0];

    for (let i = 1; i < n; i = i + 1) {
        let choice1 = max + arr[i];
        let choice2 = arr[i];
        max = Math.max(choice1, choice2);
        result = Math.max(result, max);
    };

    return result;
};

const minSumSubArray = (arr) => {
    let n = arr.length;
    let min = arr[0];
    let result = arr[0];

    for (let i = 1; i < n; i = i + 1) {
        let choice1 = min + arr[i];
        let choice2 = arr[i];
        min = Math.min(choice1, choice2);
        result = Math.min(result, min);
    };

    return result;
};

var maxSubarraySumCircular = function (nums) {
    let totalSum = nums.reduce((accumulator, currentValue) => accumulator += currentValue, 0);
    let c1 = maxSumSubArray(nums);
    let c2 = minSumSubArray(nums);

    if (c1 < 0) {
        return c1;
    }

    return Math.max(c1, totalSum - c2);
};

//? Time Complexity: O(n) - We traverse the array twice, once for maxSumSubArray and once for minSumSubArray.
//? Space Complexity: O(1) - We are using constant space for variables.
