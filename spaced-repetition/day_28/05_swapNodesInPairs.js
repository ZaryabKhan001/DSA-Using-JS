//? LeetCode #24
//? Swap Nodes in Pairs

// Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

//? Example 1:
// Input: head = [1,2,3,4]
// Output: [2,1,4,3]

//? Example 2:
// Input: head = []
// Output: []

//? Example 3:
// Input: head = [1]
// Output: [1]

//? Example 4:
// Input: head = [1,2,3]
// Output: [2,1,3]

//? Approach 01: (Iterative)
// Use a dummy node before the head to handle edge cases easily.
// Use pointers to swap pairs by rewiring node connections.
// Iterate through the list two nodes at a time and swap them.

var swapPairs = function (head) {
  if (!head || !head.next) return head;
  let f = head;
  let s = head.next;
  let dummy = new ListNode(0, head);
  let prev = dummy;
  let temp;
  while (f && s) {
    temp = s.next;
    s.next = f;
    f.next = temp;
    if (prev.next === head) {
      head = s;
    }
    prev.next = s;
    prev = f;
    f = f.next;
    if (f) {
      s = f.next;
    }
  }
  return head;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)

//? Approach 02: (Recursive)
// Base case: if the list is empty or has only one node, return the head.
// Let l be the first node and r be the second.
// Call swapPairs recursively for the rest of the list starting from r.next.
// Set l.next to the result of recursive call.
// Make r point to l and return r as the new head.

var swapPairs = function (head) {
  if (!head || !head.next) return head;

  let l = head;
  let r = head.next;

  l.next = swapPairs(r.next);
  r.next = l;
  return r;
};

//? Time Complexity: O(n), where n is the number of nodes in the list.
//? Space Complexity: O(n) due to recursive call stack.
