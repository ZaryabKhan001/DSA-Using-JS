//? LeetCode #887
//? Super Egg Drop

// You are given k identical eggs and you have access to a building with n floors labeled from 1 to n.

// You know that there exists a floor f where 0 <= f <= n such that any egg dropped at a floor higher than f will break, and any egg dropped at or below floor f will not break.

// Each move, you may take an unbroken egg and drop it from any floor x (where 1 <= x <= n). If the egg breaks, you can no longer use it. However, if the egg does not break, you may reuse it in future moves.

// Return the minimum number of moves that you need to determine with certainty what the value of f is.

//? Example 1:
// Input: k = 1, n = 2
// Output: 2
// Explanation:
// Drop the egg from floor 1. If it breaks, we know that f = 0.
// Otherwise, drop the egg from floor 2. If it breaks, we know that f = 1.
// If it does not break, then we know f = 2.
// Hence, we need at minimum 2 moves to determine with certainty what the value of f is.

//? Example 2:
// Input: k = 2, n = 6
// Output: 3

//? Example 3:
// Input: k = 3, n = 14
// Output: 4

//? Constraints:
// 1 <= k <= 100
// 1 <= n <= 104

//? Thought Process:
// Egg Dropping — MCM Pattern
// State: solve(e, f) = minimum attempts with e eggs and f floors.
// Why MCM pattern? → We try every partition point k (floor to drop from).

// Divide at k:
// Egg breaks → solve(e-1, k-1)
// Egg survives → solve(e, f-k)

// Worst case: max(break, survive) because we don't know what happens.
// Current attempt: 1 + max(...)
// Best choice: min(...) over every k.

//? Base cases:
// f = 0/1 → f
// e = 1 → f
// Memoization: Store dp[e][f] to avoid repeated calculations.
// Formula

// dp(e,f) = min over k [
//     1 + max(
//         dp(e-1, k-1),
//         dp(e, f-k)
//     )
// ]

// MCM pattern = Try every k → Divide → Solve both parts → max → +1 → min.

//? Code:
function superEggDrop(e, f) {
    let dp = Array.from({ length: e + 1 }, () => new Array(f + 1).fill(undefined));

    const solve = (e, f) => {
        if (f === 0 || f === 1) {
            return f;
        }
        if (e === 1) {
            return f;
        }

        if (dp[e][f] !== undefined) {
            return dp[e][f];
        }

        let min = Infinity;
        for (let k = 1; k <= f; k = k + 1) {
            let temp = 1 + Math.max(solve(e - 1, k - 1), solve(e, f - k));
            min = Math.min(min, temp);
        }

        return dp[e][f] = min;
    };

    return solve(e, f);
}

//? Time Complexity = O(e * f^2) e*f states and for each state we explore f floors.
//? Space Complexity = O(e * k) e*f states and f call stack. 

//? Maybe it will give TLE. So we use binary search instead of k loop. 
function superEggDrop(e, f) {
    let dp = Array.from({ length: e + 1 }, () => new Array(f + 1).fill(undefined));

    const solve = (e, f) => {
        if (f === 0 || f === 1) {
            return f;
        }
        if (e === 1) {
            return f;
        }

        if (dp[e][f] !== undefined) {
            return dp[e][f];
        }

        let min = Infinity;
        let low = 1;
        let high = f;

        while (low <= high) {
            const k = Math.floor((low + high) / 2);

            const broken = solve(e - 1, k - 1);
            const notBroken = solve(e, f - k);

            let temp = 1 + Math.max(broken, notBroken);
            min = Math.min(min, temp);

            if (broken < notBroken) {
                low = k + 1;
            }
            else {
                high = k - 1;
            }

        }

        return dp[e][f] = min;
    };

    return solve(e, f);
}

//? Time Complexity = O(e * f * log f) e*f states and for each state we explore log k nodes.
//? Space Complexity = O(e * k) e*f states and f call stack. 