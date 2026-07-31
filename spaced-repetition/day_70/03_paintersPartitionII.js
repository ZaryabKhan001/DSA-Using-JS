//? The Painter's Partition Problem-II

// Given an array arr[] where each element denotes the length of a board, and an integer k representing the number of painters available. Each painter takes 1 unit of time to paint 1 unit length of a board.

// Determine the minimum amount of time required to paint all the boards, under the constraint that each painter can paint only a contiguous sequence of boards (no skipping or splitting allowed).

//? Examples:

// Input: arr[] = [5, 10, 30, 20, 15], k = 3
// Output: 35
// Explanation: The optimal allocation of boards among 3 painters is -
// Painter 1 → [5, 10] → time = 15
// Painter 2 → [30] → time = 30
// Painter 3 → [20, 15] → time = 35
// Job will be done when all painters finish i.e. at time = max(15, 30, 35) = 35

// Input: arr[] = [10, 20, 30, 40], k = 2
// Output: 60
// Explanation: A valid optimal partition is -
// Painter 1 → [10, 20, 30] → time = 60
// Painter 2 → [40] → time = 40
// Job will be complete at time = max(60, 40) = 60

// Input: arr[] = [100, 200, 300, 400], k = 1
// Output: 1000
// Explanation: There is only one painter, so the painter must paint all boards sequentially. The total time taken will be the sum of all board lengths, i.e., 100 + 200 + 300 + 400 = 1000.

//? Constraints:
// 1 ≤ arr.size() ≤ 105
// 1 ≤ arr[i] ≤ 104
// 1 ≤ k ≤ 105

//? Approach: Binary Search on Answer
// Intuition: The problem asks for the minimum time required to paint all the boards, which is equivalent to finding the minimum possible value of the maximum time taken by any painter.
// The minimum possible time is the length of the longest board (since each board must be painted by some painter).
// The maximum possible time is the sum of all board lengths (if there is only one painter).
// We can use binary search on the possible range of times to find the minimum time that satisfies the condition.

//? Code:
class Solution {
  minTime(arr, k) {
    let start = Math.max(...arr);
    let end = arr.reduce(
      (accumulator, currentValue) => (accumulator += currentValue),
      0,
    );
    let ans = 0;

    while (start <= end) {
      let mid = start + Math.floor((end - start) / 2);

      if (this.isValid(arr, k, mid)) {
        ans = mid;
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return ans;
  }
  isValid(arr, k, maxTimeAllowed) {
    let timeTaken = 0;
    let painter = 1;

    for (let time of arr) {
      let newTime = timeTaken + time;

      if (newTime > maxTimeAllowed) {
        painter++;
        timeTaken = time;
      } else {
        timeTaken = newTime;
      }
    }

    if (painter > k) {
      return false;
    } else {
      return true;
    }
  }
}

//? Time Complexity: O(N * log(Sum - Max))
//? Space Complexity: O(1)
