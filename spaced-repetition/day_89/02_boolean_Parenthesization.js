//? Boolean Parenthesization (gfg)

// You are given a boolean expression s containing
//     'T' ---> true
//     'F' ---> false
// and following operators between symbols
//    &   ---> boolean AND
//     |   ---> boolean OR
//    ^   ---> boolean XOR
// Count the number of ways we can parenthesize the expression so that the value of expression evaluates to true.

// Note: The answer is guaranteed to fit within a 32-bit integer.

//? Examples:

// Input: s = "T|T&F^T"
// Output: 4
// Explaination: The expression evaluates to true in 4 ways: ((T|T)&(F^T)), (T|(T&(F^T))), (((T|T)&F)^T) and (T|((T&F)^T)).

// Input: s = "T^F|F"
// Output: 2
// Explaination: The expression evaluates to true in 2 ways: ((T^F)|F) and (T^(F|F)).

//? Constraints:
// 1 ≤ |s| ≤ 100

//? Thought Process:
// Boolean Parenthesization — MCM Pattern
// 1. Why is this an MCM pattern?

// MCM = Matrix Chain Multiplication, but the important idea is not matrices. The pattern is:

// Pick a partition point k, solve the left part and right part, then combine them.

// Here, the expression looks like:

// T | F & T ^ F

// Every operator can become a partition point:

// Left expression  |  Right expression
//       ↑                ↑
//    i...k-1          k+1...j

// So for every operator k, we ask:

// "How many ways can the left and right expressions evaluate, and how can I combine them using this operator?"

// That's exactly the MCM / partition DP pattern.

// 2. Why do we need isTrue?

// The same expression can have two different answers:

// solve(i, j, true)

// means:

// Number of ways to parenthesize s[i...j] so that it becomes True.

// And:

// solve(i, j, false)

// means:

// Number of ways to parenthesize s[i...j] so that it becomes False.

// We need both because an expression's result depends on the results of its two children.

// For example, with &:

// T & T = T
// T & F = F
// F & T = F
// F & F = F

// So if we want the final result to be True, we need:

// Left = T AND Right = T

// But if we want False, we need the other three combinations.

// Therefore, isTrue is an essential DP state.

// 3. Why calculate LT, LF, RT, RF?

// Suppose operator is &:

// Left & Right

// To know how many ways produce the desired result, we need to know:

// LT = ways Left becomes True
// LF = ways Left becomes False

// RT = ways Right becomes True
// RF = ways Right becomes False

// For example, to make:

// Left & Right = False

// possible combinations are:

// T & F
// F & T
// F & F

// Therefore:

// ways = LT * RF
//      + LF * RT
//      + LF * RF

// That's why even when we want True, we may need LF and RF.

// For &:

// True  → LT * RT

// False → LT * RF + LF * RT + LF * RF

// For |:

// True  → LT * RF + LF * RT + LT * RT

// False → LF * RF

// For ^:

// True  → LT * RF + LF * RT

// False → LT * RT + LF * RF

// 4. Why multiplication?

// Suppose:

// Left has 3 ways to become True
// Right has 4 ways to become True

// Then:

// Left T + Right T

// can be combined in:

// 3 * 4 = 12 ways

// Every left way can pair with every right way.

// That's why we multiply.

// 5. Why is DP/memoization important?

// The same subexpression is calculated again and again.

// For example:

// solve(0, 2, true)
// solve(0, 2, false)

// may be needed from multiple different partition points.

// Without DP, recursion keeps recalculating the same subproblems.

// Your:

// let map = new Map();

// stores:

// (i, j, isTrue) → answer

// So once we calculate:

// solve(i, j, true)

// we reuse it instead of calculating it again.

// Therefore:

// Recursion gives the solution structure; memoization removes repeated work.

// 6. Easy revision formula

// Remember Boolean Parenthesization as:

// 1. Choose operator k → MCM partition
// 2. Solve left:  T and F
// 3. Solve right: T and F
// 4. Combine according to operator
// 5. `isTrue` tells what result we want
// 6. Memoize `(i, j, isTrue)`

// One-line intuition

// "Try every operator as a partition, find True/False ways on both sides, combine them according to the operator, and memoize each (i, j, isTrue) state."

//? Code:
class Solution {
  countWays(s) {
    let n = s.length;
    let map = new Map();

    const calculateWays = (operator, isTrue, LT, LF, RT, RF) => {
      if (operator == "&") {
        if (isTrue == true) {
          return LT * RT;
        } else {
          return LT * RF + LF * RT + LF * RF;
        }
      } else if (operator == "|") {
        if (isTrue == true) {
          return LT * RF + LF * RT + LT * RT;
        } else {
          return LF * RF;
        }
      } else if (operator == "^") {
        if (isTrue == true) {
          return LT * RF + LF * RT;
        } else {
          return LT * RT + LF * RF;
        }
      }
    };

    const solve = (i, j, isTrue) => {
      // * Base Case
      if (i > j) {
        return 0;
      }
      if (i == j) {
        if (isTrue == true) {
          if (s[i] == "T") {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (s[i] == "F") {
            return 1;
          } else {
            return 0;
          }
        }
      }

      let key = i + "_" + j + "_" + isTrue;

      if (map.has(key)) {
        return map.get(key);
      }
      // * K loop Scheme
      let ans = 0;
      for (let k = i + 1; k < j; k = k + 2) {
        let LT = solve(i, k - 1, true);
        let LF = solve(i, k - 1, false);
        let RT = solve(k + 1, j, true);
        let RF = solve(k + 1, j, false);

        const ways = calculateWays(s[k], isTrue, LT, LF, RT, RF);
        ans = ans + ways;
      }
      map.set(key, ans);
      return ans;
    };

    return solve(0, n - 1, true);
  }
}

//? States:
// O(n^2) for i, j, isTrue = true
// O(n^2) for , j, isTrue = false
// So, O(2n^2), constant is ignored, O(n^2).

//? Time Complexity: O(n³)
// There are O(n²) memoized states: (i, j, isTrue).
// For each state, the k-loop can iterate over O(n) operators.
// Each solve() call is O(1) after memoization.
// Therefore: O(n²) × O(n) = O(n³).

//? Space Complexity: O(n²)
// The Map stores O(n²) states: (i, j, isTrue).
// Recursion stack uses O(n).
// Therefore: O(n²) + O(n) = O(n²).
