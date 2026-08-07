//? LeetCode #416
//? Partition Equal Subset Sum

// Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

//? Example 1:
// Input: nums = [1,5,11,5]
// Output: true
// Explanation: The array can be partitioned as [1, 5, 5] and [11].

//? Example 2:
// Input: nums = [1,2,3,5]
// Output: false
// Explanation: The array cannot be partitioned into equal sum subsets.

//? Constraints:
// 1 <= nums.length <= 200
// 1 <= nums[i] <= 100

//? Thought Process:
// First of all if we think properly about the solution so it means we need to make 2 equal sums and equal sums means if arr sum is 20 so two partitions of 10 we all need.
// There is a hidden clue over here is if sum is odd then we can't make 2 equal partitions so we can return false in that case.
// Otherwise we have to make 2 equal partitions and we can make 1 partition of sum/2 and if we can make that partition then we can make the other partition as well because sum is even so we can return true in that case.
// No need to make 2 partitions we can just make 1 partition of sum/2 and if we can make that partition then we can make the other partition as well because sum is even so we can return true in that case.
// Used recursion to trying to make partition of sum/2 by exploring all choices of including or excluding the current element in the partition.


//? Code:
var canPartition = function (nums) {
    const n = nums.length;
    const sum = nums.reduce((accumulator, currentValue) => accumulator += currentValue, 0);

    if (sum % 2 !== 0) {
        return false;
    }

    const solve = (n, sum) => {
        if (sum === 0) {
            return true;
        }
        if (n === 0) {
            return false;
        }

        if (nums[n - 1] > sum) {
            return solve(n - 1, sum);
        }
        else {
            return solve(n - 1, sum) || solve(n - 1, sum - nums[n - 1]);
        }
    };

    return solve(n, sum / 2);
};

//? Time Complexity: O(2^n) - The recursive solution explores all possible subsets of the array, leading to an exponential time complexity in the worst case.

//? Space Complexity: O(n) - The space complexity is determined by the maximum depth of the recursion stack, which can go up to n in the worst case.

//* Improvement: We can optimize the solution using dynamic programming to avoid redundant calculations and reduce the time complexity to O(n * sum/2) and space complexity to O(n * sum/2).

//? Code:
var canPartition = function (nums) {
    const n = nums.length;
    const sum = nums.reduce((accumulator, currentValue) => accumulator += currentValue, 0);

    if (sum % 2 !== 0) {
        return false;
    }

    const dp = Array.from({ length: n + 1 }, () => new Array((sum / 2) + 1).fill(undefined));
    const solve = (n, target) => {
        if (target === 0) {
            return true;
        }
        if (n === 0) {
            return false;
        }

        //* check from dp
        if (dp[n][target] !== undefined) {
            return dp[n][target];
        }

        if (nums[n - 1] > target) {
            return dp[n][target] = solve(n - 1, target);
        }
        else {
            return dp[n][target] = solve(n - 1, target) || solve(n - 1, target - nums[n - 1]);
        }
    };

    return solve(n, sum / 2);
};

//? Time Complexity: O(n * sum/2) - The dynamic programming solution reduces the time complexity by storing intermediate results in a 2D array, avoiding redundant calculations.

//*? Space Complexity: O(n * sum/2 + n) - The space complexity is determined by the size of the 2D array used for memoization. n is the number of elements in the input array, recursion stack space is also used, which can go up to n in the worst case.

//? Bottom Up Approach:

//? Code:
var canPartition = function (nums) {
    const n = nums.length;
    const sum = nums.reduce((accumulator, currentValue) => accumulator += currentValue, 0);

    if (sum % 2 !== 0) {
        return false;
    }
    let target = sum / 2;

    const dp = Array.from({ length: n + 1 }, () => new Array((target) + 1).fill(undefined));

    //* initialization
    for (let i = 0; i <= n; i = i + 1) {
        dp[i][0] = true;
    }
    for (let i = 1; i <= target; i = i + 1) {
        dp[0][i] = false;
    }

    for (let i = 1; i <= n; i = i + 1) {
        for (let j = 1; j <= target; j = j + 1) {
            if (nums[n - 1] > target) {
                dp[i][j] = dp[i - 1][j];
            }
            else {
                dp[i][j] =
                    dp[i - 1][j] ||
                    dp[i - 1][j - nums[i - 1]];
            }
        }
    }

    return dp[n][sum / 2];
};

//? Time Complexity: O(n * sum/2) - The bottom-up dynamic programming solution iterates through the input array and the target sum, leading to a time complexity of O(n * sum/2).

//? Space Complexity: O(n * sum/2) - The space complexity is determined by the size of the 2D array used for storing intermediate results.