//? LeetCode #102
//? Binary Tree Level Order Traversal

// Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

//? Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[9,20],[15,7]]

//? Example 2:
// Input: root = [1]
// Output: [[1]]

//? Example 3:
// Input: root = []
// Output: []

//? Approach
// 1. If the root is `null`, return an empty array.
// 2. Initialize a queue with the root node and an empty array `ans` to store results.
// 3. While the queue is not empty:
//    Get the number of nodes at the current level (`level = q.length`).
//    Create an empty array `levelArr` to store values of this level.
//    For each node in the current level:

//      Remove it from the queue and push its value into `levelArr`.
//      Add its left and right children (if they exist) to the queue.
//    Push `levelArr` into `ans`.
// 4. Return `ans` as the final level order traversal result.

var levelOrder = function (root) {
  if (!root) return [];
  let q = [root];
  let ans = [];
  while (q.length) {
    let levelArr = [];
    level = q.length;
    for (let i = 0; i < level; i = i + 1) {
      let curr = q.shift();
      levelArr.push(curr);
    }
    ans.push(levelArr);
  }
  return ans;
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)
