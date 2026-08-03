//? LeetCode #140
//? Word Break II

// Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

// Note that the same word in the dictionary may be reused multiple times in the segmentation.

//? Example 1:
// Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
// Output: ["cats and dog","cat sand dog"]

//? Example 2:
// Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
// Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
// Explanation: Note that you are allowed to reuse a dictionary word.

//? Example 3:
// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// Output: []

//? Constraints:
// 1 <= s.length <= 20
// 1 <= wordDict.length <= 1000
// 1 <= wordDict[i].length <= 10
// s and wordDict[i] consist of only lowercase English letters.
// All the strings of wordDict are unique.
// Input is generated in a way that the length of the answer doesn't exceed 105.

//? Code:
var wordBreak = function (s, wordDict) {
  let result = [];

  const isPresent = (part) => {
    for (let word of wordDict) {
      if (word === part) {
        return true;
      }
    }
    return false;
  };

  const backTrack = (start, output) => {
    if (start === s.length) {
      result.push(output);
      return;
    }

    for (let end = start; end < s.length; end++) {
      let part = s.substring(start, end + 1);

      if (isPresent(part)) {
        let newOutput;
        if (output === "") {
          newOutput = output + part;
        } else {
          newOutput = output + " " + part;
        }
        backTrack(end + 1, newOutput);
      }
    }
  };

  backTrack(0, "");
  return result;
};

//? Time Complexity: O(2^n * (m * t)), where n is the length of the string s, t is the length of the wordDict, and m is the average length of the words in wordDict. The 2^n factor comes from the fact that we are exploring all possible partitions of the string s, and for each partition, we check if it exists in the wordDict which takes O(m * t) time.

//? Space Complexity: O(n), where n is the length of the string s. The space complexity is due to the recursion stack used in the backtracking approach. In the worst case, the recursion stack can go as deep as the length of the string s. Additionally, we are storing all valid sentences in the result array, which can also take up space, but this is not considered in the space complexity analysis since it depends on the number of valid sentences generated.
