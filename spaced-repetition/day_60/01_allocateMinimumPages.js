//? Allocate Minimum Pages (gfg)

// Given an array arr[] of integers, where each element arr[i] represents the number of pages in the i-th book. You also have an integer k representing the number of students. The task is to allocate books to each student such that:

// Each student receives atleast one book.
// Each student is assigned a contiguous sequence of books.
// No book is assigned to more than one student.
// All books must be allocated.
// The objective is to minimize the maximum number of pages assigned to any student. In other words, out of all possible allocations, find the arrangement where the student who receives the most pages still has the smallest possible maximum. If it is not possible to allocate books to all students, return -1;

// Note: Test cases are generated such that the answer always fits in a 32-bit integer.

//? Examples:

// Input: arr[] = [12, 34, 67, 90], k = 2
// Output: 113
// Explanation: Allocation can be done in following ways:
// => [12] and [34, 67, 90] Maximum Pages = 191
// => [12, 34] and [67, 90] Maximum Pages = 157
// => [12, 34, 67] and [90] Maximum Pages = 113.
// The third combination has the minimum pages assigned to a student which is 113.

// Input: arr[] = [15, 17, 20], k = 5
// Output: -1
// Explanation: Since there are more students than total books, it's impossible to allocate a book to each student.

//? Constraints:
// 1 ≤ arr.size() ≤ 106
// 1 ≤ arr[i], k ≤ 104

//? Approach: Binary Search
// We will use binary search on the answer.
// The search space is from the maximum number of pages in a single book to the sum of all the pages in the array.
// If we can allocate the books to k students with maximum pages as mid, then we try to minimize the maximum pages by reducing the search space to the left half.
// Otherwise, we increase the search space to the right half.

//? Code:
class Solution {
  findPages(arr, k) {
    let n = arr.length;
    if (k > n) return -1;

    let low = Math.max(...arr);
    let high = arr.reduce((sum, pages) => sum + pages, 0);

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      if (this.isPossible(arr, k, mid)) {
        high = mid - 1; // Try to minimize maximum pages
      } else {
        low = mid + 1;
      }
    }

    return low;
  }

  isPossible(arr, k, maxPages) {
    let students = 1;
    let sum = 0;

    for (let pages of arr) {
      let newSum = sum + pages;
      if (newSum <= maxPages) {
        sum = newSum;
      } else {
        students++;
        sum = pages;

        if (students > k) {
          return false;
        }
      }
    }

    return true;
  }
}

//? Time Complexity: O(n × log(sum(arr)))
//? Space Complexity: O(1)

//? Why start from max(arr)? Simple explanation:
//* In Book Allocation, each student must take whole books (no splitting), so the limiting factor is the largest single book.
//* If the allowed maximum pages is less than `max(arr)`, that book itself cannot be assigned, making the solution impossible.
//* Therefore, the minimum feasible value of the answer must be at least `max(arr)`.
//* So we start binary search with `low = max(arr)` and `high = sum(arr)`.
