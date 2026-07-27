//? LeetCode: #698
//? Partition to K Equal Sum Subsets

// Given an integer array nums and an integer k, return true if it is possible to divide this array into k non-empty subsets whose sums are all equal.

//? Example 1:
// Input: nums = [4,3,2,3,5,2,1], k = 4
// Output: true
// Explanation: It is possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.

//? Example 2:
// Input: nums = [1,2,3,4], k = 3
// Output: false

//? Constraints:
// 1 <= k <= nums.length <= 16
// 1 <= nums[i] <= 104
// The frequency of each element is in the range [1, 4].

//? Thought Process:
// The problem is asking us to partition the array into k subsets with equal sum. This means that the sum of each subset should be equal to the total sum of the array divided by k. If the total sum is not divisible by k, then it is impossible to partition the array into k subsets with equal sum.

// So, if we think properly, we have to just put array element in k buckets such that the sum of each bucket is equal to total sum / k.

// Each element is present in any of the k buckets so we have to try all the possibilities of putting each element in any of the k buckets. This suggests the use of recursion and backtracking. We can use a recursive function to try to put each element in any of the k buckets and check if we can partition the array into k subsets with equal sum.

//? Code:
var canPartitionKSubsets = function (nums, k) {
    const totalSum = nums.reduce((accumulator, currentValue) => accumulator += currentValue);
    const targetSum = Math.floor(totalSum / k);
    const max = Math.max(...nums);

    //* If totalSum is not divided into equal buckets, then return false
    if (totalSum % k !== 0) {
        return false;
    };
    //* If maximum is greater than targetSum, impossible to perform any solution
    if (max > targetSum) {
        return false;
    }

    const buckets = new Array(k).fill(0);

    const isBucketsSumSame = () => {
        return buckets.every((bucket) => bucket === targetSum);
    };

    const backTrack = (index) => {
        //* base case
        if (index === nums.length) {
            return isBucketsSumSame();
        }

        //* adding current element on each and every bucket
        for (let i = 0; i < k; i = i + 1) {
            buckets[i] += nums[index];

            // Only continue if this bucket is still valid
            if (buckets[i] <= targetSum) {
                if (backTrack(index + 1)) {
                    return true;
                }
            }

            buckets[i] -= nums[index];
        }

        return false;
    }

    return backTrack(0);
};

//? Time Complexity: O(k^n) where n is the number of elements in the array and k is the number of buckets. In the worst case, we have to try all the possibilities of putting each element in any of the k buckets.
//? Space Complexity: O(k) for the buckets array.