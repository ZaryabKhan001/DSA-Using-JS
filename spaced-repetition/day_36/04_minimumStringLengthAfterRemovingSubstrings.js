//? LeetCode #2696
//? Minimum String Length After Removing Substrings

// You are given a string s consisting only of uppercase English letters.

// You can apply some operations to this string where, in one operation, you can remove any occurrence of one of the substrings "AB" or "CD" from s.

// Return the minimum possible length of the resulting string that you can obtain.

// Note that the string concatenates after removing the substring and could produce new "AB" or "CD" substrings.

//? Example 1:
// Input: s = "ABFCACDB"
// Output: 2
// Explanation: We can do the following operations:
// - Remove the substring "ABFCACDB", so s = "FCACDB".
// - Remove the substring "FCACDB", so s = "FCAB".
// - Remove the substring "FCAB", so s = "FC".
// So the resulting length of the string is 2.
// It can be shown that it is the minimum length that we can obtain.

//? Example 2:
// Input: s = "ACBBD"
// Output: 5
// Explanation: We cannot do any operations on the string so the length remains the same.

//? Constraints:
// 1 <= s.length <= 100
// s consists only of uppercase English letters.

//? Approach:
// We can use a stack to keep track of the characters in the string. We iterate through each character in the string and check if it forms a valid pair with the top of the stack (i.e., "AB" or "CD"). If it does, we pop the top of the stack, effectively removing the pair from consideration. If it doesn't form a valid pair, we push the current character onto the stack. After processing all characters, the length of the stack will give us the minimum possible length of the resulting string.

//? Code:
var minLength = function (s) {
  let stack = [];

  for (let char of s) {
    const pairMatched =
      stack.length &&
      ((stack[stack.length - 1] === "A" && char === "B") ||
        (stack[stack.length - 1] === "C" && char === "D"));
    if (pairMatched) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.length;
};

//? Time Complexity: O(n), where n is the length of the input string s. We iterate through the string once, and each character is processed in constant time.
//? Space Complexity: O(n), in the worst case, if there are no "AB" or "CD" substrings to remove, the stack will contain all characters of the input string.
