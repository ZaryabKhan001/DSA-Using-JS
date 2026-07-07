//? Ceil in a Sorted Array (gfg)

// Given a sorted array arr[] and an integer x, find the index (0-based) of the smallest element in arr[] that is greater than or equal to x. This element is called the ceil of x. If such an element does not exist, return -1.

// Note: In case of multiple occurrences of ceil of x, return the index of the first occurrence.

//? Examples

// Input: arr[] = [1, 2, 8, 10, 11, 12, 19], x = 5
// Output: 2
// Explanation: Smallest number greater than 5 is 8, whose index is 2.
// Input: arr[] = [1, 2, 8, 10, 11, 12, 19], x = 20
// Output: -1
// Explanation: No element greater than 20 is found. So output is -1.

// Input: arr[] = [1, 1, 2, 8, 10, 11, 12, 19], x = 0
// Output: 0
// Explanation: Smallest number greater than 0 is 1, whose indices are 0 and 1. The index of the first occurrence is 0.

//? Constraints:
// 1 ≤ arr.size() ≤ 106
// 1 ≤ arr[i] ≤ 106
// 0 ≤ x ≤ arr[n-1]

//? Approach:
// We can use binary search to find the ceil of x in the sorted array arr[].
// We initialize the search space with the entire array, i.e., start = 0 and end = arr.length - 1.
// We also initialize a variable res to -1, which will store the ceil of x.
// In each iteration of the binary search, we calculate the middle index mid = start + (end - start) / 2.
// If arr[mid] is equal to x, then we have found the ceil of x, and we update res = mid.
// If x is less than arr[mid], then the ceil of x must be in the left half of the array, so we update res = mid and end = mid - 1.
// If x is greater than arr[mid], then the ceil of x must be in the right half of the array, so we update start = mid + 1.
// We continue this process until start > end.
// Finally, we return res.

//? Code:
class Solution {
  findCeil(arr, x) {
    let start = 0;
    let end = arr.length - 1;

    let res = -1;
    while (start <= end) {
      let mid = start + Math.floor((end - start) / 2);

      if (arr[mid] == x) {
        res = mid;
        end = mid - 1;
      } else if (x < arr[mid]) {
        res = mid;
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return res;
  }
}

//? Time Complexity: O(log n)
//? Space Complexity: O(1)

//* similar question

//? Smallest alphabet greater than a given character

// Input: letters = ["c","f","j"], target = "a"
// Output: "c"

let letters = ["d", "j", "k"];
const search = (arr, x) => {
  let start = 0;
  let end = arr.length - 1;

  let res = -1;
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);

    if (arr[mid] === x) {
      start = mid + 1;
    } else if (x < arr[mid]) {
      res = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return res;
};
console.log(search(letters, "j"));
