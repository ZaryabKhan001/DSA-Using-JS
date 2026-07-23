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

//? Approach 01:
// Using input and output recursion technique.
// Fill the output array with elements from input array and remove that element from input array.
// Keep on doing this until input array is empty. Then push the output array to result array.

var permute = function (nums) {
    let result = [];

    const backTrack = (input, output) => {
        //* base case
        if (input.length === 0) {
            result.push([...output]);
            return;
        }

        //* recursive solution
        for (let i = 0; i < input.length; i = i + 1) {
            let newOutput = [...output, input[i]];
            let newInput = [...input.slice(0, i), ...input.slice(i + 1)];

            backTrack(newInput, newOutput);
        }
    };

    backTrack(nums, []);
    return result;
};

// ?Time Complexity = O(n × n!)
//? Space Complexity = O(n) for recursion + O(n!) output storage.

//? Approach 02:
// The idea is to use backtracking to generate all permutations of the string. We will swap characters in the string to generate permutations and backtrack to restore the original string after exploring each permutation.

var permute = function (nums) {
    let result = [];

    const backTrack = (start) => {
        if (start == nums.length) {
            result.push([...nums]);
            return;
        }

        for (let i = start; i < nums.length; i = i + 1) {
            [nums[i], nums[start]] = [nums[start], nums[i]];
            backTrack(start + 1);
            [nums[i], nums[start]] = [nums[start], nums[i]];
        }
    };

    backTrack(0);
    return result;
}

//? Time Complexity: O(n! * n) where n is the length of the string. The number of permutations of a string of length n is n!, and for each permutation, we are creating a new string which takes O(n) time.
//? Space Complexity: O(n! + n) for the recursion stack and for storing all permutations in the result array.