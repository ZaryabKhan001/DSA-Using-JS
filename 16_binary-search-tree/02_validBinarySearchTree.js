//? LeetCode #98
//? Validate Binary Search Tree

// Given the root of a binary tree, determine if it is a valid binary search tree (BST).

// A valid BST is defined as follows:

// The left subtree of a node contains only nodes with keys strictly less than the node's key.
// The right subtree of a node contains only nodes with keys strictly greater than the node's key.
// Both the left and right subtrees must also be binary search trees.

//? Example 1:
// Input: root = [2,1,3]
// Output: true

//? Example 2:
// Input: root = [5,1,4,null,null,3,6]
// Output: false
// Explanation: The root node's value is 5 but its right child's value is 4.

//? Approach
// Base Case: If the current node is null, return true.
// Violation Check:
// If curr.val ≤ lo or ≥ hi, it violates BST rules, so return false.
// Recursive Check:
// Left subtree must be in range (lo, curr.val)
// Right subtree must be in range (curr.val, hi)
// Return true only if both left and right subtrees are valid.

var isValidBST = function (curr, lo = null, hi = null) {
  if (!curr) return true;
  if ((lo !== null && curr.val <= lo) || (hi !== null && curr.val >= hi))
    return false;
  let isLeftBST = isValidBST(curr.left, lo, curr.val);
  let isRightBST = isValidBST(curr.right, curr.val, hi);
  return isLeftBST && isRightBST;
};

//? Time Complexity = O(n)
//? Space Complexity = O(h)(h=tree height)
