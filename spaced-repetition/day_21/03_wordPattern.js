//? LeetCode #290
//? Word Pattern

// Given a pattern and a string s, find if s follows the same pattern.

// Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s. Specifically:

// Each letter in pattern maps to exactly one unique word in s.
// Each unique word in s maps to exactly one letter in pattern.
// No two letters map to the same word, and no two words map to the same letter.

//? Example 1:
// Input: pattern = "abba", s = "dog cat cat dog"
// Output: true
// Explanation:
// The bijection can be established as:
// 'a' maps to "dog".
// 'b' maps to "cat".

//? Example 2:
// Input: pattern = "abba", s = "dog cat cat fish"
// Output: false

//? Example 3:
// Input: pattern = "aaaa", s = "dog cat cat dog"
// Output: false

//? Constraints:
// 1 <= pattern.length <= 300
// pattern contains only lower-case English letters.
// 1 <= s.length <= 3000
// s contains only lowercase English letters and spaces ' '.
// s does not contain any leading or trailing spaces.
// All the words in s are separated by a single space.

//? Approach:
// Use two hash maps to maintain the mapping from pattern characters to words and from words to pattern characters.
// Iterate through the string s and split it into words. For each word, check the corresponding character in the pattern.
// If the character is not in the first map and the word is not in the second map, create a new mapping in both maps.
// If there is already a mapping, check if it matches the current character and word. If not, return false.
// After processing all words, check if the number of processed characters matches the length of the pattern. If not, return false.
// If all checks pass, return true.

//? Code:
var wordPattern = function (pattern, s) {
  s = s + " ";
  let mapPToS = new Map();
  let mapSToP = new Map();

  let word = "";
  let i = 0;
  for (let char of s) {
    if (char === " ") {
      let p = pattern[i];
      let w = word;
      if (!mapPToS.has(p) && !mapSToP.has(w)) {
        mapPToS.set(p, w);
        mapSToP.set(w, p);
      } else if (mapPToS.get(p) !== w || mapSToP.get(w) !== p) {
        return false;
      }
      word = "";
      i++;
    } else {
      word += char;
    }
  }

  return i === pattern.length;
};

//? Time Complexity: O(n) where n is the length of string s
//? Space Complexity: O(n + m) where n is the number of unique words in s and m is the number of unique characters in pattern
