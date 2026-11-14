//? LeetCode #347
//? Top K Frequent Elements

// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

//? Example 1:
// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]

//? Example 2:
// Input: nums = [1], k = 1
// Output: [1]

//? Example 3:
// Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2
// Output: [1,2]

//? Constraints:
// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104
// k is in the range [1, the number of unique elements in the array].
// It is guaranteed that the answer is unique.

// Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

//? Thought Process:
// Top k frequent elements nikalny hain. 

//* Approach 01:
// Get frequencies of all elements and sort the frequencies in descending order.
// And at the end, just return k elements. (O(n) + O(nlogn))

//* Approach 02:
// Use heap. frequency tu chahiyee e chahiyee right. Frequency nikal lo. Then, use min heap simply pair wise.
// Frequency and actual element ko heap me dalty jao, jab heap size k cross kary tu pop kardo. And at last just elements ko return krdo, array me. (O(n) + O(nlogk))

//? Code:
var topKFrequent = function (nums, k) {
    let freq = {};
    for (let i = 0; i < nums.length; i = i + 1) {
        freq[nums[i]] = (freq[nums[i]] || 0) + 1;
    };

    let pq = new MinPriorityQueue((pair) => pair[0] * 20001 + pair[1] + 10000);

    for (let key in freq) {
        pq.enqueue([freq[key], Number(key)]);

        if (pq.size() > k) {
            pq.dequeue();
        }
    };

    let result = [];

    while (pq.size() > 0) {
        result.push(pq.dequeue()[1]);
    }

    return result;
};

//? Time Complexity: O(nlogk)
//? Space Complexity: O(k)