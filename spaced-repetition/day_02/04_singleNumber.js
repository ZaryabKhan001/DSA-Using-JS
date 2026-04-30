//? LeetCode #136

//* Single Number

// Input: nums = [2,2,1]
// Output: 1

let nums = [2, 2, 1];

var singleNumber = function (nums) {
  let ans = 0;
  let numsLength = nums.length;
  for (let i = 0; i < numsLength; i = i + 1) {
    ans = ans ^ nums[i];
  }
  return ans;
};

const answer = singleNumber(nums);
console.log(answer);
