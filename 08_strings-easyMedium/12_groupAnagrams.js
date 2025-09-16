//? LeetCode: #49
//? Group Anagrams

// Given an array of strings strs, group the anagrams together. You can return the answer in any order.

//? Example 1:
// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
//? Explanation:
// There is no string in strs that can be rearranged to form "bat".
// The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
// The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

//? Example 2:
// Input: strs = [""]
// Output: [[""]]

//? Example 3:
// Input: strs = ["a"]
// Output: [["a"]]

//? Approach 1:
// Initialize a hashmap to store grouped anagrams.
// For each word in the input list:
// Sort the characters in the word alphabetically.
// Use the sorted string as a key.
// Add the original word to the list at that key.
// Return all grouped lists of anagrams from the hashmap.

var groupAnagrams = function (strs) {
  let map = {};

  for (let i = 0; i < strs.length; i++) {
    let sortedStr = strs[i].split("").sort().join("");

    if (!map[sortedStr]) {
      map[sortedStr] = [strs[i]];
    } else {
      map[sortedStr].push(strs[i]);
    }
  }

  return Object.values(map);
};

//? Time Complexity: O(n·k·log k), where n is the number of strings and k is the average length of each string (due to sorting)
//? Space Complexity: O(n·k), for storing grouped anagrams

//? Approach 2:
// Initialize a hashmap to store grouped anagrams.
// For each word in the input array:
// Create an array of size 26 to count frequency of each letter.
// Convert that frequency array into a unique string key (like “#1#0#2…”).
// Use this string as a hash key to group anagrams.
// Return all the grouped values.

var groupAnagrams = function (strs) {
  let map = {};

  for (let i = 0; i < strs.length; i++) {
    let freqArr = Array(26).fill(0);
    let s = strs[i];

    for (let j = 0; j < s.length; j++) {
      let index = s[j].charCodeAt(0) - "a".charCodeAt(0);
      freqArr[index]++;
    }

    let key = "";
    for (let k = 0; k < 26; k++) {
      key += "#" + freqArr[k];
    }

    if (!map[key]) {
      map[key] = [s];
    } else {
      map[key].push(s);
    }
  }

  return Object.values(map);
};

//? Time Complexity: O(n·k), where n = number of strings, k = average length of strings (no sorting)
//? Space Complexity: O(n·k), for storing frequency map and result
