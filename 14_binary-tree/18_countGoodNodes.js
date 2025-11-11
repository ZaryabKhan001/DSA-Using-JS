//? LeetCode #1448
//? Count Good Nodes in Binary Tree

// Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

// Return the number of good nodes in the binary tree.

//? Example 1:
// Input: root = [3,1,4,3,null,1,5]
// Output: 4
// Explanation: Nodes in blue are good.
// Root Node (3) is always a good node.
// Node 4 -> (3,4) is the maximum value in the path starting from the root.
// Node 5 -> (3,4,5) is the maximum value in the path
// Node 3 -> (3,1,3) is the maximum value in the path.

//? Example 2:
// Input: root = [3,3,null,4,2]
// Output: 3
// Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.

//? Example 3:
// Input: root = [1]
// Output: 1
// Explanation: Root is considered as good.

//? Approach:
// Use DFS traversal starting from the root.
// Keep track of the maximum value seen so far (maxSeenSoFar) along the path.
// For each node:
// If node.val >= maxSeenSoFar, it’s a good node → increment count.
// Update maxSeenSoFar to Math.max(curr.val, maxSeenSoFar).
// Recurse for left and right children.
// Return the total count of good nodes.

var goodNodes = function (root) {
  let ans = 0;
  let traversal = (curr, maxSeenSoFar) => {
    if (curr.val >= maxSeenSoFar) {
      ++ans;
    }
    let currMax = Math.max(maxSeenSoFar, curr.val);
    curr.left && traversal(curr.left, currMax);
    curr.right && traversal(curr.right, currMax);
  };
  traversal(root, -Infinity);
  return ans;
};

//? Time Complexity = O(n)
//? Space Complexity = O(n) recursion stack space (h=tree height)
