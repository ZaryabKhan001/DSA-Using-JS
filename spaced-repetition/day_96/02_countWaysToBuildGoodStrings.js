//? LeetCode #2466.
//?Count Ways To Build Good Strings

// Given the integers zero, one, low, and high, we can construct a string by starting with an empty string, and then at each step perform either of the following:

// Append the character '0' zero times.
// Append the character '1' one times.
// This can be performed any number of times.

// A good string is a string constructed by the above process having a length between low and high (inclusive).

// Return the number of different good strings that can be constructed satisfying these properties. Since the answer can be large, return it modulo 109 + 7.

//? Example 1:
// Input: low = 3, high = 3, zero = 1, one = 1
// Output: 8
// Explanation:
// One possible valid good string is "011".
// It can be constructed as follows: "" -> "0" -> "01" -> "011".
// All binary strings from "000" to "111" are good strings in this example.

//? Example 2:
// Input: low = 2, high = 3, zero = 1, one = 2
// Output: 5
// Explanation: The good strings are "00", "11", "000", "110", and "011".

//? Constraints:
// 1 <= low <= high <= 105
// 1 <= zero, one <= low

//? Thought Process:
// First of all understand the problem statement. We are given four integers low, high, zero, and one. We can construct a string by starting with an empty string and then at each step perform either of the following:
// Append the character '0' zero times.
// Append the character '1' one times.
// This can be performed any number of times.

// A good string is a string constructed by the above process having a length between low and high (inclusive).

//* This problem is a variation of a unbounded knapsack. Because we have ifinite choices of zeros and ones. Just we have a bounday check of high which is exactly like a knapsack problem where we have capacity. 
// But here we have a lower bound as well which is low. So all the strings greater than or equal to low are valid good strings. So we have to keep in mind while building solution. 

// I am going to use a recursive approach with memoization to solve this problem. I will define a recursive function that takes the current length of the string as an argument and returns the number of good strings that can be constructed from that length. I will use a dp array to store the results of previously computed lengths to avoid redundant calculations.

// For each function call, I will check if the current length is greater than or equal to low. If it is, I will increment the count of good strings. Then, I will make two recursive calls: one for appending zero '0's and another for appending one '1's. I will add the results of these two calls to the count and return it.

// One last thing to keep in mind is that the answer can be large, so I will return the count modulo 10^9 + 7.

//? Code:
var countGoodStrings = function (low, high, zero, one) {
    const MOD = 1000000007;
    let dp = new Array(high + 1).fill(undefined);

    const solve = (n) => {
        let count = 0;
        if (n >= low) {
            count++;
        }

        if (dp[n] !== undefined) {
            return dp[n];
        }


        if (n + zero <= high) {
            count += solve(n + zero);
        }

        if (n + one <= high) {
            count += solve(n + one);
        }
        return dp[n] = count % MOD;
    };

    return solve(0);
};

//? Time Complexity: O(high) - We are calculating the number of good strings for each length from 0 to high, and storing the results in the dp array to avoid redundant calculations.
//? Space Complexity: O(high) - We are using a dp array of size high + 1 to store the number of good strings for each length from 0 to high.