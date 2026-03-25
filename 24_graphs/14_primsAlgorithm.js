//? Prim’s Algorithm
// The purpose of this algorithm is to find the Minimum Spanning Tree (MST) of a connected, undirected, weighted graph.

// Start from any node and grow tree outwards, always pick the cheapest edge from already built-tree.

class MinPriorityQueue {
  constructor(config) {
    this.priority = config.priority;
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  enqueue(element) {
    this.heap.push(element);
    this._bubbleUp();
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const top = this.heap[0];
    const last = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this._bubbleDown();
    }

    return { element: top };
  }

  _bubbleUp() {
    let i = this.heap.length - 1;

    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);

      if (this.priority(this.heap[i]) < this.priority(this.heap[parent])) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else {
        break;
      }
    }
  }

  _bubbleDown() {
    let i = 0;

    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (
        left < this.heap.length &&
        this.priority(this.heap[left]) < this.priority(this.heap[smallest])
      ) {
        smallest = left;
      }

      if (
        right < this.heap.length &&
        this.priority(this.heap[right]) < this.priority(this.heap[smallest])
      ) {
        smallest = right;
      }

      if (smallest !== i) {
        [this.heap[i], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[i],
        ];
        i = smallest;
      } else {
        break;
      }
    }
  }
}

function primMST(n, graph) {
  let visited = new Array(n).fill(false);
  let pq = new MinPriorityQueue({ priority: (x) => x[0] });

  pq.enqueue([0, 0]);

  let edgesUsed = 0;
  let mstCost = 0;

  while (!pq.isEmpty() && edgesUsed < n) {
    let [weight, node] = pq.dequeue().element;

    if (visited[node]) continue;

    visited[node] = true;
    edgesUsed++;
    mstCost += weight;

    for (let [edge, edgeWt] of graph[node]) {
      if (!visited[edge]) {
        pq.enqueue([edgeWt, edge]);
      }
    }
  }
  return mstCost;
}

const graph = [
  [
    [1, 4],
    [2, 2],
    [3, 5],
  ],
  [
    [0, 4],
    [3, 1],
  ],
  [
    [0, 2],
    [3, 3],
  ],
  [
    [1, 1],
    [2, 3],
  ],
];

console.log(primMST(4, graph));
