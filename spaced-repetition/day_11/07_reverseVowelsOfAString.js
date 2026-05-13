//? LeetCode #34
//? Reverse Vowels of a String

// Given a string s, reverse only all the vowels in the string and return it.

// The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

//? Example 1:
// Input: s = "IceCreAm"
// Output: "AceCreIm"
// Explanation:
// The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".

//? Example 2:
// Input: s = "leetcode"
// Output: "leotcede"

//? Constraints:
// 1 <= s.length <= 3 * 105
// s consist of printable ASCII characters.

//? Approach:
// We use two pointers (`i` from start, `j` from end) to compare characters.
// If a character is not a vowel, we skip it and move the respective pointer.
// If characters are vowels, we swap them and move both pointers until they meet.

//? Code:
const isVowel = (char) => {
  let lcChar = char.toLowerCase();

  return (
    lcChar === "a" ||
    lcChar === "e" ||
    lcChar === "i" ||
    lcChar === "o" ||
    lcChar === "u"
  );
};

var reverseVowels = function (s) {
  let arr = s.split("");
  let i = 0;
  let j = s.length - 1;

  while (i < j) {
    while (i < j && !isVowel(arr[i])) {
      i++;
    }

    while (i < j && !isVowel(arr[j])) {
      j--;
    }

    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    i++;
    j--;
  }
  return arr.join("");
};

//? Time Complexity: O(n)
//? Space Complexity: O(n) (due to the array created from the string)
