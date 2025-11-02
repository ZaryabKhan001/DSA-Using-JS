//? LeetCode: 226
//? Invert Binary Tree

// Given the root of a binary tree, invert the tree, and return its root.

//? Example 1:
// Input: root = [4,2,7,1,3,6,9]
// Output: [4,7,2,9,6,3,1]

//? Example 2:
// Input: root = [2,1,3]
// Output: [2,3,1]

//? Example 3:
// Input: root = []
// Output: []

//? Approach
// Base Case: If the current node is null, return null.
// Swap the left and right child of the current node.
// Recurse on the left and right subtrees.
// Finally, return the root node (which now has inverted subtrees).

var invertTree = function (root) {
  if (!root) return root;

  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)
