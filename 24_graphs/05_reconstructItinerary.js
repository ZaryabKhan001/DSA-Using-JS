//? LeetCode #332
//? Reconstruct Itinerary

// You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

// All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

// For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
// You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.

//? Example 1:
// Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
// Output: ["JFK","MUC","LHR","SFO","SJC"]

//? Example 2:
// Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
// Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.

//? Constraints:
// 1 <= tickets.length <= 300
// tickets[i].length == 2
// fromi.length == 3
// toi.length == 3
// fromi and toi consist of uppercase English letters.
// fromi != toi

//? Approach:
// Build Graph:
// Create an adjacency list where each airport maps to a list of destination airports.
// Sort Destinations:
// For every airport, sort its destination list lexicographically because we must always choose the smallest possible next airport.
// Depth-First Search (DFS):
// Use DFS starting from "JFK"
// Always pick the lexicographically smallest unused ticket (shift from the list).
// Recursively visit that next airport.
// When an airport has no more outgoing edges, add it to the path.
// Reverse Path:
// The final itinerary builds in reverse order because nodes are added after exploring all edges, so reverse it before returning.

//? Code:
var findItinerary = function (tickets) {
  let graph = {};
  for (let [from, to] of tickets) {
    if (!graph[from]) graph[from] = [];
    graph[from].push(to);
  }
  for (let node in graph) {
    graph[node].sort(); // ascending lexicographic
  }

  let path = [];
  let dfs = (curr) => {
    while (graph[curr] && graph[curr].length) {
      let neighbor = graph[curr].shift(); // remove from front
      dfs(neighbor);
    }
    path.push(curr);
  };

  dfs("JFK");
  return path.reverse(); // reverse before returning
};
