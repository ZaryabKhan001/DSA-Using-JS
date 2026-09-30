//? LeetCode #741
//? Cherry Pickup

// You are given an n x n grid representing a field of cherries, each cell is one of three possible integers.

// 0 means the cell is empty, so you can pass through,
// 1 means the cell contains a cherry that you can pick up and pass through, or
// -1 means the cell contains a thorn that blocks your way.
// Return the maximum number of cherries you can collect by following the rules below:

// Starting at the position (0, 0) and reaching (n - 1, n - 1) by moving right or down through valid path cells (cells with value 0 or 1).
// After reaching (n - 1, n - 1), returning to (0, 0) by moving left or up through valid path cells.
// When passing through a path cell containing a cherry, you pick it up, and the cell becomes an empty cell 0.
// If there is no valid path between (0, 0) and (n - 1, n - 1), then no cherries can be collected.

//? Example 1:
// Input: grid = [[0,1,-1],[1,0,-1],[1,1,1]]
// Output: 5
// Explanation: The player started at (0, 0) and went down, down, right right to reach (2, 2).
// 4 cherries were picked up during this single trip, and the matrix becomes [[0,1,-1],[0,0,-1],[0,0,0]].
// Then, the player went left, up, up, left to return home, picking up one more cherry.
// The total number of cherries picked up is 5, and this is the maximum possible.

//? Example 2:
// Input: grid = [[1,1,-1],[1,-1,1],[-1,1,1]]
// Output: 0

//? Constraints:
// n == grid.length
// n == grid[i].length
// 1 <= n <= 50
// grid[i][j] is -1, 0, or 1.
// grid[0][0] != -1
// grid[n - 1][n - 1] != -1

//? Thought Process:
// 1. There are TWO trips.
// First:  start → end
// Second: end → start

// 2. So my first thought is:
// Can I use 2 DFS?
// One DFS for trip 1 and one DFS for trip 2.

// 3. But these two trips are NOT independent.
// Trip 2 depends on what trip 1 already collected.

// 4. Example:
// If trip 1 collects cherry at (1,1),
// then trip 2 cannot collect that cherry again.

// 5. So I cannot simply do:
// best trip 1 + best trip 2.

// 6. Because the "best" trip 1 may remove cherries
// that are very useful for trip 2.

// 7. Okay, then maybe I should try both trips together.

// 8. But one trip goes:
// start → end
// and the other goes:
// end → start.

// 9. Having DFS moving in opposite directions makes
// synchronization difficult.

// 10. Also, I still need to know which cells
// the first trip has already collected.

// 11. Then I notice:
// A path from start → end can be reversed.

// 12. Example:
// start → A → B → end
// reversed:
// end → B → A → start

// 13. So instead of thinking about the second trip
// as end → start,
// I can look at it backwards as start → end.

// 14. Now I have TWO DFS paths:
// Person 1: start → end
// Person 2: start → end

// 15. Both move in the SAME direction.

// 16. At every level, both persons take ONE move.

// 17. But their choices can be different.

// Person 1: ↓
// Person 2: →

// or

// Person 1: →
// Person 2: ↓

// or both can choose ↓
// or both can choose →

// 18. So at every level there are 4 combinations
// of choices.

// 19. This is important because we are NOT saying:
// "Person 1 always goes down first"
// and
// "Person 2 always goes right first."

// 20. They independently choose their best next move.

// 21. Now both persons have taken the SAME number of steps.

// 22. Therefore I can know exactly where both persons are.

// 23. If both are on different cells:
// collect both cherries.

// 24. If both are on the SAME cell:
// collect that cherry only ONCE.

// 25. This solves the problem of double counting.

// 26. So the main idea is:
// TWO paths → same direction → same level → different choices.

// 27. Then DP remembers the result for those two positions.

// 28. The important interview thought is:
// "Can I reverse the second trip and make both trips
// start from the same place?"

// 29. Once I do that, the problem becomes:
// "Two persons are walking from start to end.
// What is the maximum cherries they can collect?"

// 30. That is why the 2-person DFS + DP idea works.

//? Code:
var cherryPickup = function (grid) {
  const n = grid.length;
  let map = new Map();

  const solve = (row1, col1, row2, col2) => {
    // Out of bounds
    if (
      row1 < 0 ||
      row1 >= n ||
      col1 < 0 ||
      col1 >= n ||
      row2 < 0 ||
      row2 >= n ||
      col2 < 0 ||
      col2 >= n
    ) {
      return -Infinity;
    }

    // Thorn
    if (grid[row1][col1] === -1 || grid[row2][col2] === -1) {
      return -Infinity;
    }

    // Current cherries
    let cherries = grid[row1][col1];

    // Same cell -> count only once
    if (row1 !== row2 || col1 !== col2) {
      cherries += grid[row2][col2];
    }

    // Reached destination
    if (row1 === n - 1 && col1 === n - 1 && row2 === n - 1 && col2 === n - 1) {
      return cherries;
    }

    // State already calculated
    let key = `${row1}#${col1}#${row2}#${col2}`;

    if (map.has(key)) {
      return map.get(key);
    }

    let maxFuture = -Infinity;

    // Person 1:
    // right OR down
    //
    // Person 2:
    // right OR down
    const moves = [
      [1, 0],
      [0, 1],
    ];

    for (let [dr1, dc1] of moves) {
      for (let [dr2, dc2] of moves) {
        let newRow1 = row1 + dr1;
        let newCol1 = col1 + dc1;
        let newRow2 = row2 + dr2;
        let newCol2 = col2 + dc2;

        maxFuture = Math.max(
          maxFuture,
          solve(newRow1, newCol1, newRow2, newCol2),
        );
      }
    }

    map.set(key, cherries + maxFuture);
    return cherries + maxFuture;
  };

  let answer = solve(0, 0, 0, 0);
  return answer === -Infinity ? 0 : answer;
};

//? Time Complexity: O(R^2 * C^2)
//? Space Complexity: O(R^2 * C^2)