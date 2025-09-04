//? LeetCode: #21
//? Merge Two Sorted Lists

// You are given the heads of two sorted linked lists list1 and list2.
// Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
// Return the head of the merged linked list.

//? Example 1:
// Input: list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]

//? Example 2:
// Input: list1 = [], list2 = []
// Output: []

//? Example 3:
// Input: list1 = [], list2 = [0]
// Output: [0]

//? Approach:
// Use a head node to simplify handling of the head.
// Iterate through both lists and append the smaller value node to the merged list.
// Once one list is exhausted, append the remaining part of the other list.
// Return the merged list starting from head.

var mergeTwoLists = function (list1, list2) {
  if (!list1 && !list2) {
    return list1;
  }
  if (!list1 || !list2) {
    return list1 ? list1 : list2;
  }
  let head = null;
  let curr = head;
  while (list1 && list2) {
    let newNode = new ListNode();
    if (list1.val <= list2.val) {
      newNode.val = list1.val;
      list1 = list1.next;
    } else {
      newNode.val = list2.val;
      list2 = list2.next;
    }
    if (!head) {
      head = newNode;
      curr = head;
    } else {
      curr.next = newNode;
      curr = curr.next;
    }
  }
  while (list1) {
    let newNode = new ListNode();
    newNode.val = list1.val;
    list1 = list1.next;
    curr.next = newNode;
    curr = curr.next;
  }
  while (list2) {
    let newNode = new ListNode();
    newNode.val = list2.val;
    list2 = list2.next;
    curr.next = newNode;
    curr = curr.next;
  }
  return head;
};

//? Time Complexity: O(m+n)
//? Space Complexity: O(m+n)
