//? Transform using Minimum Insert and Delete (gfg)

// Given two strings s1 and s2. The task is to remove or insert the minimum number of characters from/in s1 to transform it into s2. It could be possible that the same character needs to be removed from one point of s1 and inserted into another point.

//? Examples :

// Input: s1 = "heap", s2 = "pea"
// Output: 3
// Explanation: 'p' and 'h' deleted from heap. Then, 'p' is inserted at the beginning.

// Input : s1 = "geeksforgeeks", s2 = "geeks"
// Output: 8
// Explanation: 8 deletions, i.e. remove all characters of the string "forgeeks".

//? Constraints:
// 1 ≤ s1.size(), s2.size() ≤ 1000

//? Thought Process:
// We are given two strings a and b we have two operations insertion and deletion. We need to make a as similar as b.
// Now we are clueless because problem statement itself is very generic. Also we have to do min no of operations.

//* First of all how this problem is related to. We just know that we have to find min. It is optimization, so maybe dp is applied over here.
//* Then when we put this question into our pattern matching algorithm. It is LCS problem.

//? How:
//* LCS = inp => 2 strings && Qs => LCS && out => int
//* This Question = inp => 2 strings && Qs => min operations && out => int

// inp and out matches so it is LCS.

//? Now, What is the role of LCS in this question?
// We have to make a similar to b. We do not make it directly but we covert through LCS.
// LCS string remains untouched but for the other alphabets of a and b we have to do operations.

//? So, like remaining alphabets of a and b are useless. lcs remains untouched so definielty we have to remove remaining alphabets of a and insert remaining alphabets of b to a.

//* It boild down to a formula:
// No of Deletions = a.length - LCS
// No of Insertions = b.length - LCS

//? Code:
class Solution {
  lcs(s1, s2, n, m) {
    let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i = i + 1) {
      for (let j = 1; j <= m; j = j + 1) {
        if (s1[i - 1] == s2[j - 1]) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    return dp[n][m];
  }
  minOperations(s1, s2) {
    let n = s1.length;
    let m = s2.length;
    let lcs = this.lcs(s1, s2, n, m);

    let noOfDeletions = n - lcs;
    let noOfInsertions = m - lcs;

    return noOfInsertions + noOfDeletions;
  }
}

//? Time Complexity: O(n * m)
//? Space Complexity: O(n * m)
