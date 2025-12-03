//? LeetCode #215
//? Kth Largest Element in an Array

// Given an integer array nums and an integer k, return the kth largest element in the array.

// Note that it is the kth largest element in the sorted order, not the kth distinct element.

// Can you solve it without sorting?

//? Example 1:
// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5

//? Example 2:
// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4

//? Approach:
// Use a min-heap to store the largest k elements.
// Traverse each number in nums and push it into the heap.
// If the heap size exceeds k, remove the smallest element (heap root).
// After processing all elements, the heap’s top (smallest in the heap) will be the k-th largest in the array.

var findKthLargest = function (nums, k) {
  let pq = new MinPriorityQueue();
  for (let i = 0; i < k; i = i + 1) {
    pq.dequeue();
  }
  return pq.front();
};

//? Time Complexity = O(n log k)
//? Space Complexity = O(K)
