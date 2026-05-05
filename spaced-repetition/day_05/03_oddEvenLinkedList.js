//? LeetCode #328
//? Odd Even Linked List

//? Approach
// Your solution splits the list into odd and even nodes by moving pointers step by step while keeping a copy of the even head.
// After rearranging, you connect the last odd node to the saved even head.
// Finally, you ensure the even list ends with `null` to avoid cycles. ✅

var oddEvenList = function (head) {
  if (!head) return head;
  let odd = head;
  let even = head.next;
  let evenCopy = even;
  while (even && even.next && odd && odd.next) {
    odd.next = odd.next.next;
    odd = odd.next;
    even.next = even.next.next;
    even = even.next;
  }
  odd.next = evenCopy;
  if (even) even.next = null;
  return head;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
