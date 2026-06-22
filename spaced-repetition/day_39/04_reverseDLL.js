//? Reverse a Doubly Linked List
// Given the head of a doubly linked list. You have to reverse the doubly linked list and return its head.

// Note: The driver code will print the returned list in both forward and backward directions.

//? Examples:

// Input:
// Output:
// 5 4 3
// 3 4 5
// Explanation: After reversing the given doubly linked list the new list will be 5 <-> 4 <-> 3.

// Input:
// Output:
// 196 59 122 75
// 75 122 59 196
// Explanation: After reversing the given doubly linked list the new list will be 196 <-> 59 <-> 122 <-> 75.

//? Constraints:
// 1 ≤ number of nodes ≤ 106
// 0 ≤ node->data ≤ 104

//? Approach:
// We can reverse the doubly linked list by iterating through the list and swapping the next and prev pointers of each node.

//? Code:
/* Structure of doubly linked list node
class Node {
	constructor(val) {
		this.data = val;
		this.next = null;
		this.prev = null;
	}
}
*/

class Solution {
  reverse(head) {
    let curr = head;
    let last = null;

    while (curr) {
      last = curr.prev;
      curr.prev = curr.next;
      curr.next = last;

      curr = curr.prev;
    }

    // * at last, last is at previous node
    if (last) {
      head = last.prev;
    }

    return head;
  }
}

//? Time Complexity: O(n)
//? Space Complexity: O(1)
