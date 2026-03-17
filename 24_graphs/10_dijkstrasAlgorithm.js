//? Dijkstra's Algorithm:
//* Dijkstra's algorithm is a popular algorithm used to find the shortest path from a source node to all other nodes in a weighted graph. It works by maintaining a priority queue (min-heap) to explore the nodes with the smallest distance first. The algorithm iteratively updates the distances to neighboring nodes and continues until all reachable nodes have been processed.

class MinHeap {
  constructor() {
    this.heap = [];
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }
  left(i) {
    return 2 * i + 1;
  }
  right(i) {
    return 2 * i + 2;
  }

  size() {
    return this.heap.length;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  push(pair) {
    this.heap.push(pair);
    this.heapifyUp();
  }

  heapifyUp() {
    let i = this.heap.length - 1;
    while (i > 0 && this.heap[i][0] < this.heap[this.parent(i)][0]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }

  heapifyDown() {
    let i = 0;
    while (true) {
      let smallest = i;
      let left = this.left(i);
      let right = this.right(i);

      if (
        left < this.heap.length &&
        this.heap[left][0] < this.heap[smallest][0]
      ) {
        smallest = left;
      }
      if (
        right < this.heap.length &&
        this.heap[right][0] < this.heap[smallest][0]
      ) {
        smallest = right;
      }

      if (smallest !== i) {
        this.swap(i, smallest);
        i = smallest;
      } else {
        break;
      }
    }
  }
}

function dijkstras(graph, src) {
  let n = graph.length;
  let dist = new Array(n).fill(Infinity);
  dist[src] = 0;

  let pq = new MinHeap();
  pq.push([0, src]); // [distance, node]

  while (pq.size()) {
    let [nodeDist, node] = pq.pop();

    if (nodeDist > dist[node]) continue;

    for (let [neighbor, weight] of graph[node]) {
      let newDist = dist[node] + weight;
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        pq.push([newDist, neighbor]);
      }
    }
  }
  return dist;
}

const graph = [
  [
    [1, 2],
    [2, 4],
  ],
  [
    [3, 7],
    [2, 1],
  ],
  [
    [4, 3],
    [5, 1],
  ],
  [[6, 1]],
  [
    [3, 2],
    [6, 5],
  ],
  [
    [3, 3],
    [6, 8],
  ],
  [],
];
console.log(dijkstras(graph, 0));
