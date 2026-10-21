//? LeetCode #848
//? Shifting Letters

// You are given a string s of lowercase English letters and an integer array shifts of the same length.

// Call the shift() of a letter, the next letter in the alphabet, (wrapping around so that 'z' becomes 'a').

// For example, shift('a') = 'b', shift('t') = 'u', and shift('z') = 'a'.
// Now for each shifts[i] = x, we want to shift the first i + 1 letters of s, x times.

// Return the final string after all such shifts to s are applied.

//? Example 1:
// Input: s = "abc", shifts = [3,5,9]
// Output: "rpl"
// Explanation: We start with "abc".
// After shifting the first 1 letters of s by 3, we have "dbc".
// After shifting the first 2 letters of s by 5, we have "igc".
// After shifting the first 3 letters of s by 9, we have "rpl", the answer.

//? Example 2:
// Input: s = "aaa", shifts = [1,2,3]
// Output: "gfd"

//? Constraints:
// 1 <= s.length <= 105
// s consists of lowercase English letters.
// shifts.length == s.length
// 0 <= shifts[i] <= 109

//? Thought Process:
// # Shifting Letters — Brute Force to O(n) Using Difference Array

// ## 1. Problem Understanding
// - shifts[i] means shift the prefix s[0...i] forward by shifts[i] positions.
// - Each shift affects the current character and all characters before it.
// - After z, wrap around to a.
// - Since the alphabet has 26 letters, use modulo 26.

// ## 2. Brute Force — O(n²)

// - For every shifts[i], loop through all characters from index 0 to i and apply that shift.
// - This repeatedly updates the same characters.
// - In the worst case, the total operations are 1 + 2 + ... + n, giving O(n²) time.
// - We need to avoid processing the same character repeatedly.

// ## 3. Optimize to O(n) — Key Observation

// - Instead of applying each shift individually, calculate the total shift for each character.
// - Character at index i receives shifts from indices i through n - 1.
// - Example: s = "bad", shifts = [10, 20, 30]
//   - b receives 10 + 20 + 30 = 60
//   - a receives 20 + 30 = 50
//   - d receives 30
// - We can calculate these totals with a suffix sum in O(n).
// - Important: A right-to-left suffix sum is the simplest O(n) solution for this particular problem. A difference array is useful when we want to represent and combine many range updates.

// ## 4. Difference Array — Core Idea

// - A difference array stores changes at boundaries instead of updating every element in a range.
// - To add v to a range [l, r]:
//   - diff[l] += v
//   - diff[r + 1] -= v, if r + 1 is within the array.
// - Taking a prefix sum reconstructs the accumulated value at each index.
// - For this problem, each shift affects the range [0, i].
// - Therefore, the updates are:
//   - diff[0] += shifts[i]
//   - diff[i + 1] -= shifts[i]
// - After processing all updates, taking prefix sums reconstructs the total shift at each position.

// ## 5. My Difference Array Confusion

// For shifts = [10, 20, 30]:

// - After updates: diff = [60, -10, -20, -30]
// - Prefix sums: [60, 50, 30]
// - These are the correct total shifts for "bad".

//* Why does diff contain negative values?

// - Negative values cancel a previous range's contribution after its endpoint.
// - They are boundary adjustments, not negative character shifts.
// - Prefix sums reconstruct the actual accumulated shifts.

// ## 6. Negative Remainder in JavaScript

// - JavaScript % is remainder, not mathematical modulo.
// - For example, -2 % 26 === -2.
// - A negative remainder can produce an invalid character index, such as numToChar[-2], which returns undefined.
// - Normalize a possibly negative remainder using:

// ((value % 26) + 26) % 26

// - In this problem, if you keep every accumulated shift nonnegative, ordinary % 26 is sufficient.

// ## 7. Letter-to-Number Conversion

// - a = 0, b = 1, ..., z = 25.
// - Convert a character to a number, add the normalized shift, and apply % 26.
// - Convert the result back to a character.
// - You can avoid both lookup objects with:

// charCodeAt(0) - 97

// and:

// String.fromCharCode(newNum + 97)

// ## 8. Complexity

// - Brute force: O(n²) time.
// - Suffix sum: O(n) time.
// - Difference array: O(n) time.
// - Difference array requires O(n) extra space in this implementation. A suffix-sum solution can use O(1) auxiliary space if modifying the shifts array is allowed.

// ## 9. Quick Follow-up Questions

// 1. Why does brute force take O(n²)?
// 2. Why does each character receive shifts from index i through n - 1?
// 3. Why is a suffix sum simpler than a difference array for this problem?
// 4. What does diff[r + 1] -= v accomplish?
// 5. Why can a difference array contain negative values?
// 6. What is the difference between prefix sum and suffix sum?
// 7. Why can JavaScript's % produce a negative result?
// 8. Why do we use modulo 26?
// 9. Can this problem be solved in O(n) time without a difference array?
// 10. When should we prefer a difference array over a segment tree?

// ## 10. Interview Takeaway

// First identify repeated work in brute force. Then calculate each character's cumulative shift once. Use a right-to-left suffix sum for this specific problem; use a difference array when many range updates need to be combined efficiently.

//? Code:
var shiftingLetters = function (s, shifts) {
  let n = s.length;

  let charToNum = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    i: 8,
    j: 9,
    k: 10,
    l: 11,
    m: 12,
    n: 13,
    o: 14,
    p: 15,
    q: 16,
    r: 17,
    s: 18,
    t: 19,
    u: 20,
    v: 21,
    w: 22,
    x: 23,
    y: 24,
    z: 25,
  };

  let numToChar = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    5: "f",
    6: "g",
    7: "h",
    8: "i",
    9: "j",
    10: "k",
    11: "l",
    12: "m",
    13: "n",
    14: "o",
    15: "p",
    16: "q",
    17: "r",
    18: "s",
    19: "t",
    20: "u",
    21: "v",
    22: "w",
    23: "x",
    24: "y",
    25: "z",
  };

  let diff = new Array(n + 1).fill(0);

  // Record prefix shifts
  for (let i = 0; i < n; i++) {
    diff[0] += shifts[i];
    diff[i + 1] -= shifts[i];
  }

  let ans = "";
  let shift = 0;

  // Calculate shifts using prefix sum
  for (let i = 0; i < n; i++) {
    shift = shift + diff[i];
    shift = ((shift % 26) + 26) % 26;

    let num = charToNum[s[i]];
    let newNum = (num + shift) % 26;

    ans += numToChar[newNum];
  }

  return ans;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
