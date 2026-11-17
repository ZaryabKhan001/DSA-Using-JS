//? Sum Between k1'th and k2'th Smallest (gfg)

// Given an array arr[] of positive integers and two integers k1 and k2, find the sum of all array elements whose values lie between the k1-th smallest and the k2-th smallest (both k1th and k2th smallest are not included) of the array.

//? Examples :

// Input: arr[] = [20, 8, 22, 4, 12, 10, 14], k1 = 3, k2 = 6
// Output: 26
// Explanation: 3rd smallest is 10 and 6th smallest is 20. Sum of all between k1-th and k2-th is 12 + 14 = 26.

// Input: arr[] = [1, 2, 3, 4, 5], k1 = 1, k2 = 5
// Output: 9
// Explanation: 1st smallest is 1 and 5th smallest is 5. Sum of all between k1-th and k2-th is 2 + 3 + 4 = 9.

// Input: arr[] = [5, 6, 7], k1 = 2, k2 = 3
// Output: 0
// Explanation: The 2nd smallest is 6 and the 3rd smallest is 7. Since there are no strictly between 6 and 7, the required sum is 0.

//? Constraints:
// 2 ≤ arr.size() ≤ 105
// 1 ≤ arr[i] ≤ 2*104
// 1 ≤ k1< k2 ≤ arr.size()

//? Thought Process:
// Simple approach is to sort the whole array.
// Write loop from k1 to k2, and calculate sum along the way.
// it takes O(n log n)

//* Better Approach:
// Use heap (Max Priority Queue).
// Find out k1 smallest element and k2 smallest element.
// Traverse over the array and check each element if it is greater than k1 smallest element and smaller than k2 smallest element. Calculate sum.

//? Code:
class MaxHeap {
  constructor() {
    this.heap = [];
  }
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  getRightChildIndex(i) {
    return 2 * i + 2;
  }
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  insert(val) {
    this.heap.push(val);
    let lastIndex = this.heap.length - 1;
    this.heapifyUp(lastIndex);
  }

  heapifyUp(i) {
    while (i > 0) {
      let parentIndex = this.getParentIndex(i);
      if (this.heap[i] > this.heap[parentIndex]) {
        [this.heap[i], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[i],
        ];
        i = parentIndex;
      } else break;
    }
  }
  extract() {
    if (this.heap.length < 1) return null;
    let max = this.heap[0];
    let lastIndex = this.heap.length - 1;
    [this.heap[0], this.heap[lastIndex]] = [this.heap[lastIndex], this.heap[0]];

    this.heap.pop();

    this.heapifyDown(0);
    return max;
  }
  heapifyDown(i) {
    let left = this.getLeftChildIndex(i);
    let right = this.getRightChildIndex(i);
    let n = this.heap.length;

    let largest = i;
    if (left < n && this.heap[left] > this.heap[largest]) {
      largest = left;
    }
    if (right < n && this.heap[right] > this.heap[largest]) {
      largest = right;
    }
    if (largest != i) {
      [this.heap[largest], this.heap[i]] = [this.heap[i], this.heap[largest]];
      this.heapifyDown(largest);
    }
  }

  // peek operation
  peek() {
    if (!this.heap.length) return null;
    return this.heap[0];
  }
}

class Solution {
  kthSmallest(arr, k) {
    let n = arr.length;
    let pq = new MaxHeap();
    for (let i = 0; i < k; i = i + 1) {
      pq.insert(arr[i]);
    }

    for (let i = k; i < n; i = i + 1) {
      let largestInPQ = pq.peek();
      if (arr[i] >= largestInPQ) {
        continue;
      } else {
        pq.extract();
        pq.insert(arr[i]);
      }
    }

    return pq.peek();
  }

  sumBetweenK1K2(arr, k1, k2) {
    let first = this.kthSmallest(arr, k1);
    let second = this.kthSmallest(arr, k2);

    let sum = 0;
    for (let i = 0; i < arr.length; i = i + 1) {
      if (arr[i] < second && arr[i] > first) {
        sum += arr[i];
      }
    }

    return sum;
  }
}

//* It does not work when arr has duplicates.
// arr=[10, 8, 8, 16, 16, 15, 20, 4] k1=2 k2=6
// For this example, if we sort it [4, 8, 8, 10, 15, 16, 16, 20].
// Actual answer is 33 but we got 25. Because we take only elements > first && < second.
//* If we try >=first && <=second. So, it make things worse, it takes all elements equal to first and second it does not check boundaries of k1 and k2.

//? Better Approach:
// Min heap use krlo.
// Sary elements push kro heap me.
// 0 to k1 smaller elements pop krdo.
// (k1 sy ly k k2 - 1) smallest elements ko pop kro and sum update karty jao.

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
  sumBetweenK1K2(arr, k1, k2) {
    let pq = new MinHeap();
    for (let i = 0; i < arr.length; i = i + 1) {
      pq.push(arr[i]);
    }

    let sum = 0;

    // remove first k1 elements
    for (let i = 0; i < k1; i++) {
      pq.pop();
    }

    // take elements from k1+1 to k2-1
    for (let i = k1; i < k2 - 1; i++) {
      sum += pq.pop();
    }

    return sum;
  }
}

//? Time Complexity: O(n log n)
//? Space Complexity: O(n) for storing all array elements in heap.
