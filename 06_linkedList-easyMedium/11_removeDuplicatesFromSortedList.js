//? LeetCode: #83
//? Remove Duplicates from Sorted List

//? Approach:
// 1. Use two pointers: `curr` to mark the last unique node, and `temp` to scan the list.
// 2. Whenever `temp.val` differs from `curr.val`, link it (`curr.next = temp`) and move `curr` forward.
// 3. Always advance `temp`, and finally cut off duplicates by setting `curr.next = null`.

var deleteDuplicates = function (head) {
  let temp = head;
  let curr = head;
  while (temp) {
    if (curr.val !== temp.val) {
      curr.next = temp;
      curr = temp;
    }
    temp = temp.next;
  }
  if (curr) curr.next = null;
  return head;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
