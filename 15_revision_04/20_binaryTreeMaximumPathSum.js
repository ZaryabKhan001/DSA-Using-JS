//? LeetCode #124
//? Binary Tree Maximum Path Sum

// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

// The path sum of a path is the sum of the node's values in the path.

// Given the root of a binary tree, return the maximum path sum of any non-empty path.

//? Example 1:
// Input: root = [1,2,3]
// Output: 6
// Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

//? Example 2:
// Input: root = [-10,9,20,null,null,15,7]
// Output: 42
// Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

//? Approach:
// At each node, calculate:
// maxLeft: max gain from the left subtree (0 if negative)
// maxRight: max gain from the right subtree (0 if negative)
// The local max path passing through current node is: curr.val + maxLeft + maxRight
// Update the global max sum (maxSumPath) with the local max.
// Return the max gain to the parent node: curr.val + max(maxLeft, maxRight)

var maxPathSum = function (root) {
  let maxSumPath = -Infinity;
  let traversal = (curr) => {
    if (!curr) return 0;
    let maxLeft = Math.max(0, traversal(curr.left));
    let maxRight = Math.max(0, traversal(curr.right));
    currMax = curr.val + maxLeft + maxRight;
    maxSumPath = Math.max(currMax, maxSumPath);

    return curr.val + Math.max(maxLeft, maxRight);
  };
  traversal(root);
  return maxSumPath;
};

//? Time Complexity = O(n)
//? Space Complexity = O(h)(h=tree height)
