//? BITS AND BITWISE OPERATORS (AND, OR, XOR, NOT)

//? 1. WHAT IS A BIT?
// A BIT is the smallest piece of data in a computer.
// A bit can have only TWO values:
//   0 -> OFF / false / no
//   1 -> ON  / true  / yes

// Everything in a computer (numbers, letters, images) is saved as bits.

//* 8 bits  = 1 byte
//* JavaScript uses 32 bits when we do bit operations.

//? 2. BINARY NUMBERS
// We normally use DECIMAL numbers (base 10).
// Decimal has 10 digits: 0 to 9.
// Every place is a power of 10.
//   345 = 3*(10^2) + 4*(10^1) + 5*(10^0)

// Computers use BINARY numbers (base 2).
// Binary has only 2 digits: 0 and 1.
// Every place is a power of 2.
//   1101 = 1*(2^3) + 1*(2^2) + 0*(2^1) + 1*(2^0)
//        = 8 + 4 + 0 + 1
//        = 13

// Value of each place (from right to left):
//   Bit index:  7    6    5    4    3    2    1    0
//   Value:     128   64   32   16   8    4    2    1

//* Bit 0 is the rightmost bit. It is called LSB (Least Significant Bit).
//* The leftmost bit is called MSB (Most Significant Bit).

//? 3. DECIMAL TO BINARY
// Divide the number by 2 again and again.
// Write the remainder each time.
// Then read the remainders from BOTTOM to TOP.

//   13 / 2 = 6  remainder 1   <- LSB
//    6 / 2 = 3  remainder 0
//    3 / 2 = 1  remainder 1
//    1 / 2 = 0  remainder 1   <- MSB
//   Read from bottom to top: 1101

// Some common numbers:
//   Decimal   Binary
//   0         0000
//   1         0001
//   2         0010
//   3         0011
//   4         0100
//   5         0101
//   6         0110
//   7         0111
//   8         1000
//   15        1111

//* In JavaScript:
console.log((13).toString(2)); // "1101"   decimal -> binary
console.log(parseInt("1101", 2)); // 13    binary -> decimal
console.log(0b1101); // 13                 write a binary number directly

//? 4. WHAT ARE BITWISE OPERATORS?
// Bitwise operators work on numbers BIT BY BIT.
// We write both numbers in binary, one below the other.
// Then we check each column one by one and apply the rule.
// There is no carry like in normal addition.

//   Operator   Symbol   Rule
//   AND        &        1 only if BOTH bits are 1
//   OR         |        1 if ANY ONE bit is 1
//   XOR        ^        1 if the bits are DIFFERENT
//   NOT        ~        Flip every bit (0 -> 1, 1 -> 0)

//* Bitwise (&, |) is NOT the same as logical (&&, ||).
//   Logical checks the whole value as true or false.
//   Bitwise checks every single bit.
//   5 && 3 -> 3        (logical: both are true, so it gives the last one)
//   5 &  3 -> 1        (bitwise: 0101 & 0011 = 0001)

//? 5. AND (&)
// The answer is 1 ONLY when both bits are 1.
// Think: "Two switches. The bulb turns ON only if BOTH switches are ON."

//* Truth Table
//   A   B   A & B
//   0   0     0
//   0   1     0
//   1   0     0
//   1   1     1

//* Example: 12 & 10
//     12 ->  1 1 0 0
//     10 ->  1 0 1 0
//   ----------------- &
//            1 0 0 0  -> 8

console.log("12 & 10 =", 12 & 10); // 8

//* Rules to remember
//   x & 0 = 0          (AND with 0 always gives 0)
//   x & x = x
//   x & 1 -> gives the last bit of x (1 = odd, 0 = even)

//* Where we use it
// 1. Check odd or even
const isOdd = (x) => (x & 1) === 1;
console.log("7 is odd?", isOdd(7)); // true
console.log("8 is odd?", isOdd(8)); // false

// 2. Check if bit i is ON
const isBitSet = (x, i) => (x & (1 << i)) !== 0;
console.log("Is bit 2 of 13 (1101) set?", isBitSet(13, 2)); // true

// 3. Check power of two -> a power of two has only ONE bit ON.
//    x & (x - 1) removes the last ON bit, so the answer becomes 0.
//      8     -> 1000
//      8 - 1 -> 0111
//      &     -> 0000
const isPowerOfTwo = (x) => x > 0 && (x & (x - 1)) === 0;
console.log("Is 16 a power of 2?", isPowerOfTwo(16)); // true
console.log("Is 18 a power of 2?", isPowerOfTwo(18)); // false

//? 6. OR (|)
// The answer is 1 if ANY ONE of the bits is 1.
// Think: "Two switches. The bulb turns ON if ANY switch is ON."

//* Truth Table
//   A   B   A | B
//   0   0     0
//   0   1     1
//   1   0     1
//   1   1     1

//* Example: 12 | 10
//     12 ->  1 1 0 0
//     10 ->  1 0 1 0
//   ----------------- |
//            1 1 1 0  -> 14

console.log("12 | 10 =", 12 | 10); // 14

//* Rules to remember
//   x | 0 = x          (OR with 0 does not change anything)
//   x | x = x

//* Where we use it
// 1. Turn bit i ON
const setBit = (x, i) => x | (1 << i);
console.log("Set bit 1 of 8 (1000):", setBit(8, 1).toString(2)); // 1010

// 2. Join many flags / permissions in one number
const READ = 0b001; // 1
const WRITE = 0b010; // 2
const EXECUTE = 0b100; // 4

const permissions = READ | WRITE; // 011
console.log("Permissions:", permissions.toString(2)); // 11
console.log("Can write?", (permissions & WRITE) !== 0); // true
console.log("Can execute?", (permissions & EXECUTE) !== 0); // false

//? 7. XOR (^)
// The answer is 1 if the bits are DIFFERENT.
// The answer is 0 if the bits are the SAME.
// Think: "A stair light with two switches (one up, one down).
//         Pressing any one switch changes the light."

//* Truth Table
//   A   B   A ^ B
//   0   0     0
//   0   1     1
//   1   0     1
//   1   1     0

//* Example: 12 ^ 10
//     12 ->  1 1 0 0
//     10 ->  1 0 1 0
//   ----------------- ^
//            0 1 1 0  -> 6

console.log("12 ^ 10 =", 12 ^ 10); // 6

//* Very important rules (used in MANY interview problems)
//   x ^ 0 = x          (XOR with 0 does not change anything)
//   x ^ x = 0          (same number cancels itself)
//   a ^ b = b ^ a      (order does not matter)
//   (a ^ b) ^ c = a ^ (b ^ c)   (brackets do not matter)

//* Where we use it
// 1. Flip bit i (ON -> OFF, OFF -> ON)
const toggleBit = (x, i) => x ^ (1 << i);
console.log("Toggle bit 0 of 5 (101):", toggleBit(5, 0).toString(2)); // 100

// 2. Find the single number (all other numbers come two times)
//    Same numbers cancel each other (x ^ x = 0). Only the single one is left.
//    4 ^ 1 ^ 2 ^ 1 ^ 2 = 4 ^ (1 ^ 1) ^ (2 ^ 2) = 4 ^ 0 ^ 0 = 4
const singleNumber = (nums) => nums.reduce((acc, num) => acc ^ num, 0);
console.log("Single number in [4,1,2,1,2]:", singleNumber([4, 1, 2, 1, 2])); // 4

// 3. Swap two numbers without a third variable
let a = 5; // 101
let b = 9; // 1001
a = a ^ b; // a = 5 ^ 9
b = a ^ b; // b = (5 ^ 9) ^ 9 = 5
a = a ^ b; // a = (5 ^ 9) ^ 5 = 9
console.log("After swap: a =", a, "b =", b); // a = 9 b = 5

// 4. Check if two numbers have different signs (one + and one -)
//    The leftmost bit is 1 for negative numbers.
//    If signs are different, XOR makes that bit 1, so the answer is negative.
const oppositeSigns = (x, y) => (x ^ y) < 0;
console.log("5 and -3 opposite signs?", oppositeSigns(5, -3)); // true

//? 8. NOT (~)
// NOT works on only ONE number.
// It flips every bit: 0 becomes 1, and 1 becomes 0.

//* Truth Table
//   A   ~A
//   0    1
//   1    0

//* Simple example with 4 bits: ~5
//      5 ->  0 1 0 1
//   ----------------- ~
//            1 0 1 0  -> 10 (only if we had 4 bits and no negative numbers)

//* But JavaScript uses 32 bits, and numbers can be negative.
// So ALL 32 bits get flipped, even the 0s on the left.
// The leftmost bit becomes 1, and leftmost bit 1 means NEGATIVE.

//   5  -> 00000000 00000000 00000000 00000101
//   ~5 -> 11111111 11111111 11111111 11111010  -> -6

//* Easy formula:  ~x = -(x + 1)
console.log("~5 =", ~5); // -6
console.log("~0 =", ~0); // -1
console.log("~-1 =", ~-1); // 0

//* Why? Because of Two's Complement.
// Two's Complement is the way computers save negative numbers:
//   -x = ~x + 1
// Move things around and we get: ~x = -x - 1 = -(x + 1)

//* Where we use it
// 1. Turn bit i OFF
//    ~(1 << i) makes a number where every bit is ON except bit i.
//      1 << 2     -> 0100
//      ~(1 << 2)  -> 1011
//      13 (1101) & 1011 = 1001 -> 9
const clearBit = (x, i) => x & ~(1 << i);
console.log("Clear bit 2 of 13 (1101):", clearBit(13, 2).toString(2)); // 1001

// 2. Double NOT (~~) removes the decimal part (works like Math.trunc for small numbers)
console.log("~~4.7 =", ~~4.7); // 4
console.log("~~-4.7 =", ~~-4.7); // -4

//? 9. ALL OPERATORS TOGETHER
//   A   B   A & B   A | B   A ^ B   ~A
//   0   0     0       0       0      1
//   0   1     0       1       1      1
//   1   0     0       1       1      0
//   1   1     1       1       0      0

// Using a = 12 (1100) and b = 10 (1010):
const x = 12;
const y = 10;
const toBin = (num) => (num >>> 0).toString(2).padStart(4, "0");

console.log("a      =", toBin(x), "->", x); // 1100 -> 12
console.log("b      =", toBin(y), "->", y); // 1010 -> 10
console.log("a & b  =", toBin(x & y), "->", x & y); // 1000 -> 8
console.log("a | b  =", toBin(x | y), "->", x | y); // 1110 -> 14
console.log("a ^ b  =", toBin(x ^ y), "->", x ^ y); // 0110 -> 6
console.log("~a     =", ~x); // -13

//? 10. SHORT NOTES
//   Task                       Code
//   Check if x is odd          (x & 1) === 1
//   Check bit i                (x & (1 << i)) !== 0
//   Turn bit i ON              x | (1 << i)
//   Turn bit i OFF             x & ~(1 << i)
//   Flip bit i                 x ^ (1 << i)
//   Remove last ON bit         x & (x - 1)
//   Check power of two         x > 0 && (x & (x - 1)) === 0
//   Find the single number     XOR all numbers together

//? 11. KEY TAKEAWAYS
// 1. A bit is just 0 or 1. Every number is saved as bits.
// 2. Bit index starts from 0 on the RIGHT side. Bit i has value 2^i.
// 3. AND (&) -> 1 only if both are 1. Used to CHECK a bit or turn it OFF.
// 4. OR  (|) -> 1 if any one is 1. Used to turn a bit ON and join flags.
// 5. XOR (^) -> 1 if different. Used to FLIP a bit and cancel pairs.
// 6. NOT (~) -> flips all bits. In JavaScript, ~x = -(x + 1).
// 7. All of these take O(1) time.
