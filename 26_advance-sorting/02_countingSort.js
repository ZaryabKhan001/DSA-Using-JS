//? Counting Sort
// Counting Sort is a non-comparison based sorting algorithm. It works by counting how many times each element appears, then reconstructing the sorted array using those counts.

//? Best when:
// Numbers are non-negative integers.
// Range (max – min) is small.

//? Time Complexity
// O(n + k)
// where k: range.
// If ‘k’ (range) is small, then this algorithm is efficient.

//? Space Complexity
// O(K)

//? Points to remember while using this algorithm

// Elements are integers.
// Values are small in range.

//? Examples
// Marks of students (0 to 100) (range)
// Percentages
// Sort based on Ages (0-120)
// Digits(0 – 9)
// Disadvantage
// Not Stable algorithm

//? Reasons:
// We only count frequencies.
// Then we overwrite the original array.
// We don’t remember the original order of equal elements.
// So if two elements have the same value, their relative order may change.

function countingSort(arr) {
  let max = Math.max(...arr);

  let count = new Array(max + 1).fill(0);

  for (let x of arr) {
    count[x]++;
  }

  let index = 0;
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      arr[index] = i;
      index++;
      count[i]--;
    }
  }

  return arr;
}

let nums = [4, 2, 5, 3, 3, 2, 1, 4];
console.log(countingSort(nums));
