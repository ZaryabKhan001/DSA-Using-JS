//? Write a function which searches an element in an array.

// let arr = [2, 4, 0, 10, 8, 30];
// function search(element) {
//   for (let i = 0; i < arr.length; i = i + 1) {
//     if (arr[i] === element) {
//       return i;
//     }
//   }
//   return -1;
// }

// console.log(search(-8));

//? Write a function that returns the number of negative numbers in an array.

// let arr = [2, -9, 17, 0, 1, -10, -4, 8];

// function countNegatives(arr) {
//   let count = 0;
//   for (let i = 0; i < arr.length; i = i + 1) {
//     if (arr[i] < 0) {
//       count = count + 1;
//     }
//   }
//   return count;
// }

// console.log(countNegatives(arr));

//? Write a function that returns the largest number in an array.

// let arr = [2, -9, 17, 0, 1, -10, -4, 8];

// function findLargest(arr) {
//   let largestNumber = arr[0];
//   for (let i = 0; i < arr.length; i = i + 1) {
//     if (arr[i] > largestNumber) {
//       largestNumber = arr[i];
//     }
//   }
//   return largestNumber;
// }

// console.log(findLargest(arr));

//? Write a function that returns the smallest number in an array.

let arr = [2, -9, 17, 0, 1, -10, -4, 8];

function findSmallest(arr) {
  let smallestNumber = arr[0];
  for (let i = 0; i < arr.length; i = i + 1) {
    if (arr[i] < smallestNumber) {
      smallestNumber = arr[i];
    }
  }
  return smallestNumber;
}

console.log(findSmallest(arr));
