//? LeetCode #3541
//? Find Most Frequent Vowel and Consonant

//? You are given a string s consisting of lowercase English letters ('a' to 'z').
// Your task is to:
// Find the vowel (one of 'a', 'e', 'i', 'o', or 'u') with the maximum frequency.
// Find the consonant (all other letters excluding vowels) with the maximum frequency.
// Return the sum of the two frequencies.

//? Note: If multiple vowels or consonants have the same maximum frequency, you may choose any one of them. If there are no vowels or no consonants in the string, consider their frequency as 0.

// The frequency of a letter x is the number of times it occurs in the string.

//? Example 1:
// Input: s = "successes"
// Output: 6
// Explanation:
// The vowels are: 'u' (frequency 1), 'e' (frequency 2). The maximum frequency is 2.
// The consonants are: 's' (frequency 4), 'c' (frequency 2). The maximum frequency is 4.
// The output is 2 + 4 = 6.

//? Example 2:
// Input: s = "aeiaeia"
// Output: 3
// Explanation:
// The vowels are: 'a' (frequency 3), 'e' ( frequency 2), 'i' (frequency 2). The maximum frequency is 3.
// There are no consonants in s. Hence, maximum consonant frequency = 0.
// The output is 3 + 0 = 3

//? Approach 1
// Initialize a character frequency map using a loop.
// Define a list of vowels: ['a', 'e', 'i', 'o', 'u'].
// Traverse the string and count how often each character appears.
// Track the highest frequency vowel and the highest frequency consonant.
// Return the sum of those two highest values.

var maxFreqSum = function (s) {
  let map = {};
  for (i = 0; i < s.length; i++) {
    if (!map[s[i]]) {
      map[s[i]] = 1;
    } else {
      ++map[s[i]];
    }
  }

  let vowels = ["a", "e", "i", "o", "u"];
  let maxVowels = 0;
  let maxConsonant = 0;
  for (let i = 0; i < s.length; i++) {
    if (vowels.includes(s[i])) {
      if (map[s[i]] > maxVowels) {
        maxVowels = map[s[i]];
      }
    } else {
      if (map[s[i]] > maxConsonant) {
        maxConsonant = map[s[i]];
      }
    }
  }
  return maxConsonant + maxVowels;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1) because our input is a-z only 26 maximum.

//? Approach 2:
// We loop through the string and count how many times each character appears, separating vowels and consonants into two hash maps.
// While counting, we track the maximum frequency seen among vowels and consonants.
// Finally, we return the sum of the most frequent vowel count and the most frequent consonant count.

var maxFreqSum = function (s) {
  let maxVowel = 0;
  let maxConsonant = 0;
  let vowels = {};
  let consonants = {};
  for (let i = 0; i < s.length; i = i + 1) {
    if (
      s[i] === "a" ||
      s[i] === "e" ||
      s[i] === "i" ||
      s[i] === "o" ||
      s[i] === "u"
    ) {
      vowels[s[i]] = vowels[s[i]] ? vowels[s[i]] + 1 : 1;
      maxVowel = maxVowel < vowels[s[i]] ? vowels[s[i]] : maxVowel;
    } else {
      consonants[s[i]] = consonants[s[i]] ? consonants[s[i]] + 1 : 1;
      maxConsonant =
        maxConsonant < consonants[s[i]] ? consonants[s[i]] : maxConsonant;
    }
  }
  return maxVowel + maxConsonant;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1) because our input is a-z only 26 maximum.
