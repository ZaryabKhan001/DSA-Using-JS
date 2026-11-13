//? Nearly Sorted (gfg)

// Given an array arr[], where each element is at most k positions away from its correct position in the sorted order. Your task is to restore the sorted order of arr[] by rearranging the elements in place.

//? Examples:

// Input: arr[] = [2, 3, 1, 4], k = 2
// Output: [1, 2, 3, 4]

// Explanation: All elements are at most k = 2 positions away from their correct positions.
// Element 1 moves from index 2 to 0
// Element 2 moves from index 0 to 1
// Element 3 moves from index 1 to 2
// Element 4 stays at index 3

// Input: arr[]= [7, 9, 14], k = 1
// Output: [7, 9, 14]

// Explanation: All elements are already stored in the sorted order.

//? Constraints:
// 1 ≤ arr.size(), arr[i] ≤ 106
// 0 ≤ k < arr.size()

//? Thought Process:
// First thought that comes to mu mind is just to do simple sorting of the array. But that would take O(n log n).
// We can do better than that. We can use a Min Heap to solve this problem in O(n log k) time complexity.

//* Why MinHeap?
// Because every element is at most k positions away from its correct position in the sorted order.
// So, if we are at index i, the best candidate for ith position is in the range [i-k, i+k].
// So we use a MinHeap and insert the first k+1 elements in it. The smallest amoung these will be smallest element and correct element to be placed on index 0. And so on.

// Simple IDEA.
// Put the first k+1 elements in a MinHeap. The smallest element among these will be the first element in the sorted array. Remove it from the heap and put it in the original array. Now insert the next element from the original array into the heap. Again remove the smallest element from the heap and put it in the original array. Repeat this process until all elements are processed.

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
  nearlySorted(arr, k) {
    let n = arr.length;
    let index = 0;
    let pq = new MinHeap();

    // Every element is at most k positions away from its correct position.
    // So, the smallest element among the next k + 1 elements
    // must be the next element in the sorted array.

    // Insert the first k + 1 elements into the min heap.
    for (let i = 0; i <= k && i < n; i = i + 1) {
      pq.push(arr[i]);
    }

    // Now process the remaining elements one by one.
    for (let i = k + 1; i < n; i = i + 1) {
      // Insert the next element into the heap.
      pq.push(arr[i]);

      // The smallest element is now at the root.
      // Place it at its correct position in the original array.
      arr[index] = pq.pop();

      // Move to the next position.
      index++;
    }

    // No more elements are left in the input array.
    // Extract all remaining elements from the heap
    // and place them in their correct positions.
    while (pq.size() > 0) {
      arr[index] = pq.pop();
      index++;
    }

    return arr;
  }
}

//? Time Complexity: O(n log k), where n is the number of elements in the input array and k is the maximum distance an element can be from its correct position. The time complexity arises from inserting and removing elements from the min heap, which takes O(log k) time for each of the n elements.

//? Space Complexity: O(k), where k is the maximum distance an element can be from its correct position. This is the space required to store the elements in the min heap.
