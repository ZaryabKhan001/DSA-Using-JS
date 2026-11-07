//? Huffman Encoding

// Given a string s of distinct characters and their corresponding frequency f[ ] i.e. character s[i] has f[i] frequency.

// Build the Huffman tree and return all the huffman codes in preorder traversal of the tree.

// Note: While merging, if two nodes have the same value (frequency), then the node whose subtree contains the character that appears earlier in the string s will be taken on the left of the Binary Tree and the other one to the right. Otherwise, the node with smaller value will be taken on the left of the subtree and the other one to the right.

//? Examples:

// Input: s = "abcdef", f[] = [5, 9, 12, 13, 16, 45]
// Output: [0, 100, 101, 1100, 1101, 111]
// Explanation:

// HuffmanCodes will be:
// f : 0
// c : 100
// d : 101
// a : 1100
// b : 1101
// e : 111

//? Constraints:
// 1 ≤ s.size() = f.size() ≤ 26

//? Thought Process:
// Thora mushkl hai, coder army ki video dekh lo. Best hai.

//? Code:
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftIndex(index) {
    return 2 * index + 1;
  }

  getRightIndex(index) {
    return 2 * index + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // Compare two nodes
  compare(a, b) {
    if (a.frequency != b.frequency) {
      return a.frequency - b.frequency;
    }

    return a.minIndex - b.minIndex;
  }

  insert(node) {
    this.heap.push(node);

    let index = this.heap.length - 1;

    while (
      index > 0 &&
      this.compare(this.heap[index], this.heap[this.getParentIndex(index)]) < 0
    ) {
      let parentIndex = this.getParentIndex(index);

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  extractMin() {
    if (this.heap.length == 0) {
      return null;
    }

    if (this.heap.length == 1) {
      return this.heap.pop();
    }

    let min = this.heap[0];

    this.heap[0] = this.heap.pop();

    this.heapify(0);

    return min;
  }

  heapify(index) {
    let smallest = index;
    let left = this.getLeftIndex(index);
    let right = this.getRightIndex(index);

    if (
      left < this.heap.length &&
      this.compare(this.heap[left], this.heap[smallest]) < 0
    ) {
      smallest = left;
    }

    if (
      right < this.heap.length &&
      this.compare(this.heap[right], this.heap[smallest]) < 0
    ) {
      smallest = right;
    }

    if (smallest != index) {
      this.swap(index, smallest);
      this.heapify(smallest);
    }
  }

  size() {
    return this.heap.length;
  }
}

// Huffman Node
class HuffmanNode {
  constructor(data, frequency, minIndex) {
    this.data = data;
    this.frequency = frequency;
    this.minIndex = minIndex;

    this.left = null;
    this.right = null;
  }
}

class Solution {
  huffmanCodes(s, f) {
    let minHeap = new MinHeap();

    // Insert all characters into Min Heap
    for (let i = 0; i < s.length; i = i + 1) {
      let node = new HuffmanNode(s[i], f[i], i);

      minHeap.insert(node);
    }

    // Build Huffman Tree
    while (minHeap.size() > 1) {
      // Pick two minimum nodes
      let left = minHeap.extractMin();
      let right = minHeap.extractMin();

      // Create parent node
      let parent = new HuffmanNode(
        "$",
        left.frequency + right.frequency,
        Math.min(left.minIndex, right.minIndex),
      );

      parent.left = left;
      parent.right = right;

      minHeap.insert(parent);
    }

    // Generate Huffman Codes
    // Generate Huffman Codes
    let root = minHeap.extractMin();

    let result = [];

    function generateCodes(node, code) {
      if (node == null) {
        return;
      }

      // Leaf node
      if (node.left == null && node.right == null) {
        result.push(code);
        return;
      }

      // Left = 0
      generateCodes(node.left, code + "0");

      // Right = 1
      generateCodes(node.right, code + "1");
    }

    if (root != null) {
      // Special case: only one character
      if (root.left == null && root.right == null) {
        result.push("0");
      } else {
        generateCodes(root, "");
      }
    }

    return result;
  }
}

//? Time Complexity: O(N log N)
// Breakdown:
// 1. Insert all characters into Min Heap: O(N log N)
// 2. Build Huffman Tree:
//    - We perform (N-1) merging operations.
//    - Each operation extracts two minimum nodes and inserts one parent.
//    - Each heap operation takes O(log N).
//    - Total: O(N log N).
// 3. Generate Huffman Codes using DFS: O(N) tree traversal, excluding the cost of creating output strings.
// Overall Time: O(N log N)

//? Space Complexity: O(N)
// 1. Min Heap: O(N)
// 2. Huffman Tree: O(N), because a full binary tree with N leaves has (2N-1) nodes.
// 3. DFS recursion stack: O(N) in the worst case.
// 4. Result array: O(N) code strings, excluding their total character storage.
