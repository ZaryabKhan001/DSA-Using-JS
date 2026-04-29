//? LeetCode #26

// let arr = [1, 1, 2];
// let arr = [0,0,1,1,1,2,2,3,3,4];
// let arr = [1];
let arr = [-8, -7, -7, -3, -2, 0, 1, 2, 2, 4, 4, 6];

function removeDuplicates(arr) {
  let initial = 0;
  for (let i = 0; i < arr.length; i = i + 1) {
    if (arr[i] > arr[initial]) {
      initial = initial + 1;
      arr[initial] = arr[i];
    }
  }
  return initial + 1;
}

const cleanedArray = removeDuplicates(arr);
console.log(cleanedArray);
