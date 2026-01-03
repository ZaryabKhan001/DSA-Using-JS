//? LeetCode #46
//? Permutations

// Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

//? Example 1:
// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

//? Example 2:
// Input: nums = [0,1]
// Output: [[0,1],[1,0]]

//? Example 3:
// Input: nums = [1]
// Output: [[1]]

//? Approach:
// Maintain a path array for the current permutation.
// At each step, try adding an unused element from arr.
// If path length equals n, push a copy to result.
// Backtrack by removing the last element and trying the next option.

var permute = function (arr) {
  let result = [];
  let n = arr.length;
  let backtrack = (path) => {
    if (path.length === n) {
      result.push([...path]);
    }
    for (let i = 0; i < n; i++) {
      if (!path.includes(arr[i])) {
        path.push(arr[i]);
        backtrack(path);
        path.pop();
      }
    }
  };
  backtrack([]);
  return result;
};

// ?Time Complexity = O(n × n!)
//? Space Complexity = O(n) for recursion + O(n!) output storage.
