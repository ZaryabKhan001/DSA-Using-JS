//? LeetCode #1547
//? Minimum Cost to Cut a Stick

// Given a wooden stick of length n units. The stick is labelled from 0 to n. For example, a stick of length 6 is labelled as follows:

// Given an integer array cuts where cuts[i] denotes a position you should perform a cut at.

// You should perform the cuts in order, you can change the order of the cuts as you wish.

// The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. When you cut a stick, it will be split into two smaller sticks (i.e. the sum of their lengths is the length of the stick before the cut). Please refer to the first example for a better explanation.

// Return the minimum total cost of the cuts.

//? Example 1:
// Input: n = 7, cuts = [1,3,4,5]
// Output: 16
// Explanation: Using cuts order = [1, 3, 4, 5] as in the input leads to the following scenario:

// The first cut is done to a rod of length 7 so the cost is 7. The second cut is done to a rod of length 6 (i.e. the second part of the first cut), the third is done to a rod of length 4 and the last cut is to a rod of length 3. The total cost is 7 + 6 + 4 + 3 = 20.
// Rearranging the cuts to be [3, 5, 1, 4] for example will lead to a scenario with total cost = 16 (as shown in the example photo 7 + 4 + 3 + 2 = 16).

//? Example 2:
// Input: n = 9, cuts = [5,6,1,4,2]
// Output: 22
// Explanation: If you try the given cuts ordering the cost will be 25.
// There are much ordering with total cost <= 25, for example, the order [4, 6, 5, 2, 1] has total cost = 22 which is the minimum possible.

//? Constraints:
// 2 <= n <= 106
// 1 <= cuts.length <= min(n - 1, 100)
// 1 <= cuts[i] <= n - 1
// All the integers in cuts array are distinct.

//? Approach: Dynamic Programming
// We want to find the minimum cost to cut a stick of length n at given positions in cuts.
// Each time we make a cut inside a segment (start, end), the cost of that cut is the current segment length (end - start).
// After cutting at position c, the stick splits into two smaller segments:
// Left segment → (start, c)
// Right segment → (c, end)
// Use DFS recursion to try every possible cut c that lies between start and end.
// For each valid cut:
// Compute currCost = (end - start) + dfs(start, c) + dfs(c, end)
// Keep the minimum cost among all choices.
// Use a Map (dp) for memoization with key "start_end" to store the minimum cost for each segment so that the same subproblem is not recomputed.
// If no cut exists inside the segment, the cost is 0.
// Start the recursion with the whole stick: dfs(0, n).

//? Code:
var minCost = function (n, cuts) {
  let dp = {};
  const recursive = (start, end) => {
    let minCost = Infinity;
    if (start >= end) return 0;

    let key = `${start}_${end}`;
    if (dp[key] !== undefined) return dp[key];

    for (let c of cuts) {
      if (start < c && c < end) {
        cost = end - start + recursive(start, c) + recursive(c, end);
        minCost = Math.min(minCost, cost);
      }
    }
    dp[key] = minCost === Infinity ? 0 : minCost;
    return dp[key];
  };
  return recursive(0, n);
};

//? Time Complexity = O(m * n2)
//? Space Complexity = O(n2)
