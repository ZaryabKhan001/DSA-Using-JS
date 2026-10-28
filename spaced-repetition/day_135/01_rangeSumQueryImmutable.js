//? LeetCode #307
//? Range Sum Query - Mutable

// Given an integer array nums, handle multiple queries of the following types:

// Update the value of an element in nums.
// Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
// Implement the NumArray class:

// NumArray(int[] nums) Initializes the object with the integer array nums.
// void update(int index, int val) Updates the value of nums[index] to be val.
// int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).

//? Example 1:
// Input
// ["NumArray", "sumRange", "update", "sumRange"]
// [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
// Output
// [null, 9, null, 8]

// Explanation
// NumArray numArray = new NumArray([1, 3, 5]);
// numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
// numArray.update(1, 2);   // nums = [1, 2, 5]
// numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8

//? Constraints:
// 1 <= nums.length <= 3 * 104
// -100 <= nums[i] <= 100
// 0 <= index < nums.length
// -100 <= val <= 100
// 0 <= left <= right < nums.length
// At most 3 * 104 calls will be made to update and sumRange

//? Thought Process:
//* Brute force thought process:
// We need to support two operations:
// 1. Update a value at a given index.
// 2. Find the sum between two indexes.

//* Brute force:
// For every sumRange query, loop from left to right and add all values.
// This works, but if the range is large, we visit many elements every time.
// Updating a value is easy, but range queries can become expensive.

//* Optimized thought process using Square Root Decomposition:
// Instead of calculating the whole range every time, divide the array into small blocks.
// Each block contains around sqrt(n) elements.
// Store the sum of each block separately.

// Now, when a sumRange query comes:

//* Case 1: Left and right are in the same block.
// Just loop through the required elements and calculate their sum.

//* Case 2: Left and right are in different blocks.
// First, calculate the sum of the remaining elements in the left block.
// Then, use the stored sums for all complete blocks in the middle.
// Finally, calculate the sum of the required elements in the right block.

//* Why does this work?
// Because we already know the sum of every complete block.
// We don't need to visit every element in the middle again.
// We only visit the elements at the boundaries and add the stored block sums.

//* What happens when we update a value?
// Find the block containing that index.
// Calculate the difference between the new and old values.
// Add that difference to the block sum.
// Then update the value in the original array.

//* Why is this better?
// Brute force may visit every element in a range for every query.
// Square root decomposition skips complete blocks using their stored sums.
// With block size around sqrt(n), each query takes around O(sqrt(n)) time.
// An update takes O(1) time.

//* Main idea:
// Don't recalculate sums for elements we have already grouped.
// Store each block's sum and reuse it whenever possible.

//? Code:
class NumArray {
  nums;
  blocks;
  n;
  blockSize;

  constructor(nums) {
    this.nums = nums;
    this.n = nums.length;
    this.blockSize = Math.ceil(Math.sqrt(this.n));

    this.blocks = new Array(Math.ceil(this.n / this.blockSize)).fill(0);

    //* Calculate the sum of each block
    for (let i = 0; i < this.n; i = i + 1) {
      let blockIndex = Math.floor(i / this.blockSize);
      this.blocks[blockIndex] += nums[i];
    }
  }

  update(index, val) {
    let blockIndex = Math.floor(index / this.blockSize);

    //* Update the block sum when a value changes
    this.blocks[blockIndex] -= this.nums[index];
    this.blocks[blockIndex] += val;

    this.nums[index] = val;
  }

  sumRange(left, right) {
    let sum = 0;

    let leftBlock = Math.floor(left / this.blockSize);
    let rightBlock = Math.floor(right / this.blockSize);

    //* If both indices are in the same block, sum directly
    if (leftBlock === rightBlock) {
      for (let i = left; i <= right; i = i + 1) {
        sum += this.nums[i];
      }
    } else {
      let leftBlockSum = 0;
      let middleSum = 0;
      let rightBlockSum = 0;

      //* Sum the remaining elements in the left block
      let leftBlockStartIndex = left;
      let leftBlockEndIndex = (leftBlock + 1) * this.blockSize - 1;

      for (let i = leftBlockStartIndex; i <= leftBlockEndIndex; i = i + 1) {
        leftBlockSum += this.nums[i];
      }

      //* Add complete blocks between left and right blocks
      for (let i = leftBlock + 1; i < rightBlock; i = i + 1) {
        middleSum += this.blocks[i];
      }

      //* Sum the required elements in the right block
      let rightBlockStartIndex = rightBlock * this.blockSize;
      let rightBlockEndIndex = right;

      for (let i = rightBlockStartIndex; i <= rightBlockEndIndex; i = i + 1) {
        rightBlockSum += this.nums[i];
      }

      sum = leftBlockSum + middleSum + rightBlockSum;
    }

    return sum;
  }
}

//? Time Complexiy
// Constructor: O(n) to build the block sums
// sumRange(left, right): O(sqrt(n))
// update(index, val): O(1)

//? Space Complexity: O(n) for the array and block sums
