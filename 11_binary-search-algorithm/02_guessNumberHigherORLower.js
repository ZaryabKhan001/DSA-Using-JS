//? LeetCode #374
//? Guess Number Higher or Lower

// We are playing the Guess Game. The game is as follows:

// I pick a number from 1 to n. You have to guess which number I picked (the number I picked stays the same throughout the game).

// Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

// You call a pre-defined API int guess(int num), which returns three possible results:

// -1: Your guess is higher than the number I picked (i.e. num > pick).
// 1: Your guess is lower than the number I picked (i.e. num < pick).
// 0: your guess is equal to the number I picked (i.e. num == pick).
// Return the number that I picked.

//? Example 1:
// Input: n = 10, pick = 6
// Output: 6

//? Example 2:
// Input: n = 1, pick = 1
// Output: 1

//? Example 3:
// Input: n = 2, pick = 1
// Output: 1

//? Approach:
// Initialize two pointers: l = 1 and r = n.
// Use binary search to guess the middle number m.
// If guess(m) returns:
// 0 → m is the correct number.
// -1 → the picked number is smaller → move left.
// 1 → the picked number is larger → move right.
// Repeat until the number is found.
var guessNumber = function (n) {
  let l = 1;
  let r = n;
  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);
    let result = guess(mid);
    if (result === 0) return mid;
    else if (result === -1) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
};

//? Time Complexity: O(logn)
//? Space Complexity: O(1)
