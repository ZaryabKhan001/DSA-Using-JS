//? LeetCode #1971
//? Find if Path Exists in Graph

// There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

// You want to determine if there is a valid path that exists from vertex source to vertex destination.

// Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.

//? Example 1:
// Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
// Output: true
// Explanation: There are two paths from vertex 0 to vertex 2:
// - 0 → 1 → 2
// - 0 → 2

//? Example 2:
// Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
// Output: false
// Explanation: There is no path from vertex 0 to vertex 5.

//? Constraints:
// 1 <= n <= 2 * 105
// 0 <= edges.length <= 2 * 105
// edges[i].length == 2
// 0 <= ui, vi <= n - 1
// ui != vi
// 0 <= source, destination <= n - 1
// There are no duplicate edges.
// There are no self edges.

//? Solution: BFS
//* BFS Iterative

// const getChildrens = (edges) => {
//   const map = {};

//   for (let i = 0; i < edges.length; i = i + 1) {
//     const u = edges[i][0];
//     const v = edges[i][1];

//     if (!map[u]) map[u] = [];
//     if (!map[v]) map[v] = [];

//     map[u].push(v);
//     map[v].push(u);
//   }
//   return map;
// };

// var validPath = function (n, edges, source, destination) {
//   const queue = [source];
//   const visitedNodes = new Set();
//   const childrensMap = getChildrens(edges);

//   while (queue.length) {
//     const curr = queue.shift();
//     if (curr === destination) return true;

//     visitedNodes.add(curr);

//     const childrens = childrensMap[curr] || [];

//     for (let node of childrens) {
//       if (!visitedNodes.has(node)) {
//         visitedNodes.add(node);
//         queue.push(node);
//       }
//     }
//   }
//   return false;
// };

//? Time Complexity: O(n + m) where n is the number of vertices and m is the number of edges
//? Space Complexity: O(n + m)

//? Solution: DFS

//* DFS Iterative

const getChildrens = (edges) => {
  const map = {};

  for (let i = 0; i < edges.length; i = i + 1) {
    const u = edges[i][0];
    const v = edges[i][1];

    if (!map[u]) map[u] = [];
    if (!map[v]) map[v] = [];

    map[u].push(v);
    map[v].push(u);
  }
  return map;
};

var validPath = function (n, edges, source, destination) {
  const stack = [source];
  const visitedNodes = new Set();
  const childrensMap = getChildrens(edges);

  while (stack.length) {
    const curr = stack.pop();
    if (curr === destination) return true;

    visitedNodes.add(curr);

    const childrens = childrensMap[curr] || [];

    for (let node of childrens) {
      if (!visitedNodes.has(node)) {
        visitedNodes.add(node);
        stack.push(node);
      }
    }
  }
  return false;
};
