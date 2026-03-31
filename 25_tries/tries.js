//? Trie
// Trie is a tree like data structure that is used to store strings efficiently, especially when prefix based operations are required. It is also known as Prefix-Tree.

//? Specification of the Data Structure:
// Words are stored character by character.
// Common prefix are shared.
// Each path represents a prefix.
// Some of them are marked as words.

//? What is the purpose of using a Trie data structure?
// Determine the number of words that begin with ‘ca’.
// [car, cat, cap, cup, cupboard, cut, cutter, cot]

//? Advantage’s of Trie Data Structure
// Prefix-based operations: It efficiently supports prefix searches, making it ideal for autocomplete and search suggestion systems.
// Efficient searching: Trie allows fast search, insertion, and deletion operations in O(L) time, where L is the length of the word.

//? Trie Node Structure
// Code:
//             class TrieNode {
//                 constructor() {
//                     this.children = {};
//                     this.isEndOfWord = false;
//                 }
//             }

//? Trie Structure
// Code:
//             class Trie {
//                 constructor() {
//                     this.root = new TrieNode();
//                 }
//             }

//? Points to Remember
// The root node is the starting point of a Trie data structure.
// Each Trie node has two main properties: children and an end-of-word flag.
// A Trie requires only a root node, and all words and operations originate from it.

//? Trie Operations
// Insert, Search, Prefix
// ant, and, cat, cap, car, card

// Insert:
// Search:
// Insert:
// Delete:
