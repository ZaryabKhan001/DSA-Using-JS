//? LeetCode #1248
//? Count Number of Nice Subarrays

// Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.

// Return the number of nice sub-arrays.

//? Example 1:
// Input: nums = [1,1,2,1,1], k = 3
// Output: 2
// Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].

//? Example 2:
// Input: nums = [2,4,6], k = 1
// Output: 0
// Explanation: There are no odd numbers in the array.

//? Example 3:
// Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
// Output: 16

//? Constraints:
// 1 <= nums.length <= 50000
// 1 <= nums[i] <= 10^5
// 1 <= k <= nums.length

//? Thought Process:
/*
Problem: Count Number of Nice Subarrays

We need to count subarrays that contain exactly k odd numbers.

Example:
nums = [1, 1, 2, 1, 1]
k = 3

Approach 1: Brute Force

1. Generate every possible subarray.
2. Count the odd numbers in each subarray.
3. If the odd count is equal to k, increase count.
4. This takes O(n^2) time if we maintain the odd count while extending each subarray.

Approach 2: Prefix Sum

Step 1: Think about what we really need.

We don't care about the actual sum of numbers.
We only care about the number of odd numbers.

So, instead of adding actual numbers, count odd numbers.

Example:
nums = [1, 1, 2, 1, 1]

Prefix odd counts:
prefixOdds = [1, 2, 2, 3, 4]

Meaning:
Index 0: 1 odd number so far.
Index 1: 2 odd numbers so far.
Index 2: 2 odd numbers so far.
Index 3: 3 odd numbers so far.
Index 4: 4 odd numbers so far.

Step 2: Understand how to find a subarray.

Suppose the current prefix has 4 odd numbers.
We need a subarray with exactly 3 odd numbers.

Ask yourself:
How many odd numbers should the previous prefix have?

Current odd count - Previous odd count = k

4 - Previous odd count = 3

Previous odd count = 1

So, we need to find how many previous prefixes had 1 odd number.

Step 3: Use a Map.

The map stores:
How many times have we seen each prefix odd count?

For example:
Map = {1: 2, 2: 1}

This means:
Prefix odd count 1 appeared twice.
Prefix odd count 2 appeared once.

If the current odd count is 4 and k is 3:
Required odd count = 4 - 3 = 1

The map says we have seen prefix odd count 1 twice.
So, we found 2 valid subarrays ending at the current index.

Add 2 to count.

Step 4: Why do we use map.set(0, 1)?

Imagine a subarray starts from index 0.

There is no previous array element.
But we still need to count subarrays starting from the beginning.

So, we pretend that before the array starts,
we had seen zero odd numbers once.

This helps us count subarrays starting at index 0.

Step 5: Process every index.

For each prefix odd count:

1. Find currentOddCount.
2. Calculate requiredOddCount = currentOddCount - k.
3. Check how many times requiredOddCount exists in the map.
4. Add that frequency to count.
5. Store the current odd count in the map.

Important:
Check the map BEFORE storing the current prefix.
Otherwise, you might count an empty subarray when k = 0.

Step 6: Why is this better?

We don't generate every subarray.
We use the map to find how many valid subarrays end at each index.

Time complexity: O(n)
Space complexity: O(n)

Remember this one sentence:

Current odd count - k = the previous odd count we need.
The map tells us how many times that previous count appeared.
*/

//? Code:
var numberOfSubarrays = function (nums, k) {
  let n = nums.length;
  let prefixOdds = new Array(n);
  prefixOdds[0] = nums[0] % 2 === 0 ? 0 : 1;
  for (let i = 1; i < n; i = i + 1) {
    if (nums[i] % 2 === 0) {
      prefixOdds[i] = prefixOdds[i - 1];
    } else {
      prefixOdds[i] = prefixOdds[i - 1] + 1;
    }
  }

  let count = 0;
  let map = new Map();
  for (let i = 0; i < n; i = i + 1) {
    let currentOddCount = prefixOdds[i];
    let requiredOddCount = currentOddCount - k;

    if (prefixOdds[i] === k) {
      count++;
    }

    if (map.has(requiredOddCount)) {
      count = count + map.get(requiredOddCount);
    }

    if (map.has(prefixOdds[i])) {
      map.set(prefixOdds[i], map.get(prefixOdds[i]) + 1);
    } else {
      map.set(prefixOdds[i], 1);
    }
  }

  return count;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n) for map.
