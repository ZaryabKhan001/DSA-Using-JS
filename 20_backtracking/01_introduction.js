//? Backtracking
// Recursive Algorithmic technique for solving problems incrementally by trying partial solutions and then abandoning them (backtracking) is they fail to satisfy constraints.

// ?Note:
// Exploring all possibility but being smart by abandoning wrong path early.

//? Example: Like trying all the paths in max and going back if you hit a wall.

//? When to use Backtracking ?
//* You want to explore all combination/permutations/subsets.
//* When there is a Clear way to validate a partial solution.
//* Number of combinations is too large to brute force, so you abandon the invalid ones early.
//* Basically, Backtracking optimise Recursion.

// Note: Try a choice -> work ?, continue -> if not, undo (backtrack).

//? Example:
// From the numbers [2, 3, 5, 10, 12], try to find a combination that gives a sum of 15. Solution.
// * Label the numbers as x₀, x₁, x₂, x₃, x₄.
// * Find all possible combinations.
// * Think carefully about the choices.
// * Develop the state space tree (or recursion tree, or path inside recursion) to find the solution.
// * Initialize Sum = 0.
// Now, we have to make a decision: whether we want to include 2 or not.

// Above, This is a type of problem that uses backtracking.

// Choices: 25

// Tree have maximum choices: 2n.

//? Use Cases:
// Subset
// Combinations
// Permutations
// N-Queens
// A lot of choices and decisions
