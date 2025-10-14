//? LeetCode #15
//?  3Sum

// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// Notice that the solution set must not contain duplicate triplets.

//? Example 1:
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.

//? Example 2:
// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.

//? Example 3:
// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.

//? Approach
// Sort the array: Sorting helps efficiently avoid duplicates and use the two-pointer technique.
// Fix one number: Loop through each element nums[i] as a fixed number, and for each i, find pairs (j, k).
// Two-pointer approach:
// Set two pointers:
// left = i + 1
// right = nums.length - 1
// Move them based on the sum:

// If sum > 0 → move right leftward.
// If sum < 0 → move left rightward.
// If sum == 0 → valid triplet found → store and skip duplicates.
// Avoid duplicates: Skip duplicate values for nums[i] and nums[left] to ensure unique triplets.

var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  let ans = [];
  for (let i = 0; i < nums.length; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      twoSum(nums, i, ans);
    }
  }
  return ans;
};
var twoSum = function (arr, x, ans) {
  let i = x + 1;
  let j = arr.length - 1;
  while (i < j) {
    let sum = arr[i] + arr[j] + arr[x];
    if (sum > 0) {
      j--;
    } else if (sum < 0) {
      i++;
    } else {
      ans.push([arr[i], arr[j], arr[x]]);
      i++;
      j--;
      // Skip duplicates for the second element
      while (i < j && arr[i] === arr[i - 1]) {
        i++;
      }
    }
  }
};

//? Time Complexity = O(n2)
//? Space Complexity = O(1)
