//? Armstrong Numbers (gfg)

// You are given a 3-digit number n, Find whether it is an Armstrong number or not.

// An Armstrong number of three digits is a number such that the sum of the cubes of its digits is equal to the number itself. 371 is an Armstrong number since 33 + 73 + 13 = 371.

//? Examples:

// Input: n = 153
// Output: true
// Explanation: 153 is an Armstrong number since 13 + 53 + 33 = 153.

// Input: n = 372
// Output: false
// Explanation: 372 is not an Armstrong number since 33 + 73 + 23 = 378.

// Input: n = 100
// Output: false
// Explanation: 100 is not an Armstrong number since 13 + 03 + 03 = 1.

//? Constraints:
// 100 ≤ n < 1000

//? Thought Process:
// Armstrong number in general is a number that is equal to the sum of its own digits raised to the power of the number of digits.
// For 3-digit numbers, we can check if the sum of the cubes of its digits equals the number itself. We can extract each digit using modulo and division operations, compute the sum of their cubes, and compare it with the original number.

//? Code:
class Solution {
  armstrongNumber(n) {
    let copyN = n;
    let sumOfCubes = 0;

    while (n != 0) {
      let digit = n % 10;

      sumOfCubes += digit * digit * digit;
      n = Math.floor(n / 10);
    }

    return sumOfCubes == copyN;
  }
}

//? Time Complexity: O(log10(n))
//? Space Complexity: O(1)
