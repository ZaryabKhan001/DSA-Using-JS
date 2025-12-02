//? Priority Queues
// A queue which serves elements based on priority, irrespective of their insertion order.

//? Real Life Example
// In Hospital 🏥
// Patient A: Fever
// Patient B: Accident
// Patient C: Headache
// Here, Tasks with higher priority should be treated first.

// Normal Queue (FIFO) A -> B -> C
// Priority Queue (Highest Priority) B -> C -> A
// Higher the Priority faster will be treated.

//? Use Cases:
// CPU Scheduling
// Cache System
// Real Time Systems
// Dijkstra’s Algorithm

//? Implementation of Priority Queue
// 1. Sorting

// Implementation
// Whenever you add elements, ensure that the highest priority element is at the front.
// When you add elements, make sure you sort them in descending order.

// Time Complexity
// To add an element O(nlogn)

//? Sorting is one way to implement a priority queue, but it has very high time complexity.

// So, Sorting is not efficent way to handling Priority Queue.

//? 2. Heap
//? Heap and Priority Queue is not the same thing.
// Heap is Data structure.
// Priority Queue is abstract data type.
// We use Heap to implement Priority Queue.
// A Max Heap always ensures that the maximum value is at the top.

// Time Complexity: O(logn)

// This process is efficient for insertions and deletions.

//? Priority Queue’s are Two Types:
// Max Priority Queue: Where the element with the highest value has the highest priority and is served before all other elements.
// Min Priority Queue: Where the element with the lowest value has the highest priority and is served before all other elements.

//? JavaScript:
// In Javascript does not have a built in Priority Queue / Heap.

// You have to write your own implementation.

//? Priority Queue Code
// Sorting Code
// In the LeetCode environment, Javascript developers have access to a built-in priority queue feature.

// Code: Sorting
//         class PriorityQueue {
//             constructor() {
//                 this.queue = [];
//             }
//             // enqueue: Push the Value
//             enqueue(value, priority) {
//                 this.queue.push({ value, priority });
//                 this.queue.sort((a, b) => b.priority - a.priority); //Highest Priority first
//             }
//             // dequeue: Remove the Value
//             dequeue() {
//                 return this.queue.shift();  // Remove the first item (highest priority)
//             }

//             peek() {
//                 return this.queue[0];
//             }

//             isEmpty() {
//                 return this.queue.length === 0;
//             }
//         }

//         // Demo
//         const pq = new PriorityQueue();
//         pq.enqueue("Fever", 1);
//         pq.enqueue("Accident", 5);
//         pq.enqueue("Headache", 3);

//         console.log(pq.dequeue());  // Accident (priority 5)
//         console.log(pq.dequeue());  // Headache (priority 3)
