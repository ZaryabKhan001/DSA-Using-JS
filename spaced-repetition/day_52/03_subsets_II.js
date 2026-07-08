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
// ip/op recursion
// we are checking all possibilities by including and excluding the element
// and using a set to store the unique subsets

//? Code:
var subsetsWithDup = function (nums) {
  let result = [];
  let seen = new Set();

  const recursive = (input, output) => {
    if (input.length === 0) {
      let key = JSON.stringify([...output].sort());

      if (!seen.has(key)) {
        seen.add(key);
        result.push([...output]);
      }

      return;
    }

    let op1 = [...output];
    let op2 = [...output, input[0]];
    let remaining = input.slice(1);

    recursive(remaining, op1);
    recursive(remaining, op2);
    return;
  };

  recursive(nums, []);

  return result;
};

//? Time Complexity = O(n * 2^n) // total number of recursive calls * time used in each call
//? Space Complexity = O(n * 2^n) // depth of recursive calls * space used in each call
