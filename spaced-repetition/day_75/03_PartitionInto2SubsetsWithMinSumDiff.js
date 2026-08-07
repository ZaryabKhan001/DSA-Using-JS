//? Partition Into 2 Subsets with Min Sum Diff

// Given an array arr[]  containing non-negative integers, divide it into two sets set1 and set2 such that the absolute difference between their sums is minimum and find the minimum difference.

//? Examples:

// Input: arr[] = [1, 6, 11, 5]
// Output: 1
// Explanation:
// Subset1 = [1, 5, 6], sum of Subset1 = 12
// Subset2 = [11], sum of Subset2 = 11
// Hence, minimum difference is 1.

// Input: arr[] = [1, 4]
// Output: 3
// Explanation:
// Subset1 = [1], sum of Subset1 = 1
// Subset2 = [4], sum of Subset2 = 4
// Hence, minimum difference is 3.

// Input: arr[] = [1]
// Output: 1
// Explanation:
// Subset1 = [1], sum of Subset1 = 1
// Subset2 = [], sum of Subset2 = 0
// Hence, minimum difference is 1.

//? Constraints:
// 1 ≤ arr.size()*|sum of array elements| ≤ 105
// 1 ≤ arr[i] ≤ 105

//? Thought Process:
// We have to partition the array into two subsets such that the absolute difference between their sums is minimized.
// So if we take [1, 2, 7] as an example there multiple ways to partition it into 2 subsets.
// 1 => [1], [2, 7] => |1 - 9| = 8
// 2 => [2], [1, 7] => |2 - 8| = 6
// 3 => [7], [1, 2] => |7 - 3| = 4
// 4 => [1, 2], [7] => |3 - 7| = 4
// 5 => [1, 7], [2] => |8 - 2| = 6
// 6 => [2, 7], [1] => |9 - 1| = 8

// So the minimum difference is 4. Now if we look at the sum of the array it is equal to 10. So if we take the sum of one subset as s1 and the other as s2 then we can say that s1 + s2 = sum. So we can say that s2 = sum - s1. Now we can say that the absolute difference between

// So, we have to make two partitions, p1 and p2 and their sums are s1 and s2 respectively and we have to minimize the absolute difference between s1 and s2.

//? But s1 and s2 can be anything wr are not sure. But can we describe the range of s1 and s2?
// Yes. How?

//? Lowest subset sum can be 0. If we do not take any element.
//? Highest subset sum can be sum of all elements in the array. If we take all elements in one subset and the other subset is empty.

// So, the range of s1 and s2 is from 0 to sum. Now we can say that s1 and s2can be anything from 0 to sum.

// For example, if we take [1, 2, 7] as an example then the sum of the array is 10. So s1 and s2 can be anything from 0 to 10. So the possible values of s1 and s2 are:
// s1 = 0, s2 = 10 => |0 - 10| = 10
// s1 = 1, s2 = 9 => |1 - 9| = 8
// s1 = 2, s2 = 8 => |2 - 8| = 6
// s1 = 3, s2 = 7 => |3 - 7| = 4

//? Now, we have to just take s2 - s1.

//? but how to find s1 and s2 values in range?
//We just need to divide the sum of the array by 2. So, if we take [1, 2, 7] as an example then the sum of the array is 10. So s1 can be anything from 0 to 5 and s2 can be anything from 5 to 10.

//? Why we take s1 as first half of the sum and s2 as second half of the sum?
// So that when we do s2 - s1. It is going to be always positive.

//? Is all the values of s1 and s2 possible?
// No. For example, if we take [1, 2, 7] as an example then the sum of the array is 10. So s1 can be anything from 0 to 5 and s2 can be anything from 5 to 10. But not all values of s1 and s2 are possible. For example, if we take s1 = 4 and s2 = 6 then it is not possible because there is no subset of the array that has a sum of 4 or 6.

//? So we have to find possible values of s1 and then s2 we get from range - s1.

//? How do we check valid s1 value?
// lets take [1, 2, 7] as an example then the sum of the array is 10. So s1 can be anything from 0 to 5 and s2 can be anything from 5 to 10. B

//? If we take s1 = 4. Is 4 is valid value of s1? 
// No, because there is no subset of the array that has a sum of 4. But we have to check programmatically that is there any subset of [1, 2, 7] that has a sum of 4. So we can use subset sum problem to check if there is any subset of the array that has a sum of 4. If there is then it is valid value of s1 otherwise it is not valid value of s1.

//? Hence proved this problem is a variation of subset sum problem. So we can use subset sum problem to solve this problem.

//? Approach:
// 1. Find the sum of the array.
// 2. Find the possible values of s1 from 0 to sum/2.
// 3. For each possible value of s1, check if there is any subset of the array that has a sum of s1 using subset sum problem.
// 4. If there is then calculate s2 = sum - s1 and calculate the absolute difference between s1 and s2.
// 5. Keep track of the minimum absolute difference and return it at the end.

//? Code:
class Solution {
  subsetSum(arr, target) {
    let n = arr.length;
    let dp = Array.from({ length: n + 1 }, () =>
      new Array(target + 1).fill(false),
    );

    // * initialization
    for (let i = 0; i <= n; i = i + 1) {
      dp[i][0] = true;
    }

    // * filling grid cells
    for (let i = 1; i <= n; i = i + 1) {
      for (let j = 1; j <= target; j = j + 1) {
        if (arr[i - 1] > j) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = dp[i - 1][j] || dp[i - 1][j - arr[i - 1]];
        }
      }
    }

    return dp;
  }
  minDifference(arr) {
    let n = arr.length;
    let sum = arr.reduce(
      (accumulator, currentValue) => (accumulator += currentValue),
      0,
    );

    let s1Boundary = Math.floor(sum / 2);
    const grid = this.subsetSum(arr, sum);

    let minDiff = Infinity;
    for (let i = 0; i <= s1Boundary; i = i + 1) {
      if (grid[n][i] == true) {
        minDiff = Math.min(minDiff, sum - 2 * i);
      }
    }

    return minDiff;
  }
}

//? Time Complexity: O(n * sum), where n is the number of elements in the array and sum is the total sum of the elements in the array.
// O(sum / 2) for the second loop to find the minimum difference, but it is dominated by the first loop, so the overall time complexity is O(n * sum).
// O(n) for finding the sum of the array elements, but it is also dominated by the first loop, so the overall time complexity remains O(n * sum).

//? Space Complexity: O(n * sum), where n is the number of elements in the array and sum is the total sum of the elements in the array.
