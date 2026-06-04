//? LeetCode #84
//? Largest Rectangle in Histogram

// Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

//? Example 1:
// Input: heights = [2,1,5,6,2,3]
// Output: 10
// Explanation: The above is a histogram where width of each bar is 1.
// The largest rectangle is shown in the red area, which has an area = 10 units.

//? Example 2:
// Input: heights = [2,4]
// Output: 4

//? Constraints:
// 1 <= heights.length <= 105
// 0 <= heights[i] <= 104

//? Approach: Stack
// We can use a two-pass stack-based approach to find the next smaller element and previous smaller element for each bar in the histogram. The area of the largest rectangle can be calculated using the height of the current bar and the width defined by the indices of the next smaller and previous smaller elements.

//? Code:
const nextSmallerElement = (arr) => {
  let n = arr.length;
  let ans = new Array(n).fill(n);
  let stack = [];
  stack.push(n - 1);

  for (let i = n - 2; i >= 0; i = i - 1) {
    while (stack.length && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }

    if (stack.length) {
      ans[i] = stack[stack.length - 1];
    }

    stack.push(i);
  }

  return ans;
};

const previousSmallerElement = (arr) => {
  let n = arr.length;
  let ans = new Array(n).fill(-1);
  let stack = [];
  stack.push(0);

  for (let i = 1; i < n; i = i + 1) {
    while (stack.length && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }

    if (stack.length) {
      ans[i] = stack[stack.length - 1];
    }

    stack.push(i);
  }

  return ans;
};

var largestRectangleArea = function (heights) {
  let maxR = 0;
  let n = heights.length;
  let nse = nextSmallerElement(heights);
  let pse = previousSmallerElement(heights);

  let maxArea = 0;
  for (let i = 0; i < heights.length; i = i + 1) {
    let height = heights[i];
    let width = nse[i] - pse[i] - 1;

    let area = height * width;
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
};

//? Time Complexity: O(n) where n is the length of the input array. Each element is pushed and popped from the stack at most once in both the next smaller element and previous smaller element functions, and we iterate through the heights array once to calculate the area.
//? Space Complexity: O(n) in the worst case when the input array is sorted in increasing order, the stack will contain all the elements in both the next smaller element and previous smaller element functions, and we also use additional space for the ans arrays.
