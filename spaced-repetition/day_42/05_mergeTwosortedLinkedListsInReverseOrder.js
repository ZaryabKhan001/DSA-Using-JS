//? Merge 2 Sorted Linked Lists in Reverse Order (gfg)

//? Given the heads of two linked lists head1 and head2, where both linked lists are sorted in non-decreasing order, merge them into a single linked list such that the resulting linked list is sorted in non-increasing order.

//? Examples:

// Input: head1 = 1->3, head2 = 2->4
// Output: 4->3->2->1
// Explanation: After merging the two lists in non-increasing order, we have new lists as 4->3->2->1.

// Input: head1 = 5->10->15->40, head2 = 2->3->20
// Output: 40->20->15->10->5->3->2
// Explanation: After merging the two lists in non-increasing order, we have new lists as 40->20->15->10->5->3->2.

//? Constraints:
// 1 ≤ size of the LinkedLists ≤ 105
// 0 ≤ node->data ≤ 106

//? Approach (Good Approach)
//* Merge two sorted linked lists in non-decreasing order, then reverse the merged list.

//? Code:
class Solution {
  mergeTwoLists(list1, list2) {
    // * base case
    if (!list1) {
      return list2;
    }

    if (!list2) {
      return list1;
    }

    // * recursive solution
    let result = null;
    if (list1.data < list2.data) {
      result = list1;
      result.next = this.mergeTwoLists(list1.next, list2);
    } else {
      result = list2;
      result.next = this.mergeTwoLists(list1, list2.next);
    }

    return result;
  }

  reverseList(head) {
    // * base case
    // * if head is null or only one node so it is already reversed, return it
    if (!head || !head.next) {
      return head;
    }

    let last = this.reverseList(head.next);

    // * update pointers accordingly
    head.next.next = head;
    head.next = null;

    return last;
  }

  mergeResult(head1, head2) {
    const mergedLinkedList = this.mergeTwoLists(head1, head2);
    return this.reverseList(mergedLinkedList);
  }
}

//? Time Complexity: O(n + m)
//? Space Complexity: O(n + m)
