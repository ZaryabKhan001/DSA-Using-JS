//? LeetCode #39
//? Combination Sum

// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

// The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

//? Example 1:
// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.

//? Example 2:
// Input: candidates = [2,3,5], target = 8
// Output: [[2,2,2,2],[2,3,3],[3,5]]

//? Example 3:
// Input: candidates = [2], target = 1
// Output: []

//? Approach:
// Use backtracking to explore all possible combinations of numbers that sum up to the target.
// Start from an index (start) to avoid reusing previous elements in the same path (but allow reuse of the current one).
// At each step:
// If remainingSum === 0, store the current path (valid combination).
// If remainingSum <, 0, stop exploring further.
// Otherwise, try each number starting from start, include it in the path, and recurse with reduced sum.
// Backtrack (remove last element) to explore other possibilities.

//? Code
var combinationSum = function (arr, target) {
  let result = [];
  let backtrack = (remainingSum, path, start) => {
    if (remainingSum === 0) result.push([...path]);
    if (remainingSum <= 0) return;
    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      backtrack(remainingSum - arr[i], path, i);
      path.pop();
    }
  };
  backtrack(target, [], 0);
  return result;
};
