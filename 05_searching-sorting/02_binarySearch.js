//? LeetCode #704

//? Binary Search

let nums = [-1, 0, 3, 5, 9, 12];
let target = 9;

var search = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;
  let middle = 0;
  while (start <= end) {
    middle = Math.floor(start + (end - start) / 2);
    if (nums[middle] === target) {
      return middle;
    } else if (nums[middle] <= target) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return -1;
};
console.log(search(nums, target));

//? Time Complexity: O(log n) base 2
//? Space Complexity: O(1)
