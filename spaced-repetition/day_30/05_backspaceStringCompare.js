//? LeetCode #844
//? Backspace String Compare

// Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.

// Note that after backspacing an empty text, the text will continue empty.

//? Example 1:
// Input: s = "ab#c", t = "ad#c"
// Output: true
// Explanation: Both s and t become "ac".

//? Example 2:
// Input: s = "ab##", t = "c#d#"
// Output: true
// Explanation: Both s and t become "".

//? Example 3:
// Input: s = "a#c", t = "b"
// Output: false
// Explanation: s becomes "c" while t becomes "b".

//? Constraints:
// 1 <= s.length, t.length <= 200
// s and t only contain lowercase letters and '#' characters.

//? Approach:
// Use two stacks s1 and s2 to construct the final strings after processing backspaces for s and t respectively.
// Iterate through each character in s:
// If the character is not '#', push it onto stack s1.
// If the character is '#', pop the top element from stack s1 (if it's not empty).
// Repeat the same process for string t using stack s2.
// After processing both strings, compare the contents of s1 and s2. If they are the same, return true; otherwise, return false.

//? Code:
var backspaceCompare = function (s, t) {
  let s1 = [];
  let s2 = [];

  //* construct answer from s
  for (let i = 0; i < s.length; i = i + 1) {
    if (s[i] !== "#") {
      s1.push(s[i]);
    } else {
      s1.pop();
    }
  }

  //* construct answer from t
  for (let i = 0; i < t.length; i = i + 1) {
    if (t[i] !== "#") {
      s2.push(t[i]);
    } else {
      s2.pop();
    }
  }

  if (s1.length !== s2.length) return false;
  //* check if these are same or not
  for (let i = 0; i < s1.length; i = i + 1) {
    if (s1[i] != s2[i]) {
      return false;
    }
  }

  return true;
};

//? Time Complexity = O(m + n) where m and n are the lengths of s and t respectively.
//? Space Complexity = O(m + n) in the worst case when there are no backspaces, we store all characters of s and t in s1 and s2 respectively.
