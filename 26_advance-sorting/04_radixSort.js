//? Radix Sort
// Radix sort is a non-comparison sorting algorithm. Instead of comparing elements directly, it sorts numbers digit by digit (or character by character), starting from either the least significant digit (LSD).

//? Example
// [170, 45, 75, 90, 802, 24, 2, 66]

// Sort First LSD: [170, 90, 802, 2, 24, 45, 75, 66]

// Sort Second LSD: [802, 2, 24, 45, 66, 170, 75, 90]

// Sort Third LSD: [2, 24, 45, 66, 75, 90, 170, 802]

//? When to use Radix Sort
// Large number of integers.
// Fix digit length.
// Non-negative numbers.

//? When Not to use Radix Sort
// Floating point values.
// Very large digits.
// When memory is extremely tight.

//? Code:
function countingSortStable(arr, e) {
  let count = new Array(10).fill(0);

  for (let x of arr) {
    let digit = Math.floor(x / e) % 10;
    count[digit]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] = count[i] + count[i - 1];
  }

  let sortedArr = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    let curr = Math.floor(arr[i] / e) % 10;
    let x = count[curr];
    sortedArr[x - 1] = arr[i];
    count[curr]--;
  }
  // modify the original array
  for (let i = 0; i < arr.length; i++) {
    arr[i] = sortedArr[i];
  }
}

function radixSort(arr) {
  let max = Math.max(...arr);

  for (let e = 1; Math.floor(max / e) > 0; e = e * 10) {
    countingSortStable(arr, e);
  }
  return arr;
}
let nums = [170, 45, 75, 90, 802, 24, 2, 66];
console.log(radixSort(nums));

//? Time Complexity
// O(d * (n + k))

// where k: range, d = digits
// Effectively o(n) for integers.

//? Space Complexity
// O(n + k)
