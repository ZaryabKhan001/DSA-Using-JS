//? LeetCode #1463
//? Cherry Pickup II

// You are given a rows x cols matrix grid representing a field of cherries where grid[i][j] represents the number of cherries that you can collect from the (i, j) cell.

// You have two robots that can collect cherries for you:

// Robot #1 is located at the top-left corner (0, 0), and
// Robot #2 is located at the top-right corner (0, cols - 1).
// Return the maximum number of cherries collection using both robots by following the rules below:

// From a cell (i, j), robots can move to cell (i + 1, j - 1), (i + 1, j), or (i + 1, j + 1).
// When any robot passes through a cell, It picks up all cherries, and the cell becomes an empty cell.
// When both robots stay in the same cell, only one takes the cherries.
// Both robots cannot move outside of the grid at any moment.
// Both robots should reach the bottom row in grid.

//? Example 1:
// Input: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
// Output: 24
// Explanation: Path of robot #1 and #2 are described in color green and blue respectively.
// Cherries taken by Robot #1, (3 + 2 + 5 + 2) = 12.
// Cherries taken by Robot #2, (1 + 5 + 5 + 1) = 12.
// Total of cherries: 12 + 12 = 24.

//? Example 2:
// Input: grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]
// Output: 28
// Explanation: Path of robot #1 and #2 are described in color green and blue respectively.
// Cherries taken by Robot #1, (1 + 9 + 5 + 2) = 17.
// Cherries taken by Robot #2, (1 + 3 + 4 + 3) = 11.
// Total of cherries: 17 + 11 = 28.

//? Constraints:
// rows == grid.length
// cols == grid[i].length
// 2 <= rows, cols <= 70
// 0 <= grid[i][j] <= 100

//? Thought Process
// 1. We have 2 robots, so I need to keep track of both robot positions.
// 2. My state is solve(row, col1, col2).
// 3. At every row, both robots can move -1, 0, or +1.
// 4. So Robot 1 has 3 moves.
// 5. For each move of Robot 1, Robot 2 also has 3 moves.
// 6. Therefore, there are 3 × 3 = 9 possible combinations.
// 7. I need to try all 9 combinations.
// 8. For every combination, I go to the next row.
// 9. Each recursive call gives me the best cherries from that next position.
// 10. So I take the maximum of those 9 recursive answers.
// 11. Then I add the cherries collected at the current row.
// 12. If both robots are on the same cell, I count that cherry only once.
// 13. Base case is simple: when I reach the last row, just return the cherries collected there.
// 14. So the final answer is:
// 15. Current cherries + maximum of the 9 possible next moves.

// R times = O(9^R) R rows and 9 calls each time.
// This is a huge time complexity. So we have to apply memoization over here.

//* Results In: O(R × C²)

//? Code: (Top Down)
// DP State: Max no of cherries collected from row onwards, when robot1 is at col1 and robot2 is at col2.
var cherryPickup = function (grid) {
  let rows = grid.length;
  let cols = grid[0].length;
  let map = new Map();

  const solve = (row, col1, col2) => {
    // Out of bounds
    if (col1 < 0 || col1 >= cols || col2 < 0 || col2 >= cols) {
      return 0;
    }

    // Current row cherries
    let cherries = grid[row][col1] + grid[row][col2];

    // Same cell -> count only once
    if (col1 === col2) {
      cherries = cherries - grid[row][col2];
    }

    // Last row
    if (row === rows - 1) {
      return cherries;
    }

    //* Visiting map to see, if this state is already computed or not.
    let key = `${row}#${col1}#${col2}`;
    if (map.has(key)) {
      return map.get(key);
    }

    let maxFuture = 0;
    // 9 possible movements
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let newCol1 = col1 + i;
        let newCol2 = col2 + j;

        maxFuture = Math.max(maxFuture, solve(row + 1, newCol1, newCol2));
      }
    }
    map.set(key, cherries + maxFuture);
    return cherries + maxFuture;
  };

  return solve(0, 0, cols - 1);
};

//? Time Complexity: O(R x C^2)
//? Space Complexity: O(R x C^2) for unique dp states storage and O(R) for recursive stack, which is obviously negligble.

//? Code: (Bottom Up)
// DP State: Max no of cherries collected from row onwards, when robot1 is at col1 and robot2 is at col2.
// DP State remains the same, just direction of calculating it is changed.

var cherryPickup = function (grid) {
    let rows = grid.length;
    let cols = grid[0].length;

    // dp[row][col1][col2]
    let dp = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () =>
            Array(cols).fill(0)
        )
    );

    // Base case: last row
    for (let col1 = 0; col1 < cols; col1++) {
        for (let col2 = 0; col2 < cols; col2++) {

            let cherries = grid[rows - 1][col1] + grid[rows - 1][col2];

            if (col1 === col2) {
                cherries = cherries - grid[rows - 1][col2];
            }

            dp[rows - 1][col1][col2] = cherries;
        }
    }

    // Build from bottom to top
    for (let row = rows - 2; row >= 0; row--) {

        for (let col1 = 0; col1 < cols; col1++) {
            for (let col2 = 0; col2 < cols; col2++) {

                let cherries = grid[row][col1] + grid[row][col2];

                if (col1 === col2) {
                    cherries = cherries - grid[row][col2];
                }

                let maxFuture = 0;

                // 9 possible moves
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {

                        let newCol1 = col1 + i;
                        let newCol2 = col2 + j;

                        if (
                            newCol1 >= 0 &&
                            newCol1 < cols &&
                            newCol2 >= 0 &&
                            newCol2 < cols
                        ) {
                            maxFuture = Math.max(
                                maxFuture,
                                dp[row + 1][newCol1][newCol2]
                            );
                        }
                    }
                }

                dp[row][col1][col2] = cherries + maxFuture;
            }
        }
    }

    return dp[0][0][cols - 1];
};

//? Time Complexity: O(R x C^2)
//? Space Complexity: O(R x C^2) for unique dp states storage.