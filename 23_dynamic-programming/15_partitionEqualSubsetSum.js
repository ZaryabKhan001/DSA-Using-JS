//? LeetCode #416
//? Partition Equal Subset Sum

// Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

//? Example 1:
// Input: nums = [1,5,11,5]
// Output: true
// Explanation: The array can be partitioned as [1, 5, 5] and [11].

//? Example 2:
// Input: nums = [1,2,3,5]
// Output: false
// Explanation: The array cannot be partitioned into equal sum subsets.

//? Constraints:
// 1 <= nums.length <= 200
// 1 <= nums[i] <= 100

//? Approach:
// Do calculate the total sum of the array.
// If the sum is odd, immediately return false because it cannot be divided into two equal subsets.
// Do divide the total sum by 2.
// This becomes the target sum sum we need to achieve from a subset of the array.
// Do create a memoization table (dp).
// dp[remS][start] will store whether it is possible to form the remaining sum remS starting from index start.
// Do define a recursive function fn(remS, start):
// If remS == 0, return true (subset found).
// If remS < 0, return false (overshoot).
// If already computed in dp, return the stored result.
// Do iterate over all elements from start to end:
// For each element, recursively check if choosing it (remS - arr[i]) allows reaching the target.
// If any path returns true, store true in dp and return it.
// Do return false if no subset works from this position.
// Save result in dp[remS][start].
// Do call fn(sum, 0) at the start.
// This checks if we can form half of the total sum using elements from the beginning.

//? Code:
//* utility function
const getSum = (arr) => {
  let sum = 0;
  var isOdd = false;

  for (let i = 0; i < arr.length; i = i + 1) {
    sum = sum + arr[i];
  }
  isOdd = sum % 2 != 0;

  return { sum, isOdd };
};

var canPartition = function (nums) {
  const { sum, isOdd } = getSum(nums);
  const sumWeAreLookingFor = sum / 2;

  let dp = Array.from({ length: sumWeAreLookingFor + 1 }, () =>
    Array(nums.length).fill(undefined),
  );
  console.log(dp);

  //* edge case
  if (isOdd) return false;

  const traversal = (remainingSum, startIndex) => {
    //* base case
    if (remainingSum === 0) return true;
    if (remainingSum < 0) return false;

    //* checking from dp
    if (dp[remainingSum][startIndex] != undefined)
      return dp[remainingSum][startIndex];

    //* calculations
    for (let i = startIndex; i < nums.length; i = i + 1) {
      if (traversal(remainingSum - nums[i], i + 1)) {
        dp[remainingSum][startIndex] = true;
        return true;
      }
    }
    dp[remainingSum][startIndex] = false;
    return false;
  };

  return traversal(sumWeAreLookingFor, 0);
};

//? Time Complexity: O(n*sum)
//? Space Complexity: O(n*sum)
