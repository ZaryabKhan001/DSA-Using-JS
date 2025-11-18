//? Binary Search Tree:
// BST is a special type of Binary Tree with atmost 2 childern.
// For Every Node:
// All nodes of left subtree have smaller value.
// All node of right subtree have greater value.

// Important Point to Note:

// All the subtrees of a tree should be BST.
// A tree is a Binary Search Tree only if every node follows the BST rules.

// Why it is called a Search Tree ?

// Search the value 75:
// Here, we are finding it in a very easy way — we don’t need to check unnecessary nodes.
// At every iteration, the search space is reduced by half (n/2).
// This makes searching very efficient, which is why it is called a Binary Search Tree.
// Time Complexity: O(log n) As log n is the height of the tree.
// Let’s try Inorder Traversal (left-node-right) of the tree:

// 10, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 85

// Note: Inorder-traversal of BST is always sorted.
