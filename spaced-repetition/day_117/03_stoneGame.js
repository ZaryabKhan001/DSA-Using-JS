//? LeetCode #877
//? Stone Game

// Alice and Bob play a game with piles of stones. There are an even number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].

// The objective of the game is to end with the most stones. The total number of stones across all the piles is odd, so there are no ties.

// Alice and Bob take turns, with Alice starting first. Each turn, a player takes the entire pile of stones either from the beginning or from the end of the row. This continues until there are no more piles left, at which point the person with the most stones wins.

// Assuming Alice and Bob play optimally, return true if Alice wins the game, or false if Bob wins.

//? Example 1:
// Input: piles = [5,3,4,5]
// Output: true

//? Explanation:
// Alice starts first, and can only take the first 5 or the last 5.
// Say she takes the first 5, so that the row becomes [3, 4, 5].
// If Bob takes 3, then the board is [4, 5], and Alice takes 5 to win with 10 points.
// If Bob takes the last 5, then the board is [3, 4], and Alice takes 4 to win with 9 points.
// This demonstrated that taking the first 5 was a winning move for Alice, so we return true.

//? Example 2:
// Input: piles = [3,7,2,3]
// Output: true

//? Constraints:
// 2 <= piles.length <= 500
// piles.length is even.
// 1 <= piles[i] <= 500
// sum(piles[i]) is odd.

//? Thought Process:
//* Main idea
// There are 2 players and BOTH play optimally.
// I want to maximize my score.
// The opponent also wants to maximize their score.
// So from my perspective:

// MY TURN       → MAX
// OPPONENT TURN → MIN

//* Why MIN?
// Suppose I choose the left element.
// Now it is the opponent's turn.
// The opponent will choose the move that is BEST FOR THEM.
// That means they will leave me with the WORST possible future result.
// Therefore, from my perspective, I take MIN.

// So:
// My choice → MAX
// Opponent's response → MIN

//* Why not Greedy?
// Greedy says:
// "Pick the biggest value right now."
// But in games, my current choice affects future choices.
// The opponent also makes optimal decisions.
// Therefore:
// Best current choice ≠ Best final result
// We need to consider the opponent's response before deciding.

//* General thought process
// 1. What choices do I have?
// 2. What happens after each choice?
// 3. What is the opponent's best response?
// 4. Assume the opponent will hurt my result as much as possible.
// 5. Choose the option that gives me the best final result.

//* Pattern (Called min-max strategy) (Prepare for the worst and hope fot the best.)
// MY CHOICE
// ↓
// OPPONENT'S BEST RESPONSE
// ↓
// Worst result for me → MIN
// ↓
// Choose best among my choices → MAX

// Therefore:
// MAX(
// my choice + MIN(opponent's responses)
// )

//* When to think about Min-Max?
// Think about it when:

// * There are 2 players.
// * Players take turns.
// * Both play optimally.
// * Each player's decision affects the other.
// * The problem asks for maximum guaranteed score / winner / optimal result.

// Easy memory:
// "I choose MAX, assuming the opponent chooses MIN for me."

//? Code:
var stoneGame = function (piles) {
    const n = piles.length;
    const totalSum = piles.reduce((sum, curr) => sum += curr);
    const dp = Array.from({ length: n }, () => new Array(n).fill(undefined));

    const solve = (i, j) => {
        if (i === j) {
            return piles[i];
        };
        if (i > j) {
            return 0;
        };

        if (dp[i][j] !== undefined) {
            return dp[i][j];
        };

        let choice1 = piles[i] + Math.min(solve(i + 2, j), solve(i + 1, j - 1));
        let choice2 = piles[j] + Math.min(solve(i + 1, j - 1), solve(i, j - 2));

        return dp[i][j] = Math.max(choice1, choice2);
    };

    const AliceCoinsCollection = solve(0, n - 1);
    const BobCoinsCollection = totalSum - AliceCoinsCollection;

    return AliceCoinsCollection > BobCoinsCollection;
};

//? Time Complexity: O(n * n)
//? Space Complexity: O(n * n)

//* Another way to write recursive code. Directly return the difference between person1 and person2.
var stoneGame = function (piles) {
    const n = piles.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(undefined));

    const solve = (i, j) => {
        if (i === j) {
            return piles[i];
        };
        if (i > j) {
            return 0;
        };

        if (dp[i][j] !== undefined) {
            return dp[i][j];
        };

        let choice1 = piles[i] - solve(i + 1, j)
        let choice2 = piles[j] - solve(i, j - 1);

        return dp[i][j] = Math.max(choice1, choice2);
    };

    const result = solve(0, n - 1);
    return result >= 0;
};

//? Time Complexity: O(n * n)
//? Space Complexity: O(n * n)

//* Mind Blowing Observation:
// Since the number of piles is always even, Alice can choose either all even-indexed or all odd-indexed piles.
// She can calculate both sums and choose the larger one.
// After her first choice, she can always maintain the same parity while responding.
// Therefore, Alice can always guarantee a win, so the answer is always true.

var stoneGame = function (piles) {
    return true;
};

//? Time Complexity: O(1)
//? Space Complexity: O(1)