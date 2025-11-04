//? LeetCode #543
//? Diameter of Binary Tree

// Given the root of a binary tree, return the length of the diameter of the tree.

// The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

// The length of a path between two nodes is represented by the number of edges between them.

//? Example 1:
// Input: root = [1,2,3,4,5]
// Output: 3
// Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

//? Example 2:
// Input: root = [1,2]
// Output: 1

//? Approach
// Use DFS (Depth-First Search) to calculate the depth of each node.
// At each node:
// Calculate the left and right subtree depths.
// The diameter through that node = leftDepth + rightDepth.
// Update maxDiameter if this is the largest so far.
// Return the maximum diameter found during the traversal.

var diameterOfBinaryTree = function (root) {
  let maxDiameter = 0;
  let findDepth = (curr) => {
    if (!curr) return 0;
    let leftDepth = findDepth(curr.left);
    let rightDepth = findDepth(curr.right);
    let currDiameter = leftDepth + rightDepth;
    maxDiameter = Math.max(currDiameter, maxDiameter);
    return 1 + Math.max(leftDepth, rightDepth);
  };
  findDepth(root);
  return maxDiameter;
};

//? Time Complexity = O(n)
//? Space Complexity = O(h) recursion stack space (h=tree height)
