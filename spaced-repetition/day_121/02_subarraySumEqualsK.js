//? LeetCode #560
//? Subarray Sum Equals K

// Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

// A subarray is a contiguous non-empty sequence of elements within an array.

//? Example 1:
// Input: nums = [1,1,1], k = 2
// Output: 2

//? Example 2:
// Input: nums = [1,2,3], k = 3
// Output: 2

//? Constraints:
// 1 <= nums.length <= 2 * 104
// -1000 <= nums[i] <= 1000
// -107 <= k <= 107

//? Thought Process:
/*
Problem: Subarray Sum Equals K

Brute force approach: O(n * n * n)

1. First thought is to find every possible subarray.
2. Use i as the left boundary and j as the right boundary.
3. For every subarray, run another loop to calculate its sum.
4. If sum === k, increase count.
5. This takes O(n^3) because there are O(n^2) subarrays and calculating each sum takes O(n).

Optimization 1: Reduce O(n^3) to O(n^2)

1. Notice that we are repeatedly calculating the sum of overlapping subarrays.
2. Instead of calculating the sum from scratch, keep a running sum.
3. Fix the left boundary i and move the right boundary j forward.
4. Add nums[j] to the running sum.
5. Whenever sum === k, increase count.
6. This reduces time complexity to O(n^2), with O(1) extra space.

Optimization 2: Understand prefix sum

1. Prefix sum stores the sum of all elements from index 0 to the current index.
2. For nums = [1, 2, 3, 4], prefixSum = [1, 3, 6, 10].
3. Now we can calculate any subarray sum using prefix sums instead of adding every element again.

4. Suppose we want the sum of a subarray from index i to index j.

   subarraySum = prefixSum[j] - prefixSum[i - 1]

5. Why?
   prefixSum[j] contains everything from index 0 to j.
   prefixSum[i - 1] contains everything before index i.
   Subtracting removes the elements before i and leaves only the required subarray.

6. Special case:
   If i === 0, there is nothing before the subarray, so its sum is simply prefixSum[j].

Optimization 3: Use the equation to find valid subarrays

1. We want the subarray sum to equal k.

   prefixSum[j] - prefixSum[i - 1] = k

2. Rearrange the equation.

   prefixSum[i - 1] = prefixSum[j] - k

3. This is the main observation.
   For every right boundary j, we need to find how many previous prefix sums equal prefixSum[j] - k.

4. Without a map, we would need another loop to search previous prefix sums.
   This would still take O(n^2) time.

Optimization 4: Why do we need a map?

1. Store previous prefix sums and their frequencies in a map.

2. The map stores:
   Key = a previous prefix sum value.
   Value = how many times that prefix sum has occurred.

3. The map does NOT store the left or right boundary directly.
   It stores prefix sum values and their frequencies.

4. For each current prefixSum[j]:
   Calculate value = prefixSum[j] - k.

5. If map[value] exists, add map[value] to count.
   Each occurrence represents a different valid left boundary and therefore a different subarray ending at j.

6. After checking, store the current prefix sum in the map so that future elements can use it.

7. Order matters:
   First search for prefixSum[j] - k.
   Then store prefixSum[j].
   This prevents the current prefix sum from being used as its own previous prefix sum when k === 0.

8. Initialize map with {0: 1}.
   This represents the empty prefix before index 0.
   It allows subarrays starting at index 0 to be counted without a separate special check.

Final complexity:
Time: O(n)
Space: O(n)

Core intuition:
Instead of checking every subarray, we use prefix sums to convert the subarray sum condition into an equation. A map lets us find how many previous prefix sums satisfy that equation in O(1) average time.
*/

//? Code:
var subarraySum = function (nums, k) {
  let n = nums.length;
  let count = 0;
  let prefixSum = new Array(n).fill(0);
  prefixSum[0] = nums[0];

  for (let i = 1; i < n; i = i + 1) {
    prefixSum[i] = prefixSum[i - 1] + nums[i];
  }

  let map = {};

  for (let j = 0; j < n; j = j + 1) {
    if (prefixSum[j] === k) {
      count++;
    }

    let value = prefixSum[j] - k;

    if (map[value]) {
      count += map[value];
    }

    if (!map[prefixSum[j]]) {
      map[prefixSum[j]] = 1;
    } else {
      map[prefixSum[j]]++;
    }
  }

  return count;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
