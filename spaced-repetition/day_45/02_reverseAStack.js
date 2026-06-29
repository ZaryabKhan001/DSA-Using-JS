//? Reverse a Stack (gfg)

// You are given a stack st[]. You have to reverse the stack.

// Note: The input array represents the stack from bottom to top (last element is the top). The output is displayed by printing elements from top to bottom after reversal.

//? Examples:

// Input: st[] = [1, 2, 3, 4]
// Output: [1, 2, 3, 4]
// Explanation: After reversing, the elements of stack are in opposite order.

// Input: st[] = [3, 2, 1]
// Output: [3, 2, 1]
// Explanation: After reversing, the elements of stack are in opposite order.

//? Constraints:
// 1 ≤ st.size() ≤ 100
// 0 ≤ stack element ≤ 100

//? Approach:
// We can use recursion to solve this problem.
// 1. If the stack is empty, return.
// 2. Pop the top element.
// 3. Recursively call the function.
// 4. Insert the popped element at the bottom of the stack.

//? Code:
class Solution {
  reverseStack(stack) {
    // code here
    const insertAtBottom = (val) => {
      const recursive = () => {
        if (stack.length == 0) {
          stack.push(val);
          return;
        }

        let top = stack.pop();
        recursive();
        stack.push(top);
      };
      recursive();
    };

    const reverse = () => {
      const recursive = () => {
        if (stack.length == 0) {
          return;
        }

        let top = stack.pop();
        recursive();
        insertAtBottom(top);
      };

      recursive();
    };

    reverse();
  }
}

//? Time Complexity: O(n^2)
//? Space Complexity: O(n)
