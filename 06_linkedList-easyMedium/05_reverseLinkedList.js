//? LeetCode #206
//? Reverse Linked List

//? Approach 1 (Bad Approach)
//* Convert LinkedList to Array, reverse an array then convert it back to linkedList.

//? Approach 2 (Bad Approach)
//* Create a new linkedList, traverse this linkedList and place each element to new linkedList from head. Then, return new linkedList. It uses extra O(n) memory.

//? Approach 3 (Good Approach)
//* Use three pointers: prev, curr, and temp.
//? In each step:
//* Save the next node.
//* Point current node’s next to previous.
//* Move prev and curr forward.
//* Return prev as the new head.

var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  } else {
    let prev = null;
    let curr = head;
    let temp = null;
    while (curr !== null) {
      temp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }
    head = prev;
    return head;
  }
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
