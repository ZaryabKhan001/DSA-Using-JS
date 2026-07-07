//? Search in an almost Sorted Array (gfg)

// Given a sorted integer array arr[] consisting of distinct elements, where some elements of the array are moved to either of the adjacent positions, i.e. arr[i] may be present at arr[i-1] or arr[i+1].
// Given an integer target.  You have to return the index ( 0-based ) of the target in the array. If target is not present return -1.

//? Examples:

// Input: arr[] = [10, 3, 40, 20, 50, 80, 70], target = 40
// Output: 2
// Explanation: Index of 40 in the given array is 2.

// Input: arr[] = [10, 3, 40, 20, 50, 80, 70], target = 90
// Output: -1
// Explanation: 90 is not present in the array.

// Input: arr[] = [-20], target = -20
// Output: 0
// Explanation: -20 is the only element present in the array.

//? Constraints:
// 1 <= arr.size() <= 105
// -109 <= arr[i] <= 109

//? Approach: Modified Binary Search
// Since the array is almost sorted, we can use a modified binary search approach.
// In a standard binary search, we compare the middle element with the target and discard half of the array.
// In this case, the target can be at the middle element, or at the element next to the middle element, or at the element before the middle element.
// So, we need to check all three positions.

//? Code:
class Solution {
  findTarget(arr, target) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
      let mid = start + Math.floor((end - start) / 2);

      if (arr[mid] == target) {
        return mid;
      } else if (mid > 0 && arr[mid - 1] == target) {
        return mid - 1;
      } else if (mid < arr.length - 1 && arr[mid + 1] == target) {
        return mid + 1;
      } else {
        if (target < arr[mid]) {
          end = mid - 2;
        } else {
          start = mid + 2;
        }
      }
    }
    return -1;
  }
}

//? Time Complexity: O(log n)
//? Space Complexity: O(1)
