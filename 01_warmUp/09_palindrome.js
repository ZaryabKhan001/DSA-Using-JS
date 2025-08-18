// Given an integer x, return true if x is a palindrome, and false otherwise.

/**
 * @param {number} x
 * @return {boolean}
 */
// var isPalindrome = function(x) {

// };

var isPalindrome = function (x) {
  let reversedNumber = 0;
  let actualNumber = x;

  if (x < 0) return false;

  while (x > 0) {
    reversedNumber = reversedNumber * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return actualNumber === reversedNumber;
};
console.log(isPalindrome(1245421));
