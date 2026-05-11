//? LeetCode #234
//? Palindrome Linked List

// Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

// Example 1:

// Input: head = [1,2,2,1]
// Output: true
// Example 2:

// Input: head = [1,2]
// Output: false

//? Approach 1:
// Traverse the linked list and store values in an array.
// Check whether the array is a palindrome by comparing elements from start and end moving towards the center.

//? Time Complexity: O(n)
//? Space Complexity: O(n)

//? Approach 2:
// Use two pointers (slow and fast) to find the middle of the linked list.
// Reverse the second half of the list.
// Compare the first and second halves node by node.

var isPalindrome = function (head) {
  //* finding middle element
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  //* reversing second half of linkedList
  let prev = null;
  let curr = slow;
  while (curr !== null) {
    let temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
  }

  //* comparing both halfs of linkedLists
  let list1 = head;
  let list2 = prev;
  while (list2 !== null) {
    if (list1.val !== list2.val) {
      return false;
    }
    list1 = list1.next;
    list2 = list2.next;
  }
  return true;
};

//? Time Complexity: O(n/2) + O(n/2) + O(n/2) => O(n)
//? Space Complexity: O(1)
