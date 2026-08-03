//? LeetCode #894
//? All Possible Full Binary Trees

// Given an integer n, return a list of all possible full binary trees with n nodes. Each node of each tree in the answer must have Node.val == 0.

// Each element of the answer is the root node of one possible tree. You may return the final list of trees in any order.

// A full binary tree is a binary tree where each node has exactly 0 or 2 children.

//? Example 1:
// Input: n = 7
// Output: [[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]

//? Example 2:
// Input: n = 3
// Output: [[0,0,0]]

//? Constraints:
// 1 <= n <= 20

//? Thought Process:
// A full binary tree always has an odd number of nodes, so if n is even return [].
// For a valid tree, take one node as the root and split the remaining n-1 nodes into left and right subtrees. Since both subtrees must also be full binary trees, try every possible odd split.
// Recursively generate all possible left and right subtrees, combine every left-right pair with a new root, and store the result.
// Use memoization because the same subtree sizes are calculated repeatedly.
 
//? Code:
var allPossibleFBT = function (n) {
    const memo = new Map();

    const dfs = (n) => {
        if (n % 2 === 0) {
            return [];
        }

        if (n === 1) {
            return [new TreeNode(0)];
        }

        if (memo.has(n)) {
            return memo.get(n);
        }

        let result = [];
        for (let leftNodes = 1; leftNodes < n; leftNodes = leftNodes + 2) {
            const rightNodes = n - leftNodes - 1;

            const leftTrees = dfs(leftNodes);
            const rightTrees = dfs(rightNodes);

            for (let left of leftTrees) {
                for (let right of rightTrees) {
                    const root = new TreeNode(0);
                    root.left = left;
                    root.right = right;
                    result.push(root);
                }
            }
        }

        memo.set(n, result);
        return result;
    };

    return dfs(n);
};

//? Time Complexity: O(2^n)
//? Space Complexity: O(F(n) * n) where F(n) is the number of full binary trees with n nodes. The space complexity accounts for the storage of all unique trees generated, each of which can have up to n nodes.