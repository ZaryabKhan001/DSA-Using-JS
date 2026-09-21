//? LeetCode #646
//? Maximum Length of Pair Chain

// You are given an array of n pairs pairs where pairs[i] = [lefti, righti] and lefti < righti.
// A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can be formed in this fashion.
// Return the length longest chain which can be formed.
// You do not need to use up all the given intervals. You can select pairs in any order.

//? Example 1:
// Input: pairs = [[1,2],[2,3],[3,4]]
// Output: 2
// Explanation: The longest chain is [1,2] -> [3,4].

//? Example 2:
// Input: pairs = [[1,2],[7,8],[4,5]]
// Output: 3
// Explanation: The longest chain is [1,2] -> [4,5] -> [7,8].

//? Constraints:
// n == pairs.length
// 1 <= n <= 1000
// -1000 <= lefti < righti <= 1000

//? Thought Process:
// This problem looks like a normal subset / subsequence problem.
// 1. We need to find the longest chain of pairs.
// 2. A pair [a, b] can come before [c, d] only when b < c.
// 3. At first, this looks like we might need to try every possible subset.
// 4. But notice something important: if we sort the pairs by their first value,
//    smaller starting values always come before larger starting values.
// 5. For example: [[5, 24], [15, 25], [27, 40], [50, 60]]
// 6. After sorting, when we are at [27, 40], we only need to look at pairs before it.
// 7. This is similar to the Longest Increasing Subsequence (LIS) problem.
// 8. In LIS, we ask: "Can this element extend a valid sequence?"
// 9. Here, we ask: "Can this pair extend a valid chain?"
// 10. For example, [5, 24] can be followed by [27, 40] because 24 < 27.
// 11. So we can define dp[i] as the longest chain ending at pair i.
// 12. For every pair i, we check all previous pairs j.
// 13. If pairs[j][1] < pairs[i][0], then pair i can be added after pair j.
// 14. Therefore, dp[i] = max(dp[i], dp[j] + 1).
// 15. Finally, the answer is the maximum value in dp.
// 16. Sorting is important because it gives us a consistent left-to-right order.
// 17. Without sorting, a valid predecessor might appear after the current pair,
//     making our DP unable to consider it.
// 18. So sorting transforms the problem into an LIS-style DP problem.

//? Code:
var findLongestChain = function (pairs) {
  pairs.sort((a, b) => a[0] - b[0]);
  const n = pairs.length;
  let maxLength = 1;
  let ans = new Array(n).fill(1);

  for (let i = 1; i < n; i = i + 1) {
    for (let j = 0; j < i; j = j + 1) {
      if (pairs[j][1] < pairs[i][0]) {
        if (ans[j] + 1 > ans[i]) {
          ans[i] = ans[j] + 1;
        }
      }
    }
    maxLength = Math.max(maxLength, ans[i]);
  }

  return maxLength;
};

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)
