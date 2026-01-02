//? LeetCode #77
//? Combinations

// Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

// You may return the answer in any order.

//? Example 1:
// Input: n = 4, k = 2
// Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
// Explanation: There are 4 choose 2 = 6 total combinations.
// Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.

//? Example 2:
// Input: n = 1, k = 1
// Output: [[1]]
// Explanation: There is 1 choose 1 = 1 total combination.

//? Approach:
// Generate all combinations of size k from numbers 1 to n using recursion.
// Start from 1 and explore each number by either including it or skipping it.
// Keep adding numbers to the current path until its length becomes k.
// When path length is k, add it to the result.
// Backtrack by removing the last added number and try the next one.

var combine = function (n, k) {
  let result = [];
  let backtrack = (path, start) => {
    if (path.length == k) {
      result.push([...path]);
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(path, i + 1);
      path.pop();
    }
  };
  backtrack([], 1);
  return result;
};
