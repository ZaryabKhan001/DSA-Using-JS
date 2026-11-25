//? CHECK ODD OR EVEN USING BIT 0

//? 1. THE PROBLEM
// We have a number x. We want to know if it is ODD or EVEN.

// The normal way uses % (remainder):
//   x % 2 === 0  -> even
//   x % 2 !== 0  -> odd

// With bits, we only need to look at ONE bit: bit 0 (the rightmost bit).

//? 2. WHY ONLY BIT 0?
// Every bit i has the value 2^i.

//   Bit index:  7    6    5    4    3    2    1    0
//   Value:     128   64   32   16   8    4    2    1

// Look at the values: 128, 64, 32, 16, 8, 4, 2 are ALL EVEN.
// Only bit 0 has an ODD value (2^0 = 1).

// A number is the sum of the values of its ON bits.
//   - Even + even is always even.
//   - So bits 1 to 31 can never make a number odd.
//   - Only bit 0 can add 1 and make the number odd.

//* Rule:
//   bit 0 = 0  ->  number is EVEN
//   bit 0 = 1  ->  number is ODD

//* Examples
//   Decimal   Binary     Bit 0   Result
//   0         0000         0     Even
//   1         0001         1     Odd
//   2         0010         0     Even
//   3         0011         1     Odd
//   4         0100         0     Even
//   7         0111         1     Odd
//   10        1010         0     Even
//   13        1101         1     Odd

//   13 = 8 + 4 + 1     -> the "+ 1" comes from bit 0 -> ODD
//   10 = 8 + 2         -> no "+ 1"                   -> EVEN

//? 3. HOW TO GET BIT 0
// To get any bit i, we use:
//   (x >> i) & 1

// For bit 0, i = 0, so we do not need to shift:
//   (x >> 0) & 1  =  x & 1

//* x & 1 keeps ONLY bit 0. All other bits become 0.
// 1 in binary is 0...0001.
// AND with 0 always gives 0, and AND with 1 keeps the bit as it is.
// So only bit 0 survives.

//* Example: 13 & 1
//     13 ->  1 1 0 1
//      1 ->  0 0 0 1
//   ----------------- &
//            0 0 0 1  -> 1 -> ODD

//* Example: 10 & 1
//     10 ->  1 0 1 0
//      1 ->  0 0 0 1
//   ----------------- &
//            0 0 0 0  -> 0 -> EVEN

//* So x & 1 always gives 0 or 1:
//   (x & 1) === 0  -> EVEN
//   (x & 1) === 1  -> ODD

//? 4. CODE
const getBit = (x, i) => (x >> i) & 1;

const isEven = (x) => (x & 1) === 0;
const isOdd = (x) => (x & 1) === 1;

// Same thing using getBit with i = 0:
const isOddUsingGetBit = (x) => getBit(x, 0) === 1;

console.log("13 & 1 =", 13 & 1); // 1
console.log("10 & 1 =", 10 & 1); // 0

console.log("Is 13 odd?", isOdd(13)); // true
console.log("Is 10 even?", isEven(10)); // true
console.log("Is 7 odd (getBit)?", isOddUsingGetBit(7)); // true

//? 5. DRY RUN FOR 0 TO 9
const toBin = (num) => num.toString(2).padStart(4, "0");

for (let n = 0; n < 10; n++) {
  console.log(n, "->", toBin(n), "-> bit 0 =", n & 1, "->", isOdd(n) ? "Odd" : "Even");
}
// 0 -> 0000 -> bit 0 = 0 -> Even
// 1 -> 0001 -> bit 0 = 1 -> Odd
// 2 -> 0010 -> bit 0 = 0 -> Even
// 3 -> 0011 -> bit 0 = 1 -> Odd
// 4 -> 0100 -> bit 0 = 0 -> Even
// 5 -> 0101 -> bit 0 = 1 -> Odd
// 6 -> 0110 -> bit 0 = 0 -> Even
// 7 -> 0111 -> bit 0 = 1 -> Odd
// 8 -> 1000 -> bit 0 = 0 -> Even
// 9 -> 1001 -> bit 0 = 1 -> Odd

//? 6. WHAT ABOUT NEGATIVE NUMBERS?
// Computers save negative numbers in a special way (Two's Complement).
// But bit 0 still gives the correct answer:
//   -3 -> ...11111101 -> bit 0 = 1 -> ODD
//   -4 -> ...11111100 -> bit 0 = 0 -> EVEN

console.log("-3 & 1 =", -3 & 1); // 1 -> Odd
console.log("-4 & 1 =", -4 & 1); // 0 -> Even

//* Be careful with % and negative numbers:
//   -3 % 2 = -1   (not 1!)
// So "x % 2 === 1" gives the WRONG answer for negative odd numbers.
// "x & 1" does not have this problem.
console.log("-3 % 2 =", -3 % 2); // -1
console.log("-3 % 2 === 1 ?", -3 % 2 === 1); // false  (wrong answer)
console.log("(-3 & 1) === 1 ?", (-3 & 1) === 1); // true   (correct)

//* Brackets mistake
// In JavaScript, === runs BEFORE &.
//   x & 1 === 0   is read as   x & (1 === 0)   ->   x & false   ->   0
// So always put brackets: (x & 1) === 0
console.log("Without brackets, 4 & 1 === 0 ->", 4 & 1 === 0); // 0 (wrong)
console.log("With brackets, (4 & 1) === 0 ->", (4 & 1) === 0); // true

//? 7. BIG NUMBERS IN JAVASCRIPT
// Bit operations in JavaScript use only the LAST 32 bits of a number.
// The higher bits are thrown away.
// But bit 0 is always kept, so x & 1 still gives the correct answer
// even for numbers bigger than 2^31 - 1.
const big = 2 ** 53 - 1; // 9007199254740991 (odd, biggest safe number)
console.log("Big number & 1:", big & 1); // 1 -> Odd (still correct)

//* But other bit operations on such numbers WILL give wrong answers,
// because the higher bits are lost:
console.log("big >> 1 =", big >> 1); // -1 (wrong, real answer is 4503599627370495)

//* After 2^53, a normal number cannot even be saved correctly.
// Use BigInt for those numbers:
const huge = 2n ** 64n + 1n;
console.log("huge is", (huge & 1n) === 1n ? "Odd" : "Even"); // Odd

//? 8. TIME AND SPACE
// Time:  O(1) -> only one AND operation.
// Space: O(1)

//? 9. KEY TAKEAWAYS
// 1. All bits except bit 0 have even values, so only bit 0 decides odd or even.
// 2. Get bit 0 with x & 1 (same as (x >> 0) & 1).
// 3. (x & 1) === 1 -> odd, (x & 1) === 0 -> even. Always use the brackets.
// 4. It works for negative numbers too. x % 2 === 1 does not.
// 5. x & 1 is correct for any safe number. Use BigInt after 2^53.
