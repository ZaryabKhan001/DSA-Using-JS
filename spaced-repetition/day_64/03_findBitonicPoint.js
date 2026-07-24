//? Bitonic Point (gfg)

// Given an array of integers arr[] that is first strictly increasing and then maybe strictly decreasing, find the bitonic point, that is the maximum element in the array.
// Bitonic Point is a point before which elements are strictly increasing and after which elements are strictly decreasing.

// Note: It is guaranteed that the array contains exactly one bitonic point.

//? Examples:

// Input: arr[] = [1, 2, 4, 5, 7, 8, 3]
// Output: 8
// Explanation: Elements before 8 are strictly increasing [1, 2, 4, 5, 7] and elements after 8 are strictly decreasing [3].

// Input: arr[] = [10, 20, 30, 40, 50]
// Output: 50
// Explanation: Elements before 50 are strictly increasing [10, 20, 30 40] and there are no elements after 50.

// Input: arr[] = [120, 100, 80, 20, 0]
// Output: 120
// Explanation: There are no elements before 120 and elements after 120 are strictly decreasing [100, 80, 20, 0].

//? Constraints:
// 3 ≤ arr.size() ≤ 105
// 1 ≤ arr[i] ≤ 106

//? Approach:
// As we know that peak element is greater than its neighbors.
// So we can use binary search to find a peak efficiently.
// check is mid is peak, simply return it
// else if go to greater side becuase we need peak element, respect the elevation

class Solution {
  findMaximum(arr) {
    let n = arr.length;

    let start = 0;
    let end = n - 1;

    while (start <= end) {
      let mid = start + Math.floor((end - start) / 2);

      // * if mid is the peak, return it
      let prev = mid > 0 ? arr[mid - 1] : -Infinity;
      let next = mid < n - 1 ? arr[mid + 1] : -Infinity;

      if (arr[mid] > prev && arr[mid] > next) {
        return arr[mid];
      }

      // * go to the greater neighbour side
      // * give respect to elevation, surely peak is on greater side
      else if (prev > arr[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
  }
}

//? Time Complexity: O(logn)
//? Space Complexity: O(1)
