//? LeetCode #494
//? Target Sum

// You are given an integer array nums and an integer target.

// You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

// For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
// Return the number of different expressions that you can build, which evaluates to target.

//? Example 1:
// Input: nums = [1,1,1,1,1], target = 3
// Output: 5
// Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
// -1 + 1 + 1 + 1 + 1 = 3
// +1 - 1 + 1 + 1 + 1 = 3
// +1 + 1 - 1 + 1 + 1 = 3
// +1 + 1 + 1 - 1 + 1 = 3
// +1 + 1 + 1 + 1 - 1 = 3

//? Example 2:
// Input: nums = [1], target = 1
// Output: 1

//? Constraints:
// 1 <= nums.length <= 20
// 0 <= nums[i] <= 1000
// 0 <= sum(nums[i]) <= 1000
// -1000 <= target <= 1000

//? Thought Process:
// This problem is to find the number of ways to assign symbols to make the sum of nums be target.
// We can use a recursive approach to solve this problem. We can use a helper function that takes the current index and the current sum as parameters.
// At each index, we can either add or subtract the current number and call the helper function recursively for the next index.
// We can keep track of the number of ways we can reach the target sum by using a counter variable.
// The base case will be when we reach the end of the array, we check if the current sum is equal to the target sum, if yes we increment our counter variable.

//? Code:
var findTargetSumWays = function (nums, target) {
  let n = nums.length;
  const dp = {};

  const solve = (index, sum) => {
    const key = `${index},${sum}`;
    if (dp[key] !== undefined) {
      return dp[key];
    }

    if (index === n) {
      if (sum === target) {
        return 1;
      }
      return 0;
    }

    return (dp[key] =
      solve(index + 1, sum + nums[index]) +
      solve(index + 1, sum - nums[index]));
  };

  return solve(0, 0);
};

//? Time Complexity: O(2^n) where n is the length of the nums array.
//? Space Complexity: O(n) where n is the length of the nums array. This is the space used by the recursion stack.

//* This is not a good solution. We can optimize this by using dp to avoid recalculating the same subproblems. We can use a 2D array to store the results of subproblems and avoid recalculating them. The base cases will be when we reach the end of the array, we check if the current sum is equal to the target sum, if yes we return 1 else we return 0.

var findTargetSumWays = function (nums, target) {
  const memo = new Map();

  const solve = (index, sum) => {
    if (index === nums.length) {
      return sum === target ? 1 : 0;
    }

    const key = `${index},${sum}`;

    if (memo.has(key)) {
      return memo.get(key);
    }

    const add = solve(index + 1, sum + nums[index]);
    const subtract = solve(index + 1, sum - nums[index]);

    const ways = add + subtract;

    memo.set(key, ways);

    return ways;
  };

  return solve(0, 0);
};

//? Time Complexity: O(n * S) where n is the length of the nums array and S is the sum range
//? If S = sum(nums), so s can go from -S to S.

//? Space Complexity: O(n * S) where n is the length of the nums array and S is the sum range. This is the space used by the memoization map.

//? We have also have one more approach to solve this problem using knapsack method.

// See we are just doing one thing adding some items and substrecting some items right.

// So we can say that added items sum - subtracted items sum = target. Also we know that added items sum + subtracted items sum = totalSum of the array.

// So if we add both equations, we get 2 * added items sum = target + totalSum. So, added items sum = (target + totalSum) / 2.

// Now the problem is reduced to count the number of subsets of the array whose sum is equal to added items sum. This is a classic subset sum problem which we have already solved in the previous day. So, we can use the same approach of recursion and memoization to solve this problem. We can use a 2D array to store the results of subproblems and avoid recalculating them. The base cases will be when the target is 0 (we found a valid subset) and when there are no items left to consider (we can't form any more subsets).

//? Code:
const noOfSubsets = (arr, target) => {
  let n = arr.length;
  let dp = Array.from({ length: n + 1 }, () =>
    new Array(Math.abs(target) + 1).fill(undefined),
  );

  const solve = (n, target) => {
    if (n == 0 && target == 0) {
      return 1;
    }

    if (n == 0) {
      return 0;
    }

    if (dp[n][target] != undefined) {
      return dp[n][target];
    }

    if (arr[n - 1] > target) {
      return (dp[n][target] = solve(n - 1, target));
    } else {
      return (dp[n][target] =
        solve(n - 1, target) + solve(n - 1, target - arr[n - 1]));
    }
  };

  return solve(n, target);
};

const countPartitions = (arr, diff) => {
  let sum = arr.reduce((sum, value) => (sum += value), 0);

  if ((diff + sum) % 2 !== 0) {
    return 0;
  }

  let target = (diff + sum) / 2;

  return noOfSubsets(arr, target);
};

var findTargetSumWays = function (nums, target) {
  return countPartitions(nums, target);
};

//? Time Complexity: O(n * target) for subset sum problem + O(n) for calculating sum of array
//? Space Complexity: O(n * target) for dp array + O(n) for recursion stack space
