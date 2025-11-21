//? Complete Binary Tree:
// A Complete Binary Tree is one in which, during level order traversal, there are no missing nodes. All levels are completely filled except possibly the last level, which is filled from left to right.

//? Full Binary Tree:
// Every full binary tree is always a complete binary tree.
// At every level, all the nodes are present.
// You need to fill all the nodes at each level before moving to the next.
// The number of nodes at each level is2n n is the level number (starting from 0).
// Important Points to Remember:

// A complete binary tree is a type of binary tree with specific structural properties. These properties are:
// All levels are completely filled, except possibly the last level.
// This means that every level of the tree, from the root down to the second-to-last level, must contain the maximum possible number of nodes for that level. For example: level 0 (the root) has 1 node, level 1 has 2 nodes, level 2 has 4 nodes, and so on.

// Nodes at the last level are as far left as possible.
// If the last level is not completely filled, the nodes present in that level must be arranged contiguously from the left side, with no gaps. There cannot be a right child without a corresponding left child at the same level.

// In simpler terms, a complete binary tree looks like a perfectly filled binary tree,
// Except that the bottom-most row might have some empty spots, but only on the right side. This structure ensures compact and efficient representation, often used in data structures like heaps.

// Heap
// All the Heaps are complete Binary Tree.

//? Heaps are two types:

//? Min Heap:
// All the parent(value) should be less than and equal (<=) to children’s smallest element on the root.

//? Max Heap:
// The parent(value) should be greater than and equal (>=) to children ’s Largest element on the root.
// Advantages & Disadvantages of Heap:

//? Advantages:
// Max Heap: If we have to find largest elements inside maxHeap: Time Complexity: O(1) Because it always on root, return root.val
// Insert: O(logn)
// Delete: O(logn)
// Min Heap: If we have to find smallest elements inside minHeap: Time Complexity: O(1)
// Heap: Time Complexity: O(nlogn)

//? Disadvantages:
// Slightly tricky to code.
// Lack of Flexibility.
