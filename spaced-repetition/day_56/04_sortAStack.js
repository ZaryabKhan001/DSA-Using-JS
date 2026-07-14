//? Sort a stack (gfg)

// Given a stack of integers st[]. Sort the stack in ascending order (smallest element at the bottom and largest at the top).

//? Examples:

// Input: st[] = [41, 3, 32, 2, 11]
// Output: [41, 32, 11, 3, 2]
// Explanation: After sorting, the smallest element (2) is at the bottom and the largest element (41) is at the top.

// Input: st[] = [3, 2, 1]
// Output: [3, 2, 1]
// Explanation: The stack is already sorted in ascending order.

//? Constraints:
// 1 ≤ st.size() ≤ 103
// 0 ≤ stack element ≤ 103

//? Approach:
// We can use recursion to sort the stack.
// The idea is to pop the top element from the stack and recursively sort the remaining stack.
// Then, insert the popped element into the sorted stack in its correct position.

//? Code:
class Solution {
  sortStack(st) {
    if (st.length <= 1) {
      return st;
    }

    let top = st.pop();
    this.sortStack(st);

    this.insert(st, top);

    return st;
  }
  insert(st, value) {
    if (st.length === 0 || st[st.length - 1] <= value) {
      st.push(value);
      return st;
    }

    const temp = st.pop();
    this.insert(st, value);
    st.push(temp);

    return st;
  }
}

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)
