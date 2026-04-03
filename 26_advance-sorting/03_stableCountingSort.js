//? Counting Sort (Stable)
// Stable sort means, relative order of the elements remains unchanged.

//? Steps, we follow:
//* Firstly, determine the range of the elements in the array by finding the minimum and maximum values. This range helps decide the size of the count array.
//* Create the count array based on the calculated range and initialize all its values to zero. Then, traverse the original array and store the frequency of each element in the count array.
//* Convert the count array into a prefix (cumulative) array by adding the current count with the previous one. This step helps in determining the correct position of each element in the sorted array.
//* Build the sorted array by iterating over the original array, placing each element at its correct position using the prefix array, and then copying the sorted elements back to the original array.

//? Code:
function countingSortStable(arr) {
  let max = Math.max(...arr);

  let count = new Array(max + 1).fill(0);
  for (let x of arr) {
    count[x]++;
  }

  let prefix = new Array(max + 1).fill(0);
  prefix[0] = count[0];
  for (let i = 1; i < count.length; i++) {
    prefix[i] = count[i] + prefix[i - 1];
  }
  let sortedArr = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    let curr = arr[i];
    let x = prefix[curr];
    sortedArr[x - 1] = curr;
    prefix[curr]--;
  }
  return sortedArr;
}

let nums = [4, 2, 5, 3, 3, 2, 1, 4];
console.log(countingSortStable(nums));

//? Time Complexity
// O(n + k)
// where k: range.
// if k <<<< n, it's a very stable algorithm.

//? Space Complexity
// O(K)
