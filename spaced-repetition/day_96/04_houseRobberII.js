//? LeetCode #213
//? House Robber II

// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

//? Example 1:
// Input: nums = [2,3,2]
// Output: 3
// Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.

//? Example 2:
// Input: nums = [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
// Total amount you can rob = 1 + 3 = 4.

//? Example 3:
// Input: nums = [1,2,3]
// Output: 3

//? Approach:
// Since houses are in a circle, you can’t rob both the first and last house.
// So, split the problem into two linear cases:
// Case 1 → Rob houses from 0 to n-2 (exclude last).
// Case 2 → Rob houses from 1 to n-1 (exclude first).
// For each case, use DP to solve this.
// Final = max of both cases.

//? Code:
var robHelper = function (nums) {
    let n = nums.length;
    let dp = new Array(n).fill(undefined);

    const solve = (n) => {
        if (n === 1) {
            return nums[0];
        }
        if (n === 2) {
            return Math.max(nums[0], nums[1]);
        }

        if (dp[n] !== undefined) {
            return dp[n];
        }

        return dp[n] = Math.max(solve(n - 2) + nums[n - 1], solve(n - 1));
    };

    return solve(n);
};

var rob = function (nums) {
    let n = nums.length;

    if (nums.length === 1) {
        return nums[0];
    }

    let input1 = nums.filter((item, index) => index !== 0);
    let input2 = nums.filter((item, index) => index < n - 1);

    return Math.max(robHelper(input1), robHelper(input2));
};

//? Time Complexity: O(n) 
//? Space Complexity: O(n) for dp array and new inputs


//? Optimization:
// We need only previous two values to calculate the current value, so we can reduce the space complexity to O(1) by using two variables instead of a dp array.

//? Code:
var rob = function (nums) {
    const robRange = (start, end) => {
        let prev2 = 0;
        let prev1 = 0;

        for (let i = start; i <= end; i++) {
            let current = Math.max(
                prev1,
                prev2 + nums[i]
            );

            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    };

    const n = nums.length;

    if (n === 1) return nums[0];

    // Case 1: rob houses 0 ... n-2
    // Case 2: rob houses 1 ... n-1
    return Math.max(
        robRange(0, n - 2),
        robRange(1, n - 1)
    );
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)