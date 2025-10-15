//? LeetCode #42
//? Trapping Rain Water

// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

//? Example 1:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

//? Example 2:
// Input: height = [4,2,0,3,2,5]
// Output: 9

//? Approach:
// Create two arrays
// maxL[i]: Max height to the left of index i (including i).
// maxR[i]: Max height to the right of index i (including i).
// Pre-fill maxL and maxR:
// Traverse from left to right for maxL.
// Traverse from right to left for maxR.
// Calculate water trapped at each index i as:
// min(maxL[i], maxR[i]) - height[i]
// Sum it up to get the final answer.

var trap = function (arr) {
  let n = arr.length;
  let maxL = [];
  maxL[0] = arr[0];
  for (let i = 1; i < n; i++) {
    maxL[i] = Math.max(maxL[i - 1], arr[i]);
  }
  let maxR = [];
  maxR[n - 1] = arr[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    maxR[i] = Math.max(arr[i], maxR[i + 1]);
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    let waterTrapped = Math.min(maxL[i], maxR[i]) - arr[i];
    ans += Math.max(waterTrapped, 0); // Avoid negative values
  }
  return ans;
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)
