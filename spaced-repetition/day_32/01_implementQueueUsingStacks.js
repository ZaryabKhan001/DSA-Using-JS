//? LeetCode #232
//? Implement Queue using Stacks

// Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

// Implement the MyQueue class:

// void push(int x) Pushes element x to the back of the queue.
// int pop() Removes the element from the front of the queue and returns it.
// int peek() Returns the element at the front of the queue.
// boolean empty() Returns true if the queue is empty, false otherwise.
// Notes:

// You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
// Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.

//? Example 1:
// Input
// ["MyQueue", "push", "push", "peek", "pop", "empty"]
// [[], [1], [2], [], [], []]
// Output
// [null, null, null, 1, 1, false]

//? Explanation
// MyQueue myQueue = new MyQueue();
// myQueue.push(1); // queue is: [1]
// myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
// myQueue.peek(); // return 1
// myQueue.pop(); // return 1, queue is [2]
// myQueue.empty(); // return false

//? Approach:
// Use two stacks, s1 and s2.
// For Push, push onto s1.
// For pop, transfer elements from s1 to s2 if s2 is empty, then pop from s2.
// For peek, transfer elements from s1 to s2 if s2 is empty, then return top of s2.

var MyQueue = function () {
  this.s1 = [];
  this.s2 = [];
};
MyQueue.prototype.push = function (x) {
  this.s1.push(x);
};
MyQueue.prototype.pop = function () {
  if (this.s2.length === 0) {
    while (this.s1.length) {
      this.s2.push(this.s1.pop());
    }
  }
  return this.s2.pop();
};
MyQueue.prototype.peek = function () {
  if (this.s2.length === 0) {
    while (this.s1.length) {
      this.s2.push(this.s1.pop());
    }
  }
  return this.s2[this.s2.length - 1];
};
MyQueue.prototype.empty = function () {
  return this.s1.length === 0 && this.s2.length === 0;
};

//? Time Complexity:
// push → O(1)
// pop → O(n)
// peek → O(n)
// empty → O(1)

//? Space Complexity = O(n)
