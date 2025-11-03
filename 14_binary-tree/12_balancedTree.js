//? LeetCode #110
//? Balanced Binary Tree

// Given a binary tree, determine if it is height-balanced.

//? Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: true

//? Example 2:
// Input: root = [1,2,2,3,3,null,null,4,4]
// Output: false

//? Example 3:
// Input: root = []
// Output: true

//? Approach
// Use post-order traversal to compute the height of left and right subtrees.
// At each node, check if the height difference is more than 1.
// If yes, set a global flag (ans = false).
// Return height = 1 + max(leftHeight, rightHeight) at each step.
// Finally, return the ans flag

var isBalanced = function (root) {
  let ans = true;
  let calculateHeight = (curr) => {
    if (!curr) return 0;
    let leftHeight = calculateHeight(curr.left);
    let rightHeight = calculateHeight(curr.right);
    if (Math.abs(leftHeight - rightHeight) > 1) {
      ans = ans && false;
    }
    return 1 + Math.max(leftHeight, rightHeight);
  };
  calculateHeight(root);
  return ans;
};

//? Time Complexity = O(n)
//? Space Complexity = O(h) recursion stack space (h=tree height)
