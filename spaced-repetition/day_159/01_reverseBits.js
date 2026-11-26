//? LeetCode #190
//? Reverse Bits

// Reverse bits of a given 32 bits signed integer.

//? Example 1:
// Input: n = 43261596
// Output: 964176192

// Explanation:
// Integer	Binary
// 43261596	00000010100101000001111010011100
// 964176192	00111001011110000010100101000000

//? Example 2:
// Input: n = 2147483644
// Output: 1073741822

// Explanation:
// Integer	Binary
// 2147483644	01111111111111111111111111111100
// 1073741822	00111111111111111111111111111110

//? Constraints:
// 0 <= n <= 231 - 2
// n is even.

// Follow up: If this function is called many times, how would you optimize it?

//? Thought Process:
// Convert the number into binary.
// Take the last bit using n % 2.
// Add that bit to a string.
// Remove the last bit using Math.floor(n / 2).
// Repeat until n becomes 0.
// Convert the reversed binary string back into a number using parseInt(str, 2).

//* Mistakes in this approach:
// 1. I used while (n > 0).
//    This stops when n becomes 0.
//    But we need to process exactly 32 bits.

// 2. I ignored leading zeros.
//    For example:
//    13 = 00000000000000000000000000001101
//    We must reverse all 32 bits, including zeros.

// 3. I used parseInt(str, 2).
//    This converts the reversed binary string into a number,
//    but it does not solve the 32-bit unsigned integer requirement.

// 4. I used string concatenation.
//    It works for reversing the binary digits,
//    but bitwise operators are a better approach for this problem.

//* Better Understanding:
// (1 << i) & n → Checks whether bit i is set (returns a mask).
// (n >> i) & 1 → Extracts bit i (returns 0 or 1).

// Second technique ki help sy last digit nikalty jao, and phir us bit ko store karty jao.

// 1. AND (&): Returns 1 when both bits are 1.
// 2. OR (|): Returns 1 when at least one bit is 1.
// 3. XOR (^): Returns 1 when both bits are different.
// 4. NOT (~): Flips all bits (0 becomes 1 and 1 becomes 0).
// 5. Left Shift (<<): Moves bits left and fills empty positions with 0.
// 6. Signed Right Shift (>>): Moves bits right and preserves the sign bit.
// 7. Unsigned Right Shift (>>>): Moves bits right and fills empty positions with 0.
// 8. Get any bit: (n >>> i) & 1. Returns 0 or 1.
// 9. Set a bit: n | (1 << i).
// 10. Clear a bit: n & ~(1 << i).
// 11. Toggle a bit: n ^ (1 << i).
// 12. Signed integers support negative and positive values; unsigned integers support only non-negative values. >>> 0 converts to unsigned 32-bit.

//? Code:
var reverseBits = function (n) {
    let ans = 0;

    for (let i = 0; i < 32; i = i + 1) {
        //* Get the bit at position i from n.
        let bit = (n >>> i) & 1;

        //* Shift ans left and add the extracted bit.
        ans = (ans << 1) | bit;
    };

    // Convert the result to an unsigned 32-bit integer
    return ans >>> 0;
};

//? Time Complexity: O(1)
//? Space Complexity: O(1)