//? LeetCode #767
//? Reorganize String

// Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.

// Return any possible rearrangement of s or return "" if not possible.

//? Example 1:
// Input: s = "aab"
// Output: "aba"

//? Example 2:
// Input: s = "aaab"
// Output: ""

//? Constraints:
// 1 <= s.length <= 500
// s consists of lowercase English letters.

//? Thought Process:
/*
 * ---------------------------------------------------------------------
 * STEP 1: UNDERSTAND THE PROBLEM
 * ---------------------------------------------------------------------
 *  - Input: a string s. Output: any rearrangement of s where no two
 *    adjacent characters are the same, or '' if that's impossible.
 *  - The order of characters doesn't matter, only how many of each we
 *    have. So the first thing to do is COUNT FREQUENCIES.
 *
 * ---------------------------------------------------------------------
 * STEP 2: WHEN IS IT IMPOSSIBLE?  (find the limit first)
 * ---------------------------------------------------------------------
 *  - Think about the most frequent character, call it 'a'.
 *  - Its copies must be separated by at least one other character.
 *  - The best we can do is put 'a' in every other slot: 0, 2, 4, ...
 *        n = 5  ->  a _ a _ a   -> at most 3 copies of 'a'
 *        n = 6  ->  a _ a _ a _ -> at most 3 copies of 'a'
 *  - That's ceil(n / 2) slots.
 *
 *      RULE:  if maxFreq > ceil(n / 2)  ->  return ''
 *
 *  - TRAP: floor(n / 2) is WRONG. For "aab", n = 3, floor = 1, but
 *    "aba" is valid with 2 copies of 'a'. Always use ceil (or (n+1)>>1).
 *  - If this check passes, a valid answer ALWAYS exists. The rest is
 *    just about building one.
 *
 * ---------------------------------------------------------------------
 * STEP 3: HOW TO BUILD IT?  (greedy intuition)
 * ---------------------------------------------------------------------
 *  - Build the result one character at a time.
 *  - Question: which character should go next?
 *  - Idea: ALWAYS PLACE THE MOST FREQUENT REMAINING CHARACTER.
 *      Why? The character with the most copies left is the one most
 *      likely to "get stuck" at the end with nothing to separate its
 *      copies. Using it early spreads it out while we still have other
 *      characters to put between its copies.
 *  - Counter-example of a bad choice: s = "aaabc"
 *      Use rare chars first: b c a ? ?  -> left with "aa" -> stuck.
 *      Use frequent first:   a b a c a  -> works.
 *
 * ---------------------------------------------------------------------
 * STEP 4: THE ONE CONFLICT CASE
 * ---------------------------------------------------------------------
 *  - Sometimes the most frequent character is the SAME as the last one
 *    we placed (we just used it, and it's still the biggest).
 *  - We can't place it twice in a row, so:
 *      -> take the SECOND most frequent character and place that instead.
 *      -> put the first one back untouched; it gets its turn next round.
 *  - Since the feasibility check passed, a second character will always
 *    exist here. (The "pq.size() === 0" branch is just a safety net.)
 *
 * ---------------------------------------------------------------------
 * STEP 5: PICK THE DATA STRUCTURE
 * ---------------------------------------------------------------------
 *  - We repeatedly need "the character with the highest count right
 *    now", and counts change after every placement.
 *  - That's exactly what a MAX-HEAP (priority queue) is for:
 *      store [count, char], ordered by count.
 *      dequeue -> highest count,  enqueue -> put back after decrementing.
 *  - Only push a pair back if its count is still > 0.
 *
 * ---------------------------------------------------------------------
 * STEP 6: DRY RUN  (s = "aaabbc")
 * ---------------------------------------------------------------------
 *  freq: a=3, b=2, c=1   n=6, ceil(6/2)=3, maxFreq=3 -> OK
 *
 *  heap            top    last   action                    res
 *  [a3,b2,c1]      a3     -      place a                   a
 *  [b2,a2,c1]      b2     a      place b                   ab
 *  [a2,b1,c1]      a2     b      place a                   aba
 *  [a1,b1,c1]      a1     a      CONFLICT -> place b       abab
 *  [a1,c1]         a1     b      place a                   ababa
 *  [c1]            c1     a      place c                   ababac
 *
 *  Result: "ababac"  (any valid answer is accepted)
 *
 * ---------------------------------------------------------------------
 * STEP 7: EDGE CASES
 * ---------------------------------------------------------------------
 *  - Single character "a"        -> "a"   (ceil(1/2) = 1, allowed)
 *  - All same "aaa"              -> ""    (3 > ceil(3/2) = 2)
 *  - Odd length, max = ceil      -> "aab" -> "aba"  (floor would fail)
 *  - All distinct "abc"          -> any order works
 *
 * ---------------------------------------------------------------------
 * STEP 8: COMPLEXITY
 * ---------------------------------------------------------------------
 *  - k = number of distinct characters (at most 26 for lowercase).
 *  - Time:  O(n log k), since n placements each do heap ops on <= k items.
 *           With k <= 26 this is effectively O(n).
 *  - Space: O(k) for freq map + heap, O(n) for the result array.
 *
 * ---------------------------------------------------------------------
 * STEP 9: ALTERNATIVE APPROACH (worth knowing, O(n), no heap)
 * ---------------------------------------------------------------------
 *  - After the same feasibility check:
 *      1. Put the MOST frequent character at indices 0, 2, 4, ...
 *      2. Continue filling the remaining characters at the next even
 *         index; when you run past the end, wrap to indices 1, 3, 5, ...
 *  - Works because the most frequent char is placed first and can't
 *    collide with itself; every other char has count <= it, so its
 *    copies never land next to each other either.
 *  - Faster and simpler, but the heap version shows the general
 *    "greedy + priority queue" pattern that transfers to other problems.
 *
 * ---------------------------------------------------------------------
 * QUICK REVISION CHECKLIST
 * ---------------------------------------------------------------------
 *  [ ] Count frequencies.
 *  [ ] Impossible if maxFreq > ceil(n/2). Use ceil, NOT floor.
 *  [ ] Greedy: always place the most frequent remaining char.
 *  [ ] Conflict with last char -> place the 2nd most frequent, push the
 *      1st back unchanged.
 *  [ ] Max-heap of [count, char]; re-enqueue only if count > 0.
 *
 *  SIMILAR PROBLEMS (same pattern):
 *  - #621  Task Scheduler
 *  - #358  Rearrange String k Distance Apart
 *  - #1054 Distant Barcodes
 *  - #984  String Without AAA or BBB
 * =====================================================================
 */

//? Code:
var reorganizeString = function (s) {
  let n = s.length;
  let freq = {}; // character -> number of occurrences
  let maxFreq = 0; // highest frequency of any single character

  // Count each character's frequency and track the maximum.
  for (let char of s) {
    freq[char] = (freq[char] || 0) + 1;
    maxFreq = Math.max(maxFreq, freq[char]);
  }

  // Feasibility check: a character can fill at most every other slot
  // (indices 0, 2, 4, ...), which is ceil(n / 2) positions. If any
  // character appears more often than that, two copies must end up adjacent.
  if (maxFreq > Math.ceil(n / 2)) {
    return "";
  }

  // Max-heap of [count, char] pairs, ordered by count (pair[0]).
  let pq = new MaxPriorityQueue((pair) => pair[0]);
  for (let key in freq) {
    pq.enqueue([freq[key], key]);
  }

  let res = []; // built-up result, one character at a time

  while (!pq.isEmpty()) {
    // Take the character with the highest remaining count.
    let p = pq.dequeue();

    if (res.length === 0 || res[res.length - 1] !== p[1]) {
      // Safe to place: it differs from the last character in the result.
      res.push(p[1]);

      // Use up one occurrence; put it back if any remain.
      p[0]--;
      if (p[0] > 0) {
        pq.enqueue(p);
      }
    } else {
      // The most frequent character matches the last one placed,
      // so it can't go here. Fall back to the next most frequent.
      if (pq.size() === 0) {
        // No other character is available. This can't happen after
        // the feasibility check above, but it's a safe fallback.
        return "";
      } else {
        let p2 = pq.dequeue();

        // Place the second most frequent character instead.
        res.push(p2[1]);

        // Return the skipped character to the heap unchanged;
        // it can be placed on the next iteration.
        pq.enqueue(p);

        // Use up one occurrence of the placed character;
        // put it back if any remain.
        p2[0]--;
        if (p2[0] > 0) {
          pq.enqueue(p2);
        }
      }
    }
  }

  return res.join("");
};

//? Time Complexity: O(n log n)
// O(n) for calculating frequencies
// O(n log n) for traversing keys and inserting them in priority queue.
// O(n) for filling out the result array.
// O(n) + O(n log n) + O(n) => O(n log n)

//? Space Complexity: O(n)
// Where n is the unique elements in the input array, which we store as key in frequency map as well as priority queue.
