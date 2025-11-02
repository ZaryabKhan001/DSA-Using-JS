//? LeetCode #100
//? Same Tree

// Given the roots of two binary trees p and q, write a function to check if they are the same or not.
// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

//? Example 1:
// Input: p = [1,2,3], q = [1,2,3]
// Output: true

//? Example 2:
// Input: p = [1,2], q = [1,null,2]
// Output: false

//? Example 3:
// Input: p = [1,2,1], q = [1,1,2]
// Output: false

//? Approach
// Base Case:
// If both nodes are null, they are the same – return true.
// If one is null and the other is not – return false.
// Recursive Case:
// Check if current nodes have the same value.
// Recursively check their left subtrees and right subtrees.

var isSameTree = function (p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;

  return (
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  );
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)
