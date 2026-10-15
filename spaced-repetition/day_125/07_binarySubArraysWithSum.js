//? LeetCode #930
//? Binary Subarrays With Sum

// Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.

// A subarray is a contiguous part of the array.

//? Example 1:
// Input: nums = [1,0,1,0,1], goal = 2
// Output: 4
// Explanation: The 4 subarrays are bolded and underlined below:
// [1,0,1,0,1]
// [1,0,1,0,1]
// [1,0,1,0,1]
// [1,0,1,0,1]

//? Example 2:
// Input: nums = [0,0,0,0,0], goal = 0
// Output: 15

//? Constraints:
// 1 <= nums.length <= 3 * 104
// nums[i] is either 0 or 1.
// 0 <= goal <= nums.length

//? Thought Process:
/*
APPROACH 1: BRUTE FORCE O(N^3) -> RUNNING SUM O(N^2)

1. Find all possible subarrays using two loops.
   The first loop fixes the starting index i.
   The second loop fixes the ending index j.

2. Brute force:
   For every subarray, use another loop to calculate its sum.
   If sum === goal, increase count.
   Time: O(N^3).

3. Optimization:
   Instead of recalculating the sum from scratch,
   maintain a runningSum while moving j forward.

   runningSum = runningSum + nums[j]

   If runningSum === goal, increase count.

4. Now each subarray sum takes O(1) time to update.
   We only need two loops.
   Time: O(N^2), Space: O(1).


APPROACH 2: PREFIX SUM + HASHMAP O(N)

1. Observation:
   We don't need to check every subarray individually.
   We can use prefix sums to find the required subarray sum.

2. Fix the right boundary:
   Traverse the array and keep calculating prefixSum.
   prefixSum represents the sum from index 0 to current index j.

3. Find the required left boundary:
   We want the subarray sum to equal goal.

   subarraySum = currentPrefixSum - previousPrefixSum

   goal = currentPrefixSum - previousPrefixSum

   previousPrefixSum = currentPrefixSum - goal

   So, we search for (prefixSum - goal) in the hashmap.

4. Count matching prefix sums:
   The hashmap stores each prefix sum and how many times
   it has occurred.

   If (prefixSum - goal) exists in the map,
   add its frequency to count because each occurrence
   represents a valid starting boundary.

5. Update the hashmap:
   After checking for the required previous prefix sum,
   store the current prefixSum or increase its frequency.

6. Initialize map.set(0, 1):
   This represents an empty prefix before index 0.
   It allows us to count subarrays that start at index 0
   without writing a separate condition.

Time: O(N)
Space: O(N)

IMPORTANT:
Check for prefixSum - goal BEFORE inserting the current
prefixSum into the map. This ensures we only use previous
prefix sums to form subarrays.
*/

//? Code:
var numSubarraysWithSum = function (nums, goal) {
  let n = nums.length;
  let prefixSum = new Array(n);
  prefixSum[0] = nums[0];

  for (let i = 1; i < n; i = i + 1) {
    prefixSum[i] = prefixSum[i - 1] + nums[i];
  }

  let count = 0;
  let map = new Map();
  for (let j = 0; j < n; j = j + 1) {
    let left = prefixSum[j] - goal;

    if (prefixSum[j] === goal) {
      count++;
    }

    if (map.has(left)) {
      count = count + map.get(left);
    }

    if (map.has(prefixSum[j])) {
      map.set(prefixSum[j], map.get(prefixSum[j]) + 1);
    } else {
      map.set(prefixSum[j], 1);
    }
  }

  return count;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n) for map
