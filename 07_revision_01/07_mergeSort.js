//? LeetCode #912

let arr = [5, 2, 3, 1];

function merge(left, right) {
  let newArr = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      newArr.push(left[i]);
      i = i + 1;
    } else {
      newArr.push(right[j]);
      j = j + 1;
    }
  }
  return [...newArr, ...left.slice(i), ...right.slice(j)];
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

console.log(mergeSort(arr));

//? Time Complexity: O(nlogn)
//? Space Complexity: O(n)

//* better than bubble, insertion and selection sort because they have O(n^2) time complexity.
