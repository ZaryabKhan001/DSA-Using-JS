//? LeetCode #40
//? Combination Sum II

// Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

// Each number in candidates may only be used once in the combination.

// Note: The solution set must not contain duplicate combinations.

//? Example 1:
// Input: candidates = [10,1,2,7,6,1,5], target = 8
// Output:
// [
// [1,1,6],
// [1,2,5],
// [1,7],
// [2,6]
// ]

//? Example 2:
// Input: candidates = [2,5,2,1,2], target = 5
// Output:
// [
// [1,2,2],
// [5]
// ]

//? Approach:
// Sort the array → ensures duplicates are adjacent and helps in skipping them.
// Use backtracking to explore all possible combinations:
// Keep reducing the remainingSum.
// If it becomes 0, add the current path to result.
// If it becomes negative, stop exploring further.
// Skip duplicates → when iterating, if the current number is the same as the previous (arr[i] === arr[i-1]) and not at the starting index of the loop, continue to next iteration.
// Move forward (use i+1) because each element can only be used once.

//? Code:
var combinationSum2 = function (arr, target) {
  let result = [];
  arr.sort((a, b) => a - b);

  let backtrack = (remainingSum, path, start) => {
    if (remainingSum === 0) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      // skip duplicates at same level
      if (i > start && arr[i] === arr[i - 1]) continue;

      // pruning
      if (arr[i] > remainingSum) break;

      path.push(arr[i]);
      backtrack(remainingSum - arr[i], path, i + 1);
      path.pop();
    }
  };

  backtrack(target, [], 0);
  return result;
};

//? Time Complexity = O(2n * n)
//? Space Complexity = O(2n * n) (output) + O(n) (stack)
