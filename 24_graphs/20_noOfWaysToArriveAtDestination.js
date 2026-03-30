//? LeetCode #1976
//? Number of Ways to Arrive at Destination

// You are in a city that consists of n intersections numbered from 0 to n - 1 with bi-directional roads between some intersections. The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections.

// You are given an integer n and a 2D integer array roads where roads[i] = [ui, vi, timei] means that there is a road between intersections ui and vi that takes timei minutes to travel. You want to know in how many ways you can travel from intersection 0 to intersection n - 1 in the shortest amount of time.

// Return the number of ways you can arrive at your destination in the shortest amount of time. Since the answer may be large, return it modulo 109 + 7.

//? Example 1:
// Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
// Output: 4
// Explanation: The shortest amount of time it takes to go from intersection 0 to intersection 6 is 7 minutes.
// The four ways to get there in 7 minutes are:
// - 0 ➝ 6
// - 0 ➝ 4 ➝ 6
// - 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
// - 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6

//? Example 2:
// Input: n = 2, roads = [[1,0,10]]
// Output: 1
// Explanation: There is only one way to go from intersection 0 to intersection 1, and it takes 10 minutes.

//? Constraints:
// 1 <= n <= 200
// n - 1 <= roads.length <= n * (n - 1) / 2
// roads[i].length == 3
// 0 <= ui, vi <= n - 1
// 1 <= timei <= 109
// ui != vi
// There is at most one road connecting any two intersections.
// You can reach any intersection from any other intersection.

//? Approach: Dijkstra's Algorithm
// Build an adjacency list from the given roads.
// Use Dijkstra’s algorithm to find the shortest distance from node 0 to all nodes.
// Along with distance (minW), maintain pathCount[i] = number of shortest paths to node i.
// Initialize:
// minW[0] = 0, pathCount[0] = 1
// Min-heap (priority queue) with [0, 0]
// For each extracted node:
// If a shorter path to a neighbor is found, update its distance and copy the path count.
// If an equal shortest path is found, add the path count (mod 109 + 7).
// Final answer is pathCount[n-1], the number of shortest paths to the destination.

//? Code:
const buildNeighborsMap = (arr) => {
  let map = {};

  for (let i = 0; i < arr.length; i = i + 1) {
    const [u, v, time] = arr[i];

    if (!map[u]) map[u] = [];
    if (!map[v]) map[v] = [];

    map[u].push([v, time]);
    map[v].push([u, time]);
  }

  return map;
};

var countPaths = function (n, roads) {
  //* building a neighbours map
  let neighborsMap = buildNeighborsMap(roads);
  const dist = Array(n).fill(Infinity);
  dist[0] = 0;
  const ways = Array(n).fill(0);
  ways[0] = 1;

  let pq = new MinPriorityQueue((x) => x[1]);
  pq.push([0, 0]); //[node, weight]

  while (!pq.isEmpty()) {
    const [node, nodeT] = pq.pop();

    const neighbours = neighborsMap[node] || [];

    for (let [neighborNode, neighborTime] of neighbours) {
      let newTime = nodeT + neighborTime;

      if (newTime < dist[neighborNode]) {
        dist[neighborNode] = newTime;
        pq.push([neighborNode, newTime]);
        ways[neighborNode] = ways[node];
      } else if (newTime === dist[neighborNode]) {
        ways[neighborNode] = (ways[node] + ways[neighborNode]) % (1e9 + 7);
      }
    }
  }

  return ways[n - 1];
};

//? Time Complexity: O((V + E) log V)
// Here, V = n (number of nodes), E = roads.length

//? Space Complexity: O(V + E)
