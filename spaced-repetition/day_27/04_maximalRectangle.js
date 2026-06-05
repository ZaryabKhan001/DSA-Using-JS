//? LeetCode: 85
//? Maximal Rectangle

// Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

//? Example 1:
// Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// Output: 6
// Explanation: The maximal rectangle is shown in the above picture.

//? Example 2:
// Input: matrix = [["0"]]
// Output: 0

//? Example 3:
// Input: matrix = [["1"]]
// Output: 1

//? Constraints:
// rows == matrix.length
// cols == matrix[i].length
// 1 <= rows, cols <= 200
// matrix[i][j] is '0' or '1'.

//? Approach 01:
// We can use a brute-force approach where we check every possible rectangle in the matrix and calculate its area if it contains only '1's. We can iterate through all pairs of rows and columns to define the corners of the rectangle, and then check if all elements within that rectangle are '1's. This approach has a time complexity of O(rows^2 * cols^2) in the worst case, which is not efficient for larger matrices.

//? Code:
var maximalRectangleBruteForce = function (matrix) {
  if (!matrix || matrix.length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;
  let maxArea = 0;

  for (let top = 0; top < rows; top++) {
    for (let bottom = top; bottom < rows; bottom++) {
      for (let left = 0; left < cols; left++) {
        for (let right = left; right < cols; right++) {
          let isValid = true;
          for (let r = top; r <= bottom; r++) {
            for (let c = left; c <= right; c++) {
              if (matrix[r][c] === "0") {
                isValid = false;
                break;
              }
            }
            if (!isValid) break;
          }

          if (isValid) {
            let width = right - left + 1;
            maxArea = Math.max(maxArea, width * (bottom - top + 1));
          }
        }
      }
    }

    return maxArea;
  }
};

//? Time Complexity: O(rows^3 * cols^3)
//? Space Complexity: O(1)

//? Approach 02:
// We can treat each row of the matrix as the base of a histogram, where the height of each bar in the histogram is the number of consecutive '1's above it (including itself). For each row, we can calculate the largest rectangle area in this histogram using a stack-based approach. We repeat this process for every row and keep track of the maximum area found.

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

var maximalRectangle = function (matrix) {
  if (!matrix || matrix.length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;

  const heights = new Array(cols).fill(0);
  let maxArea = 0;

  for (let i = 0; i < rows; i++) {
    // 1. Build histogram for this row
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === "1") {
        heights[j] += 1;
      } else {
        heights[j] = 0;
      }
    }

    // 2. Compute largest rectangle in histogram
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;
};

//? Time Complexity: O(rows * cols)
//? Space Complexity: O(cols)
