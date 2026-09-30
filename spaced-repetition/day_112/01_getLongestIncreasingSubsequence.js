//? Get Longest Increasing Subsequence (gfg)

// Given an array of integers arr[], return the Longest Increasing Subsequence (LIS) of the given array. LIS is the longest subsequence where each element is strictly greater than the previous one.

// If multiple LIS exist, return the one that appears first based on the lexicographical order of indices (i.e., the earliest combination of positions from the original sequence).

//? Examples:

// Input: arr[] = [10, 20, 3, 40]
// Output: [10, 20, 40]
// Explanation: [10, 20, 40] is the longest subsequence where each number is greater than the previous one, maintaining the original order.

// Input: arr[] = [10, 22, 9, 33, 21, 50, 41, 60, 80]
// Output: [10, 22, 33, 50, 60, 80]
// Explanation: There are multiple longest Increasing subsequence of length 6, that is [10, 22, 33, 50, 60, 80] and [10 22 33 41 60 80]. The first one has lexicographic smallest order of indices.

//? Constraints:
// 1 ≤ arr.size() ≤ 5103
// 0 ≤ arr[i] ≤ 109

//? Thought Process:
//  1. First, calculate the normal LIS dp[i] = length of LIS ending at index i.
// 2. To reconstruct the LIS, we need to know where each element came from.
// 3. Create a prev[] array of size n, initially -1.
// 4. When arr[j] < arr[i], check if dp[j] + 1 improves dp[i].
// 5. If it does, set dp[i] = dp[j] + 1.
// 6. At the same time, store prev[i] = j.
// 7. This means: the previous element of arr[i] in the LIS is arr[j].
// 8. Keep lastIndex pointing to the index having the maximum dp value.
// 9. Start from lastIndex and repeatedly follow prev[].
// 10. Add each arr[index] to the answer.
// 11. This gives the LIS backwards, so reverse it at the end.
// 12. Therefore, DP tells us the length, while prev[] tells us the path to reconstruct it.

//? How Lexicographically First LIS is Printed?
// - We check the array from left to right, so earlier indices are found first.
// - We update only when we find a longer LIS (`>`), not an equal one.
// - So if two LIS have the same length, the first one found stays.
// - Therefore, it naturally keeps the LIS with the smaller/earlier index order.

//? Code:
class Solution {
  getLIS(arr) {
    let n = arr.length;
    let ans = new Array(n).fill(1);
    let prev = new Array(n).fill(-1);
    let maxLength = 1;
    let lastIndex = 0;

    for (let i = 1; i < n; i = i + 1) {
      for (let j = 0; j < i; j = j + 1) {
        if (arr[j] < arr[i] && ans[j] + 1 > ans[i]) {
          ans[i] = ans[j] + 1;
          prev[i] = j;
        }
      }

      if (ans[i] > maxLength) {
        maxLength = ans[i];
        lastIndex = i;
      }
    }

    let lis = [];

    while (lastIndex != -1) {
      lis.push(arr[lastIndex]);
      lastIndex = prev[lastIndex];
    }

    return lis.reverse();
  }
}

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)

//? Code: (Patience Sorting Algorithm)
class Solution {
  getLIS(arr) {
    let n = arr.length;
    let tails = [];
    let parent = new Array(n).fill(-1);
    tails.push(0);

    for (let i = 1; i < n; i = i + 1) {
      if (arr[i] > arr[tails[tails.length - 1]]) {
        parent[i] = tails[tails.length - 1];
        tails.push(i);
      } else {
        let low = 0;
        let high = tails.length - 1;

        let ans = 0;
        while (low <= high) {
          let mid = Math.floor((low + high) / 2);

          if (arr[tails[mid]] < arr[i]) {
            low = mid + 1;
          } else {
            ans = mid;
            high = mid - 1;
          }
        }

        if (ans > 0) {
          parent[i] = tails[ans - 1];
        }

        tails[ans] = i;
      }
    }

    let lis = [];
    let i = tails[tails.length - 1];

    while (i != -1) {
      lis.push(arr[i]);
      i = parent[i];
    }

    return lis.reverse();
  }
}

//? Time Complexity: O(n logn)
//? Space Complexity: O(n)

//* Binary Search Solution only works to print LIS. If there are multiple LIS occured, it will not take care of Lexicographically first occurred LIS.
