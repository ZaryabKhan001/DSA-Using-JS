//? LeetCode #112
//? Path Sum

// Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.
// A leaf is a node with no children.

// Example 1:
// Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
// Output: true
// Explanation: The root-to-leaf path with the target sum is shown.

// Example 2:
// Input: root = [1,2,3], targetSum = 5
// Output: false
// Explanation: There are two root-to-leaf paths in the tree:
// (1 --> 2): The sum is 3.
// (1 --> 3): The sum is 4.
// There is no root-to-leaf path with sum = 5.

// Example 3:
// Input: root = [], targetSum = 0
// Output: false
// Explanation: Since the tree is empty, there are no root-to-leaf paths.

//? Approach 1: (Top-Down)
// At each node, we add the current node's value to the running sum (currSum).
// If we reach a leaf node and the sum equals the targetSum, we update ans = true.
// We recursively check both left and right subtrees.

var hasPathSum = function (root, targetSum) {
  if (!root) return false;
  let ans = false;
  let traverse = (curr, currSum) => {
    let newSum = currSum + curr.val;
    if (!curr.left && !curr.right) {
      if (newSum === targetSum) {
        ans = ans || true;
      }
    }
    curr.left && traverse(curr.left, newSum);
    curr.right && traverse(curr.right, newSum);
  };
  traverse(root, 0);
  return ans;
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)

//? Approach 2: Bottom Up
// Base Case:
// If the node is null, return false.
// If it’s a leaf node (no left or right child), check if node.val === targetSum.
// Recursive Case:
// Subtract the current node's value from targetSum.
// Recursively check left and right subtrees with the updated sum.
// Return:
// Return true if any path in left or right subtree matches the condition.

var hasPathSum = function (root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }
  let leftSubTreeHasPathSum = hasPathSum(root.left, targetSum - root.val);
  let rightSubTreeHasPathSum = hasPathSum(root.right, targetSum - root.val);

  return leftSubTreeHasPathSum || rightSubTreeHasPathSum;
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)
