//? LeetCode #236
//? Lowest Common Ancestor of a Binary Tree

// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

//? Example 1:
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// Output: 3
// Explanation: The LCA of nodes 5 and 1 is 3.

//? Example 2:
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// Output: 5
// Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.

//? Example 3:
// Input: root = [1,2], p = 1, q = 2
// Output: 1

//? Approach:
// Use post-order traversal to explore the tree.
// Recursively count how many of the target nodes (p or q) are found in the left and right subtrees.
// If the current node is either p or q, increment the count.
// When the total count from left + right + current node becomes 2, this node is the Lowest Common Ancestor.
// Return the stored lca node after traversal.

var lowestCommonAncestor = function (root, p, q) {
  let lca = null;
  let traversal = (curr) => {
    let count = 0;
    if (!curr) return 0;
    let ansOnLeft = traversal(curr.left);
    let ansOnRight = traversal(curr.right);
    if (curr.val === p.val || curr.val === q.val) {
      ++count;
    }
    count = count + ansOnLeft + ansOnRight;
    if (count === 2 && !lca) {
      lca = curr;
    }
    return count;
  };
  traversal(root);
  return lca;
};

//? Time Complexity = O(n)
//? Space Complexity = O(h) (h=tree height)
