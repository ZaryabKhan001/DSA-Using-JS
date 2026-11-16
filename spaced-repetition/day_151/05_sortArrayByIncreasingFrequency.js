//? LeetCode #1636
//? Sort Array by Increasing Frequency

// Given an array of integers nums, sort the array in increasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order.

// Return the sorted array.

//? Example 1:
// Input: nums = [1,1,2,2,2,3]
// Output: [3,1,1,2,2,2]
// Explanation: '3' has a frequency of 1, '1' has a frequency of 2, and '2' has a frequency of 3.

//? Example 2:
// Input: nums = [2,3,1,3,2]
// Output: [1,3,3,2,2]
// Explanation: '2' and '3' both have a frequency of 2, so they are sorted in decreasing order.

//? Example 3:
// Input: nums = [-1,1,-6,4,5,-6,1,4,1]
// Output: [5,-1,4,4,-6,-6,1,1,1]

//? Constraints:
// 1 <= nums.length <= 100
// -100 <= nums[i] <= 100

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
//    - Smaller frequency = Higher priority.
//    - Larger number = Higher priority when frequencies are equal.

// 7. Insert all unique elements into the Min Heap.

// 8. Keep extracting the highest-priority element.

// 9. Add that element to the result according to its frequency.

// 10. Return the result.

// Time Complexity: O(n + k log k)
// Space Complexity: O(n)

// n = Total elements
// k = Number of unique elements

//? Code:
class CustomMinPriorityQueue {
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
        this.heap[parentIndex][0] > this.heap[currentIndex][0] ||
        (this.heap[parentIndex][0] == this.heap[currentIndex][0] &&
          this.heap[parentIndex][1] < this.heap[currentIndex][1])
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

    let min = this.heap[0];

    this.heap[0] = this.heap.pop();

    this.heapifyDown(0);

    return min;
  }

  heapifyDown(index) {
    let smallest = index;

    let left = this.getLeftChildIndex(index);
    let right = this.getRightChildIndex(index);

    if (
      left < this.heap.length &&
      (this.heap[left][0] < this.heap[smallest][0] ||
        (this.heap[left][0] == this.heap[smallest][0] &&
          this.heap[left][1] > this.heap[smallest][1]))
    ) {
      smallest = left;
    }

    if (
      right < this.heap.length &&
      (this.heap[right][0] < this.heap[smallest][0] ||
        (this.heap[right][0] == this.heap[smallest][0] &&
          this.heap[right][1] > this.heap[smallest][1]))
    ) {
      smallest = right;
    }

    if (smallest != index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
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

var frequencySort = function (nums) {
  let freq = {};
  for (let i = 0; i < nums.length; i = i + 1) {
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;
  }

  let pq = new CustomMinPriorityQueue();

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
};

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
// Priority Queue (Min Heap)	O(k)
// Result array	O(n)


//? Simple Solution: No need to use Heap.
var frequencySort = function (nums) {
    let freq = {};
    for (let i = 0; i < nums.length; i = i + 1) {
        freq[nums[i]] = (freq[nums[i]] || 0) + 1;
    }

    let result = [];
    let keys = Object.keys(freq).sort((a, b) => {
        if (freq[a] === freq[b]) {
            return b - a;
        }
        return freq[a] - freq[b];
    });
    for (let key of keys) {
        let freqq = freq[key];
        let value = Number(key);

        for (let i = 1; i <= freqq; i = i + 1) {
            result.push(value);
        }
    }

    return result;
};

//? Time: O(n + k log k)
// Operation	Complexity
// Frequency counting	O(n)
// Extracting keys	O(k)
// Sorting keys	O(k log k)
// Building result	O(n)

//? Space: O(n + k) = O(n)
// Frequency object	O(k)
// Result array	O(n)