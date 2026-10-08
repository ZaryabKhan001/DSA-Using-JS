//? LeetCode #1406
//? Stone Game III

// Alice and Bob continue their games with piles of stones. There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array stoneValue.

// Alice and Bob take turns, with Alice starting first. On each player's turn, that player can take 1, 2, or 3 stones from the first remaining stones in the row.

// The score of each player is the sum of the values of the stones taken. The score of each player is 0 initially.

// The objective of the game is to end with the highest score, and the winner is the player with the highest score and there could be a tie. The game continues until all the stones have been taken.

// Assume Alice and Bob play optimally.

// Return "Alice" if Alice will win, "Bob" if Bob will win, or "Tie" if they will end the game with the same score.

//? Example 1:
// Input: stoneValue = [1,2,3,7]
// Output: "Bob"
// Explanation: Alice will always lose. Her best move will be to take three piles and the score become 6. Now the score of Bob is 7 and Bob wins.

//? Example 2:
// Input: stoneValue = [1,2,3,-9]
// Output: "Alice"
// Explanation: Alice must choose all the three piles at the first move to win and leave Bob with negative score.
// If Alice chooses one pile her score will be 1 and the next move Bob's score becomes 5. In the next move, Alice will take the pile with value = -9 and lose.
// If Alice chooses two piles her score will be 3 and the next move Bob's score becomes 3. In the next move, Alice will take the pile with value = -9 and also lose.
// Remember that both play optimally so here Alice will choose the scenario that makes her win.

//? Example 3:
// Input: stoneValue = [1,2,3,6]
// Output: "Tie"
// Explanation: Alice cannot win this game. She can end the game in a draw if she decided to choose all the first three piles, otherwise she will lose.

//? Constraints:
// 1 <= stoneValue.length <= 5 * 104
// -1000 <= stoneValue[i] <= 1000

//? Thought Process:
// Main idea:
// solve(i) = maximum score difference (Current Player - Other Player)
// that the current player can achieve starting from index i.

// dp[i] stores the answer of solve(i).
// It means: "If it is my turn and piles start from i,
// what is the maximum advantage I can get over the other player?"

// At every turn, current player can take 1, 2, or 3 piles.

// Choice 1:
// Take 1 pile.
// I get piles[i].
// Then opponent gets their best possible difference from i + 1.
// So my final difference = my coins - opponent's difference.

// choice1 = piles[i] - solve(i + 1);

// Choice 2:
// Take 2 piles.
// I get piles[i] + piles[i + 1].
// Then opponent starts from i + 2.

// choice2 = piles[i] + piles[i + 1] - solve(i + 2);

// Choice 3:
// Take 3 piles.
// I get piles[i] + piles[i + 1] + piles[i + 2].
// Then opponent starts from i + 3.

// choice3 = piles[i] + piles[i + 1] + piles[i + 2] - solve(i + 3);

// Why do we subtract solve()?
// Because after my move, it becomes opponent's turn.
// solve() tells us the opponent's best advantage.
// So their advantage becomes my disadvantage.

// We choose MAX because current player will always
// choose the move that gives the best final advantage.

// dp[i] = max(choice1, choice2, choice3)

// Base case:
// If i reaches n, there are no piles left.
// So there is no score difference.

// solve(n) = 0;

// Finally:
// solve(0) gives:
// Alice's score - Bob's score

// difference > 0  -> Alice wins
// difference < 0  -> Bob wins
// difference = 0  -> Tie

// Important pattern to remember:
// "My score - opponent's best score"

// This is a very useful pattern for two-player
// Game Strategy DP problems.

//? Code: 
var stoneGameIII = function (piles) {
    const n = piles.length;
    const dp = new Array(n).fill(undefined);

    const solve = (i) => {
        if (i === n) {
            return 0;
        }

        if (dp[i] !== undefined) {
            return dp[i];
        }

        let choice1 = piles[i] - solve(i + 1);
        let choice2 = -Infinity;
        if (i + 1 < n) {
            choice2 = piles[i] + piles[i + 1] - solve(i + 2);
        }
        let choice3 = -Infinity;
        if (i + 2 < n) {
            choice3 = piles[i] + piles[i + 1] + piles[i + 2] - solve(i + 3);
        }

        return dp[i] = Math.max(choice1, choice2, choice3);
    };

    const difference = solve(0);
    if (difference > 0) {
        return 'Alice';
    }
    else if (difference < 0) {
        return 'Bob';
    }
    else {
        return 'Tie';
    }
};

//? Time Complexity: O(n) unique dp states are solved, and under each call work is constant.
//? Space Complexity: O(n) dp array