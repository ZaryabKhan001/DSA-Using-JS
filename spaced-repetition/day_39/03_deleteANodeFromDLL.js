//? Delete in a Doubly Linked List (gfg)

// You are given a Doubly Linked List and an integer x. Remove the node at position x (positions are 1-indexed) from the list, and return the head of the updated list.

//? Examples:

// Input: x = 3,
// Output: 1 <-> 3
// Explanation: After deleting the node at position 3 (position starts from 1), the updated linked list is 1 <-> 3.

// Input: x = 1,
// Output: 5 <-> 2 <-> 9
// Explanation: After deleting the node at position 1, the updated linked list is 5 <-> 2 <-> 9.

//? Constraints:
// 1 ≤ x ≤ size of the linked list ≤ 106
// 0 ≤ node->data ≤ 104

//? Approach:
// 1. Handle the edge case where the node to be deleted is the head.
// 2. Traverse the list to find the node to be deleted.
// 3. Update the pointers to remove the node.
// 4. Return the head of the updated list.

//? Code:
/*
class Node {
	constructor(val) {
		this.data = val;
		this.next = null;
		this.prev = null;
	}
}
*/

class Solution {
  delPos(head, x) {
    // code here
    if (x == 1) {
      head = head.next;
      if (head) {
        head.prev = null;
      }
      return head;
    } else {
      let i = 1;
      let curr = head;

      while (curr && i < x - 1) {
        i++;
        curr = curr.next;
      }

      const toDelete = curr.next;
      curr.next = toDelete.next;
      if (toDelete.next) {
        toDelete.next.prev = curr;
      }
    }

    return head;
  }
}

//? Time Complexity: O(n)
//? Space Complexity: O(1)
