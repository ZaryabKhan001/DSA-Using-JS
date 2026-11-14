//? LeetCode #658
//? Find K Closest Elements

// Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.

// An integer a is closer to x than an integer b if:

// |a - x| < |b - x|, or
// |a - x| == |b - x| and a < b

//? Example 1:
// Input: arr = [1,2,3,4,5], k = 4, x = 3
// Output: [1,2,3,4]

//? Example 2:
// Input: arr = [1,1,2,3,4,5], k = 4, x = -1
// Output: [1,1,2,3]

//? Constraints:
// 1 <= k <= arr.length
// 1 <= arr.length <= 104
// arr is sorted in ascending order.
// -104 <= arr[i], x <= 104

//? Thought Process:
// This problem is slightly similar to the question k largest numbers.
// Wahan hum log k largest number nikalty thy overall, using minHeap. minHeap me push karty jao, jahan heap ka size > k ho, wahan pop kardo.
// But yahan thora alag masla hai, yahan humy x number k closest numbers nikalny hain.

// Agar array hai [5,6,7,8,9] and x=7 k=4. So, 4 aisy number nikalo jo 7 k qareeb hon,
// If we substract each number with 7 and get absolute of it, we got [2, 1, 0, 1, 2]. Now 0, 1, 2 is our answer. Jitna kam absolute difference ayy ga utna zyada wo x k qareeb hoga number. Now ab humy na kuch nahi krna just k smallest elements nikalny hain is difference array me sy using heap but issue yeh hai k return tu hummy actuall number e krny hain na. Tu pais bana lo, heap logic difference py laga lo aur answer me actual number bhej dena. That's it.

//? Code:
var findClosestElements = function (arr, k, x) {
  let pq = new MaxPriorityQueue((pair) => pair[0] * 20001 + pair[1] + 10000);

  for (let i = 0; i < arr.length; i = i + 1) {
    let diff = Math.abs(arr[i] - x);

    pq.enqueue([diff, arr[i]]);

    if (pq.size() > k) {
      pq.dequeue();
    }
  }

  let result = [];

  while (!pq.isEmpty()) {
    let element = pq.dequeue();
    result.push(element[1]);
  }

  return result.sort((a, b) => a - b);
};

//? Time Complexity: O(nlogk + klogk)
//? Space Complexity: O(k)

//* Remember:
// priority = primaryPriority * (range + 1) + secondaryPriority;
