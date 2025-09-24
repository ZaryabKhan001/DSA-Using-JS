//? LeetCode #503
//? Next Greater Element II

// Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]), return the next greater number for every element in nums.

// The next greater number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return -1 for this number.

//? Example 1:
// Input: nums = [1,2,1]
// Output: [2,-1,2]
// Explanation: The first 1's next greater number is 2;
// The number 2 can't find next greater number.
// The second 1's next greater number needs to search circularly, which is also 2.

//? Example 2:
// Input: nums = [1,2,3,4,3]
// Output: [2,3,4,-1,4]

//? Approach 1:
// Initialize:
// n = arr.length
// ans = Array(n).fill(-1) → To store result.
// stack = [] → To keep track of next greater candidates.
// Push last element into stack (start from end).
// Traverse from (n - 2) to 0:
// Use doubling the size of array to terminate circular behavior.
// While stack is not empty:
// If current element < top of stack → that is the next greater, store it in ans[i] and break.
// Else pop the stack (since it’s not greater).
// Push current element (arr[i]) onto the stack.
// Return ans

var nextGreaterElements = function (nums) {
  let arr = [...nums, ...nums];
  let n = arr.length;
  let stack = [];
  let ans = Array(n).fill(-1);
  stack.push(arr[n - 1]);
  for (let i = n - 2; i >= 0; i--) {
    while (stack.length) {
      let top = stack[stack.length - 1];
      if (arr[i] < top) {
        ans[i] = top;
        break;
      } else {
        stack.pop();
      }
    }
    stack.push(arr[i]);
  }
  return ans.slice(0, nums.length);
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
