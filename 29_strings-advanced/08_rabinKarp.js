// ? Rabin-Karp Algorithm for Pattern Searching
// Rabin–Karp is a string searching algorithm used to find a pattern inside a text efficiently using hashing.

// It solves the problem:
// 👉 “Find if a pattern exists in a large string (or find all occurrences).”

// Instead of comparing characters one by one repeatedly, it compares hash values of substrings.

//? Why it is useful:
//* Avoids repeated full string comparisons
//* Works well when multiple pattern searches are needed
//* Uses rolling hash to update substring hash in O(1)

//? Steps:
// 1. Compute hash of pattern
// 2. Compute hash of first window of text
// 3. Compare both hashes
// 4. If equal, verify actual substring (to avoid collision)
// 5. Slide window by 1
// 6. Update hash using rolling hash (remove left, add right)
// 7. Repeat until end of text

//? Time Complexity:
// Average / best case: O(n + m)
// Worst case (many collisions): O(n × m)

//? Without Rabin–Karp:
// Brute force approach checks every window
// Time Complexity: O(n × m)

//* So Rabin–Karp improves substring search from O(n×m) → O(n) (on average) using hashing.

//? code:
let text = "abcdbacd";
let pattern = "acdd";

const rabinKarp = (text, pattern) => {
  let n = text.length;
  let m = pattern.length;

  if (m > n) return false;

  let base = 26;
  let mod = 1e9 + 7;

  let patternHash = 0;
  let windowHash = 0;

  //* initial hashes
  for (let i = 0; i < m; i = i + 1) {
    patternHash = (patternHash * base + pattern.charCodeAt(i)) % mod;
    windowHash = (windowHash * base + text.charCodeAt(i)) % mod;
  }

  //* calculate highest power
  let highestPower = 1;
  for (let i = 0; i < m - 1; i = i + 1) {
    highestPower = (highestPower * base) % mod;
  }

  //* pattern matching working
  for (let i = 0; i <= n - m; i = i + 1) {
    if (patternHash === windowHash) {
      if (pattern.includes(text.substring(i, i + m))) {
        return true;
      }
    }

    //* rolling hash

    //* remove left character
    windowHash = (windowHash - highestPower * text.charCodeAt(i)) % mod;

    if (windowHash < 0) {
      windowHash = windowHash + mod;
    }

    //* add right char
    windowHash = (windowHash * base + text.charCodeAt(i + m)) % mod;
  }

  return false;
};

console.log(rabinKarp(text, pattern));
