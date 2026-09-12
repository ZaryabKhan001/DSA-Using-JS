//? LeetCode #53
//? Maximum Subarray

// Given an integer array nums, find the subarray with the largest sum, and return its sum.

//? Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.

//? Example 2:
// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum 1.

//? Example 3:
// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

//? Constraints:
// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104

//? Thought Process:
// When i see this problem, it is about subarrays and subarrays are contiguous. So, my mind goes towards sliding window. But when i dry run sliding window approach on few test cases, it fails. Because array may contain negative numbers and we are not sure that including number will increase our sum or not. So that is why not directly our approach works. Also one more important part is if all elements are positive then we did not even need to do anything, we can just return sum of all elements.

//* Second approach is to use Kadane's algorithm. In this approach we will keep track of two variables, one is max which will store the maximum sum of subarray and second is ans which will store the maximum sum of subarray ending at current index. So, at each index we have two choices, either we can include current element in our subarray or we can start a new subarray from current element. So, we will take maximum of these two choices and update our ans variable. Then we will update our max variable with maximum of max and ans. Finally we will return max variable as our answer.

//? Code:
var maxSubArray = function (nums) {
    let n = nums.length;
    let max = nums[0];
    let ans = nums[0];

    for (let i = 1; i < n; i = i + 1) {
        let choice1 = ans + nums[i];
        let choice2 = nums[i];

        ans = Math.max(choice1, choice2);
        max = Math.max(max, ans);
    }

    return max;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)

//? If we have to get minimum subarray sum then we can just change the max to min and Math.max to Math.min in above code. That's all.


//? Code:
var maxSubArray = function (nums) {
    let n = nums.length;
    let max = nums[0];
    let ans = nums[0];

    for (let i = 1; i < n; i = i + 1) {
        let choice1 = ans + nums[i];
        let choice2 = nums[i];

        ans = Math.max(choice1, choice2);
        max = Math.max(max, ans);
    }

    return max;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)