//? LeetCode #2095
//? Delete the Middle Node of a Linked List

// You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.

// The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than or equal to x.

// For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.

//? Example 1:
// Input: head = [1,3,4,7,1,2,6]
// Output: [1,3,4,1,2,6]
// Explanation:
// The above figure represents the given linked list. The indices of the nodes are written below.
// Since n = 7, node 3 with value 7 is the middle node, which is marked in red.
// We return the new list after removing this node.

//? Example 2:
// Input: head = [1,2,3,4]
// Output: [1,2,4]
// Explanation:
// The above figure represents the given linked list.
// For n = 4, node 2 with value 3 is the middle node, which is marked in red.

//? Example 3:
// Input: head = [2,1]
// Output: [2]
// Explanation:
// The above figure represents the given linked list.
// For n = 2, node 1 with value 1 is the middle node, which is marked in red.
// Node 0 with value 2 is the only node remaining after removing node 1.

//? Constraints:
// The number of nodes in the list is in the range [1, 105].
// 1 <= Node.val <= 105

//? Approach 01:
// The most straightforward approach is to first find the length of the linked list. Once we have the length, we can calculate the index of the middle node (which is length / 2). Then, we can traverse the list again to find the node just before the middle node and update its next pointer to skip the middle node.

//? Code:
//* utility function
const getLength = (curr) => {
  let len = 0;

  while (curr) {
    len++;
    curr = curr.next;
  }

  return len;
};

var deleteMiddle = function (head) {
  //* find length of linkedlist
  let len = getLength(head);
  let prevIndex = Math.floor(len / 2) - 1;

  //* sentinel node
  let sentinel = new ListNode(0);
  sentinel.next = head;

  //* go to middle - 1 node
  let curr = sentinel;
  for (let i = 0; i <= prevIndex; i = i + 1) {
    curr = curr.next;
  }

  //* break previous connection and create new
  curr.next = curr.next.next;

  return sentinel.next;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)

//? Approach 02:
// We can use the slow and fast pointer technique to find the middle node of the linked list. We initialize two pointers, slow and fast, to the head of the linked list. We then move the slow pointer one step at a time and the fast pointer two steps at a time. When the fast pointer reaches the end of the linked list, the slow pointer will be at the middle node.

// Once we have the middle node, we can delete it by updating the next pointer of the node before the middle node to point to the node after the middle node.

//? Code:
var deleteMiddle = function (head) {
  //* sentinel node
  let sentinel = new ListNode(0);
  sentinel.next = head;

  //* slow and fast pointers
  let slow = sentinel;
  let fast = sentinel;

  //* move slow and fast pointers
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  //* delete middle node
  slow.next = slow.next.next;

  return sentinel.next;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
