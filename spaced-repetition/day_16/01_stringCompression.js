//? LeetCode #443
//? String Compression

// Given an array of characters chars, compress it using the following algorithm:

// Begin with an empty string s. For each group of consecutive repeating characters in chars:

// If the group's length is 1, append the character to s.
// Otherwise, append the character followed by the group's length.
// The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

// After you are done modifying the input array, return the new length of the array.

// You must write an algorithm that uses only constant extra space.

// Note: The characters in the array beyond the returned length do not matter and should be ignored.

//? Example 1:
// Input: chars = ["a","a","b","b","c","c","c"]
// Output: 6
// Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".

//? Example 2:
// Input: chars = ["a"]
// Output: 1
// Explanation: The only group is "a", which remains uncompressed since it's a single character.

//? Example 3:
// Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
// Output: 4
// Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".

//? Constraints:
// 1 <= chars.length <= 2000
// chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.

//? Approach:
// We can use a two-pointer approach to compress the string in place. We will maintain a write pointer that indicates where we should write the compressed characters and a count variable to keep track of the number of consecutive characters. We will iterate through the input array and for each group of consecutive characters, we will write the character and its count (if greater than 1) to the input array. Finally, we will return the new length of the compressed array.

//? Code:
var compress = function (chars) {
  let count = 1;
  let write = 0;

  for (let i = 1; i <= chars.length; i = i + 1) {
    if (chars[i - 1] === chars[i]) {
      count++;
    } else {
      chars[write] = chars[i - 1];
      write++;

      if (count > 1) {
        let str = String(count);

        for (let digit of str) {
          chars[write] = digit;
          write++;
        }
      }
      count = 1;
    }
  }
  return write;
};

//? Time Complexity: O(n) where n is the length of the input array chars. We traverse the array once to compress it.
//? Space Complexity: O(1) since we are modifying the input array in place and using only a constant amount of extra space for variables.
