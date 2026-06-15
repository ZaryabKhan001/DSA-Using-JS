//? LeetCode: 1081
//? Smallest Subsequence of Distinct Characters

// Given a string s, return the lexicographically smallest subsequence of s that contains all the distinct characters of s exactly once.

//? Example 1:
// Input: s = "bcabc"
// Output: "abc"

//? Example 2:
// Input: s = "cbacdcbc"
// Output: "acdb"

//? Constraints:
// 1 <= s.length <= 1000
// s consists of lowercase English letters.

//? Approach:
// We use a stack to store the characters of the result.
// We iterate through the string and for each character, we check if it is already visited.
// If it is visited, we continue to the next character.
// If it is not visited, we check if the top of the stack is greater than the current character.
// If it is, we pop the top of the stack and mark it as not visited.
// We continue this process until the stack is empty or the top of the stack is smaller than the current character.
// Finally, we push the current character into the stack and mark it as visited.

//? Code:
var smallestSubsequence = function (s) {
  let freq = {};

  //* build freq
  for (let char of s) {
    freq[char] = (freq[char] || 0) + 1;
  }

  //* stack logic
  let stack = [];
  let visited = {};
  for (let char of s) {
    freq[char]--;

    //* check if it is already visited then no need to do anything
    if (visited[char]) continue;

    //* remove top of the stack if curr character is smaller than it
    while (
      stack.length &&
      stack[stack.length - 1] > char &&
      freq[stack[stack.length - 1]] > 0
    ) {
      let removed = stack.pop();
      visited[removed] = false;
    }

    //* push char into stack
    stack.push(char);
    visited[char] = true;
  }

  return stack.join("");
};

//? Time Complexity: O(n) because we iterate through the string for at most 2 times
//? Space Complexity: O(n) because we store the freq map and stack and visited map
