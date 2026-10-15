//? LeetCode 303
//? Range Sum Query - Immutable

// Given an integer array nums, handle multiple queries of the following type:

// Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
// Implement the NumArray class:

// NumArray(int[] nums) Initializes the object with the integer array nums.
// int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).

//? Example 1:
// Input
// ["NumArray", "sumRange", "sumRange", "sumRange"]
// [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
// Output
// [null, 1, -1, -3]

//? Explanation
// NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
// numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
// numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
// numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3

//? Constraints:
// 1 <= nums.length <= 104
// -105 <= nums[i] <= 105
// 0 <= left <= right < nums.length
// At most 104 calls will be made to sumRange.

//? Thought Process:
// Very simple question of prefix sum.

//? Code:
class NumArray {
  constructor(nums) {
    this.nums = nums;
  }

  sumRange(left, right) {
    let sumRange = 0;

    for (let i = left; i <= right; i = i + 1) {
      sumRange = sumRange + this.nums[i];
    }

    return sumRange;
  }
}

//? Time Complexity: O(n) for each time sumRange is called, where n is the length right - left + 1.
//? Space Complexity: O(n)
