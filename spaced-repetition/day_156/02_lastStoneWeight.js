//? LeetCode #1046
//? Last Stone Weight

// You are given an array of integers stones where stones[i] is the weight of the ith stone.

// We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:

// If x == y, both stones are destroyed, and
// If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
// At the end of the game, there is at most one stone left.

// Return the weight of the last remaining stone. If there are no stones left, return 0.

//? Example 1:
// Input: stones = [2,7,4,1,8,1]
// Output: 1
// Explanation:
// We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
// we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
// we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
// we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.

//? Example 2:
// Input: stones = [1]
// Output: 1

//? Constraints:
// 1 <= stones.length <= 30
// 1 <= stones[i] <= 1000

//? Thought Process:
// Very simple.
// Har dafa 2 max weight waly stones chahiyee and uko smash krna hai.
// Agar x and y equal howy dono destroy warna x destroy and y ki value y-x ho jay gi.
// Har dafa largest weight chahiyee tu maxHeap O(1) me largest stone la k dy skta hai, usekrlo na. 
// Sub elements insert karo maxHEap me.
// Har dafa 2 largest nikalo smash kro based on the condtiitons simple.

//? Code:
var lastStoneWeight = function (stones) {
  let n = stones.length;

  if (n === 1) {
    return stones[0];
  }

  let pq = new MaxPriorityQueue();
  for (let weight of stones) {
    pq.enqueue(weight);
  }

  while (pq.size() >= 2) {
    let stone1 = pq.dequeue();
    let stone2 = pq.dequeue();

    if (stone1 != stone2) {
      pq.enqueue(Math.abs(stone2 - stone1));
    }
  }

  if (pq.isEmpty()) {
    return 0;
  } else {
    return pq.dequeue();
  }
};

//? Time Complexity: O(n log n)
//? Space Complexity: O(n)
