//? LeetCode #797
//? All Paths From Source to Target

// Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in any order.

// The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).

//? Example 1:
// Input: graph = [[1,2],[3],[3],[]]
// Output: [[0,1,3],[0,2,3]]
// Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

//? Example 2:
// Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
// Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

//? Constraints:
// n == graph.length
// 2 <= n <= 15
// 0 <= graph[i][j] < n
// graph[i][j] != i (i.e., there will be no self-loops).
// All the elements of graph[i] are unique.
// The input graph is guaranteed to be a DAG.

//? Approach: Backtracking
// We can use backtracking to explore all possible paths from the source node (0) to the target node (n - 1). We start from the source node and recursively visit each of its neighbors, keeping track of the current path. When we reach the target node, we add the current path to the result list. After exploring a neighbor, we backtrack by removing it from the current path and continue exploring other neighbors.

//? Code:
var allPathsSourceTarget = function (graph) {
  const result = [];
  const path = [0];

  const traversal = (curr) => {
    //* base case
    if (curr === graph.length - 1) {
      result.push([...path]);
    }

    const childrens = graph[curr];
    for (let children of childrens) {
      path.push(children);
      traversal(children);
      path.pop();
    }
  };

  traversal(0);
  return result;
};

//? Time Complexity: O(P * V) where P is the number of paths and V is the number of vertices
//? Space Complexity: O(P * V) where P is the number of paths and V is the number of vertices (for storing the result) + O(V) for the recursion stack and path array.
