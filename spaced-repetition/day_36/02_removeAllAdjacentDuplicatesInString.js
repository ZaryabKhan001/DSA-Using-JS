//? LeetCode #1047
//? Remove All Adjacent Duplicates In String

// You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them.

// We repeatedly make duplicate removals on s until we no longer can.

// Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.

//? Example 1:
// Input: s = "abbaca"
// Output: "ca"
// Explanation:
// For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".

//? Example 2:
// Input: s = "azxxzy"
// Output: "ay"

//? Constraints:
// 1 <= s.length <= 105
// s consists of lowercase English letters.

//? Approach:
// We can use a stack to keep track of the characters in the string. We iterate through the string and for each character, we check if it is the same as the top of the stack. If it is, we pop the top of the stack (removing the duplicate). If it is not, we push the character onto the stack. At the end, we join the characters in the stack to form the final string.

//? Code:
var removeDuplicates = function (s) {
    let stack = [];

    for (let i = 0; i < s.length; i = i + 1) {
        let top = stack[stack.length - 1];
        if (top === s[i]) {
            stack.pop();
        } else {
            stack.push(s[i]);
        }
    }

    return stack.join('');
};

//? Time Complexity: O(n), where n is the length of the string s. We iterate through the string once, and each character is pushed and popped at most once.
//? Space Complexity: O(n), in the worst case, if there are no duplicates, we will have all characters in the stack.    