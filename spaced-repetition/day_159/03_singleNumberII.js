//? LeetCode #137
//? Single Number II

// Given an integer array nums where every element appears three times except for one, which appears exactly once. Find the single element and return it.

// You must implement a solution with a linear runtime complexity and use only constant extra space.

//? Example 1:
// Input: nums = [2,2,3,2]
// Output: 3

//? Example 2:
// Input: nums = [0,1,0,1,0,1,99]
// Output: 99

//? Constraints:
// 1 <= nums.length <= 3 * 104
// -231 <= nums[i] <= 231 - 1
// Each element in nums appears exactly three times except for one element which appears once.

//? Thought Process:
//* Approach 01:
// First approach q k hamy frequency ki base py khelna hai tu dost, frequency store karlo.
// Phir kya kro na k keys nikalo and loop chalao and dekhlo konsi key k corresponding frequency 1 hai.
// Yehi key answer hai.

//? Code:
var singleNumber = function (nums) {
  let freq = {};

  for (let digit of nums) {
    freq[digit] = (freq[digit] || 0) + 1;
  }

  let keys = Object.keys(freq);

  for (let key of keys) {
    if (freq[key] === 1) {
      return Number(key);
    }
  }
};

//? Time Complexity: O(n)
// 1. Creating freq object: O(n) — We iterate through all elements.
// 2. Creating keys: O(n) — Object.keys(freq) collects all unique keys.
// 3. Finding the element with frequency 1: O(n) — In the worst case, we check all unique keys.
// Total: (O(n) + O(n) + O(n) = O(n))

//? Space Complexity: O(n)
// - freq can store up to n unique elements.
// - keys can also store up to n keys.

//* Approach 02:
// Sort the nums array.
// Use two pointer approach to find out which number comes only one time.
//? Code:
var singleNumber = function (nums) {
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i += 3) {
    // If this block's first number doesn't match the next one,
    // this is the single number.
    if (nums[i] !== nums[i + 1]) {
      return nums[i];
    }
  }
};

//? Time Complexity: O(n log n) for sorting
//? Space Complexity: O(1)

//* Approach 03:
// Every number that comes 3 times adds 3 to the count of each of its bits.
// So check every bit position (0 to 31) one by one.
// Count how many numbers have this bit ON.
// Take count % 3. The 3-times numbers become 0.
// If 1 is left, the single number has this bit ON, so set it in the result.
// JS bit operators use 32-bit numbers, so negative numbers also work (bit 31 is the sign bit).

// Example: [2,2,3,2] → 2 = 10, 3 = 11
// bit 0: only 3 has it → count 1 → 1 % 3 = 1 → ON
// bit 1: all 4 have it → count 4 → 4 % 3 = 1 → ON
// result = 11 = 3

//? Code:
var singleNumber = function (nums) {
    let result = 0;

    for (let i = 0; i < 32; i = i + 1) {
        let onesCount = 0;

        for (let num of nums) {
            let bit = (num >> i) & 1;

            if (bit === 1) {
                onesCount++;
            };
        };

        if (onesCount % 3 !== 0) {
            result = result | (1 << i);
        };
    };

    return result;
};

//? Time Complexity: O(32 * n) = O(n)
// - Outer loop runs 32 times (fixed), inner loop runs n times.

//? Space Complexity: O(1)
// - Only a few variables (result, count, bit).
