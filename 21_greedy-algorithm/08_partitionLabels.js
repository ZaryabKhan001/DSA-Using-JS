//? LeetCode #763
//? Partition Labels
// You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. For example, the string "ababcc" can be partitioned into ["abab", "cc"], but partitions such as ["aba", "bcc"] or ["ab", "ab", "cc"] are invalid.

// Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

// Return a list of integers representing the size of these parts.

//? Example 1:
// Input: s = "ababcbacadefegdehijhklij"
// Output: [9,7,8]
// Explanation:
// The partition is "ababcbaca", "defegde", "hijhklij".
// This is a partition so that each letter appears in at most one part.
// A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.

//? Example 2:
// Input: s = "eccbbbbdec"
// Output: [10]

//? Approach:
// For each character, record its last occurrence in the string.
// Traverse the string while keeping track of the current partition end (max last index seen so far).
// Whenever the current index equals this partition end, we close the partition and record its size.
// Time & Space Complexity:

//? Code:
function getIntervals(s) {
  let first = Array(26).fill(-1);
  let last = Array(26).fill(-1);

  for (let i = 0; i < s.length; i = i + 1) {
    let alphabetIndex = s.charCodeAt(i) - 97;
    if (first[alphabetIndex] === -1) {
      first[alphabetIndex] = i;
    }
    last[alphabetIndex] = i;
  }
  return { first, last };
}

var partitionLabels = function (s) {
  let ans = [];
  const { first, last } = getIntervals(s);

  let partitionStart = (partitionEnd = 0);

  for (let i = 0; i < s.length; i = i + 1) {
    let curr = s.charCodeAt(i) - 97;
    if (partitionEnd < first[curr]) {
      ans.push(partitionEnd - partitionStart + 1);
      partitionStart = partitionEnd = i;
    }
    partitionEnd = Math.max(last[curr], partitionEnd);
  }
  ans.push(partitionEnd - partitionStart + 1);
  return ans;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
