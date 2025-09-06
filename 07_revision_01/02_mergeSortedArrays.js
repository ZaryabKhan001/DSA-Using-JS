//? LeetCode #88

//* merge two sorted arrays

let nums1 = [1, 2, 3, 0, 0, 0];
let m = 3;
let nums2 = [2, 5, 6];
let n = 3;

var merge = function (nums1, m, nums2, n) {
  let p = m + n - 1;
  let p1 = m - 1;
  let p2 = n - 1;

  while (p2 >= 0) {
    if (p >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1 = p1 - 1;
    } else {
      nums1[p] = nums2[p2];
      p2 = p2 - 1;
    }
    p = p - 1;
  }
  return nums1;
};

const mergedArray = merge(nums1, m, nums2, n);
console.log(mergedArray);
