//? LeetCode #787
//? Cheapest Flights Within K Stops

// There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.

// You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

//? Example 1:
// Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
// Output: 700
// Explanation:
// The graph is shown above.
// The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
// Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.

//? Example 2:
// Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
// Output: 200
// Explanation:
// The graph is shown above.
// The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.

//? Example 3:
// Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
// Output: 500
// Explanation:
// The graph is shown above.
// The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.

//? Constraints:
// 2 <= n <= 100
// 0 <= flights.length <= (n * (n - 1) / 2)
// flights[i].length == 3
// 0 <= fromi, toi < n
// fromi != toi
// 1 <= pricei <= 104
// There will not be any multiple flights between two cities.
// 0 <= src, dst, k < n
// src != dst

//? Approach:
// Build an adjacency list from the flights array where each city stores its neighbors and travel cost.
// Use a BFS-style queue that keeps track of (current city, total cost, number of stops).
// Maintain a minPrice array to store the cheapest cost found so far to reach each city.
// Start from the source city with cost 0 and 0 stops.
// While processing the queue:
// Skip paths that exceed k stops.
// For each neighbor, update the cost if a cheaper price is found and push it into the queue with increased stops.
// Finally, return the minimum cost to reach dst; if unreachable within k stops, return -1.

//? Code:
var findCheapestPrice = function (n, flights, src, dst, k) {
  let graph = Array.from({ length: n }, () => []);
  for (let [from, to, price] of flights) {
    graph[from].push([to, price]);
  }

  let minPrice = new Array(n).fill(Infinity);
  minPrice[src] = 0;

  // [city, cost, stops]
  let q = [[src, 0, 0]];
  while (q.length) {
    let [curr, currPrice, stops] = q.shift();
    if (stops > k) continue;
    for (let [neighbor, neighborPrice] of graph[curr]) {
      let newPrice = currPrice + neighborPrice;
      if (newPrice < minPrice[neighbor]) {
        minPrice[neighbor] = newPrice;
        q.push([neighbor, newPrice, stops + 1]);
      }
    }
  }
  return minPrice[dst] === Infinity ? -1 : minPrice[dst];
};

//? Time Complexity: O(E x K)
//? Space Complexity: O(N + E)
