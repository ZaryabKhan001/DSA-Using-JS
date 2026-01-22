//? Greedy Algorithm
// Greedy is a problem solving approach where we make locally optimal choices, with a hope that it will lead to global optimal solution.
// Take best choice at the moment, without worrying about the future.

//? Examples
//? Example 1: Coin Change Problem
// Given an amount of n rupees and an unlimited supply of coins or notes of denominations {1, 2, 5, 10}. we have to find the minimum number of coins required to make up the 18 amount.
// Intuition:
// Firstly, choose the maximum denomination coin. Suppose we choose 10, now 8 is remaining.
// If we choose the maximum coin (10) again, it exceeds the target, so we choose the second largest denomination, which is 5.
// Now, 3 amount is left, so we choose 2.
// Finally, we choose 1. Now our target is complete.

//? Example 2: Knap Sack Problem: Fractional Knap Sack Problem
// Given n items where each item has some weight and profit associated with it and also given a bag with capacity W, [i.e., the bag can hold at most W weight in it]. The task is to put the items into the bag such that the sum of profits associated with them is the maximum possible.
// Value = {60, 100, 120}, Weight = {10, 20, 30}, Weight only carry = 50kg
// Intuition:
// Since the bag has limited capacity, we cannot take all items, so we must choose them wisely.
// Instead of directly picking the highest value items, we should compare items based on their value-to-weight ratio (value per unit weight).
// This way, we prioritize items that give the maximum profit for the minimum weight.
// By filling the bag with items having the highest value/weight ratio first, we maximize the total profit within the capacity constraint.

//? Types of Problems:
// Optimization Problems (min/max result)
// Activity Selection / Interval Scheduling
// Fractional Knapsack
// Job Sequencing with deadlines
// Graph Problems
// MST, Kruskal’s / Prim’s Algorithm
// Shortest Path
// Scheduling Problems
// CPU Scheduling (Shortest first)
// Game / Puzzles and more
// Greedy Problem Hints
// Maximum number of
// Minimum Cost / Maximum Profit
// Schedule / allocate / assign efficiently
// Shortest / Smallest / Largest / Longest (with constraints)
// Non-overlapping intervals
