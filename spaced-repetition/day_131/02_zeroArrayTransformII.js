//? LeetCode #3356
//? Zero Array Transformation II

// You are given an integer array nums of length n and a 2D array queries where queries[i] = [li, ri, vali].

// Each queries[i] represents the following action on nums:

// Decrement the value at each index in the range [li, ri] in nums by at most vali.
// The amount by which each value is decremented can be chosen independently for each index.
// A Zero Array is an array with all its elements equal to 0.

// Return the minimum possible non-negative value of k, such that after processing the first k queries in sequence, nums becomes a Zero Array. If no such k exists, return -1.

//? Example 1:
// Input: nums = [2,0,2], queries = [[0,2,1],[0,2,1],[1,1,3]]
// Output: 2

// Explanation:
// For i = 0 (l = 0, r = 2, val = 1):
// Decrement values at indices [0, 1, 2] by [1, 0, 1] respectively.
// The array will become [1, 0, 1].
// For i = 1 (l = 0, r = 2, val = 1):
// Decrement values at indices [0, 1, 2] by [1, 0, 1] respectively.
// The array will become [0, 0, 0], which is a Zero Array. Therefore, the minimum value of k is 2.

//? Example 2:
// Input: nums = [4,3,2,1], queries = [[1,3,2],[0,2,1]]
// Output: -1

// Explanation:
// For i = 0 (l = 1, r = 3, val = 2):
// Decrement values at indices [1, 2, 3] by [2, 2, 1] respectively.
// The array will become [4, 1, 0, 0].
// For i = 1 (l = 0, r = 2, val = 1):
// Decrement values at indices [0, 1, 2] by [1, 1, 0] respectively.
// The array will become [3, 0, 0, 0], which is not a Zero Array.

//? Constraints:
// 1 <= nums.length <= 105
// 0 <= nums[i] <= 5 * 105
// 1 <= queries.length <= 105
// queries[i].length == 3
// 0 <= li <= ri < nums.length
// 1 <= vali <= 5

//? Thought Process:
//? 1. Understand the Problem
// We are given an array nums and queries.
// Each query contains [l, r, val].
// A query allows us to decrease each element in the range [l, r] by at most val.
// We have to find the minimum number of queries required to make nums a zero array.
// We must process queries in the given order.
// If we cannot make nums a zero array even after using all queries, return -1.

//? 2. Brute Force Approach
// We can try applying queries one by one.
// For every query, we visit each index from l to r.
// At each index, we use the available decrement to reduce nums[i].
// After applying each query, we check whether all elements can become zero.
// The first query prefix that makes every element zero gives our answer.

// Problem with this approach:
// If a query covers almost the entire array, we visit almost every index.
// If there are q queries and each query covers n elements, the time complexity can be O(n * q).
// We need to avoid visiting every index for every query.

//? 3. Optimization: Binary Search + Difference Array
// First, observe that if the first k queries can make nums a zero array,
// then the first k + 1 queries can also make nums a zero array.
// This is because additional queries give us more decrement opportunities.

// So, the answer has a monotonic property.
// If k queries work, every larger number of queries also works.
// If k queries do not work, fewer queries cannot work either.

// Because of this property, we can use binary search to find the minimum valid k.

//? 4. Why Binary Search?
// We do not know how many queries are needed.
// We could check 0 queries, then 1, then 2, then 3, and so on.
// But checking every possible k would be expensive.

// Instead, we check the middle number of queries.
// If those queries are enough, we save the answer and search the smaller half.
// If they are not enough, we search the larger half.

// low = 0 because the array might already contain only zeros.
// high = queries.length because we may need all queries.
// k represents the NUMBER of queries we are using, not the last query index.

//? 5. Why Difference Array Instead of a Segment Tree?
// This is a range update problem.
// Each query affects a range [l, r].
// We need to calculate the total decrement available at each index.

// We do not need to answer range queries after every update.
// We only need to know the total decrement available at each index
// after considering the first k queries.

// A difference array lets us record each range update using two changes:
// diff[l] += val;
// diff[r + 1] -= val;

// After processing the queries, we calculate a prefix sum.
// This tells us the total decrement available at every index.

// A segment tree can also handle range updates, but it is unnecessary here.
// We already know which queries we want to apply,
// and we only need the final available decrement at each index.

//? 6. How Does the Difference Array Work?
// Suppose nums = [2, 0, 2]
// And the queries are:
// [0, 2, 1]
// [0, 2, 1]
// [1, 1, 3]

// If we use the first 2 queries:
// Each query adds 1 to every index from 0 to 2.

// Instead of updating all three indices for each query,
// we record the range using the difference array.

// For query [0, 2, 1]:
// diff[0] += 1;
// diff[3] -= 1;

// After processing both queries:
// diff = [2, 0, 0, -2]

// Now calculate the prefix sum:
// index 0: runningSum = 2
// index 1: runningSum = 2
// index 2: runningSum = 2

// So the available decrements are [2, 2, 2].
// nums = [2, 0, 2]

// Every index has enough decrement available to reach zero.
// Therefore, the first 2 queries are sufficient.

//? 7. Why Do We Check runningSum < nums[i]?
// runningSum tells us how much total decrement is available at index i.
// nums[i] tells us how much decrement that element needs.

// If runningSum < nums[i], we do not have enough decrement.
// So these k queries cannot make the entire array zero.

// If runningSum >= nums[i], we have enough decrement for that index.
// We can choose how much decrement to use, up to the available amount.

// We must check every index.
// If even one index does not have enough decrement, return false.

// If every index has enough decrement, return true.

//? 8. Why Is diff an Array of Size n + 1?
// We record changes using diff[l] and diff[r + 1].
// The largest possible r is n - 1.
// Therefore, r + 1 can be n.

// We need an extra position to record the ending change.
// That is why we create diff with n + 1 elements.

// The size depends on nums.length, not on the number of queries k.

//? 9. Binary Search Logic
// low = 0;
// high = queries.length;
// minK = -1;

// We start with the complete answer range from 0 to q.

// mid = Math.floor((low + high) / 2);

// We check whether the first mid queries are sufficient.

// If they are sufficient:
// Save mid in minK.
// Search the left half because we want fewer queries.
// high = mid - 1;

// If they are not sufficient:
// We need more queries.
// Search the right half.
// low = mid + 1;

// If minK remains -1, even all queries were insufficient.
// Return -1.

//? 10. Time Complexity
// Let n = nums.length and q = queries.length.

// Each feasibility check:
// Processing k queries takes O(k).
// Checking every element takes O(n).
// Total: O(n + k).

// Binary search performs O(log(q + 1)) checks.
// The array scan costs O(n log(q + 1)) in total.
// The midpoint values across the checks sum to O(q),
// so query processing costs O(q) overall.

// Total time complexity:
// O(n log(q + 1) + q)

//? 11. Space Complexity
// The difference array takes O(n) space.
// Other variables and binary search take O(1) auxiliary space.

// Total space complexity: O(n)

//? 12. Interview Follow-up Questions
// Q1. Why can we use binary search?
// Because if k queries are sufficient, any larger number of queries is also sufficient.

// Q2. Why does the difference array help?
// It records each range update in O(1), then a prefix sum calculates the total effect at every index.

// Q3. Why not use a segment tree?
// We do not need dynamic range queries or intermediate answers.
// A difference array is enough to calculate the final effect of a fixed query prefix.

// Q4. Why do we check runningSum < nums[i]?
// The available decrement must be at least the value that needs to be removed.

// Q5. Why can the answer be 0?
// If nums already contains only zeros, no queries are required.

// Q6. Why can the answer be q?
// All queries might be required to make every element zero.

// Q7. Why return -1?
// If even all q queries cannot provide enough decrement for every element, no valid answer exists.

// Q8. Why is the difference array size n + 1?
// Because an update ending at index n - 1 records its stopping change at index n.

// Q9. Why is the time complexity not O(n * q)?
// We do not visit every index for every query.
// Each query takes O(1) to record, and each feasibility check scans nums once.

// Q10. What is the difference between k and mid?
// In our implementation, mid represents the number of queries being checked.
// We process indices 0 through mid - 1, which means exactly mid queries.

//? Code:
const isZeroArray = (nums, queries, k) => {
  let n = nums.length;
  let diff = new Array(n + 1).fill(0);

  for (let i = 0; i < k; i = i + 1) {
    let [l, r, val] = queries[i];

    diff[l] += val;
    diff[r + 1] -= val;
  }

  let runningSum = 0;
  for (let i = 0; i < n; i = i + 1) {
    runningSum += diff[i];

    if (runningSum < nums[i]) {
      return false;
    }
  }

  return true;
};

var minZeroArray = function (nums, queries) {
  let n = queries.length;
  let low = 0;
  let high = n;
  let minK = -1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (isZeroArray(nums, queries, mid)) {
      minK = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return minK;
};

//? Time Complexity: O(log q * (n + q))
//? Space Complexity: O(n)
