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
// Start with an empty subset (path).
// At each step, add the current subset to the result.
// Iterate from the current start index to the end of the array:
// Include the element in the subset.
// Recurse to build further subsets from the next index.
// Backtrack by removing the last element to explore other possibilities.
// Continue until all combinations are generated.

var subsets = function (nums) {
    let result = [];

    const backTrack = (start, path) => {
        //* base case
        if (start === nums.length) {
            result.push([...path]);
            return;
        }

        //* recursive solution

        // take current element
        path.push(nums[start])
        backTrack(start + 1, path);

        //* backTrack
        path.pop();

        // do not take current element
        backTrack(start + 1, path);
    }

    backTrack(0, []);
    return result;
};

//? Time Complexity = O(2^n)
//? Space Complexity = O(2^n)
