//? LeetCode #2381
//? Shifting Letters II

// You are given a string s of lowercase English letters and a 2D integer array shifts where shifts[i] = [starti, endi, directioni]. For every i, shift the characters in s from the index starti to the index endi (inclusive) forward if directioni = 1, or shift the characters backward if directioni = 0.

// Shifting a character forward means replacing it with the next letter in the alphabet (wrapping around so that 'z' becomes 'a'). Similarly, shifting a character backward means replacing it with the previous letter in the alphabet (wrapping around so that 'a' becomes 'z').

// Return the final string after all such shifts to s are applied.

//? Example 1:
// Input: s = "abc", shifts = [[0,1,0],[1,2,1],[0,2,1]]
// Output: "ace"
// Explanation: Firstly, shift the characters from index 0 to index 1 backward. Now s = "zac".
// Secondly, shift the characters from index 1 to index 2 forward. Now s = "zbd".
// Finally, shift the characters from index 0 to index 2 forward. Now s = "ace".

//? Example 2:
// Input: s = "dztz", shifts = [[0,0,0],[1,1,1]]
// Output: "catz"
// Explanation: Firstly, shift the characters from index 0 to index 0 backward. Now s = "cztz".
// Finally, shift the characters from index 1 to index 1 forward. Now s = "catz".

//? Constraints:
// 1 <= s.length, shifts.length <= 5 * 104
// shifts[i].length == 3
// 0 <= starti <= endi < s.length
// 0 <= directioni <= 1
// s consists of lowercase English letters.

//? Thought Process:
//* 1. BRUTE FORCE:
// - For every shift operation [start, end, direction], loop from start to end.
// - Shift every character forward or backward.
// - This repeats work when multiple operations affect the same character.
// - Time: O(m * n) in the worst case.

//* 2. OPTIMIZATION:
// - Instead of updating every character in a range, record only where the shift starts and ends.
// - Use a difference array to record these changes.
// - Use prefix sum to calculate the net shift for each character.

// 3. DIFFERENCE ARRAY:
// - Create diff of size n + 1, initialized with zeros.
// - For each operation [start, end, direction]:
//     - Forward (direction = 1): add +1 at (start) and -1 at (end + 1).
//     - Backward (direction = 0): add -1 at (start) and +1 at (end + 1).

//* Why end + 1?
// The shift applies through end, so cancel it immediately after end.

//* Why opposite signs?
// The starting change activates the shift, and the ending change cancels it.

// Remember: diff[end + 1] -= add.

//* PREFIX SUM:
// Traverse the string from left to right.
// Keep adding diff[i] to prefixDiff.
// prefixDiff represents the net shift affecting the current character.
// Normalize it using ((prefixDiff % 26) + 26) % 26.
// This handles negative shifts and keeps the result between 0 and 25.

//* CHARACTER CONVERSION:
// Convert each character to a number from 0 to 25.
// Calculate newNum = (num + prefixDiff) % 26.
// Convert the number back to a character.
// Using modulo 26 handles wrapping, e.g. z shifted forward becomes a.

//* COMPLEXITY:
// n = string length, m = number of shift operations.
// Time: O(n + m).
// Space: O(n).

//* IMPORTANT FOLLOW-UP QUESTIONS:
// Why is brute force inefficient?
// It updates every character in every range, repeating work when ranges overlap.

// Why do we use a difference array instead of updating every index?
// It records only range boundaries, reducing each range update from O(n) to O(1).

// Why do we update end + 1 instead of end?
// The shift must remain active through end, so we cancel it at the next index.

// Why must the ending update have the opposite sign?
// The starting update activates the shift, and the opposite ending update cancels it.

// Why do we normalize negative modulo in JavaScript?
// JavaScript can return a negative remainder; ((x % 26) + 26) % 26 ensures a value from 0 to 25.

// When is a difference array preferable to a segment tree?
// Use a difference array for many range updates followed by a final traversal; use a segment tree when queries and updates are interleaved.

// Can the solution handle shifts larger than 26?
// Yes, because shifting by multiples of 26 returns to the same character, so modulo 26 handles wrapping.

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
  for (let i = 0; i < shifts.length; i = i + 1) {
    let [start, end, direction] = shifts[i];
    let isForward = direction === 1;
    let add = isForward ? 1 : -1;

    diff[start] = diff[start] + add;
    diff[end + 1] = diff[end + 1] - add;
  }

  let ans = "";
  let prefixDiff = 0;
  for (let i = 0; i < n; i = i + 1) {
    prefixDiff = prefixDiff + diff[i];
    prefixDiff = ((prefixDiff % 26) + 26) % 26;

    let num = charToNum[s[i]];
    let newNum = (num + prefixDiff) % 26;
    ans = ans + numToChar[newNum];
  }

  return ans;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
