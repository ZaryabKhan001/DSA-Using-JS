//? Who will receive the Death Note?

// Light and EL are fighting against each other for the Death Note. Now they play a game to decide who will receive the Death Note.

// They have K grids each of dimensions N × M. Initially, Death Note is placed on every grid's initial cell i.e. (1,1).

// In one turn, a player can choose any grid and move the Death Note from its position (i,j) in that grid to one of the following cells:

//  (i+1, j)
//  (i+2, j)
//  (i, j+1)
//  (i, j+2)
//  (i+1, j+1)
//  (i+2, j+2)

// The game ends when all the Death Notes reach the ending cell of their grid (N × M).

// The Player who can not make a move will not receive the Death Note. Since both of them want the Death Note they play optimally.

// Help Ryuk the Shinigami to predict who will receive the Death Note if Light moves first and they make moves alternatively.

// Light or EL?

// Input Format:
// The first line of the input contains a single integer T denoting the number of test cases. The description of T test cases is as follows:

// The first line of each test case contains an integer K.
// Then follow K lines, each containing 2 integers Nᵢ and Mᵢ, the dimensions of the ith grid.

//? Approach 1:
// Calculate grundy numbers for each and every grid and at last xor them.
// Time complexity is O(n * m * k) for sure gives us TLE.

//? Approach 2:
// Because for each and every grid we are going to do same work. So why not only calculate grundy numbers for largest grid, max rows and for max cols. And for each and every smaller grid take reference from that precalculated grid.

//? Code:
// Sprague-Grundy Theorem

function solve(testCases) {
  // --------------------------------------------------
  // 1. Find maximum N and M among all grids
  // --------------------------------------------------

  let maxN = 0;
  let maxM = 0;

  for (const grids of testCases) {
    for (const [n, m] of grids) {
      maxN = Math.max(maxN, n);
      maxM = Math.max(maxM, m);
    }
  }

  // --------------------------------------------------
  // 2. Calculate Grundy numbers only once
  //    for the maximum required grid
  // --------------------------------------------------

  const grundy = Array.from({ length: maxN + 1 }, () =>
    new Array(maxM + 1).fill(0),
  );

  /*
        From (i, j), possible moves are:

        (i + 1, j)
        (i + 2, j)
        (i, j + 1)
        (i, j + 2)
        (i + 1, j + 1)
        (i + 2, j + 2)
    */

  for (let i = maxN; i >= 1; i--) {
    for (let j = maxM; j >= 1; j--) {
      // (maxN, maxM) is the terminal state.
      if (i === maxN && j === maxM) {
        grundy[i][j] = 0;
        continue;
      }

      const reachable = [];

      // (i + 1, j)
      if (i + 1 <= maxN) {
        reachable.push(grundy[i + 1][j]);
      }

      // (i + 2, j)
      if (i + 2 <= maxN) {
        reachable.push(grundy[i + 2][j]);
      }

      // (i, j + 1)
      if (j + 1 <= maxM) {
        reachable.push(grundy[i][j + 1]);
      }

      // (i, j + 2)
      if (j + 2 <= maxM) {
        reachable.push(grundy[i][j + 2]);
      }

      // (i + 1, j + 1)
      if (i + 1 <= maxN && j + 1 <= maxM) {
        reachable.push(grundy[i + 1][j + 1]);
      }

      // (i + 2, j + 2)
      if (i + 2 <= maxN && j + 2 <= maxM) {
        reachable.push(grundy[i + 2][j + 2]);
      }

      // ------------------------------------------
      // Calculate MEX
      // ------------------------------------------

      const seen = new Set(reachable);

      let mex = 0;

      while (seen.has(mex)) {
        mex++;
      }

      grundy[i][j] = mex;
    }
  }

  // --------------------------------------------------
  // 3. Solve each test case using the SAME
  //    precomputed Grundy table
  // --------------------------------------------------

  const answers = [];

  for (const grids of testCases) {
    let xorValue = 0;

    for (const [n, m] of grids) {
      // Every grid starts at (1, 1)
      xorValue ^= grundy[n][m];
    }

    if (xorValue !== 0) {
      answers.push("Light");
    } else {
      answers.push("EL");
    }
  }

  return answers;
}

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)

//? Approach 03:
// We do not even need to calculate grundy numbers.
// Based on our observation, grundy numbers can go only 0, 1, 2.
// So, we have developed the formula of finding the complete grid grundy number. (row + col - 2) % 3;

// For any grid of n*m => (n + m - 2) % 3.
// It is not that much intutional but yes, it is also a solution.

const solve = (grids) => {
  let ans = 0;

  for (let grid of grids) {
    for (let [n, m] of grid) {
      ans = ans ^ ((n + m - 2) % 3);
    }
  }

  return ans;
};

//? Time Complexity: O(k)
//? Space Complexity: O(1)