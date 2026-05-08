//? LeetCode #231

//?  Power Of Two

function isPowerOfTwo(n) {
  //* base case
  if (n === 1) return true;
  else if (n < 1 || n & 1) return false;
  //* recursive case
  else return isPowerOfTwo(n / 2);
}
console.log(isPowerOfTwo(16));

//? Time Complexity: O(log n)
//? Space Complexity: O(log n)  Recursive Stack
