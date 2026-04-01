let arr = [5, 2, 4, 1];

//* swapping using temp variable
// function bubbleSort(arr) {
//   let arrLength = arr.length;
//   let temp = 0;
//   for (let i = arrLength - 1; i > 0; i = i - 1) {
//     for (let j = 0; j <= i; j = j + 1) {
//       if (arr[j] > arr[j + 1]) {
//         temp = arr[j + 1];
//         arr[j + 1] = arr[j];
//         arr[j] = temp;
//       }
//     }
//   }

//   return arr;
// }

// console.log(bubbleSort(arr));

//* swapping using xor
function bubbleSort(arr) {
  let arrLength = arr.length;

  for (let i = arrLength - 1; i > 0; i = i - 1) {
    let isSwapped = false;
    for (let j = 0; j <= i; j = j + 1) {
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j] ^ arr[j + 1];
        arr[j + 1] = arr[j] ^ arr[j + 1];
        arr[j] = arr[j] ^ arr[j + 1];
        isSwapped = true;
      }
    }
    if (!isSwapped) break;
  }

  return arr;
}

console.log(bubbleSort(arr));

//? Time Complexity: O(n^2)
//? Time Complexity: O(1)
