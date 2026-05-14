//? LeetCode #451
//? Sort Characters By Frequency

// Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.

// Return the sorted string. If there are multiple answers, return any of them.

//? Example 1:
// Input: s = "tree"
// Output: "eert"
// Explanation: 'e' appears twice while 'r' and 't' both appear once.
// So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.

//? Example 2:
// Input: s = "cccaaa"
// Output: "aaaccc"
// Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
// Note that "cacaca" is incorrect, as the same characters must be together.

//? Example 3:
// Input: s = "Aabb"
// Output: "bbAa"
// Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
// Note that 'A' and 'a' are treated as two different characters.

//? Constraints:
// 1 <= s.length <= 5 * 105
// s consists of uppercase and lowercase English letters and digits.

//? Approach 01:
// 1. Create a frequency map to count the occurrences of each character in the string.
// 2. Convert the frequency map into an array of [character, frequency] pairs and sort it in descending order based on frequency.
// 3. Reconstruct the output string by repeating each character according to its frequency and concatenating them together.

//? Code:
var frequencySort = function (s) {
  let map = {};

  for (let char of s) {
    map[char] = map[char] ? ++map[char] : 1;
  }

  let sortedFreq = Object.entries(map).sort((a, b) => b[1] - a[1]);

  //* reconstruct answer
  let result = "";
  for (let entry of sortedFreq) {
    let [char, freq] = entry;
    result += char.repeat(freq);
  }

  return result;
};

//? Time Complexity: O(n + klogk)
//? Space Complexity: O(k)

//? Approach 02:
// 1. Create a frequency map to count the occurrences of each character in the string.
// 2. Use a bucket sort approach where we create an array of buckets, where the index of each bucket corresponds to the frequency of characters.
// 3. Place characters into their respective buckets based on their frequency.
// 4. Reconstruct the output string by iterating through the buckets in reverse order and concatenating characters according to their frequency.

//? Code:
var frequencySort = function (s) {
  let freq = {};

  //* frequency count
  for (let char of s) {
    freq[char] = (freq[char] || 0) + 1;
  }

  //* buckets
  let buckets = Array(s.length + 1)
    .fill(null)
    .map(() => []);

  //* place chars into buckets
  for (let char in freq) {
    let count = freq[char];
    buckets[count].push(char);
  }

  //* build result
  let result = "";

  for (let i = buckets.length - 1; i >= 0; i--) {
    for (let char of buckets[i]) {
      result += char.repeat(i);
    }
  }

  return result;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
