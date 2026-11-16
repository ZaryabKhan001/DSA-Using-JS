//? Sort by Decreasing Frequency (gfg)

// Given an array of integers arr[], sort the array according to frequency of elements, i.e. elements that have higher frequency comes first. If the frequencies of two elements are the same, the smaller number comes first.

//? Examples :

// Input: arr[] = [5, 5, 4, 6, 4]
// Output: [4, 4, 5, 5, 6]
// Explanation: The highest frequency here is 2. Both 5 and 4 have that frequency. Now since the frequencies are the same the smaller element comes first. So 4 4 comes first then comes 5 5. Finally comes 6. The output is 4 4 5 5 6.

// Input: arr[] = [9, 9, 9, 2, 5]
// Output: [9, 9, 9, 2, 5]
// Explanation: The highest frequency here is 3. Element 9 has the highest frequency So 9 9 9 comes first. Now both 2 and 5 have the same frequency. So we print smaller elements first. The output is 9 9 9 2 5.

//? Constraints:
// 1 ≤ arr.size(), arr[i] ≤ 105

//? Thought Process:
// 1. First, count the frequency of every element using a hash map.

// 2. Now we have unique elements with their frequencies.

// 3. We need to sort elements based on two conditions:
//    - Higher frequency comes first.
//    - If frequencies are equal, smaller number comes first.

// 4. We could use sorting, but sorting takes O(n log n).

// 5. We can also use a Max Heap because we repeatedly need
//    the element with the highest priority.

// 6. Define heap priority:
//    - Higher frequency = Higher priority.
//    - Smaller number = Higher priority when frequencies are equal.

// 7. Insert all unique elements into the Max Heap.

// 8. Keep extracting the highest-priority element.

// 9. Add that element to the result according to its frequency.

// 10. Return the result.

// Time Complexity: O(n + k log k)
// Space Complexity: O(n)

// n = Total elements
// k = Number of unique elements

//? Code:
class MaxPriorityQueue {
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

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  enqueue(element) {
    this.heap.push(element);

    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      let parentIndex = this.getParentIndex(currentIndex);

      if (
        this.heap[parentIndex][0] < this.heap[currentIndex][0] ||
        (this.heap[parentIndex][0] == this.heap[currentIndex][0] &&
          this.heap[parentIndex][1] > this.heap[currentIndex][1])
      ) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  dequeue() {
    if (this.heap.length == 0) {
      return undefined;
    }

    if (this.heap.length == 1) {
      return this.heap.pop();
    }

    let max = this.heap[0];

    this.heap[0] = this.heap.pop();

    this.heapifyDown(0);

    return max;
  }

  heapifyDown(index) {
    let largest = index;

    let left = this.getLeftChildIndex(index);
    let right = this.getRightChildIndex(index);

    if (
      left < this.heap.length &&
      (this.heap[left][0] > this.heap[index][0] ||
        (this.heap[left][0] == this.heap[index][0] &&
          this.heap[left][1] < this.heap[index][1]))
    ) {
      largest = left;
    }

    if (
      right < this.heap.length &&
      (this.heap[right][0] > this.heap[largest][0] ||
        (this.heap[right][0] == this.heap[largest][0] &&
          this.heap[right][1] < this.heap[largest][1]))
    ) {
      largest = right;
    }

    if (largest != index) {
      this.swap(index, largest);
      this.heapifyDown(largest);
    }
  }

  front() {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length == 0;
  }
}

class Solution {
  sortByFreq(arr) {
    let freq = {};
    for (let i = 0; i < arr.length; i = i + 1) {
      freq[arr[i]] = (freq[arr[i]] || 0) + 1;
    }

    let pq = new MaxPriorityQueue();

    for (let key in freq) {
      pq.enqueue([freq[key], Number(key)]);
    }

    let result = [];

    while (pq.size() > 0) {
      let element = pq.dequeue();
      let freq = element[0];
      let value = element[1];

      for (let i = 1; i <= freq; i = i + 1) {
        result.push(value);
      }
    }

    return result;
  }
}

//? Time Complexity: O(n + k log k)
// Operation	Time Complexity
// Frequency counting	O(n)
// Enqueue k elements	O(k log k)
// Dequeue k elements	O(k log k)
// Building result array	O(n)

// Overall Time Complexity:
// O(n + klog k)

//? Space Complexity: O(n + k)
// Data Structure	Space
// Frequency object	O(k)
// Priority Queue (Max Heap)	O(k)
// Result array	O(n)
