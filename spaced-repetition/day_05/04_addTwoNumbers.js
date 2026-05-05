//? LeetCode #2
//? Add Two Numbers

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

//? Example 1:
// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.

//? Example 2:
// Input: l1 = [0], l2 = [0]
// Output: [0]

//? Example 3:
// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]

//? Approach:
// Initialize a dummy node to build the result list and a remaining variable set to 0.
// Traverse both linked lists simultaneously. For each node, compute the sum of values plus remaining.
// Create a new node with sum. If sum is less than 10 otherwise substract 10 from sum first.
// Update remaining everytime after calculating sum.
// Continue until both lists are exhausted and remaining becomes 0.

var addTwoNumbers = function (l1, l2) {
  let head = null;
  let curr = head;
  let remaining = 0;
  let sum = 0;
  while (l1 || l2 || remaining) {
    let val1 = l1 ? l1.val : 0;
    let val2 = l2 ? l2.val : 0;
    sum = val1 + val2 + remaining;
    if (sum >= 10) {
      sum = sum - 10;
      remaining = 1;
    } else {
      remaining = 0;
    }
    let newNode = new ListNode(sum, null);
    if (!head) {
      head = newNode;
      curr = head;
    } else {
      curr.next = newNode;
      curr = curr.next;
    }
    l1 = l1 && l1.next;
    l2 = l2 && l2.next;
  }
  return head;
};

//? Time Complexity: O(n) n is the length of longest linkedList
//? Space Complexity: O(n) because we create a new linkedList
