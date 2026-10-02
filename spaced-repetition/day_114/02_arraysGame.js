//? Array's Game (gfg)

// Given an array arr[] of n integers, two players, A and B, play a game alternately, with A making the first move.

// In each turn, a player can choose any element except the current maximum element and increase it by 1.
// The game continues until all elements of the array become equal.
// The player whose move makes all the elements equal is declared the winner.
// If the given array's elements are already equal, no moves can be made and the game ends in a draw.
// Return: 1 if player A wins. 2 if player B wins. 0 if the game is a draw.

//? Examples:
// Input: arr[] = [1, 2]
// Output: 1
// Explanation: The first player adds 1 to the first number making it 2. The array becomes equal, so he is the winner.

// Input: arr[] = [2, 2, 2]
// Output: 0
// Explanation: No moves can be made as all the elements are already maximum and numbers cannot be added to the maximum numbers.

//? Constraints:
// 1 ≤ arr.size() ≤ 106
// 1 ≤ arr[i] ≤ 109

//? Thought Process:
// This problem is very simple. 
// Just understand the problem, that each player can choose any element except the current maximum element and increase it by 1.
// And the game continues until all elements of the array become equal.
// So definitely all elements become equal to the maximum element of the array at some time.
// So we can find the maximum element of the array and then find the number of moves required to make all elements equal to the maximum element.
// And based on the number of moves, we can find the winner of the game.
// If moves is 0, then the game is a draw. If moves is even, then player B wins. because two players are playing alternately and player B will make the last move. 
// If moves is odd, then player A wins.

//? Code:
class Solution {
	arrayGame(arr) {
		let n = arr.length;
		let maxElement = 0;
		for (let i = 0; i < n; i = i + 1) {
			maxElement = Math.max(maxElement, arr[i]);
		};
		
		let moves = 0;
		for (let i = 0; i < n; i = i + 1) {
			moves = moves + (maxElement - arr[i]);
		};
		
		if (moves == 0) {
			return 0;
		}
		else if (moves % 2 == 0) {
			return 2;
		}
		else {
			return 1;
		};
	}
};

//? Time Complexity: O(n) where n is the size of the array.
//? Space Complexity: O(1) as we are using constant space.