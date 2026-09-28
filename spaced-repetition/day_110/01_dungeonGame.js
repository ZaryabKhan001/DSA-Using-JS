//? LeetCode #174
//? Dungeon Game

// The demons had captured the princess and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of m x n rooms laid out in a 2D grid. Our valiant knight was initially positioned in the top-left room and must fight his way through dungeon to rescue the princess.

// The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

// Some of the rooms are guarded by demons (represented by negative integers), so the knight loses health upon entering these rooms; other rooms are either empty (represented as 0) or contain magic orbs that increase the knight's health (represented by positive integers).

// To reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

// Return the knight's minimum initial health so that he can rescue the princess.

// Note that any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.

//? Example 1:
// Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
// Output: 7
// Explanation: The initial health of the knight must be at least 7 if he follows the optimal path: RIGHT-> RIGHT -> DOWN -> DOWN.

//? Example 2:
// Input: dungeon = [[0]]
// Output: 1

//? Constraints:
// m == dungeon.length
// n == dungeon[i].length
// 1 <= m, n <= 200
// -1000 <= dungeon[i][j] <= 1000

//? Thought Process:
// We need to know the minimum health required by a knight to start from (0, 0) and go to (m - 1, n - 1) alive to safe princess.
// The brute force way to think about the solution is start from health = 1 and solve this then 2, 3, 4 and goes on. Iteratively solve the question for different different healths and the first health where we reach the princceses is out answer.
// Now becuase this takes alot alot of time. So we just thinks about the implementation of bianry search on answer because we know the answer range.
// So, we appkied BS on answer. This is a little optimized solution of brute force. But it is still not good because it is taking almost O(log high * (n * m * h)) this much time complexity.

//? Code:
const canSurvive = (health, dungeon) => {
  const n = dungeon.length;
  const m = dungeon[0].length;
  const dp = new Map();

  const solve = (i, j, health) => {
    health += dungeon[i][j];

    if (health <= 0) return false;

    if (i === n - 1 && j === m - 1) return true;

    let key = `${i}#${j}#${health}`;
    if (dp.has(key)) {
      return dp.get(key);
    }

    const down = i < n - 1 && solve(i + 1, j, health);
    const right = j < m - 1 && solve(i, j + 1, health);

    const result = down || right;
    dp.set(health, result);

    return result;
  };

  return solve(0, 0, health);
};

var calculateMinimumHP = function (dungeon) {
  let low = 1;
  let high = 4 * 1e7;

  let result;
  while (low <= high) {
    let mid = Math.floor((high - low) / 2) + low;

    if (canSurvive(mid, dungeon)) {
      result = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return result;
};

//? Time Complexity: O(log high * (n * m * h))
//? Space Complexity: O(n * m * h) for storing unique states

// Let's change the thinking.

// We know that from any cell [i][j], we can only move:
// 1. Right  -> [i][j + 1]
// 2. Down   -> [i + 1][j]

// So instead of asking:

// "How much health do I need to reach [i][j]?"

// We ask a different question:

// "If I am standing at [i][j], how much health do I need
//  to successfully reach the destination?"

// Now [i][j] has two choices:
//
//                  [i][j]
//                 /      \
//             down       right
//
// So let's ask both cells:

// "How much health do you need when I enter you?"

// const down = solve(i + 1, j);
// const right = solve(i, j + 1);

// Both cells give us an answer.
// We don't care which path they take internally.
// We only care about the minimum health they require.

// const next = Math.min(down, right);

// Now we have selected the next cell that demands
// the smallest health.

// But there is one more thing:

// What is the effect of my CURRENT cell?

// If current cell is negative:

// Example:
// current = -3
// next needs = 5

// I need:

// currentHealth - 3 >= 5

// Therefore:

// currentHealth = 8

// So I tell my previous cell:

// "You need 8 health to enter me."

// If current cell is positive:

// Example:
// current = +3
// next needs = 5

// currentHealth + 3 >= 5

// Therefore:

// currentHealth = 2

// So I tell my previous cell:

// "You only need 2 health to enter me.
//  I'll give you the remaining +3."

// But health can NEVER become 0.

// Example:

// current = +10
// next needs = 5

// currentHealth + 10 >= 5

// Technically currentHealth could be -5,
// but negative health makes no sense.

// Even 0 health is not allowed.

// Therefore the minimum is always 1.

// return Math.max(1, next - dungeon[i][j]);

// Finally:

// The destination is a special case.

// At the destination, we don't have another cell to ask.
// We only need enough health to survive that cell.

// If destination = -5:
//
//     need 6 health

// If destination = +5:
//
//     need 1 health

// Therefore:

// Math.max(1, 1 - dungeon[i][j])

//? Code: (Top Down)
var calculateMinimumHP = function (dungeon) {
  const n = dungeon.length;
  const m = dungeon[0].length;

  const dp = Array.from({ length: n }, () => new Array(m).fill(undefined));

  const solve = (i, j) => {
    if (i >= n || j >= m) {
      return Infinity;
    }

    if (i === n - 1 && j === m - 1) {
      return Math.max(1, 1 - dungeon[i][j]);
    }

    if (dp[i][j] !== undefined) {
      return dp[i][j];
    }

    const down = solve(i + 1, j);
    const right = solve(i, j + 1);

    const next = Math.min(down, right);
    const result = next - dungeon[i][j];

    return (dp[i][j] = result <= 0 ? 1 : result);
  };

  return solve(0, 0);
};

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)

//? Code: (Bottom Up)
var calculateMinimumHP = function (dungeon) {
  const n = dungeon.length;
  const m = dungeon[0].length;

  const dp = Array.from({ length: n }, () => new Array(m).fill(undefined));

  for (let i = n - 1; i >= 0; i = i - 1) {
    for (let j = m - 1; j >= 0; j = j - 1) {
      if (i === n - 1 && j === m - 1) {
        if (dungeon[i][j] > 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = Math.abs(dungeon[i][j]) + 1;
        }
      } else {
        let right = dp[i][j + 1] ?? Infinity;
        let bottom = dp[i + 1]?.[j] ?? Infinity;

        let next = Math.min(right, bottom);
        let result = next - dungeon[i][j];
        dp[i][j] = result <= 0 ? 1 : result;
      }
    }
  }

  return dp[0][0];
};

// If the row exists but the column is out of bounds, JavaScript returns undefined.
// If the row itself doesn't exist, accessing [j] causes an error, so use optional chaining.
// dp[i + 1]?.[j];

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)
