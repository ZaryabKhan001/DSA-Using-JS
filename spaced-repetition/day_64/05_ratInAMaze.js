//? Rat in a Maze (gfg)

// Given a binary matrix maze[][] of size n × n containing values 0 and 1, find all possible paths for a rat to travel from the source cell (0, 0) to the destination cell (n - 1, n - 1). The rat can move in four directions: up(U), down(D), left(L), and right(R).

// 1 represents an open cell through which the rat can move.
// 0 represents a blocked cell that cannot be traversed.
// The rat can move only through open cells and cannot visit the same cell more than once in a path. Return all valid paths as strings consisting of 'U', 'D', 'L', and 'R', representing the sequence of moves taken by the rat.

// Note: Return the paths in lexicographically increasing order. If no valid path exists, return an empty list.

//? Examples:

// Input: maze[][] = {{1, 0, 0, 0}, {1, 1, 0, 1}, {1, 1, 0, 0}, {0, 1, 1, 1}}
// Output: ["DDRDRR", "DRDDRR"]
// Explanation: There are two valid paths from the source cell (0, 0) to the destination cell (3, 3).

// Input: maze[][] = [[1, 0], [1, 0]]
// Output: []
// Explanation: No path exists as the destination cell (1, 1) is blocked.

//? Constraints:
// 2 ≤ n ≤ 5
// 0 ≤ maze[i][j] ≤ 1

//? Approach: Backtracking
// 1. Start from the source cell (0, 0) and explore all possible paths using backtracking.
// 2. For each cell, check if it is valid (within bounds and not blocked) before moving in any direction.
// 3. If the destination cell (n - 1, n - 1) is reached, add the current path to the result list.
// 4. Backtrack by marking the current cell as unvisited and exploring other paths.
// 5. Return the result list containing all valid paths.

//? Code:
class Solution {
  ratInMaze(maze) {
    if (maze[0][0] == 0) {
      return [];
    }

    let n = maze.length;
    let result = [];
    let choices = ["D", "L", "R", "U"];

    const isValid = (choice, row, col, n) => {
      if (choice == "U" && (row <= 0 || maze[row - 1][col] == 0)) {
        return false;
      } else if (choice == "D" && (row >= n - 1 || maze[row + 1][col] == 0)) {
        return false;
      } else if (choice == "L" && (col <= 0 || maze[row][col - 1] == 0)) {
        return false;
      } else if (choice == "R" && (col >= n - 1 || maze[row][col + 1] == 0)) {
        return false;
      }
      return true;
    };

    const getNewCoordinates = (choice, row, col) => {
      return {
        U: { row: row - 1, col: col },
        D: { row: row + 1, col: col },
        L: { row: row, col: col - 1 },
        R: { row: row, col: col + 1 },
      }[choice];
    };

    const backTrack = (n, row, col, path) => {
      // * base case
      if (row == n - 1 && col == n - 1) {
        result.push(path);
        return;
      }

      // * explore choices
      for (let choice of choices) {
        if (isValid(choice, row, col, n)) {
          const newCoordinates = getNewCoordinates(choice, row, col);
          // * marking current cell as visited
          maze[row][col] = 0;

          backTrack(n, newCoordinates.row, newCoordinates.col, path + choice);

          // * restore the original cell value
          maze[row][col] = 1;
        }
      }
    };

    backTrack(n, 0, 0, "");
    return result;
  }
}

//? Time Complexity: O(4^(n^2)) - In the worst case, we can explore all four directions from each cell, leading to an exponential number of paths.
//? Space Complexity: O(n^2) - The space used by the recursion stack can go up to n^2 in the worst case, where n is the size of the maze.

//? Slightly better code
class Solution {
	ratInMaze(maze) {
		if (maze[0][0] == 0) {
			return [];
		}
		
		let n = maze.length;
		let result = [];
		
		const directions = [
		['D', 1, 0], ['L', 0, -1], ['R', 0, 1], ['U', -1, 0]];
		
		const isValid = (row, col) => {
			return row >= 0 && row <= n - 1 && col >= 0 && col <= n - 1 && maze[row][col] == 1;
		}
		
		const backTrack = (n, row, col, path) => {
			// * base case
			if (row == n - 1 && col == n - 1) {
				result.push(path);
				return;
			}
			
			// * explore choices
			for (let [choice, dr, dc] of directions) {
				const newRow = row + dr;
				const newCol = col + dc;
				
				if (isValid(newRow, newCol)) {
					maze[row][col] = 0;
					
					backTrack(n, newRow, newCol, path + choice);
					
					maze[row][col] = 1;
				}
				
			}
			
		};
		
		backTrack(n, 0, 0, '');
		return result;
	}
}

//? Time Complexity: O(4^(n^2)) - In the worst case, we can explore all four directions from each cell, leading to an exponential number of paths.
//? Space Complexity: O(n^2) - The space used by the recursion stack can go up to n^2 in the worst case, where n is the size of the maze.
