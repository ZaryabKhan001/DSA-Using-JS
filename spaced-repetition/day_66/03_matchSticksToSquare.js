//? LeetCode #473
//? Matchsticks to Square

// You are given an integer array matchsticks where matchsticks[i] is the length of the ith matchstick. You want to use all the matchsticks to make one square. You should not break any stick, but you can link them up, and each matchstick must be used exactly one time.

// Return true if you can make this square and false otherwise.

//? Example 1:
// Input: matchsticks = [1,1,2,2,2]
// Output: true
// Explanation: You can form a square with length 2, one side of the square came two sticks with length 1.

//? Example 2:
// Input: matchsticks = [3,3,3,3,4]
// Output: false
// Explanation: You cannot find a way to form a square with all the matchsticks.

//? Constraints:
// 1 <= matchsticks.length <= 15
// 1 <= matchsticks[i] <= 108

//? Though Process:
// We are going to see whether we can form a square with the given matchsticks.
// To form a square all sides must be equal.
// Which draws our attention to the fact that the sum of all matchsticks must be divisible by 4.
// Or we can say we have to divide whole array into 4 equal parts.
// So each element of array must go to any of the 4 buckets.
// And each bucket must have equal sum.
// We can say that each bucket must have sum = totalSum / 4

// But a twist is if any element of array is greater than totalSum / 4 then we can say that we cannot form a square with the given matchsticks. Also if totalSum is not divisible by 4 then we can say that we cannot form a square with the given matchsticks.
// Then we have to check whether we can fill all 4 buckets with the given matchsticks or not. We can use backtracking to check this. We will try to put each element of array into any of the 4 buckets and check whether we can fill all 4 buckets or not. If we can fill all 4 buckets then we can say that we can form a square with the given matchsticks otherwise we cannot form a square with the given matchsticks.

//? Code:
var makesquare = function (matchsticks) {
    const totalSum = matchsticks.reduce((accumulator, currentValue) => accumulator += currentValue, 0);
    let targetSum = totalSum / 4;

    matchsticks.sort((a, b) => b - a);

    if (totalSum % 4 !== 0) {
        return false;
    }
    if (matchsticks[0] > targetSum) {
        return false;
    }

    const buckets = new Array(4).fill(0);

    const isBucketsSumSame = () => {
        return buckets.every((bucket) => bucket === targetSum);
    };

    const backTrack = (start) => {
        if (start === matchsticks.length) {
            return isBucketsSumSame();
        }

        for (let i = 0; i < 4; i = i + 1) {
            buckets[i] += matchsticks[start];
            if (buckets[i] <= targetSum && backTrack(start + 1)) {
                return true;
            }
            buckets[i] -= matchsticks[start];
        }

        return false;
    }

    return backTrack(0);
};

//? Time Complexity: O(4^n) where n is the number of matchsticks. In the worst case, we have to try all possible combinations of matchsticks to fill the 4 buckets.
//? Space Complexity: O(4^n) where n is the number of matchsticks. We are using a buckets array of size 4 to keep track of the sum of each bucket.