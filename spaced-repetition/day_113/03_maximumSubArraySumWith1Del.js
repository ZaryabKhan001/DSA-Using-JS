//? LeetCode #1186
//? Maximum Subarray Sum with One Deletion

// Given an array of integers, return the maximum sum for a non-empty subarray (contiguous elements) with at most one element deletion. In other words, you want to choose a subarray and optionally delete one element from it so that there is still at least one element left and the sum of the remaining elements is maximum possible.

// Note that the subarray needs to be non-empty after deleting one element.

//? Example 1:
// Input: arr = [1,-2,0,3]
// Output: 4
// Explanation: Because we can choose [1, -2, 0, 3] and drop -2, thus the subarray [1, 0, 3] becomes the maximum value.

//? Example 2:
// Input: arr = [1,-2,-2,3]
// Output: 3
// Explanation: We just choose [3] and it's the maximum sum.

//? Example 3:
// Input: arr = [-1,-1,-1,-1]
// Output: -1
// Explanation: The final subarray needs to be non-empty. You can't choose [-1] and delete -1 from it, then get an empty subarray to make the sum equals to 0.

//? Constraints:
// 1 <= arr.length <= 105
// -104 <= arr[i] <= 104

//? Thought Process:
// 1. I want the biggest subarray sum, but I am allowed to use the power operation once.
// 2. At every element, I can either start a new subarray or extend an existing one.
// 3. The problem is: an existing subarray may have already used the power, or may not have used it.
// 4. So I need to remember these two different situations.
// 5. `noPowerUsed` means: “What is the best sum I can have up to here if I have NOT used power?”
// 6. `powerUsed` means: “What is the best sum I can have up to here if I HAVE used power?”
// 7. Now suppose I am standing at `arr[i]`. What can happen?
// 8. I can forget everything before it and simply start with `arr[i]` → `v1`.
// 9. Or I can take my previous `noPowerUsed` sum and add `arr[i]` → `v2`.
// 10. If power was already used before, I can simply add `arr[i]` → `v3`.
// 11. Or I can use the power NOW on `arr[i]`, while my previous state had not used it → `v4`.
// 12. Therefore, the new `noPowerUsed` is the better of starting fresh or continuing normally.
// 13. The new `powerUsed` is the better of continuing after power was used or using power on the current element.
// 14. I also keep `result` because the best answer could occur at any position, not necessarily at the last one.
// 15. So the whole solution is basically: **at each element, ask “start, continue, or use power here?”**
// 16. We only need the previous two states, so we don't need to store all subarrays.
// 17. That gives us **O(n) time and O(1) space**.

//? Code:
var maximumSum = function (arr) {
    let n = arr.length;
    let noPowerUsed = arr[0];
    let powerUsed = 0;
    let result = arr[0];

    for (let i = 1; i < n; i = i + 1) {
        let v1 = arr[i];
        let v2 = noPowerUsed + arr[i];
        let v3 = powerUsed + arr[i];
        let v4 = noPowerUsed;

        let ans = Math.max(v1, v2, v3, v4);
        result = Math.max(result, ans);

        noPowerUsed = Math.max(v1, v2);
        powerUsed = Math.max(v3, v4);
    }

    return result;
};

//? Time Complexity: O(n) - We traverse the array once, performing constant time operations for each element.
//? Space Complexity: O(1) - We use a constant amount of space for variables, regardless of the input size.