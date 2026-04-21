//? LeetCode #38
//? Count and Say

// The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

// countAndSay(1) = "1"
// countAndSay(n) is the run-length encoding of countAndSay(n - 1).
// Run-length encoding (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string "3322251" we replace "33" with "23", replace "222" with "32", replace "5" with "15" and replace "1" with "11". Thus the compressed string becomes "23321511".

// Given a positive integer n, return the nth element of the count-and-say sequence.

//? Example 1:
// Input: n = 4
// Output: "1211"

//? Explanation:
// countAndSay(1) = "1"
// countAndSay(2) = RLE of "1" = "11"
// countAndSay(3) = RLE of "11" = "21"
// countAndSay(4) = RLE of "21" = "1211"

//? Example 2:
// Input: n = 1
// Output: "1"

//? Explanation:
// This is the base case.

//? Constraints:
// 1 <= n <= 30

//? Approach: Iterative
// Start with the base string `"1"` since the sequence begins from there.
// For each step from `2` to `n`, generate the next term by applying Run-Length Encoding (RLE) on the current string.
// While encoding, count consecutive identical characters and append `count + character` to form the new string.
// Repeat this process iteratively until you reach the nth term.
// Finally, return the resulting string as the answer.

//? Code:
function rleEncode(str) {
  if (!str) return "";

  let result = "";
  let count = 1;

  for (let i = 1; i <= str.length; i++) {
    if (str[i] === str[i - 1]) {
      count++;
    } else {
      result += String(count) + str[i - 1];
      count = 1;
    }
  }
  return result;
}

var countAndSay = function (n) {
  let cs = "1";

  for (let i = 2; i <= n; i = i + 1) {
    cs = rleEncode(cs);
  }

  return cs;
};

//? Time Complexity: O(n * m) where n is the input number and m is the length of the string generated at each step
//? Space Complexity: O(m) where m is the length of the string generated at each step
