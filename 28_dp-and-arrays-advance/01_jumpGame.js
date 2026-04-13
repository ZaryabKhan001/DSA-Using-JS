//? LeetCode #55
//? Jump Game

// You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

// Return true if you can reach the last index, or false otherwise.

//? Example 1:
// Input: nums = [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

//? Example 2:
// Input: nums = [3,2,1,0,4]
// Output: false
// Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

//? Constraints:
// 1 <= nums.length <= 104
// 0 <= nums[i] <= 105

//? Approach 01: DP
// Start from index 0 and try all possible jumps from that position.
// Use DFS recursion to check if we can reach the last index.
// From a position start, try jumps from 1 to nums[start].
// If any jump leads to the last index (or a position that can reach it), return true.
// Use a dp array (memoization) to store results for already visited indices to avoid recomputation.
// If dp[start] is already computed, return the stored value.
// Store the result (true or false) in dp[start] before returning.

//? Code:
var canJump = function (nums) {
  let end = nums.length - 1;
  let dp = new Array(nums.length).fill(-1);

  let dfs = (start) => {
    if (start === end) return true;

    if (dp[start] != -1) return dp[start];

    let ans = false;

    for (let i = 1; i <= nums[start] && !ans; i++) {
      if (start + i <= end) {
        ans = ans || dfs(start + i);
      }
    }

    dp[start] = ans;
    return ans;
  };

  return dfs(0);
};

//? Time Complexity = O(n2)
//? Space Complexity = O(n)

//? Approach 02: Greedy
// Maintain a variable farthest to track the farthest index reachable so far.
// Traverse the array from left to right.
// If the current index i is greater than farthest, it means this position cannot be reached, so return false.
// Otherwise, update the farthest reachable index using: farthest = Math.max(farthest, i + nums[i]).
// Continue updating the reachable range while traversing the array.
// If the loop finishes without getting stuck, it means the last index is reachable.

//? Code:
var canJump = function (nums) {
  let farthest = 0;

  for (let i = 0; i < nums.length; i = i + 1) {
    if (i > farthest) return false;
    farthest = Math.max(farthest, nums[i] + i);
  }
  return true;
};

//? Time Complexity = O(n)
//? Space Complexity = O(1)
