//? LeetCode #268

//* Missing Number

// Input: nums = [3,0,1]
// Output: 2

let nums = [3, 0, 1];

var missingNumber = function (nums) {
  let ans = 0;
  let numsLength = nums.length;
  for (let i = 0; i <= numsLength; i = i + 1) {
    ans = ans ^ i;
  }
  for (let i = 0; i < numsLength; i = i + 1) {
    ans = ans ^ nums[i];
  }
  return ans;
};

const answer = missingNumber(nums);
console.log(answer);
