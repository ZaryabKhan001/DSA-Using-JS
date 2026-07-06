//? Aggressive Cows (gfg)

// Given an integer array arr[], which denotes the positions of stalls. All the positions are distinct. There are k aggressive cows.

// Assign the cows to the stalls such that the minimum distance between any two cows is maximized.

//? Examples:

// Input: arr[] = [1, 2, 4, 8, 9], k = 3
// Output: 3
// Explanation: The first cow can be placed at arr[0], the second at arr[2], and the third at arr[3]. The minimum distance between any two cows is 3 (between arr[0] and arr[2]), which is the maximum possible among all valid arrangements.

// Input: arr[] = [10, 1, 2, 7, 5], k = 3
// Output: 4
// Explanation: The first cow can be placed at arr[0], the second at arr[1], and the third at arr[4]. In this arrangement, the minimum distance between any two cows is 4 (between arr[1] and arr[4]), which is the maximum possible among all valid arrangements.

//? Constraints:
// 2 ≤ arr.size() ≤ 106
// 0 ≤ arr[i] ≤ 108
// 2 ≤ k ≤ arr.size()

//? Approach:
// We can use binary search on the answer.
// The minimum possible distance is 1 and the maximum possible distance is the difference between the maximum and minimum elements in the array.
// We can use binary search to find the maximum possible distance.

//? Code:
class Solution {
  aggressiveCows(arr, k) {
    arr.sort((a, b) => a - b);

    let start = 1;
    let end = arr[arr.length - 1] - arr[0];

    let ans = 0;
    while (start <= end) {
      let mid = start + Math.floor((end - start) / 2);

      if (this.isValid(arr, k, mid)) {
        ans = mid;
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }

    return ans;
  }

  isValid(arr, k, maxAllowed) {
    let cows = 1;
    let lastPos = arr[0];

    for (let i = 1; i < arr.length; i++) {
      const newDist = arr[i] - lastPos;

      if (newDist >= maxAllowed) {
        cows++;
        lastPos = arr[i];
      }
    }

    if (cows >= k) {
      return true;
    } else {
      return false;
    }
  }
}

//? Time Complexity: O(N log N)
//? Space Complexity: O(1)

//? question:
//? why sorting, when we found out min and max in O(n) then why O(logn)?
// We sort not to find min or max, but to simulate movement along a line so greedy placement is valid.
// Not to randomly jump over the stall positions.
