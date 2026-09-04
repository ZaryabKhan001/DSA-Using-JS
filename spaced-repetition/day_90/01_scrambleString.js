//? LeetCode #87:
//? Scramble String

// We can scramble a string s to get a string t using the following algorithm:

// If the length of the string is 1, stop.
// If the length of the string is > 1, do the following:
// Split the string into two non-empty substrings at a random index, i.e., if the string is s, divide it to x and y where s = x + y.
// Randomly decide to swap the two substrings or to keep them in the same order. i.e., after this step, s may become s = x + y or s = y + x.
// Apply step 1 recursively on each of the two substrings x and y.
// Given two strings s1 and s2 of the same length, return true if s2 is a scrambled string of s1, otherwise, return false.

//? Example 1:

// Input: s1 = "great", s2 = "rgeat"
// Output: true

// Explanation: One possible scenario applied on s1 is:
// "great" --> "gr/eat" // divide at random index.
// "gr/eat" --> "gr/eat" // random decision is not to swap the two substrings and keep them in order.
// "gr/eat" --> "g/r / e/at" // apply the same algorithm recursively on both substrings. divide at random index each of them.
// "g/r / e/at" --> "r/g / e/at" // random decision was to swap the first substring and to keep the second substring in the same order.
// "r/g / e/at" --> "r/g / e/ a/t" // again apply the algorithm recursively, divide "at" to "a/t".
// "r/g / e/ a/t" --> "r/g / e/ a/t" // random decision is to keep both substrings in the same order.
// The algorithm stops now, and the result string is "rgeat" which is s2.
// As one possible scenario led s1 to be scrambled to s2, we return true.

//? Example 2:
// Input: s1 = "abcde", s2 = "caebd"
// Output: false

//? Example 3:
// Input: s1 = "a", s2 = "a"
// Output: true

//? Constraints:
// s1.length == s2.length
// 1 <= s1.length <= 30
// s1 and s2 consist of lowercase English letters.

//? Thought Process:

// 1. Core idea
// For every string, try every possible split:

// great

// g | reat
// gr | eat
// gre | at
// grea | t


// For each split, there are 2 possibilities.
// No swap:
// A | B
// ↓
// C | D

// solve(A,C) && solve(B,D)

// Swap:
// A | B
// ↓
// D | C

// solve(A,D) && solve(B,C)


// If either works → true.

// 2. Why recursion?
// After splitting, each smaller part is the same problem.

// For example:
// great → gr | eat

// Now we need to ask:

// Is "gr" a scramble of "rg"?

// That's the same question again → recursion.

//? 3. Why DP?
// The same pair can be calculated multiple times.

// So store:

// map.set(s1 + "#" + s2, answer);

// Before calculating:

// if (map.has(key)) {
//     return map.get(key);
// }

// So:

// DP state = (s1, s2) → whether s1 is a scramble of s2.

// 4. Important n - i

// If:

// n = 5
// i = 2


// and:

// s2 = rgeat
//      01234


// Then:

// s2.substring(n - i)
// = s2.substring(3)
// = "at"


// Why?

// Because we need the last i characters.

// rgeat
//    ^^
//    at

// So n - i gives the starting index of the last i characters.

// 6. Complexity
// Time:  O(n⁴)
// Space: O(n³)


//? Reason:

// O(n³) states × O(n) splits = O(n⁴)

// 7. Interview answer to memorize

// "I try every split. For each split, I check both possibilities: no swap and swap. Each smaller part is solved recursively. Since the same subproblems repeat, I memoize (s1, s2) in a Map. This gives O(n⁴) time and O(n³) space."

// That's the main thing you need to remember.
//? Code:
var isScramble = function (s1, s2) {
  if (s1.length !== s2.length) {
    return false;
  }

  const solve = (s1, s2) => {
    if (s1 === s2) {
      return true;
    }
    if (s1.length <= 1) {
      return false;
    }

    let n = s1.length;
    let flag = false;

    for (let i = 1; i < n; i = i + 1) {
      let condition1 =
        solve(s1.substring(0, i), s2.substring(0, i)) &&
        solve(s1.substring(i), s2.substring(i));

      let condition2 =
        solve(s1.substring(0, i), s2.substring(n - i)) &&
        solve(s1.substring(i), s2.substring(0, n - i));

      if (condition1 || condition2) {
        flag = true;
        break;
      }
    }
    return flag;
  };

  return solve(s1, s2);
};

//? Without memoization, the Scramble String solution has exponential time complexity, approximately O(n · 4ⁿ), and O(n²) space due to recursive calls and substring creation. With memoization, we reduce the repeated subproblems significantly.

//? Code:
var isScramble = function (s1, s2) {
  if (s1.length !== s2.length) {
    return false;
  }

  let map = new Map();

  const solve = (s1, s2) => {
    if (s1 === s2) {
      return true;
    }
    if (s1.length <= 1) {
      return false;
    }

    let key = s1 + "#" + s2;
    if (map.has(key)) {
      return map.get(key);
    }

    let n = s1.length;
    let flag = false;

    for (let i = 1; i < n; i = i + 1) {
      let condition1 =
        solve(s1.substring(0, i), s2.substring(0, i)) &&
        solve(s1.substring(i), s2.substring(i));

      let condition2 =
        solve(s1.substring(0, i), s2.substring(n - i)) &&
        solve(s1.substring(i), s2.substring(0, n - i));

      if (condition1 || condition2) {
        flag = true;
        break;
      }
    }

    map.set(key, flag);
    return flag;
  };

  return solve(s1, s2);
};

// There are roughly O(n²) possible substrings of s1 and O(n²) possible substrings of s2.
// So, number of states = O(n² × n²) = O(n⁴)

// For each state, we try up to n partition points:
// O(n⁴) × O(n) = O(n⁵)

//? Time  Complexity: O(n^5)
//? Space Complexity: O(n^4) for memo and O(n) for call stack.
