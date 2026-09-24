//? 1671. Minimum Number of Removals to Make Mountain Array

// You may recall that an array arr is a mountain array if and only if:

// arr.length >= 3
// There exists some index i (0-indexed) with 0 < i < arr.length - 1 such that:
// arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
// arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
// Given an integer array nums​​​, return the minimum number of elements to remove to make nums​​​ a mountain array.

//? Example 1:
// Input: nums = [1,3,1]
// Output: 0
// Explanation: The array itself is a mountain array so we do not need to remove any elements.

//? Example 2:
// Input: nums = [2,1,1,5,6,2,3,1]
// Output: 3
// Explanation: One solution is to remove the elements at indices 0, 1, and 5, making the array nums = [1,5,6,3,1].

//? Constraints:
// 3 <= nums.length <= 1000
// 1 <= nums[i] <= 109
// It is guaranteed that you can make a mountain array out of nums.

//? Thought Process:
// It is easy. When we think properly, we just need to make the given array a bitonic array using minimum removals.
// What if we somehow calculate longest bitonic subsequence right. Becuase if we need to minimize deletions, we need to maximize the size of valid bitonic array we can make from the given array.
// So we just find out longest bitonic subsequence.

//* Then, length of arr - lbs => minimum removals (After making LBS, other elements are irrelevant).

//? Code:
const LIS = (nums) => {
    let n = nums.length;
    let ans = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                if (ans[j] + 1 > ans[i]) {
                    ans[i] = ans[j] + 1;
                }
            }
        }
    }

    return ans;
};

const LDS = (nums) => {
    let n = nums.length;
    let ans = new Array(n).fill(1);

    for (let i = n - 2; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            if (nums[j] < nums[i]) {
                if (ans[j] + 1 > ans[i]) {
                    ans[i] = ans[j] + 1;
                }
            }
        }
    }

    return ans;
};

var minimumMountainRemovals = function (nums) {
    let n = nums.length;
    let lis = LIS(nums);
    let lds = LDS(nums);
    let lbs = 0;

    for (let i = 0; i < n; i = i + 1) {
        if (lis[i] > 1 && lds[i] > 1) {
            lbs = Math.max(lbs, lis[i] + lds[i] - 1);
        }
    }

    return n - lbs;
};

//? Time Complexity: O(n^2) for LIS, O(n^2) for LDS and O(n) for LBS
// It sums up to O(n^2)
//? Space Complexity: O(n)