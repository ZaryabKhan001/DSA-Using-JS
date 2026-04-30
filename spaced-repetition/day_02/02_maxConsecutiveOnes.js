//? LeetCode #485

//* Max Consecutive Ones

// Input: nums = [1,1,0,1,1,1]
// Output: 3

let nums = [1, 1, 0, 1, 1, 1];

var findMaxConsecutiveOnes = function (nums) {
  let consecutives = 0;
  let lastConsecutive = 0;
  let numsLength = nums.length;
  for (let i = 0; i < numsLength; i = i + 1) {
    if (nums[i] === 1) {
      consecutives = consecutives + 1;
      if (consecutives > lastConsecutive) {
        lastConsecutive = consecutives;
      }
    } else {
      consecutives = 0;
    }
  }
  return lastConsecutive;
};

const updatedArray = findMaxConsecutiveOnes(nums);
console.log(updatedArray);
