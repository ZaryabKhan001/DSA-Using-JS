//? LeetCode #20
//? Valid Parentheses

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

//? Example 1:
// Input: s = "()"
// Output: true

//? Example 2:
// Input: s = "()[]{}"
// Output: true

//? Example 3:
// Input: s = "(]"
// Output: false

//? Example 4:
// Input: s = "([])"
// Output: true

//? Example 5:
// Input: s = "([)]"
// Output: false

//? Approach:
// Use two stacks:
// s1 for pushing new elements (input stack).
// s2 for popping/peeking elements in correct FIFO order (output stack).
// push(x):Simply push element x into s1.
// pop():
// If s2 is empty, transfer all elements from s1 to s2 (reverse order).
// Then pop from s2.
// peek():
// If s2 is empty, transfer all elements from s1 to s2.
// Return the top of s2.
// empty(): Return true if both s1 and s2 are empty.

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
