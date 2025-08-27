//? Selection Sort
let arr = [1, 7, 5, 4, 3, 2];
function selectionSort(arr) {
  let arrLength = arr.length;
  for (let i = 0; i < arrLength - 1; i = i + 1) {
    let min = i;
    for (let j = i; j < arrLength; j = j + 1) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (i != min) {
      let temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
  }
  return arr;
}
console.log(selectionSort(arr));

//? Time Complexity: O(n^2)
//? Space Complexity: O(1)
