//? LeetCode: 203
//? Remove Linked List Elements

// Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.

//? Example 1:
// Input: head = [1,2,6,3,4,5,6], val = 6
// Output: [1,2,3,4,5]

//? Example 2:
// Input: head = [], val = 1
// Output: []

//? Example 3:
// Input: head = [7,7,7,7], val = 7
// Output: []

//? Approach:
//* Use a dummy (sentinel) node before the head to simplify edge cases.
//* Iterate through the list using a pointer.
//* Skip any node whose value matches val.
//* Return the next of sentinel as the new head.

var removeElements = function (head, val) {
  let sentinel = new ListNode();
  sentinel.next = head;

  let prev = sentinel;
  while (prev && prev.next) {
    if (prev.next.val === val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return sentinel.next;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
