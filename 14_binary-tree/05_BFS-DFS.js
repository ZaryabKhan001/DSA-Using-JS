//? DFS and BFS in Binary Tree:

//? DFS: Depth First Search
// DFS explores a tree by going as deep as possible along a branch before backtracking.

//? BFS: Breadth First Search
// Explore the tree level by level, explore all nodes at the current level before moving deeper.

//? DFS Examples:
// Preorder: A B D E C F
// Inorder: D B E A C F
// Postorder: D E B F C A

//? BFS Examples:
// Level Order Traversal: A B C D E F
// Zig-Zag Traversal:

//? DFS Stack
// stack = [        ]
// LIFO (as stack uses LIFO)
// curr = stack.pop()
// push children and repeat

// ans = [A, C, F, B, E, D]

//? BFS Queue
// queue = [       ]
// FIFO (as queue uses LIFO)
// curr = q.shift()
// push children and repeat

// ans = [A, B, C, D, E, F]
