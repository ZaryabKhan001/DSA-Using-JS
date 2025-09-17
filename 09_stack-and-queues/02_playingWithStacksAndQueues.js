//? Common Operations → Stack
// Push: Add an element to the top of the stack
// Pop: Remove the top-most element from the stack
// Peek/Top: View the top-most element without removing it

//? Stack in JavaScript
let stack = []; // Simply, Use Array as Stack.

stack.push(1); // Add inside stack
stack.push(2);
stack.push(3);
console.log(stack); // [1, 2, 3]

stack.pop(); // A stack is LIFO (Last In, First Out), so the element that goes in last will come out first. In this case, 3 will be removed.
stack.pop();
console.log(stack); // [1]

stack.push(7); // [1, 7]

// For Top element
let top = stack[stack.length - 1];
console.log(top); // 7

// Invalid: stack[3] – violates stack discipline
// It works fine because it's treated as an array, but this is invalid in the context of a stack.
// Always use push, pop, and peek for proper stack usage.

///? Queue:
// A Queue is a FIFO (First-In-First-Out) data structure where the first element added is the first to be removed.

//? Common Operations → Queue
// Enqueue: Add an element to the end of the queue
// Dequeue: Remove the element from the front of the queue
// Peek/Front: View the front element without removing it

//? Queue in JavaScript
let q = [];

// Enqueue
q.push(1);
q.push(2);
q.push(3);
console.log(q); // [1, 2, 3]

// Dequeue: Remove from front of the Queue
q.shift(); // Removes 1

// Peek: Get first element of queue.
let front = q[0];
console.log(front); // 2

// Invalid Syntax:
q.pop(); // This works because it's an array method, but it removes from the end and breaks queue logic.
// Queue should only remove from the front.
