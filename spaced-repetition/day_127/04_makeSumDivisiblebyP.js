//? LeetCode #1590
//? Make Sum Divisible by P

// Given an array of positive integers nums, remove the smallest subarray (possibly empty) such that the sum of the remaining elements is divisible by p. It is not allowed to remove the whole array.

// Return the length of the smallest subarray that you need to remove, or -1 if it's impossible.

// A subarray is defined as a contiguous block of elements in the array.

//? Example 1:
// Input: nums = [3,1,4,2], p = 6
// Output: 1
// Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.

//? Example 2:
// Input: nums = [6,3,5,2], p = 9
// Output: 2
// Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [5,2], leaving us with [6,3] with sum 9.

//? Example 3:
// Input: nums = [1,2,3], p = 3
// Output: 0
// Explanation: Here the sum is 6. which is already divisible by 3. Thus we do not need to remove anything.

//? Constraints:
// 1 <= nums.length <= 105
// 1 <= nums[i] <= 109
// 1 <= p <= 109

//? Thought Process:
/*
Problem:
We need to remove the shortest subarray so that the remaining array sum
is divisible by p.

Thought Process:

1. Calculate the total sum of the array.
   If totalSum % p === 0, the sum is already divisible by p.
   So, return 0 because we do not need to remove anything.

2. Find the target remainder.
   target = totalSum % p

   We need to remove a subarray whose sum has the same remainder
   as the total sum.

   Example:
   totalSum = 10, p = 6
   target = 10 % 6 = 4

   We need to remove a subarray whose sum has remainder 4.

3. Use prefix sum remainders instead of checking every subarray.
   We can find a subarray sum by subtracting an earlier prefix sum
   from the current prefix sum.

   Since we only care about remainders, we store prefix remainders
   instead of complete prefix sums.

4. Use a Map to find the required previous remainder quickly.
   The Map stores:
   prefix remainder -> index

   Initialize map.set(0, -1) because a subarray can start at index 0.
   Index -1 represents the position before the array starts.

5. Traverse the array and calculate the current prefix remainder.
   prefixRemainder = (prefixRemainder + nums[i]) % p

6. Find the previous remainder we need.
   needed = (prefixRemainder - target + p) % p

   We use this formula because the subarray between the previous
   prefix and the current index must have remainder equal to target.

   Adding p avoids a negative value before applying the remainder.

7. Check whether the required remainder exists in the Map.
   If it exists, we found a valid subarray.

   Its length is:
   i - map.get(needed)

   Update minLen with the smaller length.

8. Store the current prefix remainder and its index.
   map.set(prefixRemainder, i)

   We keep the latest index because a later starting position
   produces a shorter subarray for the same ending index.

9. Return the answer.
   If minLen is still nums.length, return -1 because removing the
   entire array is not allowed.

   Otherwise, return minLen.

Time Complexity: O(n)
Space Complexity: O(n)
*/

//? Code:
var minSubarray = function (nums, p) {
  let totalSum = nums.reduce((sum, curr) => sum + curr, 0);
  let target = totalSum % p;

  if (target === 0) return 0;

  let map = new Map();
  map.set(0, -1);

  let prefixRemainder = 0;
  let minLen = nums.length;

  for (let i = 0; i < nums.length; i++) {
    prefixRemainder = (prefixRemainder + nums[i]) % p;
    let needed = (prefixRemainder - target + p) % p;

    if (map.has(needed)) {
      minLen = Math.min(minLen, i - map.get(needed));
    }

    // Keep the latest index to minimize subarray length.
    map.set(prefixRemainder, i);
  }

  return minLen === nums.length ? -1 : minLen;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n) for storing remainders in map
