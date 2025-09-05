//? LeetCode: #61
//? Rotate List

// Given the head of a linked list, rotate the list to the right by k places.

//? Example 1:
// Input: head = [1,2,3,4,5], k = 2
// Output: [4,5,1,2,3]

//? Example 2:
// Input: head = [0,1,2], k = 4
// Output: [2,0,1]

//? Approach:
// Traverse the list once to find its length (size) and the tail node.
// Normalize rotations with k = k % size (if k === 0, return the head).
// Move (size - k) steps from the head to find the new tail.
// Set the new head as newTail.next, connect the old tail to the old head, and break the link at newTail.

var rotateRight = function (head, k) {
  if (!head || !head.next || k === 0) return head;
  let curr = head;
  let size = 1;
  let target = head;
  while (curr.next) {
    size = size + 1;
    curr = curr.next;
  }
  k = k % size;
  for (let i = 1; i < size - k; i = i + 1) {
    target = target.next;
  }
  curr.next = head;
  head = target.next;
  target.next = null;
  return head;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
