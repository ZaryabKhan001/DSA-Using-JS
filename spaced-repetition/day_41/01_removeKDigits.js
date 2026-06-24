//? LeetCode #402
//? Remove K Digits

// Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.

//? Example 1:
// Input: num = "1432219", k = 3
// Output: "1219"
// Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.

//? Example 2:
// Input: num = "10200", k = 1
// Output: "200"
// Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.

//? Example 3:
// Input: num = "10", k = 2
// Output: "0"
// Explanation: Remove all the digits from the number and it is left with nothing which is 0.

//? Constraints:
// 1 <= k <= num.length <= 105
// num consists of only digits.
// num does not have any leading zeros except for the zero itself.

//? Approach:
// We use a **monotonic increasing stack** to build the smallest possible number.
// We iterate through each digit and, while the current digit is smaller than the top of the stack and `k > 0`, we pop from the stack to remove larger digits.
// After processing all digits, if `k` is still greater than 0, we remove digits from the end of the stack.
// Finally, we join the stack and remove leading zeros to get the result.

//? Code:
var removeKdigits = function (num, k) {
  let stack = [];

  for (let i = 0; i < num.length; i = i + 1) {
    let digit = num[i];
    while (k > 0 && stack.length && stack[stack.length - 1] > num[i]) {
      stack.pop();
      k--;
    }

    stack.push(digit);
  }

  //* if k is greater than zero, remove from last
  while (k > 0) {
    stack.pop();
    k--;
  }

  let result = stack.join("");

  // remove leading zeros
  result = result.replace(/^0+/, "");

  return result === "" ? "0" : result;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
