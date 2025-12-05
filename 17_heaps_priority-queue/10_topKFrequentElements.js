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

//? Approach
// Count frequencies – Traverse the array and store the frequency of each element in a hash map. (O(n)).
// Maintain a Min Heap of size k –
// Push each (value, frequency) pair into the heap(O(log k)).
// f heap size exceeds k, pop the smallest frequency element.
// Extract result – Convert the heap elements to an array of values and return them. (O(k)).

var topKFrequent = function (arr, k) {
  // create a map of freq 0(n)
  let map = {};
  for (let i = 0; i < arr.length; ++i) {
    if (!map[arr[i]]) map[arr[i]] = 0;
    ++map[arr[i]];
  }
  // add elements to MinPQ and restrict size tok O(n log
  let pq = new MinPriorityQueue((x) => x.freq);
  for (key in map) {
    pq.push({ val: key, freq: map[key] }); // log k
    if (pq.size() > k) {
      pq.pop(); // removing smallest element // log k
    }
  }
  // retrun remaining k element in PQ
  return pq.toArray().map((x) => Number(x.val));
};

//? Time Complexity = O(n log k)
//? Space Complexity = O(n)
