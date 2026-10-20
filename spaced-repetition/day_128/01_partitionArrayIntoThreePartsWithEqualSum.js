//? LeetCode #1013
//? Partition Array Into Three Parts With Equal Sum

// Given an array of integers arr, return true if we can partition the array into three non-empty parts with equal sums.

// Formally, we can partition the array if we can find indexes i + 1 < j with (arr[0] + arr[1] + ... + arr[i] == arr[i + 1] + arr[i + 2] + ... + arr[j - 1] == arr[j] + arr[j + 1] + ... + arr[arr.length - 1])

//? Example 1:
// Input: arr = [0,2,1,-6,6,-7,9,1,2,0,1]
// Output: true
// Explanation: 0 + 2 + 1 = -6 + 6 - 7 + 9 + 1 = 2 + 0 + 1

//? Example 2:
// Input: arr = [0,2,1,-6,6,7,9,-1,2,0,1]
// Output: false

//? Example 3:
// Input: arr = [3,3,6,5,-2,2,5,1,-9,4]
// Output: true
// Explanation: 3 + 3 = 6 = 5 - 2 + 2 + 5 + 1 - 9 + 4

//? Constraints:
// 3 <= arr.length <= 5 * 104
// -104 <= arr[i] <= 104

//? Thought Process:
/*
First thought:
We need to divide the array into 3 non-empty contiguous parts having equal sum.

1. Calculate totalSum of the array.
2. If totalSum % 3 !== 0, return false because we cannot divide the total sum equally into 3 parts.
3. Calculate target = totalSum / 3.
   Now each part must have sum equal to target.
4. Instead of trying every possible window size using sliding window, we can traverse the array and use runningSum to find each part.
5. Keep adding elements to runningSum.
6. Whenever runningSum === target, we have found one valid part.
   Increase partitions and reset runningSum to 0 because we need to start finding the next part.
7. Why not wait until partitions === 3?
   Because we only need to find 2 partitions explicitly.
   The remaining elements will automatically have sum equal to target because totalSum is exactly 3 * target.
8. But we must ensure at least one element remains for the third part.
   Therefore, when partitions === 2, check i < n - 1.
9. If both conditions are true, return true.
   We have found 2 valid parts and at least one element remains for the third part.
10. If we finish the loop without finding these 2 valid partitions, return false.

Time Complexity: O(n), because we traverse the array once after calculating the total sum.
Space Complexity: O(1), because we only use a few variables.
*/

//? Code:
var canThreePartsEqualSum = function (arr) {
    const n = arr.length;
    const totalSum = arr.reduce((sum, curr) => sum + curr, 0);

    if (totalSum % 3 !== 0) {
        return false;
    }

    const target = totalSum / 3;
    let runningSum = 0;
    let partitions = 0;

    for (let i = 0; i < n; i++) {
        runningSum += arr[i];

        if (runningSum === target) {
            partitions++;
            runningSum = 0;

            if (partitions === 2 && i < n - 1) {
                return true;
            }
        }
    }

    return false;
};

//? Time Complexity: O(n) + O(n) => O(n)
//? Space Complexity: O(1)