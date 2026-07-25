//? M-Coloring Problem

// You are given an undirected graph consisting of V vertices and E edges represented by a list edges[][], along with an integer m. Your task is to determine whether it is possible to color the graph using at most m different colors such that no two adjacent vertices share the same color. Return true if the graph can be colored with at most m colors, otherwise return false.

// Note: The graph is indexed with 0-based indexing.

//? Examples:

// Input: V = 4, edges[][] = [[0, 1], [1, 3], [2, 3], [3, 0], [0, 2]], m = 3
// Output: true
// Explanation: It is possible to color the given graph using 3 colors, for example, one of the possible ways vertices can be colored as follows:

// Vertex 0: Color 1
// Vertex 1: Color 2
// Vertex 2: Color 2
// Vertex 3: Color 3
// Input: V = 3, edges[][] = [[0, 1], [1, 2], [0, 2]], m = 2
// Output: false

//? Explanation: It is not possible to color the given graph using only 2 colors because vertices 0, 1, and 2 form a triangle.

//? Constraints:
// 1 ≤ V ≤ 10
// 1 ≤ E = edges.size() ≤ (V*(V-1))/2
// 0 ≤ edges[i][j] ≤ V-1
// 1 ≤ m ≤ V

//? Approach:
// 1. Create an adjacency list representation of the graph from the given edges.
// 2. Initialize an array to store the color assigned to each vertex, initially set to -1 (indicating no color assigned).
// 3. Use a backtracking approach to try assigning colors to each vertex:
//    a. For each vertex, try assigning each color from 1 to m.
//    b. Before assigning a color, check if it is safe to assign that color (i.e., no adjacent vertex has the same color).
//    c. If it is safe, assign the color and recursively attempt to color the next vertex.
//    d. If all vertices are colored successfully, return true.
//    e. If not, backtrack by removing the assigned color and trying the next color.
// 4. If all colors have been tried and no valid coloring is found, return false.

class Solution {
	graphColoring(v, edges, m) {
		if (m >= v) {
			return true;
		}
		
		const adjacencyList = this.getAdjacencyList(edges, v);
		const colorMap = {};
		
		const isValid = (color, currentVertex) => {
			for (let connection of adjacencyList[currentVertex]) {
				if (colorMap[connection] == color) {
					return false;
				}
			}
			
			return true;
		};
		
		const backTrack = (currentVertex) => {
			// base case
			if (currentVertex == v) {
				return true;
			}
			
			// choices
			for (let color = 0; color < m; color++) {
				
				if (isValid(color, currentVertex)) {
					
					// choose
					colorMap[currentVertex] = color;
					
					// explore
					if (backTrack(currentVertex + 1)) {
						return true;
					}
					
					// undo
					delete colorMap[currentVertex];
				}
			}
			
			return false;
		};
		
		return backTrack(0);
	}
	
	getAdjacencyList(edges, v) {
		let arr = Array.from({ length: v }, () => []);
		
		for (let edge of edges) {
			arr[edge[0]].push(edge[1]);
			arr[edge[1]].push(edge[0]);
		}
		
		return arr;
	}
}

//? Time complexity: O((m^V * V) + (V + E)) - In the worst case, we may have to try all m colors for each of the V vertices, leading to m^V combinations. an additional factor of V comes from the isValid function, which checks the adjacent vertices for each vertex. The (V + E) term comes from constructing the adjacency list.
//? Space complexity: O(V + V + E) - The space used by the colorMap and the recursion stack in the backtracking approach. Additionally, the adjacency list representation of the graph takes O(V + E) space.