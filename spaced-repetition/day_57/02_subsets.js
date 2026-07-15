//? 78. Subsets

// Given an integer array nums of unique elements, return all possible subsets (the power set).

// The solution set must not contain duplicate subsets. Return the solution in any order.

//? Example 1:
// Input: nums = [1,2,3]
// Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

//? Example 2:
// Input: nums = [0]
// Output: [[],[0]]

//? Constraints:
// 1 <= nums.length <= 10
// -10 <= nums[i] <= 10
// All the numbers of nums are unique.

//? Approach:
// we can solve this problem using recursion
// we are checking all possibilities by including and excluding the element

var subsets = function (nums) {
  const result = [];

  const recursive = (input, output) => {
    if (input.length === 0) {
      result.push([...output]);
      return;
    }

    let op1 = [...output];
    let op2 = [...output, input[0]];

    const remaining = input.slice(1);
    recursive(remaining, op1);
    recursive(remaining, op2);

    return;
  };

  recursive(nums, []);
  return result;
};

//* So although only the leaves are exactly 2^n, the entire tree is still looked as Θ(2^n).
//? Time Complexity = O(n * 2^n) // total number of recursive calls * time used in each call
//? Space Complexity = O(n ^ 2^n) // depth of recursive calls * space used in each call
