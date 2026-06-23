//? LeetCode: 146
//? LRU Cache

// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

// Implement the LRUCache class:

// LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
// int get(int key) Return the value of the key if the key exists, otherwise return -1.
// void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
// The functions get and put must each run in O(1) average time complexity.

//? Example 1:
// Input
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// Output
// [null, null, null, 1, null, -1, null, -1, 3, 4]

//? Explanation
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // cache is {1=1}
// lRUCache.put(2, 2); // cache is {1=1, 2=2}
// lRUCache.get(1);    // return 1
// lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
// lRUCache.get(2);    // returns -1 (not found)
// lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
// lRUCache.get(1);    // return -1 (not found)
// lRUCache.get(3);    // return 3
// lRUCache.get(4);    // return 4

//? Constraints:
// 1 <= capacity <= 3000
// 0 <= key <= 104
// 0 <= value <= 105
// At most 2 * 105 calls will be made to get and put.

//? Approach:
// We can use a hash map and a doubly linked list to implement an LRU cache.
// The hash map will store the key and the value, and the doubly linked list will store the nodes in the order of their usage.
// The head of the doubly linked list will be the least recently used node, and the tail of the doubly linked list will be the most recently used node.

//? Code:
class Node {
  constructor(key, value) {
    this.prev = null;
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.map = new Map();
  }

  insert(targetNode) {
    targetNode.next = this.tail;
    this.tail.prev.next = targetNode;
    targetNode.prev = this.tail.prev;
    this.tail.prev = targetNode;
  }

  remove(targetNode) {
    targetNode.prev.next = targetNode.next;
    targetNode.next.prev = targetNode.prev;
  }

  get(key) {
    if (!this.map.has(key)) {
      return -1;
    }

    let targetNode = this.map.get(key);

    //* delete  that node from the dll
    this.remove(targetNode);

    //* push it back from end
    this.insert(targetNode);

    return targetNode.value;
  }

  put(key, value) {
    //* check if key already exists, update it's value
    if (this.map.has(key)) {
      let targetNode = this.map.get(key);
      targetNode.value = value;

      //* delete  that node from the dll
      this.remove(targetNode);

      //* push it back from end
      this.insert(targetNode);

      return;
    }

    //* if key does not exists, create a new node and attach at last of  dll
    let newNode = new Node(key, value);
    newNode.next = this.tail;
    this.tail.prev.next = newNode;
    newNode.prev = this.tail.prev;
    this.tail.prev = newNode;

    //* update key in map
    this.map.set(key, newNode);

    //* if ll size exceeds the capacity delete lru node
    if (this.map.size > this.capacity) {
      const lru = this.head.next;

      this.head.next = lru.next;
      lru.next.prev = this.head;

      this.map.delete(lru.key);
    }
  }
}

//? Time Complexity: O(1)
//? Space Complexity: O(N)
