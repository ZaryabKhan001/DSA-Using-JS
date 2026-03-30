//? LeetCode #1584
//? Min Cost to Connect All Points

// You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].

// The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.

// Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

//? Example 1:
// Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
// Output: 20
// Explanation:

// We can connect the points as shown above to get the minimum cost of 20.
// Notice that there is a unique path between every pair of points.

//? Example 2:
// Input: points = [[3,12],[-2,5],[-4,1]]
// Output: 18

//? Constraints:
// 1 <= points.length <= 1000
// -106 <= xi, yi <= 106
// All pairs (xi, yi) are distinct.

//? Approach:
// We want to connect all points with the minimum total cost. The cost between two points is their Manhattan distance. This is essentially a Minimum Spanning Tree (MST) problem.
// Start from any point (here, point 0).
// Maintain a priority queue of edges [distance, node] to pick the smallest edge each time.
// Keep track of visited points to avoid cycles.
// Each time we pick the smallest edge to an unvisited point, add its distance to minCost and mark the point visited.
// Push all edges from the newly visited point to unvisited points into the priority queue.
// Repeat until all points are visited.
// The sum of all chosen edge distances (minCost).

var minCostConnectPoints = function (points) {
  let n = points.length;
  let pq = new MinPriorityQueue((x) => x[0]);

  let minCost = 0;
  let visited = new Array(n).fill(false);
  pq.push([0, 0]);
  let edgesUsed = 0;

  while (edgesUsed < n) {
    let [nodeDist, node] = pq.pop();
    if (visited[node]) continue;
    visited[node] = true;
    minCost = minCost + nodeDist;
    edgesUsed++;

    for (let nextNode = 0; nextNode < n; ++nextNode) {
      if (!visited[nextNode]) {
        let nextDist =
          Math.abs(points[node][0] - points[nextNode][0]) +
          Math.abs(points[node][1] - points[nextNode][1]);

        pq.push([nextDist, nextNode]);
      }
    }
  }
  return minCost;
};

//? Time Complexity: O(n2log n)
//? Space Complexity: O(n2)
