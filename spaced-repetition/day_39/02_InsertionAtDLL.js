//? Insertion at doubly linked list

// Given the head of a doubly-linked list, a position p, and an integer x. Add a new node with value x at the position just after pth node in the doubly linked list and return the head of the updated list.

// Note: The position is 0-based indexed.

//? Examples:

// Input: p = 2, x = 6
// Output: 2 <-> 4 <-> 5 <-> 6
// Explanation: Insert a node of value 6 after the 2nd node.

// Input: p = 0, x = 44
// Output: 1 <-> 44 <-> 2 <-> 3 <-> 4
// Explanation: Insert a node of value 44 after the 0th node.

//? Constraints:
// 0 ≤ p < list size ≤ 104
// 0 ≤ x, node->data ≤ 104

//? Approach:
// 1. Handle the edge case where the node to be inserted is the head.
// 2. Traverse the list to find the place where a node to be inserted.
// 3. Update the pointers to insert the node.
// 4. Return the head of the updated list.

//? Code:
/*
class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}
*/

class Solution {
  insertAtPos(head, p, x) {
    // code here
    let curr = head;
    let i = 0;
    while (i < p) {
      i++;
      curr = curr.next;
    }

    // * create new doubly linkedlist node
    let newNode = new Node(x);

    //* update pointers accordingly
    newNode.prev = curr;
    newNode.next = curr.next;
    if (curr.next) curr.next.prev = curr;
    curr.next = newNode;

    return head;
  }
}

//? Time Complexity: O(n)
//? Space Complexity: O(1)
