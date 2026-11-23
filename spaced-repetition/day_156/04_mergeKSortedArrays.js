//? Merge k Sorted Arrays (gfg)

// Given a 2D matrix mat[][] of size n x m. Each row in the matrix is sorted in non-decreasing order, merge all the rows and return a single sorted array that contains all the elements of the matrix.

//? Examples :
// Input: mat[][] = [[1, 3, 5, 7], [2, 4, 6, 8], [0, 9, 10, 11]]
// Output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// Explanation: Merging all elements from the 3 sorted arrays and sorting them results in: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].

// Input: mat[][] = [[1, 2, 3, 4], [2, 2, 3, 4], [5, 5, 6, 6], [7, 8, 9, 9]]
// Output: [1, 2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9, 9] 
// Explanation: Merging all elements from the 4 sorted arrays and sorting them results in:[1, 2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9, 9]

//? Constraints:
// 1 ≤ n * m ≤ 105
// 0 ≤ mat[i][j] ≤ 106

//? Thought Process:
// Each array is already sorted.
// We need to merge all arrays into one sorted array.
// We need to repeatedly pick the smallest available element among all arrays.
// A Min Heap helps us get the smallest element in O(log K) time.
// Initially, insert the first element of every array into the heap.
// Extract the minimum and add it to the result.
// Insert the next element from the same array whose element we just extracted.
// Repeat until the heap becomes empty.

//? Code:
class MinHeap {
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
			if (this.heap[i][0] < this.heap[parentIndex][0]) {
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
		let min = this.heap[0];
		let lastIndex = this.heap.length - 1;
		[this.heap[0], this.heap[lastIndex]] = [this.heap[lastIndex], this.heap[0]];
		
		this.heap.pop();
		
		this.heapifyDown(0);
		return min;
	}
	heapifyDown(i) {
		let left = this.getLeftChildIndex(i);
		let right = this.getRightChildIndex(i);
		let n = this.heap.length;
		
		let smallest = i;
		if (left < n && this.heap[left][0] < this.heap[smallest][0]) {
			smallest = left;
		}
		if (right < n && this.heap[right][0] < this.heap[smallest][0]) {
			smallest = right;
		}
		if (smallest != i) {
			[this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
			this.heapifyDown(smallest);
		}
	}
	
	// peek operation
	peek() {
		if (!this.heap.length)
			return null;
		return this.heap[0];
	}
	
	isEmpty() {
		return this.heap.length == 0;
	}
};

class Solution {
	mergeArrays(mat) {
		let n = mat.length;
		let pq = new MinHeap();
		
		for (let i = 0; i < n; i = i + 1) {
			pq.insert([mat[i][0], i, 0]);
		};
		
		let result = [];
		while (!pq.isEmpty()) {
			let [val, row, col] = pq.extract();
			
			result.push(val);
			
			if (mat[row][col + 1] != undefined) {
				pq.insert([mat[row][col + 1], row, col + 1]);
			}
		};
		
		return result;
	}
}

//? Time Complexity: O(n log k)
//? Space Complexity: O(k) for heap