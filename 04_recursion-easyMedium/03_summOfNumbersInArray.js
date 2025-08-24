// let arr = [1, 2, 5, 8, 13, 3];

// function sum(n) {
//   if (n === 0) return arr[n];
//   return arr[n] + sum(n - 1);
// }

// console.log(sum(arr.length - 1));

//? Homework

//* Sum of all odd numbers in an array

let arr = [1, 2, 5, 8, 13, 3];

function calculateOdd(n) {
  let isOdd = arr[n] & 1;

  // base condition
  if (n === 0) {
    return isOdd ? arr[n] : 0;
  }

  // recursive part
  return isOdd ? arr[n] + calculateOdd(n - 1) : calculateOdd(n - 1);
}

console.log(calculateOdd(arr.length - 1));
