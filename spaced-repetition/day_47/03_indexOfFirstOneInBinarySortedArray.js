//? Problem: Find the index of the first '1' in a binary sorted array.

//? Understanding the problem:
//? We are given a binary sorted array, which means it contains only 0s and 1s, and all the 0s come before all the 1s.
//? We need to find the index of the first '1'.

//? Approach:
//? We can use binary search to find the index of the first '1'.
//? We start with a search space of [0, 1].
//? We expand the search space by doubling the end index until we find a '1'.
//? Once we find a '1', we perform a binary search in the range [start, end] to find the first '1'.

//? Code:
const arr = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];

const search = (arr) => {
  let start = 0;
  let end = 1;

  //* get the best search space
  while (end < arr.length && arr[end] === 0) {
    start = end;
    end = end * 2;
  }

  //* bounding end
  end = Math.min(end, arr.length - 1);

  //* now simple search
  let ans = -1;
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);

    if (arr[mid] === 1) {
      ans = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return ans;
};

console.log(search(arr));

//? Time Complexity: O(log n)
//? Space Complexity: O(1)
