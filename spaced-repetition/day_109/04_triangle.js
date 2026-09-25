//? LeetCode #120
//? Triangle

// Given a triangle array, return the minimum path sum from top to bottom.

// For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

//? Example 1:
// Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
// Output: 11
// Explanation: The triangle looks like:
//    2
//   3 4
//  6 5 7
// 4 1 8 3
// The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).

//? Example 2:
// Input: triangle = [[-10]]
// Output: -10

//? Constraints:
// 1 <= triangle.length <= 200
// triangle[0].length == 1
// triangle[i].length == triangle[i - 1].length + 1
// -104 <= triangle[i][j] <= 104

//? Thought Process:
// Kind of similar problem to minimum path sum.
// Just it is not a proper grid but a triangle.
// Src is (0, 0) but destination is not fixed it can be any index from the last row. So we write linear kind of recursion from top to bottom.
// Where dp[i][j] = Minimum path sum started from (0, 0) till the current cell (i, j);

//? Code: (Top Down)
var minimumTotal = function (triangle) {
  let n = triangle.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(undefined));

  const solve = (row, col) => {
    if (row === n - 1) {
      return triangle[row][col];
    }

    if (dp[row][col] !== undefined) {
      return dp[row][col];
    }

    return (dp[row][col] =
      triangle[row][col] +
      Math.min(solve(row + 1, col), solve(row + 1, col + 1)));
  };

  return solve(0, 0);
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m) for dp and O(n + m) for recursion stack
// Which boils down to O(n * m)

//? Code: (Bottom Up)
var minimumTotal = function (triangle) {
  let n = triangle.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(Infinity));

  //* Initialization
  dp[0][0] = triangle[0][0];
  for (let i = 1; i < n; i = i + 1) {
    dp[i][0] = dp[i - 1][0] + triangle[i][0];
  }

  //* DP Fill
  for (let i = 1; i < n; i = i + 1) {
    for (let j = 1; j <= i; j = j + 1) {
      dp[i][j] = triangle[i][j] + Math.min(dp[i - 1][j], dp[i - 1][j - 1]);
    }
  }

  return Math.min(...dp[n - 1]);
};
//* dp[i][j] = minimum path sum from the top (0,0) to triangle[i][j].

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)
