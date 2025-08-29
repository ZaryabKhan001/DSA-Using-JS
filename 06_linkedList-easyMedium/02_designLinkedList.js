//? one way
function Node(val) {
  this.value = val; // store the data
  this.next = null; // pointer to the next node
}

//? modern way
class Node {
  constructor(val) {
    this.value = val; // store the data
    this.next = null; // pointer to the next node
  }
}
let node1 = new Node(10);
let node2 = new Node(20);

node1.next = node2;

console.log(node1);
// Output: Node { value: 10, next: Node { value: 20, next: null } }
