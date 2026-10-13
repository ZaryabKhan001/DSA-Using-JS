//? LeetCode #523
//? Continuous Subarray Sum

// Given an integer array nums and an integer k, return true if nums has a good subarray or false otherwise.

// A good subarray is a subarray where:

// its length is at least two, and
// the sum of the elements of the subarray is a multiple of k.
// Note that:

// A subarray is a contiguous part of the array.
// An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.

//? Example 1:
// Input: nums = [23,2,4,6,7], k = 6
// Output: true
// Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.

//? Example 2:
// Input: nums = [23,2,6,4,7], k = 6
// Output: true
// Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
// 42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.

//? Example 3:
// Input: nums = [23,2,6,4,7], k = 13
// Output: false

//? Constraints:
// 1 <= nums.length <= 105
// 0 <= nums[i] <= 109
// 0 <= sum(nums[i]) <= 231 - 1
// 1 <= k <= 231 - 1

//? Thought process:
/*
Continuous Subarray Sum - Thought Process

1. What is the problem?
We need to find a continuous subarray whose sum is divisible by k.
The subarray must contain at least 2 elements.

2. Brute force approach
Try every possible subarray.
Calculate its sum and check whether sum % k === 0.
If we find a valid subarray with at least 2 elements, return true.
Otherwise, return false.
Time complexity: O(n^2) if we calculate sums incrementally.

3. How can prefix sum help?
We already know:
subarraySum = prefixSum[j] - prefixSum[i - 1]

Instead of calculating every subarray sum from scratch, we can use prefix sums to get subarray sums quickly.

4. The important observation
We need a subarray sum divisible by k.
That means:
subarraySum % k === 0

Using prefix sums:
subarraySum = currentPrefixSum - previousPrefixSum

If two prefix sums have the same remainder when divided by k, their difference is divisible by k.

Example:
k = 5
Previous prefix sum = 12
Current prefix sum = 27

12 % 5 = 2
27 % 5 = 2

Their difference:
27 - 12 = 15

15 % 5 = 0

Why does this work?
Both prefix sums have the same leftover remainder.
When we subtract them, the remainders cancel out.
The remaining difference is a multiple of k.

Remember:
The difference is a multiple of k, not necessarily equal to k.

5. How do we avoid checking every pair?
Use a Map to remember the first index where each remainder appeared.

Map:
remainder -> first index where it appeared

For every number:
- Add it to prefixSum.
- Calculate remainder = prefixSum % k.
- Check whether this remainder already exists in the Map.
- If it exists, we found two prefix sums with the same remainder.
- Check whether the subarray contains at least 2 elements.
- If valid, return true.
- If the remainder is new, store its index.

6. Why store the first index only?
Suppose the same remainder appears at indexes 1, 3 and 5.
Using the first index gives us the longest possible distance to a later occurrence.
This helps us satisfy the minimum length of 2.
We should not overwrite the first index with later indexes.

7. Why initialize map.set(0, -1)?
A prefix sum of 0 exists before the array starts.
Its virtual index is -1.

This handles subarrays that start at index 0.

Example:
nums = [2, 4]
k = 6

Prefix sum at index -1 = 0
Prefix sum at index 1 = 6

Both remainders are 0.
The subarray sum is 6, which is divisible by 6.

8. Why use i - map.get(remainder) >= 2?
The Map stores the index of the previous prefix sum, not the starting index of the subarray.

Example:
Previous prefix index = -1
Current prefix index = 1

Length = 1 - (-1) = 2

We do not add 1 because the previous prefix sum represents a position before the subarray starts.

Compare:
Normal subarray length = end - start + 1
Prefix sum positions = currentIndex - previousPrefixIndex

9. Final interview explanation
I start with prefix sums because they allow me to calculate subarray sums using the difference between two prefix sums.
A valid subarray requires that this difference be divisible by k.
If two prefix sums have the same remainder when divided by k, their difference is divisible by k.
Therefore, I store the first index of each remainder in a Map.
When I encounter the same remainder again, I check whether the distance between the two prefix positions is at least 2.
If it is, I return true; otherwise, I continue searching.
*/

//? Code:
var checkSubarraySum = function (nums, k) {
    let n = nums.length;
    let prefixSum = 0;
    let map = new Map();
    map.set(0, -1);

    for (let i = 0; i < n; i = i + 1) {
        prefixSum = prefixSum + nums[i];

        let remainder = prefixSum % k;
        if (map.has(remainder)) {
            if (i - map.get(remainder) >= 2) {
                return true;
            };
        }
        else {
            map.set(remainder, i);
        }
    };

    return false;
};

//? Time Complexity: O(n)
//? Space Complexity: O(k) For k, there are atmost (0 - k - 1) remainders.