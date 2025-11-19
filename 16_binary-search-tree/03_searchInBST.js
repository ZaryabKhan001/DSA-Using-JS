//? LeetCode #700
//? Search in a Binary Search Tree

// You are given the root of a binary search tree (BST) and an integer val.

// Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.

//? Example 1:
// Input: root = [4,2,7,1,3], val = 2
// Output: [2,1,3]

//? Example 2:
// Input: root = [4,2,7,1,3], val = 5
// Output: []

//? Approach 01: Top-Down

var searchBST = function (root, val) {
  let match = null;
  function traverse(curr) {
    if (!curr) return;
    if (curr.val === val) {
      match = curr;
    }
    if (val > curr.val) {
      traverse(curr.right);
    } else {
      traverse(curr.left);
    }
  }
  traverse(root);
  return match;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)

//? Approach 02: Bottom-Up

var searchBST = function (root, val) {
  if (!root || root.val === val) return root;

  return val > root.val
    ? searchBST(root.right, val)
    : searchBST(root.left, val);
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
