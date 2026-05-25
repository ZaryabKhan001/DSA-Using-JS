//? LeetCode #643
//? Maximum Average Subarray I

// You are given an integer array nums consisting of n elements, and an integer k.

// Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted.

//? Example 1:
// Input: nums = [1,12,-5,-6,50,3], k = 4
// Output: 12.75000
// Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75

//? Example 2:
// Input: nums = [5], k = 1
// Output: 5.00000

//? Constraints:
// n == nums.length
// 1 <= k <= n <= 105
// -104 <= nums[i] <= 104

//? Approach
// We use a fixed-size sliding window of length `s1.length` over `s2`.
// If any window has the same character frequency as `s1`, return true.

//? Code
var checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false;

  let pCount = new Array(26).fill(0);
  let wCount = new Array(26).fill(0);

  let a = "a".charCodeAt(0);

  for (let ch of s1) {
    pCount[ch.charCodeAt(0) - a]++;
  }

  let i = 0;

  for (let j = 0; j < s2.length; j++) {
    wCount[s2[j].charCodeAt(0) - a]++;

    if (j - i + 1 > s1.length) {
      wCount[s2[i].charCodeAt(0) - a]--;
      i++;
    }

    if (j - i + 1 === s1.length && isEqual(pCount, wCount)) {
      return true;
    }
  }

  return false;
};

function isEqual(a, b) {
  for (let i = 0; i < 26; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

//? Time Complexity: O(n) (each character processed once, comparison is constant 26)
//? Space Complexity: O(1) (fixed size arrays of 26)
