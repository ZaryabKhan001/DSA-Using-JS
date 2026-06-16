//? Palindrome Number

// You are given an integer n. Your task is to determine whether it is a palindrome.
// A number is considered a palindrome if it reads the same backward as forward, as the number examples "12121" or "555".

//? Examples:

// Input: n = 555
// Output: true
// Explanation: The number 555 reads the same backward as forward, so it is a palindrome.

// Input: n = 123
// Output: false
// Explanation: The number 123 reads differently backward (321), so it is not a palindrome.

// Input: n = -121
// Output: true
// Explanation: if number is palindrome, mainly ignore sign.

//? Constraints:
// -109 ≤ n ≤ 109

//? Approach:
// We can use recursion to solve this problem.
// We can use a helper function to check if the number is a palindrome.

//? Code:
class Solution {
  isPalindrome(n) {
    // code here
    if (n < 0) {
      n = -n;
    }
    const str = String(n);

    const check = (i, j) => {
      if (i >= j) {
        return true;
      }
      if (str[i] != str[j]) {
        return false;
      }

      return check(i + 1, j - 1);
    };

    return check(0, str.length - 1);
  }
}

//? Time Complexity: O(n) because we are iterating through the string once.
//? Space Complexity: O(n) because we are using recursion stack.
