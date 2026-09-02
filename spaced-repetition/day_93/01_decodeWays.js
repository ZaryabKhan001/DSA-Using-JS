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
// We have to find the number of ways to decode the string.
// And valid decoding is only possible if the string does not contain leading zeros and the two-digit number formed by any two consecutive digits is less than or equal to 26.
// Right mappning is as follows:
// 1 -> A
// 2 -> B

// Think properly, only two cases are possible for any string:
// 1. The last digit is a valid single-digit number (1-9). In this case, we can decode the last digit as a single character and the rest of the string can be decoded in ways equal to the number of ways to decode the substring without the last digit.
// 2. The last two digits form a valid two-digit number (10-26). In this case, we can decode the last two digits as a single character and the rest of the string can be decoded in ways equal to the number of ways to decode the substring without the last two digits.

// It i kind of like a Fibonacci sequence, where the number of ways to decode a string of length n is equal to the sum of the number of ways to decode the string of length n-1 and the number of ways to decode the string of length n-2, provided that the last digit and the last two digits are valid.

// fn(n) = fn(n-1) + fn(n-2) if last digit is valid and last two digits are valid

//* So, we can use a recursive approach with memoization to solve this problem.

//? Code:
var numDecodings = function (s) {
    let n = s.length;
    let dp = new Array(n).fill(undefined);

    const solve = (start) => {
        if (start === n) {
            return 1;
        }

        if (s[start] === '0') {
            return 0;
        }

        if (dp[start] !== undefined) {
            return dp[start];
        }

        //* take one digit
        let ways = solve(start + 1)

        //* take two digits if possible

        if (start + 1 < n && Number(s.substring(start, start + 2)) <= 26) {
            ways = ways + solve(start + 2);
        }

        return dp[start] = ways;
    };

    return solve(0);
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
