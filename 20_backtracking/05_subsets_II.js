//? LeetCode #90
//? Subsets II

// Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

// The solution set must not contain duplicate subsets. Return the solution in any order.

//? Example 1:
// Input: nums = [1,2,2]
// Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

//? Example 2:
// Input: nums = [0]
// Output: [[],[0]]

//? Approach:
// Sort the array to bring duplicates together.
// Use backtracking to explore all possible subsets.
// At each recursion step:
// Add the current subset (path) to the result.
// Loop through remaining elements starting from start.
// Skip duplicates: If the current element is the same as the previous one and not at the starting index of the loop, skip it.
// Include the current element, recurse, then backtrack (remove last element)./li>

//? Code:
var subsetsWithDup = function (arr) {
  let result = [];
  arr.sort((a, b) => a - b);
  let backtrack = (path, start) => {
    result.push([...path]);
    for (let i = start; i < arr.length; i++) {
      if (i > start && arr[i - 1] === arr[i]) continue;
      path.push(arr[i]);
      backtrack(path, i + 1);
      path.pop();
    }
  };
  backtrack([], 0);
  return result;
};

//? Time Complexity = O(n*2n)
//? Space Complexity = O(n*2n) for recursion + O(n!) output storage.
