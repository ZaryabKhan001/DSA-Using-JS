//? LeetCode #707

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  addAtHead(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  }
  addAtTail(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
    } else {
      let curr = this.head;
      while (curr.next !== null) {
        curr = curr.next;
      }
      curr.next = newNode;
    }
    this.size++;
  }
  addAtIndex(index, val) {
    if (index < 0 || index > this.size) {
      return -1;
    }
    if (index === 0) {
      this.addAtHead(val);
      return;
    }
    if (index === this.size) {
      this.addAtTail(val);
      return;
    }
    let curr = this.head;
    let i = 0;
    while (i < index - 1) {
      curr = curr.next;
      i = i + 1;
    }
    let newNode = new Node(val);
    newNode.next = curr.next;
    curr.next = newNode;
    this.size++;
  }
  get(index) {
    if (index < 0 || index >= this.size) {
      return -1;
    }
    let i = 0;
    let curr = this.head;
    while (i !== index) {
      curr = curr.next;
      i = i + 1;
    }
    return curr.val;
  }
  print() {
    let i = 0;
    let curr = this.head;
    while (curr !== null) {
      console.log(curr.val);
      curr = curr.next;
      i = i + 1;
    }
  }
  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) {
      return -1;
    }
    if (index === 0) {
      this.head = this.head.next;
      this.size--;
      return;
    }
    let i = 0;
    let curr = this.head;
    while (i < index - 1) {
      curr = curr.next;
      i = i + 1;
    }
    curr.next = curr.next.next;
    this.size--;
  }
}

const list = new LinkedList();
// Add at head
list.addAtHead(10);
list.addAtHead(20);
list.addAtHead(30);
console.log("30, 20, 10");
list.print();
// List now: 30 -> 20 -> 10

// Add at tail
list.addAtTail(40);
list.addAtTail(50);
console.log("30, 20, 10, 40, 50");
list.print();
// List now: 30 -> 20 -> 10 -> 40 -> 50

// Add at index
list.addAtIndex(2, 25);
console.log("30, 20, 25, 10, 40, 50");
list.print();
// List now: 30 -> 20 -> 25 -> 10 -> 40 -> 50

list.deleteAtIndex(2);
console.log("30, 20, 10, 40, 50");
list.print();
