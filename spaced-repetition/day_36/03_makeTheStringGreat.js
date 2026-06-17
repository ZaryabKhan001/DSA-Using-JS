//? LeetCode #1544
//? Make The String Great

// Given a string s of lower and upper case English letters.

// A good string is a string which doesn't have two adjacent characters s[i] and s[i + 1] where:

// 0 <= i <= s.length - 2
// s[i] is a lower-case letter and s[i + 1] is the same letter but in upper-case or vice-versa.
// To make the string good, you can choose two adjacent characters that make the string bad and remove them. You can keep doing this until the string becomes good.

// Return the string after making it good. The answer is guaranteed to be unique under the given constraints.

// Notice that an empty string is also good.

//? Example 1:
// Input: s = "leEeetcode"
// Output: "leetcode"
// Explanation: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to be reduced to "leetcode".

//? Example 2:
// Input: s = "abBAcC"
// Output: ""
// Explanation: We have many possible scenarios, and all lead to the same answer. For example:
// "abBAcC" --> "aAcC" --> "cC" --> ""
// "abBAcC" --> "abBA" --> "aA" --> ""

//? Example 3:
// Input: s = "s"
// Output: "s"

//? Constraints:
// 1 <= s.length <= 100
// s contains only lower and upper case English letters.

//? Approach:
// We can use a stack to keep track of the characters in the string. We iterate through the string and for each character, we check if it is the same letter as the top of the stack but in different cases. If it is, we pop the top of the stack (removing the bad pair). If it is not, we push the character onto the stack. At the end, we join the characters in the stack to form the final string. We can use a utility function to check if two characters are a bad pair (same letter but different cases).

//? Code:
//* utility function
const isCulprit = (a, b) => {
    return ((a !== b) && (a.toLowerCase() === b.toLowerCase()));
};

var makeGood = function (s) {
    let stack = [];

    for (let i = 0; i < s.length; i = i + 1) {
        if (stack.length && isCulprit(stack[stack.length - 1], s[i])) {
            stack.pop();
        } else {
            stack.push(s[i]);
        }
    }

    return stack.join('');
};

//? Time Complexity: O(n), where n is the length of the string s. We iterate through the string once, and each character is pushed and popped at most once. 
//? Space Complexity: O(n), in the worst case, if there are no adjacent characters that are the same letter in different cases, we will have all characters in the stack.