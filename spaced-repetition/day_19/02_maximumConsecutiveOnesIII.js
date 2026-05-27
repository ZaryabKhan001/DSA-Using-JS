//? LeetCode #1004
//? Max Consecutive Ones III

// Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

//? Example 1:
// Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
// Output: 6
// Explanation: [1,1,1,0,0,1,1,1,1,1,1]
// Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

//? Example 2:
// Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
// Output: 10
// Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
// Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

//? Constraints:
// 1 <= nums.length <= 105
// nums[i] is either 0 or 1.
// 0 <= k <= nums.length

//? Approach: Sliding Window
// We can use a sliding window to keep track of the number of 0's in the current window. If the number of 0's exceeds k, we can move the left pointer of the window to the right until we have at most k 0's in the window. We can keep track of the maximum length of the window that contains at most k 0's.

//? Code:
var longestOnes = function (nums, k) {
  let maxLen = 0;
  let zeros = 0;

  let i = 0;
  let j = 0;

  while (j < nums.length) {
    //* first include current element in window
    if (nums[j] === 0) {
      zeros++;
    }

    //* shrink window until valid
    while (zeros > k) {
      if (nums[i] === 0) {
        zeros--;
      }
      i++;
    }

    //* update answer for valid window
    maxLen = Math.max(maxLen, j - i + 1);

    j++;
  }

  return maxLen;
};

//? Time Complexity: O(n) where n is the length of the input array nums. We traverse the array once with the right pointer j, and the left pointer i also moves at most n times in total.
//? Space Complexity: O(1) since we are using only a constant amount of extra space to store the variables maxLen, zeros, i, and j.
