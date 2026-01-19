//? LeetCode :1089
//? Duplicate Zeros

// Given a fixed-length integer array arr, duplicate each occurrence of zero, shifting the remaining elements to the right.

// Note that elements beyond the length of the original array are not written. Do the above modifications to the input array in place and do not return anything.

//? Example 1:
// Input: arr = [1,0,2,3,0,4,5,0]
// Output: [1,0,0,2,3,0,0,4]
// Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]

//? Example 2:
// Input: arr = [1,2,3]
// Output: [1,2,3]
// Explanation: After calling your function, the input array is modified to: [1,2,3]

//? Approach
//? Step 1: Count zeros
// Each zero needs an extra space.

//? Step 2: Use two pointers
// i → pointer on original array (from end)
// j → pointer on “virtual expanded array”

//? Step 3: Copy backwards
// If element is non-zero → copy once
// If element is zero → write zero twice (if in bounds)

//? Code:
var duplicateZeros = function (arr) {
  let zeros = 0;
  let n = arr.length;

  // Count zeros
  for (let i = 0; i < n; i++) {
    if (arr[i] === 0) zeros++;
  }

  // Two pointers
  let i = n - 1;
  let j = n + zeros - 1;

  // Traverse backwards
  while (i >= 0) {
    if (j < n) {
      arr[j] = arr[i];
    }

    // If zero, duplicate it
    if (arr[i] === 0) {
      j--;
      if (j < n) {
        arr[j] = 0;
      }
    }

    i--;
    j--;
  }
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
