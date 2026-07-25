//? LeetCode #93
//? Restore IP Addresses

// A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

// For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
// Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

//? Example 1:
// Input: s = "25525511135"
// Output: ["255.255.11.135","255.255.111.35"]

//? Example 2:
// Input: s = "0000"
// Output: ["0.0.0.0"]

//? Example 3:
// Input: s = "101023"
// Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

//? Constraints:
// 1 <= s.length <= 20
// s consists of digits only.

//? Code:
var restoreIpAddresses = function (s) {
    let result = [];

    const isValid = (choice, length) => {
        if (length === 1) {
            return true;
        }
        else if (length === 2 && choice[0] !== '0') {
            return true;
        }
        else if (length === 3 && choice[0] !== '0' && Number(choice) <= 255) {
            return true;
        }
        else {
            return false;
        }
    };

    const backTrack = (input, output, k) => {
        //* base cases
        if (k === 0 && input.length === 0) {
            result.push(output);
            return;
        }
        else if (k === 0 && input.length > 0) {
            return;
        }
        else if (input.length < k || input.length > k * 3) {
            return;
        }

        //* Recursive Solution
        for (let i = 0; i < (Math.min(input.length, 3)); i = i + 1) {
            let choice = input.substring(0, i + 1);

            if (isValid(choice, i + 1)) {
                let newInput = input.substring(i + 1);

                let newOutput;
                //* for first call, do not add dot at the start of choice, directly add choice
                if (input.length === s.length) {
                    newOutput = output + choice;
                }
                else {
                    newOutput = output + '.' + choice;
                }

                backTrack(newInput, newOutput, k - 1);
            }
        }
    };

    backTrack(s, '', 4);
    return result;
};

//? Time Complexity:
// At each recursive level, you have at most 3 choices:
// Take 1 digit
// Take 2 digits
// Take 3 digits

// The recursion depth is fixed at 4.

// So the maximum number of recursive calls is:
// 3^4 = 81

// Each call does only constant work (substring of at most 3 characters, validation, concatenation of a short string).

// Therefore,

//? Time Complexity = O(81) => O(1)

//? Space Complexity: O(1) for the result array, since the maximum number of valid IP addresses is limited and does not depend on the input size. The recursion stack will also have a maximum depth of 4, which is constant.