//? LeetCode #1381
//? Design a Stack With Increment Operation

// Design a stack that supports increment operations on its elements.

// Implement the CustomStack class:

// CustomStack(int maxSize) Initializes the object with maxSize which is the maximum number of elements in the stack.
// void push(int x) Adds x to the top of the stack if the stack has not reached the maxSize.
// int pop() Pops and returns the top of the stack or -1 if the stack is empty.
// void inc(int k, int val) Increments the bottom k elements of the stack by val. If there are less than k elements in the stack, increment all the elements in the stack.

//? Example 1:
// Input
// ["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
// [[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
// Output
// [null,null,null,2,null,null,null,null,null,103,202,201,-1]
// Explanation
// CustomStack stk = new CustomStack(3); // Stack is Empty []
// stk.push(1);                          // stack becomes [1]
// stk.push(2);                          // stack becomes [1, 2]
// stk.pop();                            // return 2 --> Return top of the stack 2, stack becomes [1]
// stk.push(2);                          // stack becomes [1, 2]
// stk.push(3);                          // stack becomes [1, 2, 3]
// stk.push(4);                          // stack still [1, 2, 3], Do not add another elements as size is 4
// stk.increment(5, 100);                // stack becomes [101, 102, 103]
// stk.increment(2, 100);                // stack becomes [201, 202, 103]
// stk.pop();                            // return 103 --> Return top of the stack 103, stack becomes [201, 202]
// stk.pop();                            // return 202 --> Return top of the stack 202, stack becomes [201]
// stk.pop();                            // return 201 --> Return top of the stack 201, stack becomes []
// stk.pop();                            // return -1 --> Stack is empty return -1.

//? Constraints:
// 1 <= maxSize, x, k <= 1000
// 0 <= val <= 100
// At most 1000 calls will be made to each method of increment, push and pop each separately.

//? Approach:
// The main challenge is the increment operation. If we increment every element in the stack every time `increment(k, val)` is called, it will be very inefficient, especially if the stack is large and `k` is large. This would lead to a time complexity of O(k) for each increment operation.

// To optimize this, we can use a technique similar to lazy propagation in segment trees. Instead of updating all the elements immediately, we only update the top-most element that needs to be incremented. We can store the increment values in a separate array, say `inc`, of the same size as the stack. When we need to pop an element, we add the increment value stored at that element's index to the element's value before popping it. We also need to propagate the increment value to the element below it in the stack.

// Let's walk through the example to understand this better:

// CustomStack stk = new CustomStack(3); // Stack is Empty []
// stk.push(1);                          // stack becomes [1]
// stk.push(2);                          // stack becomes [1, 2]
// stk.pop();                            // return 2 --> Return top of the stack 2, stack becomes [1]
// stk.push(2);                          // stack becomes [1, 2]
// stk.push(3);                          // stack becomes [1, 2, 3]
// stk.push(4);                          // stack still [1, 2, 3], Do not add another elements as size is 4
// stk.increment(5, 100);                // stack becomes [101, 102, 103]
// stk.increment(2, 100);                // stack becomes [201, 202, 103]
// stk.pop();                            // return 103 --> Return top of the stack 103, stack becomes [201, 202]
// stk.pop();                            // return 202 --> Return top of the stack 202, stack becomes [201]
// stk.pop();                            // return 201 --> Return top of the stack 201, stack becomes []
// stk.pop();                            // return -1 --> Stack is empty return -1.

//? Code:
class CustomStack {
  constructor(size) {
    this.maxSize = size;
    this.stack = [];
    this.inc = new Array(this.maxSize).fill(0);
  }
  push(x) {
    if (this.stack.length < this.maxSize) {
      this.stack.push(x);
    }
  }
  pop() {
    let i = this.stack.length - 1;

    if (i < 0) return -1;

    const res = this.stack.pop() + this.inc[i];

    if (i > 0) {
      this.inc[i - 1] += this.inc[i];
    }

    this.inc[i] = 0;

    return res;
  }
  increment(k, val) {
    if (val === 0) {
      return;
    } else {
      let index = Math.min(k, this.stack.length) - 1;
      this.inc[index] += val;
    }
  }
}

//? Time Complexity: O(1) for all operations.
//? Space Complexity: O(n) for the stack and the increment array.
