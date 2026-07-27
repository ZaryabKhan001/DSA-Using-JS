//? Knight Walk (gfg)

// Given a square chessboard, the initial position of Knight and position of a target. Find out the minimum steps a Knight will take to reach the target position.If it cannot reach the target position return -1.

//? Note:
// The initial and the target position co-ordinates of Knight have been given according to 1-base indexing.

//? Example 1:
// Input:
// N=6
// knightPos[ ] = {4, 5}
// targetPos[ ] = {1, 1}
// Output:
// 3

//? Explanation:
// Knight takes 3 step to reach from
// (4, 5) to (1, 1):
// (4, 5) -> (5, 3) -> (3, 2) -> (1, 1). 

//? Example 2:
// Input:
// N=8
// knightPos[ ] = {7, 7}
// targetPos[ ] = {1, 5}
// Output:
// 4

//? Explanation:
// Knight takes 4 steps to reach from
// (7, 7) to (1, 5):
// (4, 5) -> (6, 5) -> (5, 3) -> (7, 2) -> (1, 5).
 

//? Your Task:
// You don't need to read input or print anything. Your task is to complete the function minStepToReachTarget() which takes the inital position of Knight (KnightPos), the target position of Knight (TargetPos) and the size of the chess board (N) as an input parameters and returns the minimum number of steps required by the knight to reach from its current position to the given target position.If it cannot reach the target position return -1.

//* Expected Time Complexity: O(N2).
//* Expected Auxiliary Space: O(N2).

//? Constraints:
// 1 <= N <= 1000
// 1 <= Knight_pos(X, Y), Targer_pos(X, Y) <= N

//? Thought Process:
// Because the knight can move in 8 possible directions, from any cell, which suggest the use of recursion somehow, but we are sure that not all the time all 8 directions will be valid, so we need to check if the next cell is valid or not. Also, we need to keep track of the visited cells to avoid cycles. If we reach the target position, we can return the number of steps taken to reach there. If we exhaust all possibilities and cannot reach the target, we return -1.

//* But if we use recursion, we will have to explore all possible paths, which can be very inefficient. And here N is up to 1000, so we need a more efficient approach.

//? So, if we think properly, we can see we just need to find the shortest path from the initial position to the target position, which is a classic graph traversal problem. And each step can cost exactly 1. So for that we can use BFS (Breadth First Search) to find the shortest path. We can use a queue to keep track of the current position and the number of steps taken to reach there. We will also maintain a visited array to keep track of the cells we have already visited.

//* Using this approach the first time we reach the target position, we can return the number of steps taken to reach there, which will be the minimum number of steps required. If we exhaust all possibilities and cannot reach the target, we return -1.

//? Code:
class Solution {
	minStepToReachTarget(KnightPos, TargetPos, N) {
		
		const moves = [
		[-2, -1], [-2, 1],
		[-1, -2], [-1, 2],
		[1, -2], [1, 2],
		[2, -1], [2, 1]
		];
		
		const visited = Array.from(
		{ length: N + 1 },
		() => Array(N + 1).fill(false)
		);
		
		const isValid = (row, col) =>
		row >= 1 && row <= N && col >= 1 && col <= N;
		
		const queue = [];
		
		queue.push([KnightPos[0], KnightPos[1], 0]);
		visited[KnightPos[0]][KnightPos[1]] = true;
		
		while (queue.length) {
			
			const [row, col, steps] = queue.shift();
			
			if (row == TargetPos[0] && col == TargetPos[1]) {
				return steps;
			}
			
			for (const [dr, dc] of moves) {
				
				const newRow = row + dr;
				const newCol = col + dc;
				
				if (
				isValid(newRow, newCol) &&
				!visited[newRow][newCol]
				) {
					visited[newRow][newCol] = true;
					queue.push([newRow, newCol, steps + 1]);
				}
			}
		}
		
		return - 1;
	}
}

//? Time Complexity: O(N^2) - In the worst case, we may have to visit all the cells of the chessboard, which is N^2 cells.
//? Space Complexity: O(N^2) - We are using a visited array of size N^2 to keep track of the cells we have already visited. Also, the queue can also grow up to N^2 in the worst case.