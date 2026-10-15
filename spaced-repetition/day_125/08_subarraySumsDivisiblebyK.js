//? LeetCode #974
//? Subarray Sums Divisible by K

// Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.

// A subarray is a contiguous part of an array.

//? Example 1:
// Input: nums = [4,5,0,-2,-3,1], k = 5
// Output: 7
// Explanation: There are 7 subarrays with a sum divisible by k = 5:
// [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]

//? Example 2:
// Input: nums = [5], k = 9
// Output: 0

//? Constraints:
// 1 <= nums.length <= 3 * 104
// -104 <= nums[i] <= 104
// 2 <= k <= 104

//? Thought Process:
/*
Problem: Subarrays Divisible by K

Approach 1: Brute Force - O(n^3)

1. Generate every possible subarray.
2. Calculate the sum of each subarray.
3. Divide the sum by k and check if the remainder is 0.
4. If the remainder is 0, increase the count.

Why O(n^3)?
- There are O(n^2) possible subarrays.
- Calculating the sum of each subarray takes O(n).
- Total time complexity is O(n^3).


Approach 2: Running Sum - O(n^2)

Problem with brute force:
- We calculate the sum again and again for overlapping subarrays.
- We can avoid this repeated work using a running sum.

Example:
nums = [2, 3, 1], k = 3

Start from index 0:
[2]       sum = 2
[2, 3]    sum = 5
[2, 3, 1] sum = 6

Instead of calculating each sum from scratch:
- Keep adding the next number to the previous sum.
- Check if the current sum is divisible by k.

Then start from index 1 and repeat the same process.
Continue for every starting index.

Why O(n^2)?
- There are O(n^2) subarrays.
- Each subarray sum is updated in O(1) time.
- Total time complexity becomes O(n^2).


Approach 3: Prefix Sum + HashMap - O(n)

Now we want to avoid checking every subarray.

Key idea:
- Calculate the prefix sum at every index.
- Use the remainder of each prefix sum to find valid subarrays.

Example:
nums = [4, 5, 0, -2, -3, 1], k = 5

Prefix sums:
[4, 9, 9, 7, 4, 5]

Remainders after dividing by 5:
[4, 4, 4, 2, 4, 0]

Why do we use prefix sums?

Suppose:
prefixSum[i] = sum from index 0 to i
prefixSum[j] = sum from index 0 to j

The sum of the subarray from i + 1 to j is:

prefixSum[j] - prefixSum[i]

Instead of calculating every subarray sum, we can use two prefix sums to find it in O(1) time.


Why do two equal remainders indicate a valid subarray?

Suppose two prefix sums are 9 and 4, and k = 5.

9 % 5 = 4
4 % 5 = 4

Both prefix sums have the same remainder.

Their difference is:
9 - 4 = 5

5 % 5 = 0

So the subarray between these prefix sums has a sum divisible by 5.

Why does this always work?

If two numbers have the same remainder, their difference is divisible by k.

Example:
14 % 5 = 4
9 % 5 = 4

14 - 9 = 5

The difference has remainder 0 when divided by 5.

Important:
- We do not need to calculate the subarray sum directly.
- We only need to check whether two prefix sums have the same remainder.


How does the HashMap help?

The map stores:
remainder -> how many times we have seen it

Whenever the current remainder already exists:
- Every previous occurrence gives us one valid subarray.
- Add the frequency of that remainder to our answer.
- Increase its frequency by 1.

Example:
k = 5
Prefix sums = [4, 9, 9]

Remainders = [4, 4, 4]

First remainder 4:
- Seen 0 times.
- No subarray found.
- Store 4 -> 1.

Second remainder 4:
- Seen 1 time.
- Add 1 to count.
- Update 4 -> 2.

Third remainder 4:
- Seen 2 times.
- Add 2 to count.   
- Update 4 -> 3.

Total valid subarrays = 1 + 2 = 3.

These are:
[5]
[5, 0]
[0]

The actual array can be [4, 5, 0], whose prefix sums are [4, 9, 9].
The valid subarrays are [5], [5, 0], and [0].


Why do we need to handle remainder 0?

If a prefix sum itself is divisible by k, the subarray from index 0 to the current index is valid.

Example:
nums = [2, 3], k = 5

Prefix sums = [2, 5]
Remainders = [2, 0]

The prefix sum 5 is divisible by 5.
So [2, 3] is a valid subarray.

We can handle this in two ways:
1. If remainder is 0, increase count separately.
2. Initialize map with 0 -> 1 and use the same map logic for every remainder.

Use only one method. Otherwise, we may count some subarrays twice.


Why do we convert negative remainders?

In JavaScript:
-2 % 5 = -2

But mathematically, -2 and 3 belong to the same remainder group because:

-2 = (-1 * 5) + 3

Also:
3 - (-2) = 5

Their difference is divisible by 5.

However, JavaScript Map treats -2 and 3 as different keys.

So we normalize the remainder:

remainder = ((prefixSum % k) + k) % k

Example:
((-2 % 5) + 5) % 5
= (-2 + 5) % 5
= 3 % 5
= 3

Now both -2 and 3 become 3.

This makes the map work correctly when the array contains negative numbers.


Why is the final approach O(n)?

- Calculate prefix sums in O(n).
- Visit every prefix sum once.
- Map lookup and update take O(1) average time.
- Total time complexity is O(n).
- Prefix sum array and map use O(n) space.


Possible interviewer questions:

Q1: Why do equal remainders give a valid subarray?
A: The difference between two prefix sums is the subarray sum. Equal remainders mean their difference is divisible by k.

Q2: Why use a HashMap?
A: It stores how many times each remainder has appeared. That frequency tells us how many valid subarrays end at the current index.

Q3: Why not use a Set?
A: A Set stores only whether a remainder exists. We need its frequency because one remainder may occur many times, giving multiple valid subarrays.

Q4: Why do we normalize negative remainders?
A: JavaScript can return negative remainders. We normalize them so mathematically equal remainder groups use the same map key.

Q5: Why do we need remainder 0?
A: A prefix sum divisible by k forms a valid subarray starting at index 0.

Q6: Why is this better than running sum?
A: Running sum checks every subarray, which takes O(n^2). Prefix sum + HashMap counts valid subarrays using remainder frequencies in O(n) average time.

Q7: What is the space complexity?
A: O(n), because the prefix sum array and HashMap can both store up to n entries.

Q8: Can k be negative?
A: The usual problem constraints give a positive k. If k is negative, use its absolute value for the remainder logic.

Q9: Can we remove the prefix sum array?
A: Yes. We can maintain a running prefix sum and its remainder while traversing the array. Then the extra space is O(k) when k is positive, because there are only k possible normalized remainders.

Q10: What is the main intuition?
A: Instead of checking every subarray, we check how many previous prefix sums have the same remainder as the current prefix sum.
*/

//? Code:
var subarraysDivByK = function (nums, k) {
  let n = nums.length;
  let prefixSum = new Array(n);
  prefixSum[0] = nums[0];

  for (let i = 1; i < n; i = i + 1) {
    prefixSum[i] = prefixSum[i - 1] + nums[i];
  }

  let count = 0;
  let map = new Map();
  for (let j = 0; j < n; j = j + 1) {
    let remainder = ((prefixSum[j] % k) + k) % k;

    if (remainder === 0) {
      count++;
    }

    if (map.has(remainder)) {
      count = count + map.get(remainder);
      map.set(remainder, map.get(remainder) + 1);
    } else {
      map.set(remainder, 1);
    }
  }

  return count;
};

//? Time Complexity: O(n)
//? Space Complexity: O(k) for map, because there are at most [O to k - 1] remainders for given k.
