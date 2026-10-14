//? LeetCode #1140
//? Stone Game II

// Alice and Bob continue their games with piles of stones. There are a number of piles arranged in a row, and each pile has a positive integer number of stones piles[i]. The objective of the game is to end with the most stones.

// Alice and Bob take turns, with Alice starting first.

// On each player's turn, that player can take all the stones in the first X remaining piles, where 1 <= X <= 2M. Then, we set M = max(M, X). Initially, M = 1.

// The game continues until all the stones have been taken.

// Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.

//? Example 1:
// Input: piles = [2,7,9,4,4]
// Output: 10

//? Explanation:
// If Alice takes one pile at the beginning, Bob takes two piles, then Alice takes 2 piles again. Alice can get 2 + 4 + 4 = 10 stones in total.
// If Alice takes two piles at the beginning, then Bob can take all three piles left. In this case, Alice get 2 + 7 = 9 stones in total.
// So we return 10 since it's larger.

//? Example 2:
// Input: piles = [1,2,3,4,5,100]
// Output: 104

//? Constraints:
// 1 <= piles.length <= 100
// 1 <= piles[i] <= 104

//? Thought Process:
// This is a Game Strategy + DP problem.
// Alice and Bob both play optimally.
// We need to find the maximum stones Alice can collect.
// The main difference from simple Game Strategy problems:
// the allowed moves are not fixed.
// We can take 1 to 2 * M piles.
// After taking X piles, M changes to max(M, X).
// So our future choices depend on M.
// Therefore, i alone is not enough to describe the state.

// State = (i, M)

// i = current pile/index.
// M = current limit that decides how many piles we can take.

// dp[i][M] = maximum stones current player can collect
// starting from index i with current M.

// We try every X from 1 to 2 * M.

// taken = stones we take right now.
// Then the opponent plays on the remaining piles.

// opponent = maximum stones opponent can collect.

// Remaining stones = total - taken.
// Stones we get later = total - taken - opponent.

// So our total for this choice:
// taken + (total - taken - opponent)

// Try every X and choose the maximum result.

// If 2 * M >= remaining piles,
// we can take all remaining piles and end the game.
// So we directly return total.

// M can never become greater than n.
// M changes using X, and X cannot be greater than
// the number of available piles.

// Therefore, useful M values are from 1 to n.

// DP is useful because the same (i, M) state
// can be reached through different choices.

// Without DP, we calculate the same states again and again.

// There are O(n²) states.
// Each state can try up to O(n) choices.

//? Code:
var stoneGameII = function (piles) {
  let n = piles.length;
  let map = new Map();

  const solve = (i, M, totalCoins) => {
    if (i >= n) {
      return 0;
    }

    let key = `${i}_${M}`;

    if (map.has(key)) {
      return map.get(key);
    }

    if (2 * M >= n - i) {
      return totalCoins;
    }

    let taken = 0;
    let best = 0;

    for (let X = 1; X <= 2 * M; X++) {
      taken += piles[i + X - 1];

      let opponent = solve(i + X, Math.max(M, X), totalCoins - taken);

      let currentMax = totalCoins - opponent;

      best = Math.max(best, currentMax);
    }

    map.set(key, best);
    return best;
  };

  let total = piles.reduce((sum, curr) => sum + curr, 0);

  return solve(0, 1, total);
};

//? Time Complexity: O(n³)
//? Space Complexity: O(n²) for DP + O(n) recursion stack.

/*
I was confused about why totalCoins is not needed in the memoization key.
But totalCoins is determined by index i because the remaining piles are always the same for a given index.
So, if i is the same, totalCoins will also be the same.
Therefore, we only need i and M to uniquely identify the DP state.
*/