//? LeetCode #876
//? Middle of the Linked List

//? Approach 01
// Convert linkedList into an Array and then simply returns (arr.length / 2).

//? Approach 02
//* Use slow/fast pointers strategy

var middleNode = function (head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};

//? Time Complexity = O(n/2) => O(n)
//? Space Complexity = O(1)
