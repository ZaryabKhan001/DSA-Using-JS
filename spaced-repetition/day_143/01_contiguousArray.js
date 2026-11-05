//? LeetCode #525
//? Contiguous Array

// Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.

//? Example 1:
// Input: nums = [0,1]
// Output: 2
// Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.

//? Example 2:
// Input: nums = [0,1,0]
// Output: 2
// Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.

//? Example 3:
// Input: nums = [0,1,1,1,1,1,0,0,0]
// Output: 6
// Explanation: [1,1,1,0,0,0] is the longest contiguous subarray with equal number of 0 and 1.

//? Constraints:
// 1 <= nums.length <= 105
// nums[i] is either 0 or 1

//? Thought Process:
/*
Problem: Contiguous Array

Goal:
Find the maximum length of a contiguous subarray
that contains an equal number of 0s and 1s.

Example:
nums = [0, 1, 0, 1, 1, 0]

Answer = 4
Subarray [0, 1, 0, 1] contains two 0s and two 1s.


APPROACH 1: BRUTE FORCE

1. Generate every possible subarray.
2. Count the number of 0s and 1s in each subarray.
3. If both counts are equal, update maxLength.

If we count the elements again for every subarray,
the time complexity is O(n^3).

We can optimize this to O(n^2) by maintaining
the number of 0s and 1s while expanding each subarray.

But we still check many overlapping subarrays.


APPROACH 2: WHY SLIDING WINDOW IS NOT SUITABLE

Sliding window works well when we can decide whether
to move the left pointer or right pointer based on
a condition that changes predictably.

For example, with positive numbers, if the sum is
too large, moving the left pointer reduces the sum.

But here, our condition is:
number of 0s must equal number of 1s.

Consider:
[0, 0, 1, 1]

The counts become:
0s = 2, 1s = 2

Now consider adding another 0:
[0, 0, 1, 1, 0]

The counts become:
0s = 3, 1s = 2

Should we move the left pointer now?

Not necessarily. Removing an element might help,
but we cannot tell whether removing a 0 or a 1
will lead to the longest valid subarray.

There is no reliable rule like:
if the condition fails, always shrink the window.

We need to find the longest valid subarray, not
just any valid window.

Therefore, the usual sliding window technique
does not give us a reliable way to find the answer.


APPROACH 3: PREFIX SUM + HASHMAP

Step 1: Convert 0 into -1 and keep 1 as 1.

Why?

We want equal numbers of 0s and 1s.

If we convert:
0 -> -1
1 -> 1

Then equal numbers of 0s and 1s will cancel each other.

Example:
[0, 1, 0, 1]

Becomes:
[-1, 1, -1, 1]

Sum = -1 + 1 - 1 + 1 = 0

So our problem becomes:

Find the longest subarray whose sum is zero.


Step 2: Use a running prefix sum.

Example:
nums = [0, 1, 0, 1, 1, 0]

After conversion:
[-1, 1, -1, 1, 1, -1]

Running prefix sums:
[-1, 0, -1, 0, 1, 0]

Notice that prefix sum 0 appears at index 1
and again at index 3.

The subarray between these positions has sum 0.

Length = 3 - 1 = 2

That subarray is [0, 1].


Step 3: Why does the same prefix sum work?

Suppose the prefix sum at index i is 5.
Later, at index j, the prefix sum is also 5.

This means both prefixes have the same total sum.

Subarray sum from i + 1 to j:

prefixSum[j] - prefixSum[i]

= 5 - 5
= 0

A sum of zero means equal numbers of 0s and 1s.

The length of this subarray is:
j - i

So whenever we see the same prefix sum again,
we can calculate a valid subarray length.


Step 4: Why use a HashMap?

We need to remember where each prefix sum first appeared.

Map:
prefix sum -> earliest index

When we encounter a prefix sum already in the map,
we calculate:

length = currentIndex - earliestIndex

We keep the maximum length.

Why store the earliest index?

Because an earlier index gives us a longer subarray.

Do not overwrite the first occurrence with a later index.


Step 5: What about a prefix sum of zero?

If the running prefix sum becomes zero at index i,
the entire subarray from index 0 to i is valid.

Its length is i + 1.

We can handle this separately:

if (prefixSum === 0) {
    maxLength = Math.max(maxLength, i + 1);
}

Alternatively, initialize the map with:

map.set(0, -1);

This acts as if a prefix sum of zero existed
before the array started.

Then the normal formula works:

length = i - (-1)
       = i + 1

This removes the need for a separate zero check.


FINAL APPROACH

1. Initialize prefixSum = 0.
2. Initialize maxLength = 0.
3. Initialize map with (0, -1).
4. Traverse the array.
5. Convert 0 to -1 and keep 1 as 1.
6. Add the converted value to prefixSum.
7. If prefixSum exists in the map:
   calculate the length using the earliest index.
   Update maxLength.
8. Otherwise, store prefixSum with the current index.
9. Return maxLength.


COMPLEXITY

Time: O(n)
We traverse the array once, and Map operations
take O(1) average time.

Space: O(n)
In the worst case, we store up to n different
prefix sums.


INTERVIEW TAKEAWAY

Whenever a problem asks for a subarray with equal
numbers of two values, consider converting one value
to -1 and the other to +1.

Then equal counts become a zero-sum subarray problem.

For finding the longest zero-sum subarray,
prefix sum + hashmap is an efficient approach.
*/

//? Code:
var findMaxLength = function (nums) {
  let n = nums.length;
  let prefixSum = new Array(n);

  prefixSum[0] = nums[0] === 1 ? 1 : -1;

  for (let i = 1; i < n; i = i + 1) {
    let curr = nums[i] === 1 ? 1 : -1;
    prefixSum[i] = prefixSum[i - 1] + curr;
  }

  let maxLength = 0;
  let map = new Map();

  for (let i = 0; i < n; i = i + 1) {
    let left = prefixSum[i];

    if (left === 0) {
      maxLength = Math.max(maxLength, i + 1);
    }

    if (map.has(left)) {
      maxLength = Math.max(maxLength, i - map.get(left));
    } else {
      map.set(left, i);
    }
  }

  return maxLength;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)

//? No need to use full prefix sum array, use prefix sum on the go.
var findMaxLength = function (nums) {
  let n = nums.length;
  let prefixSum = 0;
  let maxLength = 0;
  let map = new Map();

  for (let i = 0; i < n; i = i + 1) {
    prefixSum = prefixSum + (nums[i] === 1 ? 1 : -1);
    let left = prefixSum;

    if (left === 0) {
      maxLength = Math.max(maxLength, i + 1);
    }

    if (map.has(left)) {
      maxLength = Math.max(maxLength, i - map.get(left));
    } else {
      map.set(left, i);
    }
  }

  return maxLength;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
