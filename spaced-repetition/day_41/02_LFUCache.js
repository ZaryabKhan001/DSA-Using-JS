//? LeetCode #460
//? LFU Cache

// Design and implement a data structure for a Least Frequently Used (LFU) cache.

// Implement the LFUCache class:

// LFUCache(int capacity) Initializes the object with the capacity of the data structure.
// int get(int key) Gets the value of the key if the key exists in the cache. Otherwise, returns -1.
// void put(int key, int value) Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used key would be invalidated.
// To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.

// When a key is first inserted into the cache, its use counter is set to 1 (due to the put operation). The use counter for a key in the cache is incremented either a get or put operation is called on it.

// The functions get and put must each run in O(1) average time complexity.

//? Example 1:
// Input
// ["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
// Output
// [null, null, null, 1, null, -1, 3, null, -1, 3, 4]

//? Explanation
// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
// LFUCache lfu = new LFUCache(2);
// lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
// lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
// lfu.get(1);      // return 1
// cache=[1,2], cnt(2)=1, cnt(1)=2
// lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
// cache=[3,1], cnt(3)=1, cnt(1)=2
// lfu.get(2);      // return -1 (not found)
// lfu.get(3);      // return 3
// cache=[3,1], cnt(3)=2, cnt(1)=2
// lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
// cache=[4,3], cnt(4)=1, cnt(3)=2
// lfu.get(1);      // return -1 (not found)
// lfu.get(3);      // return 3
// cache=[3,4], cnt(4)=1, cnt(3)=3
// lfu.get(4);      // return 4
// cache=[4,3], cnt(4)=2, cnt(3)=3

//? Constraints:
// 1 <= capacity <= 104
// 0 <= key <= 105
// 0 <= value <= 109
// At most 2 * 105 calls will be made to get and put.

//? Approach:
// We can use a hash map to store the key-value pairs.
// We can use another hash map to store the frequency of each key.
// We can use another hash map to store the least frequently used key.
// We can use another hash map to store the least recently used key.

//? Code:
class LFUNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.freq = 1;
    this.prev = null;
    this.next = null;
  }
}

class LFUList {
  constructor() {
    this.head = new LFUNode(-1, -1);
    this.tail = new LFUNode(-1, -1);

    this.head.next = this.tail;
    this.tail.prev = this.head;

    this.size = 0;
  }

  add(node) {
    node.next = this.head.next;
    node.prev = this.head;

    this.head.next.prev = node;
    this.head.next = node;

    this.size++;
  }

  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;

    this.size--;
  }

  removeLast() {
    if (this.size === 0) return null;

    const node = this.tail.prev;
    this.remove(node);
    return node;
  }
}

var LFUCache = function (capacity) {
  this.capacity = capacity;
  this.minFreq = 0;
  this.keyMap = new Map();
  this.freqMap = new Map();
};

LFUCache.prototype.get = function (key) {
  if (!this.keyMap.has(key)) return -1;

  const node = this.keyMap.get(key);
  this.updateFreq(node);

  return node.value;
};

LFUCache.prototype.put = function (key, value) {
  if (this.capacity === 0) return;

  if (this.keyMap.has(key)) {
    const node = this.keyMap.get(key);
    node.value = value;
    this.updateFreq(node);
    return;
  }

  if (this.keyMap.size >= this.capacity) {
    const list = this.freqMap.get(this.minFreq);
    const nodeToRemove = list.removeLast();

    this.keyMap.delete(nodeToRemove.key);
  }

  const node = new LFUNode(key, value);

  if (!this.freqMap.has(1)) {
    this.freqMap.set(1, new LFUList());
  }

  this.freqMap.get(1).add(node);
  this.keyMap.set(key, node);
  this.minFreq = 1;
};

LFUCache.prototype.updateFreq = function (node) {
  const oldFreq = node.freq;
  const list = this.freqMap.get(oldFreq);

  list.remove(node);

  if (oldFreq === this.minFreq && list.size === 0) {
    this.minFreq++;
  }

  node.freq++;

  if (!this.freqMap.has(node.freq)) {
    this.freqMap.set(node.freq, new LFUList());
  }

  this.freqMap.get(node.freq).add(node);
};

//? Time Complexity: O(1)
//? Space Complexity: O(n)
