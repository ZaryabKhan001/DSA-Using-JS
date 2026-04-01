//? Insertion Sort
let arr = [1, 7, 5, 4, 3, 2];
function insertionSort(arr) {
  let arrLength = arr.length;
  for (let i = 1; i < arrLength; i = i + 1) {
    let pointer = arr[i];
    let j;
    for (j = i - 1; j >= 0 && arr[j] > pointer; j = j - 1) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = pointer;
  }
  return arr;
}
console.log(insertionSort(arr));

//? Time Complexity: O(n^2)
//? Space Complexity: O(1)
