//? LeetCode #354
//? Russian Doll Envelopes

// You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi] represents the width and the height of an envelope.

// One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope's width and height.

// Return the maximum number of envelopes you can Russian doll (i.e., put one inside the other).

// Note: You cannot rotate an envelope.

//? Example 1:
// Input: envelopes = [[5,4],[6,4],[6,7],[2,3]]
// Output: 3
// Explanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).

//? Example 2:
// Input: envelopes = [[1,1],[1,1],[1,1]]
// Output: 1

//? Constraints:
// 1 <= envelopes.length <= 105
// envelopes[i].length == 2
// 1 <= wi, hi <= 105

//? Thought Process:
//  We first sort the envelopes by width, so we process them from smaller to larger width.
//  After sorting, we need to find the longest sequence where both width and height strictly increase.
//  This is the same basic idea as Longest Increasing Subsequence (LIS), but here each element has two dimensions.
//  `i` represents the current envelope, while `prev` represents the last envelope we selected.
//  If both width and height of the current envelope are greater than the previous one, we can choose it.
//  We have two choices: take the current envelope or skip it.
//  Taking it gives 1 + solve(i + 1, i), while skipping it gives solve(i + 1, prev).
//  We use DP to remember results for each combination of i and prev, avoiding repeated calculations.
//  So, sorting by width first and then finding the longest increasing sequence based on height makes this a 2D variation of LIS.

//? Code: Top Down
var maxEnvelopes = function (envelopes) {
    let n = envelopes.length;
    envelopes.sort((a, b) =>  a[0] - b[0]);
    let dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(undefined));

    const solve = (i, prev) => {
        if (i === n) {
            return 0;
        }

        if (dp[i][prev + 1] !== undefined) {
            return dp[i][prev + 1];
        }

        if (prev === -1 || (envelopes[prev][0] < envelopes[i][0] && envelopes[prev][1] < envelopes[i][1])) {
            let choice1 = 1 + solve(i + 1, i);
            let choice2 = solve(i + 1, prev);

            return dp[i][prev + 1] = Math.max(choice1, choice2);
        }
        else {
            return dp[i][prev + 1] = solve(i + 1, prev);
        }
    };

    return solve(0, -1);
};

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)

//? Code: Bottom Up
var maxEnvelopes = function (envelopes) {
    let n = envelopes.length;
    envelopes.sort((a, b) =>  a[0] - b[0]);
    
    let dp = new Array(n).fill(1);
    let LIS = 1;

    for (let i = 0; i < n; i = i + 1) {
        for (let j = 0; j < i; j = j + 1) {
            if (envelopes[j][0] < envelopes[i][0] && envelopes[j][1] < envelopes[i][1]) {
                let choice1 = 1 + dp[j];
                let choice2 = dp[i];
                if (choice1 > choice2) {
                    dp[i] = choice1;
                }
            }
        }
        if (dp[i] > LIS) {
            LIS = dp[i];
        }
    }

    return LIS;
};

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)

//? Code: Binary Search
var maxEnvelopes = function (envelopes) {
    let n = envelopes.length;
    envelopes.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1];
        }
        return a[0] - b[0];
    });
    let dp = [];
    dp.push(envelopes[0]);

    for (let i = 1; i < n; i = i + 1) {
        if (envelopes[i][0] > dp[dp.length - 1][0] && envelopes[i][1] > dp[dp.length - 1][1]) {
            dp.push(envelopes[i]);
        }
        else {
            let low = 0;
            let high = dp.length - 1;
            let ans;
            while (low <= high) {
                let mid = Math.floor((low + high) / 2);
                if (dp[mid][1] < envelopes[i][1]) {
                    low = mid + 1;
                } else {
                    ans = mid;
                    high = mid - 1;
                }
            }
            dp[ans] = envelopes[i];
        }
    }

    return dp.length;
};

//? Time Complexity: O(n log n)
//? Space Complexity: O(n)

// Question
//?  Why do we sort Russian Doll Envelopes by width ascending and, for equal widths, height descending?
//  Width ascending makes width automatically increasing; height descending for equal widths prevents LIS from selecting two envelopes with the same width.\
//  So we can safely run LIS + binary search only on heights.