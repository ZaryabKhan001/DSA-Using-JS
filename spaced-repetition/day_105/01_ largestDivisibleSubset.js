//? LeetCode #368
//? Largest Divisible Subset

// Given a set of distinct positive integers nums, return the largest subset answer such that every pair (answer[i], answer[j]) of elements in this subset satisfies:

// answer[i] % answer[j] == 0, or
// answer[j] % answer[i] == 0
// If there are multiple solutions, return any of them.

//? Example 1:
// Input: nums = [1,2,3]
// Output: [1,2]
// Explanation: [1,3] is also accepted.

//? Example 2:
// Input: nums = [1,2,4,8]
// Output: [1,2,4,8]

//? Constraints:
// 1 <= nums.length <= 1000
// 1 <= nums[i] <= 2 * 109
// All the integers in nums are unique.

//? Thought Process:
// This problem looks extremely tough.
//  1. We need to find the largest subset where every pair is divisible.
// 2. At first, this looks like a subset / backtracking problem.
// 3. But notice something important: if a < b, we only need to check b % a === 0.
// 4. We don't need to check a % b, because it can never be 0 when a < b.
// 5. So, if we sort the numbers, smaller numbers always come before larger numbers.
// 6. Example: [1, 2, 3, 4, 8].
// 7. Now when considering 8, we only care about smaller numbers before it.
// 8. This starts looking like LIS (Longest Increasing Subsequence).
// 9. In LIS, we ask: "Can this number extend a valid sequence?"
// 10. Here, we ask: "Can this number extend a divisible sequence?"
// 11. For example, 4 can extend [1, 2] because 4 % 2 === 0.
// 12. Similarly, 8 can extend [1, 2, 4].
// 13. So instead of checking all subsets, we can build the best valid subset ending at each number.
// 14. That's the main reason this problem can be solved using an LIS-style DP.

//? Code:
var largestDivisibleSubset = function (nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const memo = new Map();

  const solve = (index, prevIndex) => {
    if (index === n) {
      return [];
    }

    const key = `${index},${prevIndex}`;
    if (memo.has(key)) {
      return memo.get(key);
    }

    let notTake = solve(index + 1, prevIndex);

    let take = [];
    if (nums[index] % nums[prevIndex] === 0 || prevIndex === -1) {
      take = [nums[index], ...solve(index + 1, index)];
    }

    const result = notTake.length > take.length ? notTake : take;
    memo.set(key, result);

    return result;
  };

  return solve(0, -1);
};

//? Time Complexity: O(n^2) for dp based solution and O(n) for array copying. O(n^3) which is domintaing on O(nlogn) of sorting.
//? Space Complexity: O(n^2)

//? Can we do the same thing using Bottom Up LIS?
// Yes, 100%.

//? Code:
var largestDivisibleSubset = function (nums) {
    nums.sort((a, b) => a - b);
    let n = nums.length;
    let ans = new Array(n).fill(1);
    let prev = new Array(n).fill(-1);
    let lastIndex = 0;
    let maxLength = 1;

    for (let i = 1; i < n; i = i + 1) {
        for (let j = 0; j < i; j = j + 1) {
            if (nums[i] % nums[j] === 0) {
                if (ans[j] + 1 > ans[i]) {
                    ans[i] = ans[j] + 1;
                    prev[i] = j;
                }
            }
        }

        if (ans[i] > maxLength) {
            maxLength = ans[i];
            lastIndex = i;
        }
    }

    let lds = [];
    while (lastIndex !== -1) {
        lds.push(nums[lastIndex]);
        lastIndex = prev[lastIndex];
    }

    return lds.reverse();
};

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)