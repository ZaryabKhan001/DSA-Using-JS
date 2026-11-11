//? Kth Smallest (gfg)

// Given an integer array arr[] and an integer k, find and return the kth smallest element in the given array.

//? Examples:

// Input: arr[] = [10, 5, 4, 3, 48, 6, 2, 33, 53, 10], k = 4
// Output: 5
// Explanation: 4th smallest element in the given array is 5.

// Input: arr[] = [7, 10, 4, 3, 20, 15], k = 3
// Output: 7
// Explanation: 3rd smallest element in the given array is 7.

//? Constraints:
// 1 ≤ arr.size(), arr[i] ≤ 105
// 1 ≤ k ≤ arr.size()

//? Thought Process:
// Simple approach is to sort the whole array and return k-1 index.
// But it is not a good approach because it takes O(n log n).

// Better Solution is to use a max heap of size k. We can insert the first k elements in the max heap and then for the rest of the elements, we can check if the current element is smaller than the largest element in the max heap. If it is, we can remove the largest element from the max heap and insert the current element. Finally, we can return the largest element in the max heap which will be the kth smallest element in the array.

// Why heap see if we divide arr into 2 parts, left part will have k smallest elements and right part will have n-k largest elements. So we can use max heap of size k to store the k smallest elements and the largest element in the max heap will be the kth smallest element in the array.

// Heap will contain the k smallest elements in the array and the largest element in the heap will be the kth smallest element in the array.

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
		if (this.heap.length < 1)
			return null;
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
		if (!this.heap.length)
			return null;
		return this.heap[0];
	}
}

class Solution {
	kthSmallest(arr, k) {
		let n = arr.length;
		let pq = new MaxHeap();
		for (let i = 0; i < k; i = i + 1) {
			pq.insert(arr[i]);
		};
		
		for (let i = k; i < n; i = i + 1) {
			let largestInPQ = pq.peek();
			if (arr[i] >= largestInPQ) {
				continue;
			}
			else {
				pq.extract();
				pq.insert(arr[i]);
			}
		}
		
		return pq.peek();
	}
}

//? Time Complexity: O(n log k) where n is the size of the array and k is the given integer.
//? Space Complexity: O(k) for the max heap of size k.