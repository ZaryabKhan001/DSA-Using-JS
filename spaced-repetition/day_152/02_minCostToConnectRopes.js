//? Min Cost to Connect Ropes (gfg)

// Given an array, arr[] of rope lengths, connect all ropes into a single rope with the minimum total cost. The cost to connect two ropes is the sum of their lengths. Return the minimum possible cost.

//? Examples:

// Input: arr[] = [4, 3, 2, 6]
// Output: 29
// Explanation: First connect 2 and 3 to get [4, 5, 6] with a cost of 5, then connect 4 and 5 to get [9, 6] with a cost of 9, and finally connect 9 and 6 to get one rope with a cost of 15, giving a total minimum cost of 29. Any other order, such as connecting 4 and 6 first, results in a higher total cost of 38.

// Input: arr[] = [4, 2, 7, 6, 9]
// Output: 62
// Explanation: First, connect ropes 4 and 2, which makes the array [6, 7, 6, 9]. Cost of this operation 4 + 2 = 6. Next, add ropes 6 and 6, which results in [12, 7, 9]. Cost of this operation 6 + 6 = 12. Then, add 7 and 9, which makes the array [12,16]. Cost of this operation 7 + 9 = 16. And finally, add these two which gives [28]. Hence, the total cost is 6 + 12 + 16 + 28 = 62.

// Input: arr[] = [10]
// Output: 0
// Explanation: Since there is only one rope, no connections are needed, so the cost is 0.

//? Constraints:
// 1 ≤ arr.size() ≤ 105
// 1 ≤ arr[i] ≤ 104

//? Thought Process:
// We need to connect all ropes with minimum total cost.

// Connecting two ropes costs the sum of their lengths.
// To minimize the cost, always connect the two smallest ropes first.

// 1. Use a Min Heap to get the two smallest ropes efficiently.
// 2. Extract the two smallest ropes.
// 3. Add their sum to the total cost.
// 4. Push the newly connected rope back into the Min Heap.
// 5. Repeat until only one rope remains.

// The total accumulated cost is our answer.

// Time Complexity: O(n log n)
// Space Complexity: O(n)

//* Related Problems:
// Its similar to "Optimal Merge Pattern Problem" and "Huffman Coding".

//? Code:
class MinHeap {
  constructor() {
    this.heap = [];
  }
  getLeftChild(i) {
    return 2 * i + 1;
  }
  getRightChild(i) {
    return 2 * i + 2;
  }
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  peek() {
    if (this.heap.length > 0) {
      return this.heap[0];
    } else {
      return null;
    }
  }

  push(val) {
    this.heap.push(val);
    let lastIndex = this.heap.length - 1;
    this.heapifyUp(lastIndex);
  }
  heapifyUp(i) {
    while (i > 0) {
      let parentIndex = this.getParentIndex(i);

      if (this.heap[parentIndex] > this.heap[i]) {
        [this.heap[i], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[i],
        ];

        i = parentIndex;
      } else {
        break;
      }
    }
  }
  pop() {
    if (this.heap.length < 1) return null;
    let max = this.heap[0];
    let lastIndex = this.heap.length - 1;
    [this.heap[0], this.heap[lastIndex]] = [this.heap[lastIndex], this.heap[0]];

    this.heap.pop();

    this.heapifyDown(0);
    return max;
  }
  heapifyDown(i) {
    let n = this.heap.length;
    let left = this.getLeftChild(i);
    let right = this.getRightChild(i);

    let smallest = i;
    if (left < n && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }

    if (right < n && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }

    if (smallest != i) {
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      this.heapifyDown(smallest);
    }
  }
  size() {
    return this.heap.length;
  }
}

class Solution {
  minCost(arr) {
    let n = arr.length;

    if (n == 1) {
      return 0;
    }

    let pq = new MinHeap();
    for (let i = 0; i < n; i = i + 1) {
      pq.push(arr[i]);
    }

    let minTotalCost = 0;
    while (pq.size() >= 2) {
      let firstRope = pq.pop();
      let secondRope = pq.pop();

      minTotalCost += firstRope + secondRope;

      pq.push(firstRope + secondRope);
    }

    return minTotalCost;
  }
}

//? Time Complexity: O(n log n)
// (n log n) for storing elements in heap.
// Then in connecting ropes loop two pops (log n + log n) and one push (log n).

//? Space Complexity: O(n) for storing ropes in heap initially
