//? LeetCode #724
//? Find Pivot Index

// Given an array of integers nums, calculate the pivot index of this array.

// The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

// If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.

// Return the leftmost pivot index. If no such index exists, return -1.

//? Example 1:
// Input: nums = [1,7,3,6,5,6]
// Output: 3
//* Explanation:
// The pivot index is 3.
// Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
// Right sum = nums[4] + nums[5] = 5 + 6 = 11

//? Example 2:
// Input: nums = [1,2,3]
// Output: -1
//* Explanation:
// There is no index that satisfies the conditions in the problem statement.

//? Example 3:
// Input: nums = [2,1,-1]
// Output: 0
//* Explanation:
// The pivot index is 0.
// Left sum = 0 (no elements to the left of index 0)
// Right sum = nums[1] + nums[2] = 1 + -1 = 0

//? Constraints:
// 1 <= nums.length <= 104
// -1000 <= nums[i] <= 1000

//? Thought Process:
// Very Simple question, just we need to check if at any index prefix sum and suffix sum becomes equal or not. If anytime they goes equal, return that index (leftmost). Otherwise return -1.
// First approach is to calculte prefixSum and suffix sum for whole array and then check index by index these arrays.

//? Code:
var pivotIndex = function (nums) {
  const n = nums.length;
  const prefixSum = new Array(n).fill(0);
  const suffixSum = new Array(n).fill(0);

  for (let i = 1; i < n; i = i + 1) {
    prefixSum[i] = prefixSum[i - 1] + nums[i - 1];
  }

  for (let i = n - 2; i >= 0; i = i - 1) {
    suffixSum[i] = suffixSum[i + 1] + nums[i + 1];
  }

  for (let i = 0; i < n; i = i + 1) {
    if (prefixSum[i] === suffixSum[i]) {
      return i;
    }
  }

  return -1;
};

//? Time Complexity: O(n) + O(n) + O(n) => O(n)
//? Space Complexity: O(n) + O(n) => O(n)

//? Better Approach:
// We do not actually need 2 arrays and 3 loops If we observe one tiny detail clearly with focus. prefix[i] + nums[i] + suffix[i] = totalSum of Array at all indexes.

// Because prefixSum ny pichla cover kr liya and suffixSum ny agla cover krliya and nums[i] is current element. So all we need is totalSum to start our processing.

// So, we just need to calculate prefix[i] and suffix[i].
// left + nums[i] + right = totalSum => left hum calculate karty jein gy loop me but right nahi karein gy, suffix hum is formula sy derive karein gy.

// right = totalSum - left - nums[i]
// And then just check (left === right)

//? Code:
var pivotIndex = function (nums) {
  const n = nums.length;
  const totalSum = nums.reduce((sum, curr) => (sum += curr), 0);
  let prefixSum = 0;
  let suffixSum = 0;

  for (let i = 0; i < n; i = i + 1) {
    if (i > 0) {
      prefixSum = prefixSum + nums[i - 1];
    }
    suffixSum = totalSum - prefixSum - nums[i];

    if (prefixSum === suffixSum) {
      return i;
    }
  }

  return -1;
};

//? Time Complexity: O(n) + O(n) => O(n)
//? Space Complexity: O(1)

//* Few Points to clear.
//? Why do we start the loop from i = 0?
// Because index 0 can also be the pivot index.
// At index 0, the left sum is 0 because there are no elements on the left.
// If we start from i = 1, we will miss index 0.

//? Why do we use if (i > 0)?
// Because at index 0, there is no previous element.
// If we access nums[i - 1] at i = 0, we get nums[-1], which is undefined.
// Adding undefined to prefixSum will make it NaN.

//? Why do we add nums[i - 1] to prefixSum?
// Because prefixSum represents the sum of elements on the left of the current index.
// At each new index, we add the previous element to update the left sum.

//? Why do we calculate suffixSum using totalSum - prefixSum - nums[i]?
// totalSum contains all elements.
// We subtract the left sum and the current element to get the right sum.
// The pivot element is excluded from both left and right sums.

//? Why do we check prefixSum === suffixSum?
// Because the pivot index is where the left sum and right sum are equal.

//? Why do we return -1?
// Because if no index has equal left and right sums, there is no pivot index.
