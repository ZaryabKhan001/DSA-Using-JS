//? Floor in a Sorted Array (gfg)

// Given a sorted array arr[] and an integer x, find the index (0-based) of the largest element in arr[] that is less than or equal to x. This element is called the floor of x. If such an element does not exist, return -1.

// Note: In case of multiple occurrences of floor of x, return the index of the last occurrence.

//? Examples

// Input: arr[] = [1, 2, 8, 10, 10, 12, 19], x = 5
// Output: 1
// Explanation: Largest number less than or equal to 5 is 2, whose index is 1.

// Input: arr[] = [1, 2, 8, 10, 10, 12, 19], x = 11
// Output: 4
// Explanation: Largest Number less than or equal to 11 is 10, whose indices are 3 and 4. The index of last occurrence is 4.

// Input: arr[] = [1, 2, 8, 10, 10, 12, 19], x = 0
// Output: -1
// Explanation: No element less than or equal to 0 is found. So, output is -1.

//? Constraints:
// 1 ≤ arr.size() ≤ 106
// 1 ≤ arr[i] ≤ 106
// 0 ≤ x ≤ arr[n-1]

//? Approach:
// We can use binary search to find the floor of x in the sorted array arr[].
// We initialize the search space with the entire array, i.e., start = 0 and end = arr.length - 1.
// We also initialize a variable res to -1, which will store the floor of x.
// In each iteration of the binary search, we calculate the middle index mid = start + (end - start) / 2.
// If arr[mid] is equal to x, then we have found the floor of x, and we update res = mid.
// If x is less than arr[mid], then the floor of x must be in the left half of the array, so we update end = mid - 1.
// If x is greater than arr[mid], then the floor of x must be in the right half of the array, so we update res = mid and start = mid + 1.
// We continue this process until start > end.
// Finally, we return res.

//? Code:
class Solution {
  findFloor(arr, x) {
    let start = 0;
    let end = arr.length - 1;
    let res = -1;

    while (start <= end) {
      let mid = start + Math.floor((end - start) / 2);

      if (arr[mid] == x) {
        res = mid;
        start = mid + 1;
      }

      if (x < arr[mid]) {
        end = mid - 1;
      } else {
        res = mid;
        start = mid + 1;
      }
    }

    return res;
  }
}

//? Time Complexity: O(log n)
//? Space Complexity: O(1)
