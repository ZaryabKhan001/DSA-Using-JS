//? Quick Sort (Divide and Conquer)
//* Quick Sort is a highly efficient sorting algorithm that follows the divide-and-conquer approach. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.

//? Algorithm Steps
// Choose a pivot element Select one element from the array (commonly first, last, middle, or random).
// Partition the array Rearrange elements so that: Elements smaller than the pivot go to the left.
// Elements greater than the pivot go to the right.
// Place the pivot in its correct position After partitioning, the pivot is in its final sorted place.
// Recursively apply Quick Sort Apply Quick Sort to the left sub-array.
// Apply Quick Sort to the right sub-array.
// Stop condition (Base Case) If the sub-array has 0 or 1 element, it is already sorted.

//? Code:
function findPivotIndex(arr, startIndex, endIndex) {
  let pivot = arr[endIndex];
  let pos = startIndex - 1;

  // moving all smaller elements to the left
  for (let i = startIndex; i < endIndex; i++) {
    if (arr[i] < pivot) {
      pos++;
      [arr[i], arr[pos]] = [arr[pos], arr[i]];
    }
  }

  // moving pivot to correct position
  [arr[pos + 1], arr[endIndex]] = [arr[endIndex], arr[pos + 1]];
  return pos + 1;
}

function quickSort(arr, startIndex, endIndex) {
  if (startIndex < endIndex) {
    let pivotIndex = findPivotIndex(arr, startIndex, endIndex);

    // calling quickSort for left part
    quickSort(arr, startIndex, pivotIndex - 1);

    // calling quickSort for right part
    quickSort(arr, pivotIndex + 1, endIndex);

    return arr;
  }
}

let nums = [8, 3, 1, 7, 0, 10, 2];
let startIndex = 0;
let endIndex = nums.length - 1;

console.log(quickSort(nums, startIndex, endIndex));

//? Time Complexity:
// Best Case: O(n log n)
// Average Case: O(n log n)
// Worst Case: O(n2) Already sorted + Bad Pivot (choose)
//? Space Complexity:
// O(log n)
// Only Recursion stack takes a space.
// Very efficient with space Complexity.

//? Importance of Quick Sort
// No extra memory allocation.
// Cache friendly.
// Partitioning is efficient. (log n)
// Randomize pivots avoid worst case.
// Most standard libraries still rely on Quick Sort and variant.
