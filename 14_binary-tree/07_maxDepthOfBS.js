//? LeetCode #104
//? Maximum Depth of Binary Tree

// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 3

// Example 2:
// Input: root = [1,null,2]
// Output: 2

//? Approach 1: Top-Down
// Start with the root node at depth 1.
// Traverse left and right children, increasing depth at each level.
// Keep track of the maximum depth encountered during traversal.
// Edge Case: If tree is empty (root is null), return 0.

var maxDepth = function (root) {
  if (!root) return 0;
  let maxDepth = 0;
  let traversal = (curr, depth) => {
    maxDepth = Math.max(maxDepth, depth);
    curr.left && traversal(curr.left, depth + 1);
    curr.right && traversal(curr.right, depth + 1);
  };
  traversal(root, 1);
  return maxDepth;
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)

//? Approach 2: Bottom-up
// Base Case: If the node is null, return 0 — it means we've reached beyond a leaf node.
// Recursive Case:
// Recursively find the max depth of the left subtree.
// Recursively find the max depth of the right subtree.
// Return 1 + the maximum of left and right subtree depths.

var maxDepth = function (root) {
  if (!root) return 0;
  let leftMax = maxDepth(root.left);
  let rightMax = maxDepth(root.right);
  return 1 + Math.max(leftMax, rightMax);
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)
