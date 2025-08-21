//? LeetCode #283

//* Move Zeros

// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]

//? move zeros to last of the array without affecting it's order

let nums = [0, 1, 0, 3, 12];

var moveZeroes = function (nums) {
  let numsLength = nums.length;
  if (numsLength <= 1) {
    return numsLength;
  }
  let position = 0;
  let temp = 0;
  for (let i = 0; i < numsLength; i = i + 1) {
    if (nums[i] !== 0) {
      temp = nums[i];
      nums[i] = nums[position];
      nums[position] = temp;
      position = position + 1;
    }
  }
  return nums;
};

const updatedArray = moveZeroes(nums);
console.log(updatedArray);
