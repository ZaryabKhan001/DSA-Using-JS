//? LeetCode 7
//? Permutations II
// Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

//? Example 1:
// Input: nums = [1,1,2]
// Output:
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]

//? Example 2:
// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

//? Approach
// Sort the array → so duplicates are adjacent.
// Use backtracking
// Maintain a path (current permutation being built).
// At each step, iterate over remaining choices.
// Skip duplicates If the current number is the same as the previous (choices[i] === choices[i-1]) → continue.
// Pick choices[i], recurse with the rest of the elements, then backtrack.
// When path.length === arr.length, store it in result.

//? Code:
var permuteUnique = function (nums) {
    nums.sort((a, b) => a - b);
    let result = [];

    const backTrack = (input, output) => {
        if (input.length === 0) {
            result.push([...output]);
            return;
        }

        for (let i = 0; i < input.length; i = i + 1) {
            let newOutput = [...output, input[i]];
            let newInput = [...input.slice(0, i), ...input.slice(i + 1)];

            backTrack(newInput, newOutput);

            //* skip next same values to avoid duplicate permutations
            while (i < input.length && input[i] === input[i + 1]) {
                i++;
            }
        }
    };

    backTrack(nums, []);
    return result;
};

//? Time Complexity = O(n * n!)
//? Space Complexity = O(n * n!)
