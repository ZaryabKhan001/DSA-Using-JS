//? LeetCode #917
//? Reverse Only Letters

// Given a string s, reverse the string according to the following rules:

// All the characters that are not English letters remain in the same position.
// All the English letters (lowercase or uppercase) should be reversed.
// Return s after reversing it.

//? Example 1:
// Input: s = "ab-cd"
// Output: "dc-ba"

//? Example 2:
// Input: s = "a-bC-dEf-ghIj"
// Output: "j-Ih-gfE-dCba"

//? Example 3:
// Input: s = "Test1ng-Leet=code-Q!"
// Output: "Qedo1ct-eeLg=ntse-T!"

//? Constraints:
// 1 <= s.length <= 100
// s consists of characters with ASCII values in the range [33, 122].
// s does not contain '\"' or '\\'.

//? Approach:
// We can use two pointers to reverse the letters in the string. We will start one pointer from the beginning of the string and the other pointer from the end of the string. We will move the pointers towards each other until they meet. If we encounter a non-letter character, we will skip it and move the pointer accordingly. If we encounter a letter, we will swap it with the letter at the other pointer and move both pointers towards each other.

//? Code:
//* utility function
const isEnglishetter = (char) => {
  return (char <= "z" && char >= "a") || (char <= "Z" && char >= "A");
};

var reverseOnlyLetters = function (s) {
  let arr = s.split("");

  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    if (!isEnglishetter(arr[i])) {
      i++;
    } else if (!isEnglishetter(arr[j])) {
      j--;
    } else {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j--;
    }
  }

  return arr.join("");
};

//? Time Complexity: O(n)
//? Space Complexity: O(n) - for the array created from the string
