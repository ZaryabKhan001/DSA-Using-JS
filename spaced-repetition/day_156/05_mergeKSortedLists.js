//? LeetCode #23
//? Merge k Sorted Lists

// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

// Merge all the linked-lists into one sorted linked-list and return it.

//? Example 1:
// Input: lists = [[1,4,5],[1,3,4],[2,6]]
// Output: [1,1,2,3,4,4,5,6]
// Explanation: The linked-lists are:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// merging them into one sorted linked list:
// 1->1->2->3->4->4->5->6

//? Example 2:
// Input: lists = []
// Output: []

//? Example 3:
// Input: lists = [[]]
// Output: []

//? Constraints:
// k == lists.length
// 0 <= k <= 104
// 0 <= lists[i].length <= 500
// -104 <= lists[i][j] <= 104
// lists[i] is sorted in ascending order.
// The sum of lists[i].length will not exceed 104.

//? Thought Process:
// - We have K sorted linked lists, and we need to merge them into one sorted linked list.
// - At every step, we need the smallest node among the K lists.
// - Instead of traversing all K lists to find the smallest node, we use a Min Heap.
// - Insert the head node of every non-empty linked list into the Min Heap.
// - Extract the smallest node and attach it to our result linked list.
// - Now insert the next node of the extracted node's original list into the heap.
// - Repeat until the heap becomes empty.

//? Why Min Heap?
// We need to repeatedly find the minimum among K candidates. Min Heap gives us the minimum in O(log K) time.

//? Code:
var mergeKLists = function (lists) {
  let pq = new MinPriorityQueue((node) => node.val);

  // Insert the head of every non-empty list
  for (let i = 0; i < lists.length; i = i + 1) {
    if (lists[i] !== null) {
      pq.enqueue(lists[i]);
    }
  }

  let dummy = new ListNode(-1);
  let tail = dummy;

  while (!pq.isEmpty()) {
    // Extract the smallest node
    let node = pq.dequeue();

    // Attach it to the result
    tail.next = node;
    tail = tail.next;

    // Insert the next node from the same list
    if (node.next !== null) {
      pq.enqueue(node.next);
    }
  }

  return dummy.next;
};

//? Time Complexity: O(n log k)
//? Space Complexity: O(k)
