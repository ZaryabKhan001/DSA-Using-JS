//? Sort an array using Recursion

//? Approach:
// Intuition: The problem asks to sort an array using recursion. We can use a recursive approach to sort the array by removing the last element, sorting the remaining array, and then inserting the last element back into the sorted array in its correct position.
// The base case for the recursion is when the array has 0 or 1 element, in which case it is already sorted.
// The recursive step involves removing the last element, sorting the remaining array, and then inserting the last element back into the sorted array in its correct position.
// Actually, this is a variation of insertion sort.

//? Code:
const arr = [2, 3, 7, 6, 4, 5, 9];

const insert = (arr, value) => {
  if (arr.length === 0 || arr[arr.length - 1] <= value) {
    arr.push(value);
    return arr;
  }

  let temp = arr.pop();
  insert(arr, value);
  arr.push(temp);

  return arr;
};

const sort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  const last = arr.pop();

  sort(arr);

  return insert(arr, last);
};

console.log(sort(arr));

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)
