//? LeetCode #39
//? Combination Sum

// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

// The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

//? Example 1:
// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.

//? Example 2:
// Input: candidates = [2,3,5], target = 8
// Output: [[2,2,2,2],[2,3,3],[3,5]]

//? Example 3:
// Input: candidates = [2], target = 1
// Output: []

//? Approach:
// Use backtracking to explore all possible combinations of numbers that sum up to the target.
// Start from an index (start) to avoid reusing previous elements in the same path (but allow reuse of the current one).
// At each step:
// If remainingSum === 0, store the current path (valid combination).
// If remainingSum <, 0, stop exploring further.
// Otherwise, try each number starting from start, include it in the path, and recurse with reduced sum.
// Backtrack (remove last element) to explore other possibilities.

//? Code
var combinationSum = function (candidates, target) {
    const result = [];

    const backTrack = (start, sum, path) => {
        //* base case
        if (sum > target) {
            return;
        }
        if (sum === target) {
            result.push([...path]);
            return;
        }

        //* recursive solution
        for (let i = start; i < candidates.length; i = i + 1) {
            let candidate = candidates[i];

            //* explore choice
            sum += candidate;
            path.push(candidate);

            backTrack(i, sum, path);

            //* undo choice
            sum -= candidate;
            path.pop();
        }
    };

    backTrack(0, 0, []);
    return result;
};


//? Time Complexity: O(n * n ^ h) where n is the number of candidates and h is the height of the recursion tree (which can be up to target / min(candidates)). In the worst case, we may explore all possible combinations of candidates, leading to an exponential number of recursive calls.
//? In the worst case, we may explore all possible combinations of candidates, leading to an exponential number of recursive calls.

//? Space Complexity: O(h) where h is the height of the recursion tree. The space used by the recursion stack can go up to the height of the tree, which can be up to target / min(candidates). Additionally, we use space for the result array to store valid combinations, but this is not counted in the space complexity as it is part of the output.