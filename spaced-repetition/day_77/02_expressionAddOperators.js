//? LeetCode #282
//? Expression Add Operators

// Given a string num that contains only digits and an integer target, return all possibilities to insert the binary operators '+', '-', and/or '*' between the digits of num so that the resultant expression evaluates to the target value.

// Note that operands in the returned expressions should not contain leading zeros.

// Note that a number can contain multiple digits.

//? Example 1:
// Input: num = "123", target = 6
// Output: ["1*2*3","1+2+3"]
// Explanation: Both "1*2*3" and "1+2+3" evaluate to 6.

//? Example 2:
// Input: num = "232", target = 8
// Output: ["2*3+2","2+3*2"]
// Explanation: Both "2*3+2" and "2+3*2" evaluate to 8.

//? Example 3:
// Input: num = "3456237490", target = 9191
// Output: []
// Explanation: There are no expressions that can be created from "3456237490" to evaluate to 9191.

//? Constraints:
// 1 <= num.length <= 10
// num consists of only digits.
// -231 <= target <= 231 - 1

//? Thought Process:
// Because we have to fill the gap of every digit with an operator.
// Choices are +, - and *.
// So we can try each and every operator recursively and check if the expression evaluates to the target value.

//? Code:
var addOperators = function (num, target) {
    let result = [];
    let operators = ['+', '-', '*'];

    const backTrack = (start, expression) => {
        if (start === num.length) {
            if (eval(expression) === target) {
                result.push(expression);
            }
            return;
        }

        for (let i = start; i < num.length; i = i + 1) {
            let digit = num.substring(start, i + 1);

            if (digit.length > 1 && digit[0] === '0') {
                break;
            }

            if (start === 0) {
                backTrack(i + 1, digit);
            }
            else {
                for (let operator of operators) {
                    backTrack(i + 1, expression + operator + digit);
                }
            }
        }
    };

    backTrack(0, '');
    return result;
};

//? Time Complexity: O(n * 4^n) where n is the length of the num string. Because we have 4 choices for each digit (3 operators and no operator) and evaluating the expression takes O(n) time.
//? Space Complexity: O(n) for the recursion stack.

// For num="2147483648" and target="-2147483648", it has 4^9 = 262144 leaf nodes in the recursion tree. So it gives TLE for some test cases. So we can optimize it by calculating the value of the expression as we build it instead of using eval() at the end.


//? In optimization everything remains the same just we have to pass few extra parameters in the backTrack function. We will pass the current value of the expression and the last value added to the expression. This way we can calculate the new value of the expression as we build it.

//? Code:
var addOperators = function (num, target) {
    const result = [];

    const backTrack = (start, expression, evaluatedValue, prevDigit) => {
        if (start === num.length) {
            if (evaluatedValue === target) {
                result.push(expression);
            }
            return;
        }

        for (let end = start; end < num.length; end = end + 1) {
            let current = num.substring(start, end + 1);

            if (current.length > 1 && current[0] === '0') {
                break; // not continue
            }

            let digit = Number(current);

            if (start === 0) {
                backTrack(end + 1, current, digit, digit);
            }
            else {
                backTrack(end + 1, expression + '+' + digit, evaluatedValue + digit, digit);
                backTrack(end + 1, expression + '-' + digit, evaluatedValue - digit, -digit);
                backTrack(end + 1, expression + '*' + digit, evaluatedValue - prevDigit + prevDigit * digit, prevDigit * digit);
            }
        }
    };

    backTrack(0, '', 0, 0);
    return result;
}


//? Time Complexity: O(4^n) where n is the length of the num string. Because we have 4 choices for each digit (3 operators and no operator).
//? Space Complexity: O(n) for the recursion stack.
