//? LeetCode #208
//? Implement Trie (Prefix Tree)

// A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

// Implement the Trie class:

// Trie() Initializes the trie object.
// void insert(String word) Inserts the string word into the trie.
// boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
// boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

//? Example 1:
// Input
// ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
// [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
// Output
// [null, null, true, false, true, null, true]

//? Explanation
// Trie trie = new Trie();
// trie.insert("apple");
// trie.search("apple");   // return True
// trie.search("app");     // return False
// trie.startsWith("app"); // return True
// trie.insert("app");
// trie.search("app");     // return True

//? Constraints:
// 1 <= word.length, prefix.length <= 2000
// word and prefix consist only of lowercase English letters.
// At most 3 * 104 calls in total will be made to insert, search, and startsWith.

//? Approach
// We use a Trie (Prefix Tree) to store words character by character.
// Each node represents a character and contains:
// children: links to next characters.
// isEndOfWord: marks completion of a word.

//* Insertion (insert)
// Start from the root.
// For each character in the word:
// If the character node doesn’t exist, create it.
// Move to that node.
// After the last character, mark isEndOfWord = true.

//* Search (search)
// Start from the root.
// Traverse characters of the word.
// If any character is missing, the word doesn’t exist.
// If traversal ends and isEndOfWord is true, the word exists.

//* Prefix Check (startsWith)
// Start from the root.
// Traverse characters of the prefix.
// If all characters exist, the prefix is present (no need to check isEndOfWord).

//? Code:
var TrieNode = function () {
  this.children = {};
  this.isEndOfWord = false;
};

var Trie = function () {
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let curr = this.root;
  for (let char of word) {
    if (!curr.children[char]) {
      curr.children[char] = new TrieNode();
    }
    curr = curr.children[char];
  }
  curr.isEndOfWord = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let curr = this.root;
  for (let char of word) {
    if (!curr.children[char]) return false;
    curr = curr.children[char];
  }
  return curr.isEndOfWord ? true : false;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let curr = this.root;
  for (let char of prefix) {
    if (!curr.children[char]) return false;
    curr = curr.children[char];
  }
  return true;
};

//? Time Complexity:
//* Insertion → O(L) where: 'L' length of the word.
//* Search → O(L)
//* Prefix → O(P)

//? Space Complexity:
//* Insertion → O(N x L)
//* Search → O(1)
//* Prefix → O(1)

//? When to use Trie Data Structure?
// Prefix Search: All words that starts with ‘any letter’.
// Auto Complete
// Dictionary-based problems
// Word Suggestions
// Spell Checking

//? When NOT to use Trie Data Structure?
// Exact Search
// Memory Constraints
// Dataset is small
//* In such cases, a HashMap is a better approach.
