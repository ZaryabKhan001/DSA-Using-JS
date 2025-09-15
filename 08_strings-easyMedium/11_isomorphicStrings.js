//? LeetCode: #205
//? Isomorphic Strings

// Given two strings s and t, determine if they are isomorphic.
// Two strings s and t are isomorphic if the characters in s can be replaced to get t.
// All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

//? Example 1:
// Input: s = "egg", t = "add"
// Output: true
//? Explanation:
// The strings s and t can be made identical by:
// Mapping 'e' to 'a'.
// Mapping 'g' to 'd'.

//? Example 2:
// Input: s = "foo", t = "bar"
// Output: false
//? Explanation:
// The strings s and t can not be made identical as 'o' needs to be mapped to both 'a' and 'r'.

//? Example 3:
// Input: s = "paper", t = "title"
// Output: true

//? Approach
// 1. We keep a mapping from characters of `s` to characters of `t`.
// 2. We also track which characters of `t` are already used to avoid conflicts.
// 3. While looping, if a character in `s` is already mapped, we reuse it; otherwise, we create a new mapping.
// 4. We build a new string from these mappings and finally check if it matches `t`.

var isIsomorphic = function (s, t) {
  let map = {};
  let alreadyUsed = {};
  let newStr = "";
  for (let i = 0; i < s.length; i = i + 1) {
    if (alreadyUsed[t[i]] && alreadyUsed[t[i]] !== s[i]) {
      continue;
    }
    if (map[s[i]]) {
      newStr = newStr + map[s[i]];
    } else {
      map[s[i]] = t[i];
      alreadyUsed[t[i]] = s[i];
      newStr = newStr + map[s[i]];
    }
  }
  return t === newStr;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
