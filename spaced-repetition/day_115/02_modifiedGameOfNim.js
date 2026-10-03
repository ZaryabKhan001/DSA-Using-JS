//* Game of Nim is very old mathematical game. Played from ancient times. It is a two player game. There are n piles of stones. Each pile has some stones in it. Players take turns to remove stones from the piles. A player can remove any number of stones from a single pile in his turn. The player who removes the last stone wins the game.
// If player removes no strone, he will lose the game.

//? There are 2 ways to solve this problem. One is standard way and the second is Sprague Grundy Theorem.

//? Standard way:
// XOR of all piles is 0, then player 1 will lose the game. Otherwise, player 1 will win the game.

// Becuase our goal is to find the winner of the game, we can use the standard way to solve this problem. We will calculate the XOR of all piles and check if it is 0 or not. If it is 0, player 1 will lose the game, otherwise player 1 will win the game.

//? Why:
// When piles goes empty, their sum xor is 0.
// The reason behind this is that if the XOR of all piles is 0, then player 1 cannot make a move that will change the XOR to a non-zero value. Therefore, player 2 can always respond in such a way that the XOR remains 0 after player 1's turn, leading to player 1's eventual loss. Conversely, if the XOR is non-zero, player 1 can always make a move that results in a new configuration where the XOR is 0 for player 2, giving player 1 a winning strategy.

//? Code:
var canWinNim = function (piles) {
  let xor = 0;
  for (let pile of piles) {
    xor ^= pile;
  }
  return xor !== 0;
};

//? Time Complexity: O(n) where n is the number of piles
//? Space Complexity: O(1)

//? Sprague Grundy Theorem:
// Grundy(complex_game) = Grundy(sub_game_1) XOR Grundy(sub_game_2) XOR ... XOR Grundy(sub_game_n);

// So, let's calculaye grundy number of simple game of nim.
// Grundy(0) = mex({}) = 0
// Grundy(1) = mex({Grundy(0)}) = 1
// Grundy(2) = mex({Grundy(0), Grundy(1)}) = 2
// Grundy(3) = mex({Grundy(0), Grundy(1), Grundy(2)}) = 3
// Grundy(n) = mex({Grundy(0), Grundy(1), ..., Grundy(n-1)}) = n

// So, grundy number of simple game of nim is equal to number of stones in the pile. Therefore, we can use the same approach as above to find the winner of the game.

//* If piles are [3, 4, 5], then the grundy number of the game is Grundy(3) XOR Grundy(4) XOR Grundy(5) = 3 XOR 4 XOR 5 = 2. Since the grundy number is not equal to 0, player 1 will win the game.

//? Now let's talk about the modified game of nim.
//? Modified Game of Nim (gfg)
// Difficulty: MediumAccuracy: 57.13%Submissions: 33K+Points: 4
// Given an array arr[]. There are two players player1 and player2. A player can choose any of element from an array and remove it.

// If the bitwise XOR of all remaining elements equals 0 after removal of the selected element, then that player loses.

// Find the winner if player1 starts the game and both players play optimally.

// Return 1 if player1 wins, else return 2.

// Note: If the XOR of the array is initially 0, then player1 is considered as winner.

//? Examples:
// Input: arr[] = [3, 3, 2]
// Output: 2
// Explanation: Optimal removal of values are 3, 2, 3 sequentially. Then the array is empty. So player2 wins.

// Input: arr[] = [3, 3]
// Output: 1
// Explanation: Since the XOR of an array is already 0, player1 wins.

//? Constraints:
// 1 ≤ arr.size() ≤ 105
// 0 ≤ arr[i] ≤ 109

//? Thought Process:
// First of all we have to calculate the xorSum of the array. If it is already 0, player 1 is the winner.
// If xorSum is not equal to zero. Then we have to check the length of array.
// If length is odd, then starting from player one, ends also happen at player one, so player2 wins.
// Same logic for even no of length as well.

//? Code:
class Solution {
  findWinner(arr) {
    let n = arr.length;

    let xorSum = 0;
    for (let i = 0; i < n; i = i + 1) {
      xorSum = xorSum ^ arr[i];
    }

    if (xorSum == 0) {
      return 1;
    }

    if (n % 2 == 0) {
      return 1;
    } else {
      return 2;
    }
  }
}

//? Time Complexity: O(n)
//? Space Complexity: O(1)
