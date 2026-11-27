//? LeetCode #692
//? Top K Frequent Words

// Given an array of strings words and an integer k, return the k most frequent strings.

// Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.

//? Example 1:
// Input: words = ["i","love","leetcode","i","love","coding"], k = 2
// Output: ["i","love"]
// Explanation: "i" and "love" are the two most frequent words.
// Note that "i" comes before "love" due to a lower alphabetical order.

//? Example 2:
// Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
// Output: ["the","is","sunny","day"]
// Explanation: "the", "is", "sunny" and "day" are the four most frequent words, with the number of occurrence being 4, 3, 2 and 1 respectively.

//? Constraints:
// 1 <= words.length <= 500
// 1 <= words[i].length <= 10
// words[i] consists of lowercase English letters.
// k is in the range [1, The number of unique words[i]]

//? Follow-up: Could you solve it in O(n log(k)) time and O(n) extra space?

//? Thought Process:
// Top k frequent words nikalny hain.

//* Approach 01:
// Get frequencies of all elements and sort the frequencies in lexicographical order.
// And at the end, just return k elements. (O(n) + O(nlogn))

//* Approach 02:
// Use heap. frequency tu chahiyee e chahiyee right. Frequency nikal lo. Then, use min heap simply pair wise.
// Frequency and actual element ko heap me dalty jao, jab heap size k cross kary tu pop kardo. And at last just elements ko return krdo, array me. (O(n) + O(nlogk)). Bs khyal is chiz ka rkhna hai k aplexicographical chizon ko achy sy manage karein.

//? Approach 01:
var topKFrequent = function (words, k) {
  let freq = {};

  for (let word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }

  let keys = Object.entries(freq).sort((a, b) => {
    if (a[1] !== b[1]) {
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });

  let result = [];
  for (let i = 0; i < k; i = i + 1) {
    result.push(keys[i][0]);
  }

  return result;
};

//? Approach 02:
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

  hasHigherPriority(a, b) {
    if (a[0] != b[0]) {
      return a[0] < b[0];
    }

    return a[1] > b[1];
  }

  enqueue(element) {
    this.heap.push(element);

    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      let parentIndex = this.getParentIndex(currentIndex);

      if (
        this.hasHigherPriority(this.heap[currentIndex], this.heap[parentIndex])
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
      this.hasHigherPriority(this.heap[left], this.heap[smallest])
    ) {
      smallest = left;
    }

    if (
      right < this.heap.length &&
      this.hasHigherPriority(this.heap[right], this.heap[smallest])
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

var topKFrequent = function (words, k) {
  let n = words.length;
  let freq = {};

  for (let word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }

  let pq = new CustomMinPriorityQueue();
  for (let key in freq) {
    pq.enqueue([freq[key], key]);

    if (pq.size() > k) {
      pq.dequeue();
    }
  }

  let result = [];
  while (pq.size() > 0) {
    result.push(pq.dequeue()[1]);
  }

  return result.reverse();
};

//? Time Complexity: O(n log k)
//? Space Complexity: O(k) k is the max length of heap.
