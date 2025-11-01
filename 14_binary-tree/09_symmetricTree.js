//? LeetCode #101
//? Symmetric Tree

// Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

//? Example 1:
// Input: root = [1,2,2,3,4,4,3]
// Output: true

//? Example 2:
// Input: root = [1,2,2,null,3,null,3]
// Output: false

//? Approach (Recursive):

// Use a helper function isMirror(left, right) to compare two nodes.
// The tree is symmetric if:
// Both left and right subtrees are null → return true.
// Only one is null → return false.
// Their values match and:
// Left’s left subtree mirrors Right’s right subtree.
// Left’s right subtree mirrors Right’s left subtree.
// Start the comparison with root.left and root.right.

var isSymmetric = function (root) {
  let isMirror = (left, right) => {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return (
      left.val === right.val &&
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left)
    );
  };
  return isMirror(root.left, root.right);
};

//? Time Complexity = O(n)
//? Space Complexity = O(n)

//? Approach (Iterative):

// Use a helper function isMirror(left, right) to compare two nodes.
// The tree is symmetric if:
// Both left and right subtrees are null → return true.
// Only one is null → return false.
// Their values match and:
// Left’s left subtree mirrors Right’s right subtree.
// Left’s right subtree mirrors Right’s left subtree.
// Start the comparison with root.left and root.right.

var isSymmetric = function (root) {
  let q = [root.left, root.right];
  while (q.length) {
    let p1 = q.shift();
    let p2 = q.shift();
    if (!p1 && !p2) continue;
    if (!p1 || !p2) return false;
    if (p1.val != p2.val) return false;
    q.push(p1.left, p2.right);
    q.push(p1.right, p2.left);
  }
  return true;
};
//? Time Complexity = O(n)
//? Space Complexity = O(n)
