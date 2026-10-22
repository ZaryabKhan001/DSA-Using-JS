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
//* We have to remove the smallest subarray so that the sum of the remaining elements is divisible by p.
// First of all, we calculate totalSum to find out whether it is already divisible by p or not.
// If it is already divisible, we do not have to remove anything, so return 0.
// Otherwise, we have to remove a subarray.

//* Think carefully, totalSum % p is our target remainder.
// Our mind goes in a direction where we may think that we have to remove a subarray with sum = target.
// But what if no subarray has sum = target? What do we do in that case?
// Aisa subarray nahi remove karni jiska sum exactly target ho. Hum aisi subarray bhi remove kar sakte hain jiska sum = target + multiple of p ho.
// Because, if totalSum = 19 and p = 8, then target = 19 % 8 = 3.
// Now, 3 % 8 = 3, 11 % 8 = 3, and 19 % 8 = 3.
// So, subarrays with sum 3, 11, or 19 can work because all have the same remainder as target.
// For example, if we remove a subarray with sum 11, the remaining sum will be 19 - 11 = 8, which is divisible by 8.
// So, we can remove any subarray whose sum % p is equal to target. Koi bhi mil jaye remove karo bhai, but we have to choose the smallest length.

//* See carefully, we have a formula for finding the sum of a subarray.
// subarraySum = currentPrefixSum - prevPrefixSum.
// But we need a subarray whose sum % p = target.
// So, (currentPrefixSum - prevPrefixSum) % p = target.
// Rearranging it, prevPrefixSum % p = (currentPrefixSum - target) % p.
// We only care about remainders, so we store prefix sums modulo p in a hashmap instead of storing complete prefix sums.

//* To handle negative remainders in JavaScript, we add p.
// needed = (currentRemainder - target + p) % p.
// This gives us the previous prefix remainder we need to find in the map.

//* If this needed remainder exists in the map, it means we have found a subarray whose sum % p = target.
// We get its previous index from the map and calculate the subarray length: currentIndex - previousIndex.
// Then we update our minimum length.

//* Edge case: map.set(0, -1).
// Why do we do this? Because before the array starts, the prefix sum is 0 and its index is -1.
// This helps us find a subarray that starts from index 0.
// For example, if currentRemainder = target, then needed = (target - target + p) % p = 0.
// Since the map already contains remainder 0 at index -1, we can calculate the length as currentIndex - (-1) = currentIndex + 1.

// We store the current prefix remainder and its index in the map during every iteration.
// We update the index every time because, for the same remainder, the latest index gives us a shorter subarray when searching at a future index.
// So, map.set(currentRemainder, currentIndex) keeps updating the index.

//* Finally, if the minimum length is equal to n, it means we would have to remove the entire array, which is not allowed.
//* In that case, return -1. Otherwise, return the minimum length.

//? Code:
var minSubarray = function (nums, p) {
  let n = nums.length;
  let totalSum = nums.reduce((sum, curr) => sum + curr, 0);
  let target = totalSum % p;
  if (target === 0) return 0;

  let prefixRem = new Array(n);
  prefixRem[0] = nums[0] % p;

  for (let i = 1; i < n; i = i + 1) {
    prefixRem[i] = (prefixRem[i - 1] + nums[i]) % p;
  }

  let map = new Map();
  map.set(0, -1);
  let min = Infinity;

  for (let j = 0; j < n; j = j + 1) {
    let right = prefixRem[j];
    let needed = (right - target + p) % p;

    if (map.has(needed)) {
      let i = map.get(needed);

      min = Math.min(min, j - i);
    }

    map.set(right, j);
  }

  return min === n || min === Infinity ? -1 : min;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n) for storing remainders in map
