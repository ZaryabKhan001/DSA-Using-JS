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

//? Approach: Dynamic Programming
// Instead of directly finding the minimum moves for k eggs and n floors, we reverse the thinking. We calculate how many floors can be tested with a given number of moves and eggs.
// Let dp[i] represent the maximum number of floors that can be checked using i eggs and the current number of moves.
// Initialize a DP array of size k + 1 with all values 0.
// Increase the number of moves step by step until we can check at least n floors with k eggs.
// For every move, update the DP values from right to left using the relation:
// If an egg is dropped:
// Egg breaks → we check floors below with i-1 eggs.
// Egg survives → we check floors above with i eggs.
// So the recurrence becomes: dp[i] = 1 + dp[i] + dp[i-1] where: 1 = current floor, dp[i]= floors we can check if egg survives and dp[i-1] = floors we can check if egg breaks.
// Continue increasing moves until dp[k] >= n.
// The number of moves taken is the minimum number of attempts required in the worst case.

//? Code:
function superEggDrop(k, n) {
  // dp[k][m] = max floors with k eggs and m moves
  const dp = Array.from({ length: k + 1 }, () => Array(n + 1).fill(0));

  let m = 0;

  // increase moves until we can cover n floors
  while (dp[k][m] < n) {
    m++;

    for (let eggs = 1; eggs <= k; eggs++) {
      dp[eggs][m] =
        dp[eggs - 1][m - 1] + // egg breaks
        dp[eggs][m - 1] + // egg survives
        1; // current floor
    }
  }

  return m;
}

//? Time Complexity = O(k x moves)
//? Space Complexity = O(k)
