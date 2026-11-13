//? k Largest Elements (gfg)

// Given an array arr[] of positive integers and an integer k, Your task is to return k largest elements in decreasing order.

//? Examples:

// Input: arr[] = [12, 5, 787, 1, 23], k = 2
// Output: [787, 23]
// Explanation: 1st largest element in the array is 787 and second largest is 23.

// Input: arr[] = [1, 23, 12, 9, 30, 2, 50], k = 3
// Output: [50, 30, 23]
// Explanation: Three Largest elements in the array are 50, 30 and 23.

// Input: arr[] = [12, 23], k = 1
// Output: [23]
// Explanation: 1st Largest element in the array is 23.

//? Constraints:
// 1 ≤ arr[i] ≤ 106
// 1 ≤ k ≤ arr.size()

//? Thought Process:
//* Approach 1: Sorting
// 1. Sort the entire array in descending order.
// 2. The largest elements will come first.
// 3. Return the first k elements.

// Time: O(n log n)
// Space: Depends on sorting implementation

//* Approach 2: Min Heap
// 1. We need to find the k largest elements.
// 2. Create a Min Heap of size k.
// 3. Traverse the entire array.
// 4. Insert each element into the Min Heap.
// 5. If heap size becomes greater than k,
//    remove the smallest element (root of Min Heap).

//* 6. Why remove the smallest?
//    Because we only need k largest elements.
//    So we remove the smallest element whenever
//    we have more than k elements.

//* 7. After processing the entire array,
//    our Min Heap contains the k largest elements.

//* 8. But these elements are not necessarily sorted.

//* 9. Sort the remaining k elements in descending order.

//* 10. Return the result.

// Time: O(n log k + k log k)
// Space: O(k)

//* Why is Heap better?

//* Sorting approach:
// We sort all n elements, even though we only need k elements.

//* Heap approach:
// We maintain only k elements.
// We remove smaller elements as we traverse the array.
// At the end, we only sort k elements.

//* Heap is more efficient when k is much smaller than n.

// If k is close to n, sorting the entire array
// might be a simpler choice.

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
  kLargest(arr, k) {
    let n = arr.length;
    let minHeap = new MinHeap();

    for (let i = 0; i < n; i = i + 1) {
      minHeap.push(arr[i]);

      if (minHeap.size() > k) {
        minHeap.pop();
      }
    }
    return minHeap.heap.sort((a, b) => b - a);
  }
}

//? Time Complexity: O(n log k) + O(k log k) for sorting the heap at the end, which simplifies to O(n log k) for large n and small k.
//? Space Complexity: O(k) for the heap.
