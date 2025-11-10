//? LeetCode #199.
//? Binary Tree Right Side View

// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

//? Example 1:
// Input: root = [1,2,3,null,5,null,4]
// Output: [1,3,4]

//? Example 2:
// Input: root = [1,2,3,4,null,null,null,5]
// Output: [1,3,4,5]

//? Example 3:
// Input: root = [1,null,3]
// Output: [1,3]

//? Example 4:
// Input: root = []
// Output: []

//? Approach:
// If the tree is empty, return an empty array.
// Use a queue q for level-order traversal (BFS).
// For each level:
// Store the number of nodes (levelSize).
// Traverse all nodes at this level.
// Since you push right first, the first node (i == 0) is the rightmost node of that level → store it in ans.
// Push right child first, then left, to ensure rightmost nodes are visited first in the next level.

var rightSideView = function (root) {
  if (!root) return [];
  let ans = [];
  let q = [root];
  while (q.length) {
    let levelSize = q.length;
    for (let i = 0; i < levelSize; i++) {
      let curr = q.shift();
      if (i === 0) {
        ans.push(curr.val);
      }
      if (curr.right) q.push(curr.right);
      if (curr.left) q.push(curr.left);
    }
  }
  return ans;
};

//? Time Complexity = O(n)
//? Space Complexity = O(w) Where w is the maximum width of the tree
