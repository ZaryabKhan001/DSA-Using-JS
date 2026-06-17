//? LeetCode #1190
//? Reverse Substrings Between Each Pair of Parentheses

// You are given a string s that consists of lower case English letters and brackets.

// Reverse the strings in each pair of matching parentheses, starting from the innermost one.

// Your result should not contain any brackets.

//? Example 1:
// Input: s = "(abcd)"
// Output: "dcba"

//? Example 2:
// Input: s = "(u(love)i)"
// Output: "iloveu"
// Explanation: The substring "love" is reversed first, then the whole string is reversed.

//? Example 3:
// Input: s = "(ed(et(oc))el)"
// Output: "leetcode"
// Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.

//? Constraints:
// 1 <= s.length <= 2000
// s only contains lower case English characters and parentheses.
// It is guaranteed that all parentheses are balanced.

//? Approach:
// We can use a recursive approach to solve this problem. We will iterate through the string and whenever we encounter an opening parenthesis, we will call the recursive function to reverse the substring inside the parentheses. We will keep track of the current index in the string and return the reversed substring when we encounter a closing parenthesis. We will also concatenate the reversed substring with the characters before and after the parentheses to form the final result.

//? Code:
var reverseParentheses = function (s) {
    let i = 0;

    const dfs = () => {
        let word = '';

        while (i < s.length) {
            let char = s[i];

            //* if char is english alphabet
            if (char <= 'z' && char >= 'a') {
                word += char;
            }

            //* if it is  (
            if (char === '(') {
                i++;
                let inner = dfs();
                word += inner;
            }

            //* is it is )
            if (char === ')') {
                return [...word].reverse().join('');
            }
            i++;
        }

        return word;
    };

    return dfs();
};

//? Time Complexity: O(n^2) - in worst case when we have nested parentheses, we will reverse the string for each pair of parentheses.
//? Space Complexity: O(n) - for the recursive stack and the string created from the characters.