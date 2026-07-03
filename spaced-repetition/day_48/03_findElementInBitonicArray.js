//? Find element in bitonic array

//? Approach:
// Bitonic array is monotonic increasing and decreasing order sequence seprated by peak element
// As we know that peak element is greater than its neighbors.
// So we can use binary search to find a peak efficiently.
// 1. find peak element
// 2. search in left half
// 3. search in right half

//? Code:
const arr = [5, 8, 10, 16, 19, 45, 21, 14, 3];

var findPeakElement = (arr) => {
  let n = arr.length;
  let start = 0;
  let end = n - 1;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);

    //* if mid is peak, return it
    let prev = mid > 0 ? arr[mid - 1] : -Infinity;
    let next = mid < n - 1 ? arr[mid + 1] : -Infinity;

    if (arr[mid] > prev && arr[mid] > next) {
      return mid;
    }

    //* go to greater side becuase we need peak element,
    //* respect the elevation
    else if (prev > arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
};

var searchASC = (arr, start, end, target) => {
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (target > arr[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
};

var searchDSC = (arr, start, end, target) => {
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (target > arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
};

const search = (arr, target) => {
  let peak = findPeakElement(arr);
  let leftHalf = searchASC(arr, 0, peak - 1, target);
  let rightHalf = searchDSC(arr, peak, arr.length - 1, target);

  if (leftHalf !== -1) {
    return leftHalf;
  } else if (rightHalf !== -1) {
    return rightHalf;
  } else {
    return -1;
  }
};

console.log(search(arr, 5));

//? Time Complexity: O(logn)
//? Space Complexity: O(1)
