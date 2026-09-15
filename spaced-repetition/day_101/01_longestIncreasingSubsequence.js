//? LeetCode #300
//? Longest Increasing Subsequence

// Given an integer array nums, return the length of the longest strictly increasing subsequence.

//? Example 1:
// Input: nums = [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

//? Example 2:
// Input: nums = [0,1,0,3,2,3]
// Output: 4

//? Example 3:
// Input: nums = [7,7,7,7,7,7,7]
// Output: 1

//? Constraints:
// 1 <= nums.length <= 2500
// -104 <= nums[i] <= 104

// Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?

//? Thought Process:
// This question is very important and all along a pattern itself in DP.
// As thinking about question, one thing is clear that at each and every index we have a choice to include it in a subsequence or not.
// So we start a recursive function starting from 0 to n index.
// And we keep a track of prev element to compare with current element, becuase we want strictly increasing subsequence.

// - Define a recursive function solve(i, prev) where i is the current index and prev is the previously selected index.
// - At each index, we have two choices: take nums[i] or skip it.
// - Take it only if prev === -1 (index === 0) or nums[i] > nums[prev].
// - If taken, return 1 + solve(i + 1, i).
// - If skipped, return solve(i + 1, prev).
// - Return Math.max(take, skip); the base case is i === n, which returns 0.

//? Recusion + Memoization
//? Code:
var lengthOfLIS = function (nums) {
  let n = arr.length;
  let dp = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(undefined),
  );

  const solve = (i, prev) => {
    if (i == n) {
      return 0;
    }

    if (dp[i][prev + 1] != undefined) {
      return dp[i][prev + 1];
    }

    if (arr[i] > arr[prev] || prev == -1) {
      let choice1 = 1 + solve(i + 1, i);
      let choice2 = solve(i + 1, prev);

      return (dp[i][prev + 1] = Math.max(choice1, choice2));
    }

    return (dp[i][prev + 1] = solve(i + 1, prev));
  };

  return solve(0, -1);
};

//? Improvement: Tabulation
// LIS tabulation cannot be converted directly from memoization approach.
// It is slightly different.
// - Create ans[i] to store the length of the LIS ending at index i.
// - Initialize every ans[i] = 1, since every element itself is a subsequence.
// - For each i, check all previous indices j < i.
// - If nums[j] < nums[i], extend the subsequence: ans[i] = max(ans[i], ans[j] + 1).
// - After processing all elements, the LIS can end anywhere.
// - Return Math.max(...ans).

//* Find all increasing subsequences ending at each index. Take max out of it and +1.

//? Code:
var lengthOfLIS = function (nums) {
  let n = nums.length;
  let ans = new Array(n).fill(1);

  for (let i = 1; i < n; i = i + 1) {
    let prevMax = 1;
    for (let j = i - 1; j >= 0; j = j - 1) {
      if (nums[j] < nums[i]) {
        prevMax = Math.max(prevMax, ans[j] + 1);
      }
    }
    ans[i] = prevMax;
  }

  return Math.max(...ans);
};

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)

//? Binary Search
//  1. Maintain tails, where each position stores the smallest ending value for that subsequence length.
// 2. tails is always sorted.
// 3. If num > tails[last], add it using tails.push(num).
// 4. Otherwise, find the first element >= num using binary search.
// 5. Replace that element with num.
// 6. A smaller ending value is better because it is easier to extend later.
// 7. Binary search uses low, high, and mid.
// 8. If tails[mid] < num, move right: low = mid + 1.
// 9. Otherwise move left: high = mid - 1.
// 10. When the loop ends, low is the replacement position.
// 11. Finally, tails.length is the length of the LIS.
// 12. Time: O(n log n), Space: O(n).

//? tails array is not exact LIS. It only stores the smallest possible ending value for each subsequence length.

//? Code:
var lengthOfLIS = function (nums) {
  let n = nums.length;
  let tails = [];
  tails.push(nums[0]);

  for (let i = 1; i < n; i = i + 1) {
    if (nums[i] > tails[tails.length - 1]) {
      tails.push(nums[i]);
    } else {
      let low = 0;
      let high = tails.length - 1;

      let ans;
      while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (tails[mid] < nums[i]) {
          low = mid + 1;
        } else {
          ans = mid;
          high = mid - 1;
        }
      }
      tails[ans] = nums[i];
    }
  }

  return tails.length;
};

//? Time Complexity: O(n logn)
//? Space Complexity: O(n)
