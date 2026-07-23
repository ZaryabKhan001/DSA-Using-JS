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
// Include the current element in the subset and recurse to the next index.
// Backtrack by removing the last element to explore other possibilities.
// Exclude the current element and recurse to the next index.
// Use a Set to track unique subsets and avoid duplicates in the result.
// Continue until all combinations are generated.

//? Code:
var subsetsWithDup = function (nums) {
    nums.sort();
    const result = [];
    const seen = new Set();

    const backTrack = (start, path) => {
        //* base case
        if (start === nums.length) {
            let key = path.join(',');
            if (!seen.has(key)) {
                seen.add(key);
                result.push([...path]);
            }
            return;
        }

        //* recursive solution

        // include current element
        path.push(nums[start]);
        backTrack(start + 1, path);

        // backTrack
        path.pop();

        // exclude current element
        backTrack(start + 1, path);
    };

    backTrack(0, []);
    return result;
};

//? Time Complexity = O(n*2^n)
//? Space Complexity = O(n*2n).

//? Better Approach:
// Instead of using a Set to track unique subsets, we can skip duplicates during the backtracking process.
// This can be done by checking if the current element is the same as the previous one and skipping it if it is.

//? Code:
var subsetsWithDup = function (nums) {
    nums.sort();
    const result = [];

    const backTrack = (index, path) => {
        if (index === nums.length) {
            result.push([...path]);
            return;
        }

        // Include current element
        path.push(nums[index]);
        backTrack(index + 1, path);
        path.pop();

        // Skip all duplicate values before excluding
        while (
            index + 1 < nums.length &&
            nums[index] === nums[index + 1]
        ) {
            index++;
        }

        // Exclude current value (and all its duplicates)
        backTrack(index + 1, path);
    };

    backTrack(0, []);
    return result;
};

//? Time Complexity = O(n*2^n)
//? Space Complexity = O(n*2^n)