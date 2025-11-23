//? Array representation of Heap:
// We are using array’s to represent heap.
// We can also represent heap using pointers or references.
//? MinHeap Representation
// Using Level Order traversal

// arr[0] = smallest_Element
// smallest_Element =  O(1) Time Complexity
// heap[0] = O(1)

//? Binary Tree representation using Array
// All the empty spaces are represented by '#'

//? MaxHeap Representation

// maxElement = heap[0]

// Have to find Children of ith node:
// Formula’s based on index 1
// left = 2 * i

// right = 2 * i + 1

// parent = ith

// Formula’s based on index 0
// left = (2*i + 1)

// right = (2*i + 2)

// parent = (i - 1) / 2

//? Operations in Heap
// Insert
// We need to make sure that we follow these two rules:
// Complete Binary Tree
// Parent value <= children

// Extract / Delete
// Only Extract (delete) from the root/top/front.

// In minHeap: The minimum value will be extracted from the heap.

// In maxHeap: The maximum value will be extracted from the heap.

// Peek: This also happens at top.

// Inserting Elements to a Heap

//? MinHeap:
// Insert 1.

// Always ensure that your heap is a complete binary tree.
// All Parent <= Children

//? Heapify
// The process of moving these values up and mainting the property of heap is known as Heapify. Basically, restructuring or rearranging the elements inside the binary tree so that it becomes a Heap.
