//? LeetCode #116
//? Populating Next Right Pointers in Each Node

// You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }
// Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

// Initially, all next pointers are set to NULL.

//? Example 1:
// Input: root = [1,2,3,4,5,6,7]
// Output: [1,#,2,3,#,4,5,6,7,#]
// Explanation: Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.

//? Example 2:
// Input: root = []
// Output: []

//? Approach
// Use DFS (Depth-First Search) to connect nodes.
// For each node:
// Set left.next = right.
// If next exists, connect right.next = next.left.
// Recursively repeat for left and right children.

var connect = function (root) {
  if (!root) return root;
  let traversal = (curr) => {
    if (curr.left) {
      curr.left.next = curr.right;
    }
    if (curr.right && curr.next) {
      curr.right.next = curr.next.left;
    }
    curr.left && traversal(curr.left);
    curr.right && traversal(curr.right);
  };
  traversal(root);
  return root;
};

//? Time Complexity = O(n * m)
//? Space Complexity = O(log n) recursion stack space (h=tree height)
