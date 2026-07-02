//? Problem: Find the minimum difference between the element and the target in a sorted array.

//? Understanding the problem:
//? We are given a sorted array and a target value.
//? If the target is present in the array, return target.
//? If the target is not present in the array, return the minimum difference between the element and the target value.

//? Approach:
//? We can use binary search to find the element in the array that has the minimum difference with the target value.
//? We start with a search space of [0, 1].
//? We expand the search space by doubling the end index until we find a '1'.
//? Once we find a '1', we perform a binary search in the range [start, end] to find the first '1'.

//? Code:
const arr = [1, 3, 5, 8, 12, 16, 20];
const target = 10;

const find = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);

    if (arr[mid] === target) {
      return mid;
    }
    if (target < arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return Math.min(
    Math.abs(start < arr.length ? arr[start] - target : Infinity),
    Math.abs(end >= 0 ? arr[end] - target : Infinity),
  );
};

console.log(find(arr, target));

//? Time Complexity: O(log n)
//? Space Complexity: O(1)
