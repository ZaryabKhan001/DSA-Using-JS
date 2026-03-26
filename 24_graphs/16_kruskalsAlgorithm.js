//? Kruskal’s Algorithm
// It is a greedy algorithm used to find the Minimum Spanning Tree (MST) of a connected, weighted, undirected graph.

//? Points to Remember:
// Sort all the edges (ascending order).
// Create union find for all ‘n’ node.
// if no cycle, add to (uf).
// if cycle, skip.
// Stop when MST has (n-1) edges.

class UnionFind {
  constructor(n) {
    this.parent = new Array(n).fill(0).map((_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  // finds the root of node x
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    // cycle Detected
    if (rootX === rootY) return false;

    // union based on rank
    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootY] > this.rank[rootX]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

// Kruskal Algorithm
function Kruskal(n, edges) {
  // sort the edges based on weights
  edges.sort((a, b) => a[2] - b[2]);

  let uf = new UnionFind(n);
  let mstCost = 0;

  for (let [x, y, w] of edges) {
    if (uf.union(x, y)) {
      mstCost = mstCost + w;
    }
  }
  return mstCost;
}

const edges = [
  [0, 1, 4],
  [0, 2, 4],
  [1, 2, 2],
  [2, 3, 3],
  [2, 5, 2],
  [2, 4, 4],
  [3, 4, 3],
  [5, 4, 3],
];

console.log(Kruskal(6, edges));

//? Time Complexity: O(E log E)
// (sorting dominates, union-find is almost constant)
//? Space Complexity: O(N)
// (for parent + rank arrays)
