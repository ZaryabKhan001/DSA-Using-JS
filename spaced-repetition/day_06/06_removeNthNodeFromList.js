//? LeetCode: 19
//? Remove Nth Node From End of List

// Given the head of a linked list, remove the nth node from the end of the list and return its head.

//? Example 1:
// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]

//? Example 2:
// Input: head = [1], n = 1
// Output: []

//? Example 3:
// Input: head = [1,2], n = 1
// Output: [1]

//? Approach 01: (Two Pass)
// Use a sentinel (dummy) node before the head to simplify edge cases.
// First, calculate the total length of the list.
// Find the previous node of the one to be deleted using the length – n formula.
// Update the links to skip the target node.

var removeNthFromEnd = function (head, n) {
  let sentinel = new ListNode();
  sentinel.next = head;

  let size = 0;
  while (head != null) {
    head = head.next;
    size = size + 1;
  }

  let targetIndex = size - n;
  let prev = sentinel;

  for (let i = 0; i < targetIndex; i = i + 1) {
    prev = prev.next;
  }
  prev.next = prev.next.next;
  return sentinel.next;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)

//? Approach 02: (One Pass)
// Use a dummy node before the head to handle edge cases easily.
// Move the first pointer n steps ahead.
// Move both first and second pointers until first reaches the end.
// Now second is just before the node to be deleted. Skip it using second.next = second.next.next

var removeNthFromEnd = function (head, n) {
  let sentinel = new ListNode();
  sentinel.next = head;

  let first = head;
  let second = sentinel;

  for (let i = 1; first.next != null; i = i + 1) {
    if (i < n) {
      first = first.next;
    } else {
      first = first.next;
      second = second.next;
    }
  }
  second.next = second.next.next;
  return sentinel.next;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
