//? Leetcode #91:
//? Decode Ways

// You have intercepted a secret message encoded as a string of numbers. The message is decoded via the following mapping:

//             "1" -> 'A'
//             "2" -> 'B'
//             ...
//             "25" -> 'Y'
//             "26" -> 'Z'

// However, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes ("2" and "5" vs code”25″).

// For example, "11106" can be decoded into:

// "AAJF" with the grouping (1, 1, 10, 6)
// "KJF" with the grouping (11, 10, 6)
// The grouping (1, 11, 06) is invalid because "06" is not a valid code (only "6" is valid).
// Note: there may be strings that are impossible to decode.

// Given a string s containing only digits, return the number of ways to decode it. If the entire string cannot be decoded in any valid way, return 0.

// The test cases are generated so that the answer fits in a 32-bit integer.

//? Example 1:
// Input: s = “12”
// Output: “12”
// Explanation: “12” could be decoded as “AB” (1 2) or “L” (12).

//? Example 2:
// Input: s = “226”
// Output: 3
// Explanation: “226” could be decoded as “BZ” (2 26), “VF” (22 6), or “BBF” (2 2 6).

//? Example 3:
// Input: s = “06”
// Output: 0
// Explanation: “06” cannot be mapped to “F” because of the leading zero (“6” is different from “06”). In this case, the string is not a valid encoding, so return 0.

//? Constraints
// 1 <= s.length <= 100
// s contains only digits and may contain leading zero(s).

//? Approach:
// Recursive with Memoization (Top-down DP)
// Define a recursive function fn(remS) → returns number of decodings for substring remS.
// Base case: if string becomes empty → 1 valid decoding.
// Memoization: Store results in dp to avoid recomputation.
// Choices at each step (from right side):
// One digit: If last digit is not "0", decode it → recursive call on substring without last digit.
// Two digits: If last two digits form a number between 10–26, decode it → recursive call on substring without last two digits.
// Add both possibilities → total ways for that substring.

//? Code:
var numDecodings = function (s) {
  let dp = {};

  const compute = (remS) => {
    let n = remS.length;
    let ans = 0;

    //* base case
    if (remS === "") return 1;

    //* returning from dp
    if (remS in dp) return dp[remS];

    //* computation
    const left = remS.substring(0, n - 1);
    const right = remS.substring(0, n - 2);
    const oneDigit = Number(remS[n - 1]);
    const twoDigits = Number(remS[n - 2] + remS[n - 1]);

    if (oneDigit > 0) {
      ans = ans + compute(left);
    }
    if (twoDigits <= 26 && twoDigits >= 10) {
      ans = ans + compute(right);
    }
    dp[remS] = ans;
    return ans;
  };

  return compute(s);
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
