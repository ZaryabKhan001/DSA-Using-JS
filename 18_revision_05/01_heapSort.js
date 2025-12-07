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

//? Code:

let arr = [10, 4, 5, 1, 3];
function heapSort(arr) {
  let n = arr.length;
  // create a MaxHeap
  for (let i = n - 1; i >= 0; i--) {
    heapifyDown(arr, i, n);
  }
  // sort the array
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapifyDown(arr, 0, i);
  }
  return arr;
}
function heapifyDown(arr, i, n) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest != i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapifyDown(arr, largest, n);
  }
}

const sortedArray = heapSort(arr);
console.log(sortedArray);

//? Time and Space Complexity of Heap Sort

//? Space Complexity: O(1)

//? Time Complexity: (HeapifyDown) O(logn)

// Creating a maxHeap out of an array
// Total nodes: n

// Leaf nodes: n/2

// For leaf nodes, we have to do zero operations.

// Create a maxHeap out of array Time Complexity: O(n)

// Time Complexity = O(n) + O(nlogn)

//? Total: O(nlogn)

//? Time Comparison with Other Sorts

// | Algorithm      | Best Case Time | Average Case Time | Worst Case Time | Space Complexity | Stable?

// | Bubble Sort    | O(n)           | O(n²)             | O(n²)           | O(1)             | ✔ Yes    |
// | Insertion Sort | O(n)           | O(n²)             | O(n²)           | O(1)             | ✔ Yes    |
// | Merge Sort     | O(n log n)     | O(n log n)        | O(n log n)      | O(n)             | ✔ Yes    |
// | Heap Sort      | O(n log n)     | O(n log n)        | O(n log n)      | O(1)             | ✘ No     |
// | Quick Sort     | O(n log n)     | O(n log n)        | O(n²)           | O(log n)         | ✘ No     |

//? Stable Sorting Algorithm
// Sort the array by ‘age’

//             [
//                 {name: Rahul, age: 20},
//                 {name: Akshay, age: 18},
//                 {name: Simran. age: 18},
//                 {name: Sachin, age: 30}
//             ]

// Sorted Array: [{Sachin}, {Rahul}, {Akshay}, {Simran}] (sorted in decreasing order)

//? Stable Algorithm: This algorithm ensures that the same value element maintain’s relative order.

//? .Sort in JavaScript
// It ensures stable sorting.
