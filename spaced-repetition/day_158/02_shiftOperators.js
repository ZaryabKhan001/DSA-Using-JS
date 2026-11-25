//? SHIFT OPERATORS (LEFT SHIFT, RIGHT SHIFT)

//? 1. WHAT IS SHIFTING?
// Shifting means MOVING all the bits of a number to the left or to the right.

// Think of the bits as people sitting on a bench.
// When everyone moves one seat to the left:
//   - The person at the left end falls off the bench.
//   - A new empty seat (0) comes on the right end.

//   Operator               Symbol   What it does
//   Left Shift             <<       Moves bits LEFT, puts 0s on the right
//   Right Shift (signed)   >>       Moves bits RIGHT, keeps the sign (+ or -)
//   Right Shift (unsigned) >>>      Moves bits RIGHT, puts 0s on the left

//* How to write:  number << k   ->  move the bits of number by k places.

//? 2. LEFT SHIFT (<<)
// Every bit moves k places to the LEFT.
// The empty places on the RIGHT get 0.
// Bits that go past the last place (bit 31) are lost.

//* Example: 5 << 1
//   5       ->  0 0 0 0 0 1 0 1
//   5 << 1  ->  0 0 0 0 1 0 1 0   -> 10
//                             ^ new 0 added on the right

//* Example: 5 << 2
//   5       ->  0 0 0 0 0 1 0 1
//   5 << 2  ->  0 0 0 1 0 1 0 0   -> 20

console.log("5 << 1 =", 5 << 1); // 10
console.log("5 << 2 =", 5 << 2); // 20
console.log("5 << 3 =", 5 << 3); // 40

//* WHY DOES THE NUMBER DOUBLE?
// Bit i has the value 2^i.
// When we shift left by 1, bit i goes to place i + 1.
// So its value becomes 2 times bigger.
// Every bit becomes 2 times bigger, so the whole number becomes 2 times bigger.

//   5 = 4 + 1        = 2^2 + 2^0
//   5 << 1           = 2^3 + 2^1 = 8 + 2 = 10

//* Formula:  x << k  =  x * 2^k

//   x   x << 1   x << 2   x << 3
//   1     2        4        8
//   3     6       12       24
//   5    10       20       40
//   7    14       28       56

//* The most used one: 1 << i
// 1 << i gives a number where ONLY bit i is ON. We call it a MASK.
//   1 << 0 -> 0001 (1)
//   1 << 1 -> 0010 (2)
//   1 << 2 -> 0100 (4)
//   1 << 3 -> 1000 (8)

for (let i = 0; i < 4; i++) {
  console.log(`1 << ${i} =`, (1 << i).toString(2).padStart(4, "0"), "->", 1 << i);
}

//* 1 << n is also 2^n. This is the total number of subsets of n items.
console.log("Subsets of 3 items:", 1 << 3); // 8

//* BE CAREFUL: Overflow in JavaScript
// Bit operations in JavaScript use only 32 bits.
// The leftmost bit (bit 31) is the SIGN bit. If it is 1, the number is NEGATIVE.
// So if a 1 reaches bit 31, the number becomes negative.
// Bits that go past bit 31 are lost.
console.log("1 << 30 =", 1 << 30); // 1073741824
console.log("1 << 31 =", 1 << 31); // -2147483648 (sign bit is now 1)
console.log("1 << 32 =", 1 << 32); // 1 (32 is treated as 0, so nothing moves)

//* For big powers of 2, use 2 ** k or BigInt:
console.log("2 ** 40 =", 2 ** 40); // 1099511627776
console.log("1n << 40n =", 1n << 40n); // 1099511627776n

//? 3. RIGHT SHIFT (>>) - KEEPS THE SIGN
// Every bit moves k places to the RIGHT.
// The last k bits on the right fall off and are LOST.
// The empty places on the LEFT get a copy of the sign bit:
//   positive number -> 0 is added
//   negative number -> 1 is added   (so the number stays negative)

//* Example: 20 >> 1
//   20       ->  0 0 0 1 0 1 0 0
//   20 >> 1  ->  0 0 0 0 1 0 1 0   -> 10
//                                 (last 0 fell off)

//* Example: 13 >> 1
//   13       ->  0 0 0 0 1 1 0 1
//   13 >> 1  ->  0 0 0 0 0 1 1 0   -> 6
//                                 (last 1 fell off, so the remainder is gone)

console.log("20 >> 1 =", 20 >> 1); // 10
console.log("20 >> 2 =", 20 >> 2); // 5
console.log("13 >> 1 =", 13 >> 1); // 6

//* WHY DOES THE NUMBER BECOME HALF?
// When we shift right by 1, bit i goes to place i - 1.
// So its value becomes half.
// Bit 0 has no place to go, so it falls off. That bit was the remainder.

//* Formula:  x >> k  =  Math.floor(x / 2^k)

//   x    x >> 1   x >> 2   x >> 3
//   8      4        2        1
//   13     6        3        1
//   20    10        5        2
//   100   50       25       12

//* Negative numbers stay negative
//   -16 -> 11111111 11111111 11111111 11110000
//   -16 >> 2 -> 11111111 11111111 11111111 11111100 -> -4
console.log("-16 >> 2 =", -16 >> 2); // -4
console.log("-7 >> 1 =", -7 >> 1); // -4  (floor(-3.5) = -4, not -3)

//? 4. UNSIGNED RIGHT SHIFT (>>>)
// Same as >>, but the empty places on the LEFT ALWAYS get 0.
// Even for negative numbers. So the answer is never negative.

//* For positive numbers, >> and >>> give the same answer.
console.log("20 >>> 2 =", 20 >>> 2); // 5

//* For negative numbers, the answers are very different.
//   -16       -> 11111111 11111111 11111111 11110000
//   -16 >>> 2 -> 00111111 11111111 11111111 11111100 -> 1073741820
console.log("-16 >>> 2 =", -16 >>> 2); // 1073741820

//* Useful trick: x >>> 0 shows all 32 bits of a negative number.
console.log("-1 >>> 0 =", -1 >>> 0); // 4294967295 (all 32 bits are 1)
console.log("-5 in binary:", (-5 >>> 0).toString(2));
// 11111111111111111111111111111011

//? 5. LEFT AND RIGHT SHIFT TOGETHER
//   Operation    Bits move   Empty places get   Math
//   x << k       Left        0 on right         x * 2^k
//   x >> k       Right       sign bit on left   floor(x / 2^k)
//   x >>> k      Right       0 on left          divide by 2^k (never negative)

const toBin8 = (num) => (num >>> 0).toString(2).padStart(8, "0").slice(-8);
const num = 12;

console.log("x      =", toBin8(num), "->", num); // 00001100 -> 12
console.log("x << 1 =", toBin8(num << 1), "->", num << 1); // 00011000 -> 24
console.log("x << 2 =", toBin8(num << 2), "->", num << 2); // 00110000 -> 48
console.log("x >> 1 =", toBin8(num >> 1), "->", num >> 1); // 00000110 -> 6
console.log("x >> 2 =", toBin8(num >> 2), "->", num >> 2); // 00000011 -> 3

//? 6. WHERE WE USE SHIFTS IN PROBLEMS

//* 1. Get bit i -> bring bit i to place 0, then AND with 1
const getBit = (x, i) => (x >> i) & 1;
console.log("Bit 2 of 13 (1101):", getBit(13, 2)); // 1
console.log("Bit 1 of 13 (1101):", getBit(13, 1)); // 0

//* 2. Turn bit i ON / OFF / flip it -> make the mask with 1 << i
const setBit = (x, i) => x | (1 << i);
const clearBit = (x, i) => x & ~(1 << i);
const toggleBit = (x, i) => x ^ (1 << i);
console.log("Set bit 1 of 13:", setBit(13, 1).toString(2)); // 1111
console.log("Clear bit 0 of 13:", clearBit(13, 0).toString(2)); // 1100
console.log("Toggle bit 3 of 13:", toggleBit(13, 3).toString(2)); // 101

//* 3. Count ON bits -> check the last bit, then shift right
const countSetBits = (x) => {
  let count = 0;
  while (x > 0) {
    count += x & 1; // add the last bit
    x = x >> 1; // remove the last bit
  }
  return count;
};
console.log("Set bits in 13 (1101):", countSetBits(13)); // 3

//* 4. Print all bits of a number (from left to right)
const printBits = (x, width) => {
  let bits = "";
  for (let i = width - 1; i >= 0; i--) {
    bits += (x >> i) & 1;
  }
  return bits;
};
console.log("13 as 8 bits:", printBits(13, 8)); // 00001101

//* 5. Fast multiply / divide by powers of 2
console.log("7 * 8 =", 7 << 3); // 56
console.log("100 / 4 =", 100 >> 2); // 25

//* 6. Middle index in Binary Search (no decimal part)
const low = 3;
const high = 10;
console.log("mid =", (low + high) >> 1); // 6

//* 7. Make all subsets -> loop mask from 0 to (1 << n) - 1
const items = ["a", "b", "c"];
for (let mask = 0; mask < 1 << items.length; mask++) {
  const subset = items.filter((_, i) => (mask >> i) & 1);
  console.log(printBits(mask, items.length), "->", subset);
}
// 000 -> []
// 001 -> [ 'a' ]
// 010 -> [ 'b' ]
// 011 -> [ 'a', 'b' ]
// 100 -> [ 'c' ]
// 101 -> [ 'a', 'c' ]
// 110 -> [ 'b', 'c' ]
// 111 -> [ 'a', 'b', 'c' ]

//? 7. SHORT NOTES
//   Task                        Code
//   Multiply by 2^k             x << k
//   Divide by 2^k (floor)       x >> k
//   Mask with only bit i ON     1 << i
//   2^n (number of subsets)     1 << n
//   Get bit i                   (x >> i) & 1
//   Turn bit i ON               x | (1 << i)
//   Turn bit i OFF              x & ~(1 << i)
//   Flip bit i                  x ^ (1 << i)
//   See all 32 bits of x        x >>> 0

//? 8. KEY TAKEAWAYS
// 1. Left shift (<<) moves bits left and adds 0s. x << k = x * 2^k.
// 2. Right shift (>>) moves bits right and keeps the sign. x >> k = floor(x / 2^k).
// 3. Unsigned right shift (>>>) always adds 0s on the left.
// 4. 1 << i is the base for checking and changing bit i.
// 5. JavaScript uses 32 bits for shifts:
//    1 << 31 is negative, and 1 << 32 is the same as 1 << 0.
// 6. Use 2 ** k or BigInt when you need more than 31 bits.
