//? Difference Array

// You are given an array arr[] and a  2D array opr[][], where each opr[i] denotes an operation in the format [l, r, v].

// For each operation [l, r, v], you need to add the value v to all elements of the array from index l to r (both inclusive).
// Apply all operations sequentially in the given order, and return the final updated array.

//? Examples:
// Input: arr[] = [2, 3, 5, 6, 7], opr[][] = [[2, 4, 2], [3, 4, -1]]
// Output: [2, 3, 7, 7, 8]
// Explanation:
// Operation [2, 4, 2] : Add 2 to indices 2 to 4 → [2, 3, 7, 8, 9]
// Operation [3, 4, -1] : Subtract 1 from indices 3 to 4 → [2, 3, 7, 7, 8]
// Final array is [2, 3, 7, 7, 8].

// Input: arr[] = [4, 5, 7, 9], opr[][] = [[1, 3, 1], [2, 3, -2]]
// Output: [4, 6, 6, 8]
// Explanation:
// Operation [1, 3, 1] : Add 1 to indices 1 to 3 → [4, 6, 8, 10]
// Operation [2, 3, -2] : Subtract 2 from indices 2 to 3 → [4, 6, 6, 8]
// Final array is [4, 6, 6, 8].

//? Constraints:
// 1 ≤ arr.size() ≤ 105
// 1 ≤ arr[i] ≤ 103
// 1 ≤ opr.size() ≤ 105
// 0 ≤ l ≤ r < arr.size()
// -103 ≤ v ≤ 103

//? Thought Process:
// We need to apply multiple range updates to an array.
// Updating every element in each range would take O(n * q) time.
// So, we choose Difference Array to record changes only at range boundaries.
// For each operation [l, r, v], add v at index l and subtract v at r + 1.
// This marks where the change starts and where it stops.
// After processing all operations, use prefix sum to calculate the total
// change at each index.
// Add that change to the original array to get the final answer.
// This reduces the time complexity to O(n + q).

//? Why difference array and not segment tree?
// We use Difference Array instead of Segment Tree because we only need the final array after all range updates, not queries during updates.

//? Code:
class Solution {
  diffArray(arr, opr) {
    let n = arr.length;
    let diff = new Array(n).fill(0);

    for (let i = 0; i < opr.length; i++) {
      let [l, r, v] = opr[i];

      diff[l] += v;

      if (r + 1 < n) {
        diff[r + 1] -= v;
      }
    }

    let ans = new Array(n);
    let runningSum = 0;

    for (let i = 0; i < n; i++) {
      runningSum += diff[i];
      ans[i] = arr[i] + runningSum;
    }

    return ans;
  }
}

//? Time Complexity: O(n + q) where, n is the length of array and q is the length of queries.
//? Space Complexity: O(n) + O(n) => O(n)
