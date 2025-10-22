//? LeetCode #144
//? Binary Tree Preorder Traversal

// Given the root of a binary tree, return the preorder traversal of its nodes' values.

//? Example 1:
// Input: root = [1,null,2,3]
// Output: [1,2,3]

//? Example 2:
// Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
// Output: [1,2,4,5,6,7,3,8,9]

//? Approach
// Initialize an empty array ans to store the result.
// Define a helper function traversal(curr) that:
// Returns if the current node is null.
// Pushes the current node’s value to ans.
// Recursively calls itself on the left and then right child.
// Call traversal(root) to start the traversal from the root.
// Return the ans array containing the preorder traversal.

var preorderTraversal = function (root) {
  let ans = [];

  function traversal(curr) {
    if (!curr) return;
    ans.push(curr.val);
    traversal(curr.left);
    traversal(curr.right);
  }
  traversal(root);

  return ans;
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)

//? LeetCode #94
//? Binary Tree Inorder Traversal

// Given the root of a binary tree, return the inorder traversal of its nodes' values.

//? Example 1:
// Input: root = [1,null,2,3]
// Output: [1,2,3]

//? Example 2:
// Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
// Output: [1,2,4,5,6,7,3,8,9]

//? Approach
// Use recursion to traverse the binary tree in inorder way:
// First, visit the left subtree.
// Then, add the current node’s value.
// Finally, visit the right subtree.
// Store the result in an array and return it.

var inorderTraversal = function (root) {
  let ans = [];

  function traversal(curr) {
    if (!curr) return;
    traversal(curr.left);
    ans.push(curr.val);
    traversal(curr.right);
  }
  traversal(root);

  return ans;
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)

//? LeetCode #145
//? Binary Tree Postorder Traversal

// Given the root of a binary tree, return the postorder traversal of its nodes' values.

//? Example 1:
// Input: root = [1,null,2,3]
// Output: [1,2,3]

//? Example 2:
// Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
// Output: [1,2,4,5,6,7,3,8,9]

//? Approach
// initialize an empty array ans to store the result.
// Define a helper function traversal(curr):
// If the current node is null, return.
// Recursively traverse the left subtree.
// Recursively traverse the right subtree.
// Push the current node’s value into ans.
// Call traversal(root) to start the traversal from the root.
// Return the result array ans.

var postorderTraversal = function (root) {
  let ans = [];

  function traversal(curr) {
    if (!curr) return;
    traversal(curr.left);
    traversal(curr.right);
    ans.push(curr.val);
  }
  traversal(root);

  return ans;
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)
