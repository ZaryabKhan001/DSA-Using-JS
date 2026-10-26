//? LeetCode #3355
//? Zero Array Transformation I

// You are given an integer array nums of length n and a 2D array queries, where queries[i] = [li, ri].

// For each queries[i]:

// Select a subset of indices within the range [li, ri] in nums.
// Decrement the values at the selected indices by 1.
// A Zero Array is an array where all elements are equal to 0.

// Return true if it is possible to transform nums into a Zero Array after processing all the queries sequentially, otherwise return false.

//? Example 1:
// Input: nums = [1,0,1], queries = [[0,2]]
// Output: true

// Explanation:
// For i = 0:
// Select the subset of indices as [0, 2] and decrement the values at these indices by 1.
// The array will become [0, 0, 0], which is a Zero Array.

//? Example 2:
// Input: nums = [4,3,2,1], queries = [[1,3],[0,2]]
// Output: false

// Explanation:
// For i = 0:
// Select the subset of indices as [1, 2, 3] and decrement the values at these indices by 1.
// The array will become [4, 2, 1, 0].
// For i = 1:
// Select the subset of indices as [0, 1, 2] and decrement the values at these indices by 1.
// The array will become [3, 1, 0, 0], which is not a Zero Array.

//? Constraints:
// 1 <= nums.length <= 105
// 0 <= nums[i] <= 105
// 1 <= queries.length <= 105
// queries[i].length == 2
// 0 <= li <= ri < nums.length

//? Thought Process:
//* 1. Understand the problem
// We are given an array nums and some queries.
// Each query contains a start and end index.
// We can decrement any selected elements inside that range by 1.
// We can also ignore some elements in the range.
// We need to check whether we can make all elements zero.

//* 2. Brute Force Approach
// For every query, we visit each index from start to end.
// We increase the coverage of each index by 1.
// After processing all queries, we check whether every index
// has enough coverage to make its value zero.

// The problem is that a query can cover many indices.
// If we update every index for every query, we do extra work.

// Time Complexity: O(n * q) in the worst case.
// n = length of nums, q = number of queries.

//* 3. Optimization: Difference Array
// This is a range query problem.
// Each query gives us a range from start to end.
// We only need to know the final coverage of every index
// after processing all queries.

// We do not need to update every index inside each range.
// Instead, we can mark where the range starts and where it ends.

//* This is why we use a difference array.
// For every query [start, end]:

// diff[start] += 1;
// This means coverage increases from start.

// diff[end + 1] -= 1;
// This means coverage stops increasing after end.

// After processing all queries, we calculate the prefix sum
// to find the final coverage of every index.

// Time Complexity: O(n + q)
// Space Complexity: O(n)

//* 4. Why Difference Array and Not Segment Tree?
// A segment tree is useful when we need to perform range updates
// and answer range queries, especially when these operations
// happen repeatedly and we need answers during the process.

// But in this problem, all queries are given to us beforehand.
// We do not need to answer any range query after each update.
// We only need the final coverage of every index.

// So, a difference array is simpler and more efficient here.
// Each query takes O(1) time, and the final prefix sum takes O(n).

// We use a difference array because we only need the final result,
// not because segment trees cannot solve this problem.

//* 5. Why runningSum >= nums[i]?
// runningSum tells us how many queries cover the current index.
// nums[i] tells us how many decrements that index needs.

// If runningSum < nums[i], there are not enough queries
// to make this element zero, so return false.

// If runningSum == nums[i], there are exactly enough queries.

// If runningSum > nums[i], there are extra queries.
// We can ignore this index in those extra queries.

// We only need to make sure every index has enough coverage.
// If all indices pass this check, return true.
 
//? Code:
var isZeroArray = function (nums, queries) {
  let n = nums.length;
  let diff = new Array(n).fill(0);

  for (let query of queries) {
    let [start, end] = query;

    diff[start] += 1;
    if (end + 1 < n) {
      diff[end + 1] -= 1;
    }
  }

  let runningSum = 0;
  for (let i = 0; i < n; i++) {
    runningSum += diff[i];

    if (runningSum < nums[i]) {
      return false;
    }
  }

  return true;
};

//? Time Complexity: O(q + n) => Where q is length of queries and n is length of nums array.
//? Space Complexity: O(n) => for diff array.
