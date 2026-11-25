//? n & (n - 1) -> REMOVE THE RIGHTMOST SET BIT

//? 1. WHAT DOES IT DO?
// A SET BIT means a bit that is 1.
// The RIGHTMOST SET BIT is the first 1 we see when we read from the right side.

//   n = 12 -> 1 1 0 0
//                ^ rightmost set bit (bit 2)

//* n & (n - 1) turns OFF the rightmost set bit.
//* All other bits stay the same.

//   n           = 12 -> 1 1 0 0
//   n & (n - 1) =  8 -> 1 0 0 0
//                         ^ this 1 is removed

//* If we do it again and again, the 1s are removed one by one
// from right to left, until the number becomes 0.

//   12 -> 1100
//    8 -> 1000   (bit 2 removed)
//    0 -> 0000   (bit 3 removed)

//? 2. WHY DOES IT WORK? (What happens when we do n - 1)
// Subtracting 1 in binary works like borrowing in decimal.

// In decimal: 1000 - 1 = 0999
//   The rightmost non-zero digit goes down by 1.
//   All the 0s on its right become 9 (the biggest digit).

// In binary it is the same idea:
//   The rightmost 1 becomes 0.
//   All the 0s on its right become 1 (the biggest binary digit).
//   Everything on the LEFT of that 1 stays the SAME.

//* Example: n = 12
//   n     = 1 1 0 0
//   n - 1 = 1 0 1 1
//             ^ ^ ^
//             | these 0s became 1
//             rightmost 1 became 0

// So n and n - 1 always look like this:
//   [same left part] 1 0 0 ... 0     <- n
//   [same left part] 0 1 1 ... 1     <- n - 1

//* Now do AND, column by column:
//   Left part:          same & same  -> stays the same
//   Rightmost set bit:  1 & 0        -> 0   (removed)
//   Bits on its right:  0 & 1        -> 0   (stay 0)

//     n     = 1 1 0 0
//     n - 1 = 1 0 1 1
//   ------------------ &
//             1 0 0 0  -> 8

//* Only the rightmost set bit is turned off. Nothing else changes.

//? 3. MORE EXAMPLES
//   n    n (bin)   n - 1 (bin)   n & (n - 1)   Result
//   1    0001      0000          0000          0
//   6    0110      0101          0100          4
//   7    0111      0110          0110          6
//   10   1010      1001          1000          8
//   12   1100      1011          1000          8
//   16   10000     01111         00000         0

const toBin = (num, width = 4) => num.toString(2).padStart(width, "0");

for (const n of [1, 6, 7, 10, 12, 16]) {
  console.log(
    `n = ${n}`.padEnd(7),
    toBin(n, 5),
    "&",
    toBin(n - 1, 5),
    "=",
    toBin(n & (n - 1), 5),
    "->",
    n & (n - 1)
  );
}

//? 4. DRY RUN: 1s REMOVED ONE BY ONE
// n = 45 -> 101101 (four 1s)

//   Step   n     Binary    n & (n - 1)
//   1      45    101101    101100 (44)
//   2      44    101100    101000 (40)
//   3      40    101000    100000 (32)
//   4      32    100000    000000 (0)

// It took 4 steps, and 45 has 4 set bits.

let n = 45;
let step = 1;
while (n !== 0) {
  const next = n & (n - 1);
  console.log(`Step ${step}:`, toBin(n, 6), "->", toBin(next, 6));
  n = next;
  step++;
}

//? 5. USE 1: COUNT SET BITS (Brian Kernighan's Algorithm)
// Every n & (n - 1) removes exactly ONE set bit.
// So we count how many times we can do it before the number becomes 0.
// That count is the number of set bits.

const countSetBits = (num) => {
  let count = 0;
  while (num !== 0) {
    num = num & (num - 1); // remove the rightmost set bit
    count++;
  }
  return count;
};

console.log("Set bits in 45 (101101):", countSetBits(45)); // 4
console.log("Set bits in 7 (111):", countSetBits(7)); // 3
console.log("Set bits in 16 (10000):", countSetBits(16)); // 1

//* Why is this better than checking every bit?
//   Normal way:  check every bit with (num & 1) and num >> 1.
//                The loop runs once for EVERY bit -> up to 32 times.
//   Kernighan:   the loop runs once for every SET bit only.
//   For 16 (10000): normal way loops 5 times, Kernighan loops only 1 time.

//? 6. USE 2: CHECK POWER OF TWO
// A power of two has ONLY ONE set bit.
//   1 -> 00001
//   2 -> 00010
//   4 -> 00100
//   8 -> 01000
//   16 -> 10000

// If we remove that one set bit, nothing is left, so the answer is 0.
//   n & (n - 1) === 0  ->  n had only one set bit  ->  power of two

//* n must be bigger than 0.
// 0 & (0 - 1) is also 0, but 0 is not a power of two.

const isPowerOfTwo = (num) => num > 0 && (num & (num - 1)) === 0;

console.log("Is 16 a power of 2?", isPowerOfTwo(16)); // true
console.log("Is 12 a power of 2?", isPowerOfTwo(12)); // false
console.log("Is 1 a power of 2?", isPowerOfTwo(1)); // true  (2^0 = 1)
console.log("Is 0 a power of 2?", isPowerOfTwo(0)); // false

//? 7. USE 3: CHECK POWER OF FOUR
// A power of four is a power of two, but its one set bit is at an EVEN index.
//   1  -> 0000001  (bit 0)
//   4  -> 0000100  (bit 2)
//   16 -> 0010000  (bit 4)
//   64 -> 1000000  (bit 6)

// 0x55555555 = 0101 0101 ... 0101 -> it has 1s only at even places.
// So (num & 0x55555555) !== 0 means the set bit is at an even place.

const isPowerOfFour = (num) => num > 0 && (num & (num - 1)) === 0 && (num & 0x55555555) !== 0;

console.log("Is 16 a power of 4?", isPowerOfFour(16)); // true
console.log("Is 8 a power of 4?", isPowerOfFour(8)); // false (bit 3 is odd)

//? 8. BONUS: KEEP ONLY THE RIGHTMOST SET BIT
// n & (n - 1) REMOVES the rightmost set bit.
// If we want to KEEP only that bit, we have two ways:

//* Way 1: n - (n & (n - 1))
//   12 - 8 = 4 -> 0100

//* Way 2: n & -n
// -n flips all bits of n and adds 1 (this is how negatives are saved).
// After that, n and -n have only ONE 1 in the same place: the rightmost set bit.
//   n      = 0000 1100
//   -n     = 1111 0100
//   n & -n = 0000 0100 -> 4

console.log("Rightmost set bit of 12:", 12 - (12 & 11)); // 4
console.log("Rightmost set bit of 12:", 12 & -12); // 4

//? 9. SPECIAL CASES
//* n = 0: there is no set bit to remove. 0 & -1 = 0.
console.log("0 & (0 - 1) =", 0 & (0 - 1)); // 0

//* Negative numbers: it still works on the 32 bits.
// -1 has all 32 bits ON, so the loop runs 32 times.
console.log("Set bits in -1:", countSetBits(-1)); // 32

//? 10. TIME AND SPACE
// One n & (n - 1):     O(1)
// Count set bits:      O(k), where k = number of set bits
// Space:               O(1)

//? 11. KEY TAKEAWAYS
// 1. n - 1 changes the rightmost 1 to 0, and all 0s on its right to 1.
// 2. n & (n - 1) turns OFF the rightmost set bit. Other bits stay the same.
// 3. Do it again and again, and the 1s go away one by one until n is 0.
// 4. Count set bits: count how many times you can do it (Brian Kernighan).
// 5. Power of two: n > 0 && (n & (n - 1)) === 0.
// 6. To KEEP only the rightmost set bit, use n & -n.
