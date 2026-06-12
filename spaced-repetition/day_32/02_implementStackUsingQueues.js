//? LeetCode #225
//? Implement Stack using Queues

// Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

//? Implement the MyStack class:
// void push(int x) Pushes element x to the top of the stack.
// int pop() Removes the element on the top of the stack and returns it.
// int top() Returns the element on the top of the stack.
// boolean empty() Returns true if the stack is empty, false otherwise.

//? Notes:
// You must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations are valid.
// Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.

//? Example 1:
// Input
// ["MyStack", "push", "push", "top", "pop", "empty"]
// [[], [1], [2], [], [], []]
// Output
// [null, null, null, 2, 2, false]

//? Explanation
// MyStack myStack = new MyStack();
// myStack.push(1);
// myStack.push(2);
// myStack.top(); // return 2
// myStack.pop(); // return 2
// myStack.empty(); // return False

//? Approach 1
// Initialize Two Queues.
// Just add the element to q1. (q1.push(x))
// Remove the last pushed element (i.e., rear of q1).
// Similar to pop(), but instead of removing the last element.
// Check if q1 is empty.

var MyStack = function () {
  this.q1 = [];
  this.q2 = [];
};

MyStack.prototype.push = function (x) {
  this.q1.push(x);
};

MyStack.prototype.pop = function () {
  let n = this.q1.length;
  for (let i = 0; i < n - 1; i++) {
    this.q2.push(this.q1.shift());
  }
  let ans = this.q1.shift();
  let temp = this.q1;
  this.q1 = this.q2;
  this.q2 = temp;
  return ans;
};

MyStack.prototype.top = function () {
  let n = this.q1.length;
  for (let i = 0; i < n - 1; i++) {
    this.q2.push(this.q1.shift());
  }
  let front = this.q1[0];
  this.q2.push(this.q1.shift());
  let temp = this.q1;
  this.q1 = this.q2;
  this.q2 = temp;
  return front;
};

MyStack.prototype.empty = function () {
  return this.q1.length === 0;
};

//? Time Complexity:
// push → O(1)
// pop/top → O(n)
// empty → O(1)

//? Space Complexity: O(1)

//? Approach 2:
// We simulate LIFO (stack) using only FIFO (queue) operations.
// We maintain a single queue (q).
// Remove the last pushed element (i.e., rear of q1).
// Insert it at the back (q.push(x)).
// Rotate the queue to bring the new element to the front by dequeuing and enqueuing all previous elements.

var MyStack = function () {
  this.q = [];
};

MyStack.prototype.push = function (x) {
  this.q.push(x);
};

MyStack.prototype.pop = function () {
  let n = this.q.length;
  for (let i = 0; i < n - 1; i++) {
    this.q.push(this.q.shift());
  }
  return this.q.shift();
};

MyStack.prototype.top = function () {
  let n = this.q.length;
  for (let i = 0; i < n - 1; i++) {
    this.q.push(this.q.shift());
  }
  let front = this.q.shift();
  this.q.push(front);
  return front;
};

MyStack.prototype.empty = function () {
  return this.q.length === 0;
};

//? Time Complexity:
// push → O(1)
// pop/top → O(n)
// empty → O(1)

//? Space Complexity = O(n)
//? Where n is the total number of elements in the stack.
