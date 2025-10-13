//? LeetCode #160
//? Intersection of Two Linked Lists

//? Approach:
//* Traverse listA and place all elements in a Set,  then traverse list2.
//* First matching element is intersection.

var getIntersectionNode = function (headA, headB) {
  let curr = headA;
  let elements = new Set();
  while (curr != null) {
    elements.add(curr);
    curr = curr.next;
  }
  curr = headB;
  while (curr != null) {
    if (elements.has(curr)) {
      return curr;
    }
    curr = curr.next;
  }
  return null;
};

//? Time Complexity: O(m+n)
//? Space Complexity: O(m)

//* To solve this in O(1) space complexity.

//? Better Approach
var getIntersectionNode = function (headA, headB) {
  let listA = headA;
  let listB = headB;

  while (listA !== listB) {
    listA = listA ? listA.next : headB;
    listB = listB ? listB.next : headA;
  }
  return listA;
};

//? Time Complexity: O(m+n)
//? Space Complexity: O(1)
