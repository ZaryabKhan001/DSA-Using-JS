//? Shortest Path – Bellman Ford Algorithm
// It handles negative edges.

//? Relaxation is the process of trying to improve (reduce) the shortest distance to a vertex using an edge.

//? How Relaxation Works?
// For an edge u → v with weight w:

// If distance[u] + w < distance[v]
// distance[v] = distance[u] + w

//? Why relaxation is repeated in Bellman–Ford?
// Bellman–Ford relaxes all edges V−1 times.
// Because the longest possible shortest path can have at most V−1 edges.
// Each relaxation gradually propagates shorter paths across the graph.

// After the final iteration, if no values change, the process is stopped.

// The final answer is obtained in the last step.

//? If your graph has a negative weight cycle, the Bellman–Ford algorithm fails.

//? Code:
function bellmanFord(edges, V, src) {
  const dist = new Array(V).fill(Infinity);
  dist[src] = 0;

  // Relax edges V-1 times
  for (let i = 0; i < V - 1; i++) {
    let updated = false;

    for (let [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        updated = true;
      }
    }

    // Early stopping if no update happened
    if (!updated) break;
  }

  // Check for negative weight cycle
  for (let [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      console.log("Negative Weight cycle Detected");
      return null;
    }
  }

  return dist;
}

// Edge list: [u, v, w]
const edges = [
  [0, 1, 6],
  [0, 2, 5],
  [0, 3, 5],
  [1, 4, -1],
  [2, 1, -2],
  [2, 4, 1],
  [3, 2, -2],
  [3, 5, -1],
  [4, 6, 3],
  [5, 6, 3],
];

// Example for negative cycle case
/*
const edges = [
    [0, 1, 4],
    [1, 2, -1],
    [2, 3, -2],
    [3, 1, 0]
];
*/

const V = 7;
console.log(bellmanFord(edges, V, 0));

//? Time Complexity: O(V * E)
//? Space Complexity: O(V)
