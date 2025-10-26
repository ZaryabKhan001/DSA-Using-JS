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
// If the tree is empty (root is null), return an empty array.
// Initialize a stack with the root node and an empty result array ans.
// While the stack is not empty:
// Pop the top node from the stack and add its value to ans.
// Push the right child first, then the left child (if they exist), so the left child is processed first.
// Return the result array ans.

var preorderTraversal = function (root) {
  if (!root) return [];

  let ans = [];
  let stack = [root];
  while (stack.length) {
    let curr = stack.pop();
    ans.push(curr.val);
    curr.right && stack.push(curr.right);
    curr.left && stack.push(curr.left);
  }
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
// Initialize
// An empty stack to simulate recursion.
// A pointer curr starting at root.
// Traverse Left: Keep pushing nodes to the stack while moving to the left child.
// Visit Node:
// When no more left nodes, pop from the stack.
// Add the node’s value to the result array ans.
// Traverse Right: Move curr to the right child and repeat.

var inorderTraversal = function (root) {
  let ans = [];
  let stack = [];
  let curr = root;

  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    ans.push(curr.val);
    curr = curr.right;
  }
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

//? Approach 1:
// Use two stacks — `stack1` for traversal, `stack2` to store nodes in reverse postorder.
// Pop a node from `stack1`, push it into `stack2`.
// Push its left and right children into `stack1`.
// Reverse `stack2` to get the final postorder (left → right → root).

var postorderTraversal = function (root) {
  if (!root) return [];
  let stack1 = [root];
  let stack2 = [];
  while (stack1.length) {
    let curr = stack1.pop();
    stack2.push(curr);
    curr.left && stack1.push(curr.left);
    curr.right && stack1.push(curr.right);
  }
  return stack2.reverse().map((node) => node.val);
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)

//? Approach 2
// Use a stack to simulate recursion.
// Traverse left subtree first, pushing nodes into the stack.
// Peek top node:
// If it has a right child not yet visited, traverse right subtree.
// Else, process the node (postorder: left → right → root).
// Track the last visited node to avoid revisiting right subtrees.
// Continue until all nodes are processed.

var postorderTraversal = function (root) {
  let stack = [];
  let curr = root;
  let ans = [];
  let lastVisited = null;
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    let peek = stack[stack.length - 1];
    if (peek.right && peek.right != lastVisited) {
      curr = peek.right;
    } else {
      ans.push(peek.val);
      lastVisited = stack.pop();
    }
  }
  return ans;
};

//? Time Complexity = O(n)
//? Space Complexity = O(h) where: h where, h is the height of the tree.
