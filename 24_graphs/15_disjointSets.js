//? Disjoint Set (Find and Union)

// Set1: {A, B, C}
// Set2: {D, E}
// Set3: {F, G, H}
//? Operations
//? 1. Find: Finds the representative (root/parent) of the set to which an element belongs.

// Example:
// Find(B):Set1
// Find(D):Set2
// Find(H):Set3

//? 2. Union: Merges two different sets into one.

// Example: Create a edge between [B, D].
// As B ∈ Set1 and D ∈ Set2

// Set1 and Set2 are merged.
// All elements of both sets now belong to one common set.
// This set is represented by one root (leader).
// Note: If both values belong to the same set, performing a union operation is not needed.

// Both(Find and Union) these operations are very helpful in detecting cycles in a graph

// Exploring Edges
// (0, 1):

// (1, 2):

// (2, 3):

// (3, 4):

// (0, 2): If edge (u, v) both u & v are present in same set then the edge form a cycle.
// (2, 4): Both in same set, so form a cycle.
// (2, 5):

// Rank
// It is an optimization used during the union operation to maintain a balanced tree, helping the find operation run faster.

// Solve with Array

// (0, 1):

// (1, 2):

// (2, 3):

// (0, 2):Both have same parent. Hence, Cycle detected.
