//? LeetCode #673
//? Number of Longest Increasing Subsequence

// Given an integer array nums, return the number of longest increasing subsequences.

// Notice that the sequence has to be strictly increasing.

//? Example 1:
// Input: nums = [1,3,5,4,7]
// Output: 2
// Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].

//? Example 2:
// Input: nums = [2,2,2,2,2]
// Output: 5
// Explanation: The length of the longest increasing subsequence is 1, and there are 5 increasing subsequences of length 1, so output 5.

//? Constraints:
// 1 <= nums.length <= 2000
// -106 <= nums[i] <= 106
// The answer is guaranteed to fit inside a 32-bit integer.

//? Thought Process:
/*
Think: LIS + COUNTING.

1. lisLength[i]
   → Longest Increasing Subsequence ending at index i.

2. lisCount[i]
   → Number of LIS of length lisLength[i] ending at index i.

3. Initially:
      lisLength[i] = 1
      lisCount[i] = 1

   Every element itself is an LIS of length 1.

4. For every j < i:
      if (nums[j] < nums[i])

   We can extend the LIS ending at j.

5. New possible length:
      lisLength[j] + 1

6. If new length is BIGGER:
      lisLength[j] + 1 > lisLength[i]

   We found a longer LIS.

   So:
      lisLength[i] = lisLength[j] + 1
      lisCount[i] = lisCount[j]

   Why replace count?
   → Old LIS were shorter.
   → We only care about the new longest ones.

7. If new length is SAME:
      lisLength[j] + 1 === lisLength[i]

   We found another way to create the same-length LIS.

   So:
      lisCount[i] += lisCount[j]

   MEMORY:
      Longer → Replace count
      Same   → Add count

8. maxLength
   → Overall maximum LIS length.

9. Why do we need the final loop?

   There can be multiple LIS of maxLength
   ending at different indices.

   So find every:
      lisLength[i] === maxLength

   Then add:
      lisCount[i]

10. Final idea:

      lisLength → How long?
      lisCount  → How many?
      maxLength → Overall longest length

11. Final loop:

      if (lisLength[i] === maxLength)
          count += lisCount[i]

12. Final answer:
      count = total number of LIS
*/

//? Code:
var findNumberOfLIS = function (nums) {
    let n = nums.length;
    let maxLength = 1;
    let lisLength = new Array(n).fill(1);
    let lisCount = new Array(n).fill(1);

    for (let i = 1; i < n; i = i + 1) {
        for (let j = 0; j < i; j = j + 1) {
            if (nums[j] < nums[i]) {
                if (lisLength[j] + 1 > lisLength[i]) {
                    lisLength[i] = lisLength[j] + 1;
                    lisCount[i] = lisCount[j];
                }

                // Found another LIS of same length
                else if (lisLength[j] + 1 === lisLength[i]) {
                    lisCount[i] += lisCount[j];
                }
            }
        }
        maxLength = Math.max(maxLength, lisLength[i]);
    }

    let count = 0;
    for (let i = 0; i < n; i++) {
        if (lisLength[i] === maxLength) {
            count += lisCount[i];
        }
    }

    return count;
};

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)