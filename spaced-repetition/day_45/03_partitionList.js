//? LeetCode #86
//? Partition List

// Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

// You should preserve the original relative order of the nodes in each of the two partitions.

//? Example 1:
// Input: head = [1,4,3,2,5,2], x = 3
// Output: [1,2,2,4,3,5]

//? Example 2:
// Input: head = [2,1], x = 2
// Output: [1,2]

//? Constraints:
// The number of nodes in the list is in the range [0, 200].
// -100 <= Node.val <= 100
// -200 <= x <= 200

//? Approach:
// We can use two pointers to solve this problem.
// 1. Create two dummy nodes, one for the nodes less than x and one for the nodes greater than or equal to x.
// 2. Iterate through the list and append the nodes to the appropriate dummy node.
// 3. Connect the two dummy nodes.
// 4. Return the head of the new list.

//? Code:
var partition = function (head, x) {
  let beforeHead = new ListNode(0);
  let afterHead = new ListNode(0);

  let before = beforeHead;
  let after = afterHead;

  let curr = head;
  while (curr) {
    if (curr.val < x) {
      before.next = curr;
      before = before.next;
    } else {
      after.next = curr;
      after = after.next;
    }

    curr = curr.next;
  }

  after.next = null;
  before.next = afterHead.next;
  return beforeHead.next;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
