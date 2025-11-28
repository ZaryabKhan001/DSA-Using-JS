//? Heap Sort Algorithm

// Create a Max Heap from unsorted-arr: [10, 5, 3, 4, 1]
// arr[0] = maxHeap

//? Steps:
// Swap the first and last value.
// Reduce the size of heap.
// Do HeapifyDown.
// Keep repeating steps 2 to 4 until the array is sorted.

// Sorted Array: [1, 3, 4, 5, 10]

//? Space Complexity: O(n) Taking an extra space.

// Create a MaxHeap out of Array: Without an Extra SpaceO(1)
// Unsorted Array: [4, 10, 5, 3, 1]

// We will start from the end of the array and heapify down every node.
// Ignore the leaf nodes, as heapify does not affect them.
// Solution:

// Example
// arr = [3, 8, 2, 10, 5, 6]

// Solution:

// arr = [10, 8, 6, 3, 5, 2] As this array created as maxHeap.
