//? Minimum Rotations in Circular Lock (gfg)

// Given two positive integers r and d of the same length, representing the current and desired lock configurations, respectively, where each digit corresponds to a circular ring numbered from 0 to 9, find the minimum number of rotations required to transform r into d.

// In one operation, a ring can be rotated by one position either clockwise or anticlockwise.
// The rings are circular, so 9 wraps to 0 and 0 wraps to 9.

//? Examples:

// Input: r = 222, d = 333
// Output: 3
// Explanation: Each digit 2 can be changed to 3 in one rotation. Therefore, the minimum total rotations required are 1 + 1 + 1 = 3.

// Input: r = 2345, d = 5432
// Output: 8
// Explanation: The minimum rotations required for the corresponding digit pairs (2, 5), (3, 4), (4, 3), and (5, 2) are 3, 1, 1, and 3, respectively. Therefore, the minimum total rotations required are 3 + 1 + 1 + 3 = 8.

//? Constraints:
// 1 ≤ r, d ≤ 109

//? Thought Proces:
// To convert one digit to another digit.
// We have two choices to take.
// One is to go clockwise, for example converting 2 to 4 is to go on 3 then 4.
// Second way is anti clockwise, converting 2 to 4, go to 1, 0, 9, 8.

//* How to count clockwise and anticlockwise rotations:
// total steps = 10
// if we need 6 steps going clockwise from src to destination.
// then 10 - 6 gives us anti clockwise steps. Cancelling total me sy clockwise steps.

//* Steps:
// 1. Compare the digits of both numbers one by one, starting from the last digit.
// 2. Calculate the clockwise and anti-clockwise rotations needed to match each digit.
// 3. Always choose the minimum rotations for each digit (Greedy Choice).
// 4. Add the rotations and move to the next digit until all digits are processed.

//? Code:
class Solution {
  rotationCount(r, d) {
    let rotations = 0;

    while (r && d) {
      let src = r % 10;
      let target = d % 10;

      let clockWiseRotations = Math.abs(src - target);
      let antiClockWiseRotations = 10 - clockWiseRotations;

      rotations += Math.min(clockWiseRotations, antiClockWiseRotations);

      r = Math.floor(r / 10);
      d = Math.floor(d / 10);
    }

    return rotations;
  }
}

//? Time Complexity: O(d) — Where d is the number of digits. We process each digit once.
//? Space Complexity: O(1) — We use only a constant number of variables.
