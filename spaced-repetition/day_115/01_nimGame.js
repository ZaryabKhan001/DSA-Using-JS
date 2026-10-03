//? LeetCode #292
//? Nim Game

// You are playing the following Nim Game with your friend:

// Initially, there is a heap of stones on the table.
// You and your friend will alternate taking turns, and you go first.
// On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.
// The one who removes the last stone is the winner.
// Given n, the number of stones in the heap, return true if you can win the game assuming both you and your friend play optimally, otherwise return false.

//? Example 1:
// Input: n = 4
// Output: false
// Explanation: These are the possible outcomes:
// 1. You remove 1 stone. Your friend removes 3 stones, including the last stone. Your friend wins.
// 2. You remove 2 stones. Your friend removes 2 stones, including the last stone. Your friend wins.
// 3. You remove 3 stones. Your friend removes the last stone. Your friend wins.
// In all outcomes, your friend wins.

//? Example 2:
// Input: n = 1
// Output: true

//? Example 3:
// Input: n = 2
// Output: true

//? Constraints:
// 1 <= n <= 231 - 1

//? Thought Process:
// When we think properly, we can see that we have choices to remove 1, 2 or 3 stones.
// Our main target is to make sure we can give failure state to our opponent. If we can give failure state to our opponent, we will win the game.
// If we can start the game, for n = 1, 2, 3, we can win the game. But for n = 4
// if we use 1, 2, 3 removals n becomes 3, 2, 1 respectively. In all cases, our opponent can win the game. So we can say that for n = 4, we will lose the game.
// After solving for n = 5, 6, 7, we can see that we can win the game. But for n = 8, we will lose the game. So we can say that if n is a multiple of 4, we will lose the game. Otherwise, we will win the game.

//? Code:
var canWinNim = function (n) {
    return n % 4 !== 0;
};

//? Time Complexity: O(1)
//? Space Complexity: O(1)
