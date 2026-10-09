//? LeetCode #2574
//? Left and Right Sum Differences

// You are given a 0-indexed integer array nums of size n.

// Define two arrays leftSum and rightSum where:

// leftSum[i] is the sum of elements to the left of the index i in the array nums. If there is no such element, leftSum[i] = 0.
// rightSum[i] is the sum of elements to the right of the index i in the array nums. If there is no such element, rightSum[i] = 0.
// Return an integer array answer of size n where answer[i] = |leftSum[i] - rightSum[i]|.

//? Example 1:
// Input: nums = [10,4,8,3]
// Output: [15,1,11,22]
// Explanation: The array leftSum is [0,10,14,22] and the array rightSum is [15,11,3,0].
// The array answer is [|0 - 15|,|10 - 11|,|14 - 3|,|22 - 0|] = [15,1,11,22].

//? Example 2:
// Input: nums = [1]
// Output: [0]
// Explanation: The array leftSum is [0] and the array rightSum is [0].
// The array answer is [|0 - 0|] = [0].

//? Constraints:
// 1 <= nums.length <= 1000
// 1 <= nums[i] <= 105

//? Thought Proccess:
// Simple Question. just we need to calculate prefixSum and suffixSum and then later on just we need to fill the ans array.
// Where, ans[i] = prefixSum[0] - suffixSum[0].

//? Code:
var leftRightDifference = function (nums) {
  const n = nums.length;
  const prefixSum = new Array(n).fill(0);
  const suffixSum = new Array(n).fill(0);
  const ans = new Array(n).fill(0);

  for (let i = 1; i < n; i = i + 1) {
    prefixSum[i] = prefixSum[i - 1] + nums[i - 1];
  }

  for (let i = n - 2; i >= 0; i = i - 1) {
    suffixSum[i] = suffixSum[i + 1] + nums[i + 1];
  }

  for (let i = 0; i < n; i = i + 1) {
    ans[i] = Math.abs(prefixSum[i] - suffixSum[i]);
  }

  return ans;
};

//? Time Complexity: O(n) + (n) + O(n) => O(n)
//? Space Complexity: O(n) + (n) + O(n) => O(n)

//? Better Approach:
// We do not actually need 2 arrays and 2 loops for calculating prefixSum and suffixSum. If we observe one tiny detail clearly with focus. prefix[i] + nums[i] + suffix[i] = totalSum of Array at all indexes.

// Because prefixSum ny pichla cover kr liya and suffixSum ny agla cover krliya and nums[i] is current element. So all we need is totalSum to start our processing.

// So, we just need to calculate prefix[i] and suffix[i].
// left + nums[i] + right = totalSum => left hum calculate karty jein gy loop me but right nahi karein gy, suffix hum is formula sy derive karein gy.

// right = totalSum - left - nums[i]
// And then just store left - right into ans array.

//? Code:
var leftRightDifference = function (nums) {
  const n = nums.length;
  let leftSum = 0;
  let rightSum = 0;
  const ans = new Array(n).fill(0);
  const totalSum = nums.reduce((sum, curr) => (sum += curr), 0);

  for (let i = 0; i < n; i = i + 1) {
    if (i > 0) {
      leftSum = leftSum + nums[i - 1];
    }

    rightSum = totalSum - leftSum - nums[i];
    ans[i] = Math.abs(leftSum - rightSum);
  }

  return ans;
};

//? Time Complexity: O(n) + (n) => O(n)
//? Space Complexity: O(1)
