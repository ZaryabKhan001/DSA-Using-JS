//? LeetCode #1319
//? Number of Operations to Make Network Connected

// There are n computers numbered from 0 to n - 1 connected by ethernet cables connections forming a network where connections[i] = [ai, bi] represents a connection between computers ai and bi. Any computer can reach any other computer directly or indirectly through the network.

// You are given an initial computer network connections. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.

// Return the minimum number of times you need to do this in order to make all the computers connected. If it is not possible, return -1.

//? Example 1:
// Input: n = 4, connections = [[0,1],[0,2],[1,2]]
// Output: 1
// Explanation: Remove cable between computer 1 and 2 and place between computers 1 and 3.

//? Example 2:
// Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
// Output: 2

//? Example 3:
// Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
// Output: -1
// Explanation: There are not enough cables.

//? Constraints:
// 1 <= n <= 105
// 1 <= connections.length <= min(n * (n - 1) / 2, 105)
// connections[i].length == 2
// 0 <= ai, bi < n
// ai != bi
// There are no repeated connections.
// No two computers are connected by more than one cable.

//? Approach 01: Graphs, DFS
// To connect all n computers, at least n - 1 connections are required. If not, return -1.
// Build an undirected graph using the given connections.
// Use DFS to traverse the graph and count the number of connected components.
// Each DFS call marks all nodes in one component as visited.
// If there are k connected components, we need k - 1 extra connections to connect them all.
// Return noOfComponents - 1.

//? Code:
var makeConnected = function (n, connections) {
  if (connections.length < n - 1) return -1;

  const map = {};
  for (let [u, v] of connections) {
    if (!map[u]) map[u] = [];
    if (!map[v]) map[v] = [];

    map[u].push(v);
    map[v].push(u);
  }

  let visitedNodes = new Set();
  const traversal = (curr) => {
    visitedNodes.add(curr);
    const neighbours = map[curr] || [];
    for (let neighbour of neighbours) {
      if (!visitedNodes.has(neighbour)) {
        traversal(neighbour);
      }
    }
  };

  let noc = 0;
  for (let i = 0; i < n; i = i + 1) {
    if (!visitedNodes.has(i)) {
      noc++;
      traversal(i);
    }
  }
  return noc - 1;
};

//? Time Complexity: O(V + E)
//? Space Complexity: O(V + E)

//? Approach 02: Graphs, Union-Find
// To connect all n computers, at least n - 1 connections are required. If not, return -1.
// Initialize a Union-Find data structure to keep track of connected components.
// For each connection, perform a union operation to connect the two computers.
// After processing all connections, count the number of unique parents (connected components).
// If there are k connected components, we need k - 1 extra connections to connect them all.
// Return noOfComponents - 1.

//? Code:
var makeConnected = function (n, connections) {
  if (connections.length < n - 1) return -1;

  const parent = Array.from({ length: n }, (_, id) => id);

  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  const union = (u, v) => {
    const rootU = find(u);
    const rootV = find(v);

    if (rootU !== rootV) {
      parent[rootV] = rootU;
    }
  };

  //* connect nodes
  for (let [u, v] of connections) {
    union(u, v);
  }

  //* finding out components
  let components = 0;
  for (let i = 0; i < n; i = i + 1) {
    if (find(i) === i) {
      components++;
    }
  }

  return components - 1;
};

//? Time Complexity: O(V + E)
//? Space Complexity: O(V)
