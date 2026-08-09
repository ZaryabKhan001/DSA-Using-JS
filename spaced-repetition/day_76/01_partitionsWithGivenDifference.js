//? Partitions with Given Difference (gfg)

// Given an array arr[] and an integer diff, count the number of ways to partition the array into two subsets such that the difference between their sums is equal to diff.

// Note: A partition in the array means dividing an array into two subsets say S1 and S2 such that the union of S1 and S2 is equal to the original array and each element is present in only one of the subsets.

//? Examples :

// Input: arr[] = [5, 2, 6, 4], diff = 3
// Output: 1
// Explanation: There is only one possible partition of this array. Partition : [6, 4], [5, 2]. The subset difference between subset sum is: (6 + 4) - (5 + 2) = 3.

// Input: arr[] = [1, 1, 1, 1], diff = 0
// Output: 6
// Explanation: We can choose two 1's from indices [0,1], [0,2], [0,3], [1,2], [1,3], [2,3] and put them in sum1 and remaning two 1's in sum2.
// Thus there are total 6 ways for partition the array arr.

// Input: arr[] = [3, 2, 7, 1], diff = 4
// Output: 0
// Explanation: There is no possible partition of the array that satisfy the given difference.

//? Constraint:
// 1 ≤ arr.size() ≤ 50
// 0 ≤ diff ≤ 50
// 0 ≤ arr[i] ≤ 6

//? Thought Process:
// This problem is to divide the array into two subsets such that the difference between their sums is equal to diff.
// So, we can say that sum1 - sum2 should be equal to diff. Also, we know that sum1 + sum2 = totalSum of the array.
// Okay, so if we add both equations, we get 2 * sum1 = diff + totalSum. So, sum1 = (diff + totalSum) / 2.
// Okay so we are sure that if we put s1 as the calculated value, we are able to get s2 easily.
// If totalSum is 8 let say and s1 is 5 then s2 will be 3 for sure right. If we were able to divide an array into 5 sum then the remaining will be 3 sum.

//* Now the problem is reduced to count the number of subsets of the array whose sum is equal to s1. This is a classic subset sum problem which we have already solved in the previous day. So, we can use the same approach of recursion and memoization to solve this problem. We can use a 2D array to store the results of subproblems and avoid recalculating them. The base cases will be when the target is 0 (we found a valid subset) and when there are no items left to consider (we can't form any more subsets).

//? Code:
class Solution {
  noOfSubsets(arr, target) {
    let n = arr.length;
    let dp = Array.from({ length: n + 1 }, () =>
      new Array(target + 1).fill(undefined),
    );

    const solve = (n, target) => {
      if (n == 0 && target == 0) {
        return 1;
      }

      if (n == 0) {
        return 0;
      }

      if (dp[n][target] != undefined) {
        return dp[n][target];
      }

      if (arr[n - 1] > target) {
        return (dp[n][target] = solve(n - 1, target));
      } else {
        return (dp[n][target] =
          solve(n - 1, target) + solve(n - 1, target - arr[n - 1]));
      }
    };

    return solve(n, target);
  }

  countPartitions(arr, diff) {
    let sum = arr.reduce((sum, value) => (sum += value), 0);

    if ((diff + sum) % 2 != 0) {
      return 0;
    }

    let target = (diff + sum) / 2;

    return this.noOfSubsets(arr, target);
  }
}

//? Time Complexity: O(n * target) for subset sum problem + O(n) for calculating sum of array
//? Space Complexity: O(n * target) for dp array + O(n) for recursion stack space
