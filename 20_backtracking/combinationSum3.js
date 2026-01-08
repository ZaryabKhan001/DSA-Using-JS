//? LeetCode #216
//? Combination Sum III

// Find all valid combinations of k numbers that sum up to n such that the following conditions are true:

// Only numbers 1 through 9 are used.
// Each number is used at most once.
// Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

//? Example 1:
// Input: k = 3, n = 7
// Output: [[1,2,4]]
// Explanation:
// 1 + 2 + 4 = 7
// There are no other valid combinations.

//? Example 2:
// Input: k = 3, n = 9
// Output: [[1,2,6],[1,3,5],[2,3,4]]
// Explanation:
// 1 + 2 + 6 = 9
// 1 + 3 + 5 = 9
// 2 + 3 + 4 = 9
// There are no other valid combinations.

//? Example 3:
// Input: k = 4, n = 1
// Output: []
// Explanation: There are no valid combinations.
// Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.

//? Approach:
// We need to find all combinations of k numbers (from 1 to 9) that sum up to n.
// Use backtracking:
// Keep track of the current path (path) and remaining sum (remainingSum).
// Stop if the path size reaches k. If remainingSum == 0, record the path.
// Iterate numbers from start to 9 to avoid reuse and ensure ascending order.
// Add the number, recurse with updated sum and next start, then remove (backtrack).

//? Code:
var combinationSum3 = function (k, n) {
  let result = [];
  let backtrack = (remainingSum, path, start) => {
    if (path.length == k) {
      if (remainingSum === 0) {
        result.push([...path]);
      }
      return;
    }
    for (let i = start; i <= 9; i++) {
      path.push(i);
      backtrack(remainingSum - i, path, i + 1);
      path.pop();
    }
  };
  backtrack(n, [], 1);
  return result;
};
