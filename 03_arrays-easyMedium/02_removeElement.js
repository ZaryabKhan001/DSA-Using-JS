//? LeetCode #27
//* Remove Element

var removeElement = function (nums, val) {
  let position = 0;
  let temp = 0;
  let length = nums.length;
  for (let i = 0; i < length; i = i + 1) {
    if (nums[i] != val) {
      temp = nums[i];
      nums[i] = nums[position];
      nums[position] = temp;
      position = position + 1;
    }
  }
  return position;
};

const returnedArray = removeElement([3, 2, 2, 3], 3);
console.log(returnedArray);
