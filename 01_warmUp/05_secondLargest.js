//? Find Second Largest number in an array.

// let arr = [4, 9, 0, 2, 8, 7, 1];

// function findSecondLargest(arr) {
//   if (arr.length === 0) {
//     return -1;
//   }

//   if (arr.length === 1) {
//     return arr[0];
//   }

//   let largest = arr[0];

//   for (let i = 0; i < arr.length; i = i + 1) {
//     if (arr[i] > largest) {
//       largest = arr[i];
//     }
//   }

//   let secondLargest = arr[0];

//   for (let i = 0; i < arr.length; i = i + 1) {
//     if (arr[i] > secondLargest && arr[i] !== largest) {
//       secondLargest = arr[i];
//     }
//   }
//   return secondLargest;
// }

// console.log("Second Largest Number in this array is: ", findSecondLargest(arr));
//! bad approach, because, here we use 2 loops.

//? Better Approach

let arr = [2, 4, 4, 8, 16, 8, -5, 1];

function findSecondLargest(arr) {
  if (arr.length === 0) {
    return -1;
  }

  if (arr.length === 1) {
    return arr[0];
  }

  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (let i = 0; i < arr.length; i = i + 1) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else if (arr[i] > secondLargest && arr[i] != largest) {
      secondLargest = arr[i];
    }
  }
  return secondLargest;
}
console.log("Second Largest Number in this array is: ", findSecondLargest(arr));
