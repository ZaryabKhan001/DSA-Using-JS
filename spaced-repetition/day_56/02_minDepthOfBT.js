//? LeetCode #111
//? Minimum Depth of Binary Tree

// Given a binary tree, find its minimum depth.

// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

// Note: A leaf is a node with no children.

//? Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 2

//? Example 2:
// Input: root = [2,null,3,null,4,null,5,null,6]
// Output: 5

//? Constraints:
// The number of nodes in the tree is in the range [0, 105].
// -1000 <= Node.val <= 1000

//? Approach:
// Use a recursive function to traverse the tree and find the minimum depth.
// Base Case: If the node is null, return 0 — it means we've reached beyond a leaf node.
// If the node is a leaf (no left or right child), return 1 — it means we've found a leaf node.
// Recursive Case:
// If the node has only one child, return 1 + the minimum depth of that child.
// If the node has both children, return 1 + the minimum of the left and right subtree depths.

//? Code:
var minDepth = function (root) {
    if (!root) {
        return 0;
    }
    if (!root.left && !root.right) {
        return 1;
    }

    if (!root.left) {
        return 1 + minDepth(root.right);
    }
    else if (!root.right) {
        return 1 + minDepth(root.left);
    }
    else {
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
    }
};

//? Time Complexity = O(n) for traversing all nodes in the tree
//? Space Complexity = O(n) recursive stack space