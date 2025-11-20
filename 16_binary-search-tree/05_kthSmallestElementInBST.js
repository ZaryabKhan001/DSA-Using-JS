//? LeetCode 230
//? Kth Smallest Element in a BST

// Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

//? Example 1:
// Input: root = [3,1,4,null,2], k = 1
// Output: 1

//? Example 2:
// Input: root = [5,3,6,2,4,null,null,1], k = 3
// Output: 3

//? Approach:
// In-order Traversal of BST gives sorted order of elements.
// Use a counter count = k to track how many elements we’ve visited.
// Traverse left subtree, decrement count.
// When count === 0, current node is the kth smallest → store it in ans.
// Stop traversal once we find the answer.

var kthSmallest = function (root, k) {
  let ans = null;
  let count = k;
  let traversal = (curr) => {
    if (ans != null) return;
    curr.left && traversal(curr.left);
    --count;
    if (count == 0) {
      ans = curr.val;
    }
    curr.right && traversal(curr.right);
  };
  traversal(root);
  return ans;
};

//? Time Complexity = O(n)
//? Space Complexity = O(h)(h=tree height)
