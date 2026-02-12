//? LeetCode #135
//? Candy

// There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

// You are giving candies to these children subjected to the following requirements:

// Each child must have at least one candy.
// Children with a higher rating get more candies than their neighbors.
// Return the minimum number of candies you need to have to distribute the candies to the children.

//? Example 1:
// Input: ratings = [1,0,2]
// Output: 5
// Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

//? Example 2:
// Input: ratings = [1,2,2]
// Output: 4
// Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
// The third child gets 1 candy because it satisfies the above two conditions.

//? Approach 01:
// Left-to-right pass → If a child has a higher rating than the left neighbor, give them more candies than the neighbor.
// Right-to-left pass → If a child has a higher rating than the right neighbor, give them more candies than the neighbor.
// Final answer → For each child, take the maximum candies required from both passes and sum them up.

//? Code:
var candy = function (arr) {
  let n = arr.length;
  let ltr = Array(n).fill(1);

  // Left to Right
  for (let i = 1; i < n; i++) {
    if (arr[i] > arr[i - 1]) {
      ltr[i] = ltr[i - 1] + 1;
    }
  }

  // Right to Left
  let rtl = Array(n).fill(1);
  for (let i = n - 2; i >= 0; i--) {
    if (arr[i] > arr[i + 1]) {
      rtl[i] = rtl[i + 1] + 1;
    }
  }

  // Sum max candies from both directions
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += Math.max(ltr[i], rtl[i]);
  }

  return ans;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)

//? Approach 02:
// Every child must get at least 1 candy → start with ans = n.
// Traverse the ratings array and look for increasing and decreasing slopes.
// Increasing slope (up): When arr[i] > arr[i-1], keep incrementing up. Add candies accordingly.
// Decreasing slope (down): When arr[i] < arr[i-1], keep incrementing down. Add candies accordingly.
// To avoid double-counting the peak (where up and down meet), subtract Math.min(up, down).
// Continue until the end and return ans.

var candy = function (arr) {
  let n = arr.length;
  let ans = n;
  let i = 1;

  while (i < n) {
    if (arr[i] === arr[i - 1]) {
      ++i;
      continue;
    }
    let up = 0;
    while (i < n && arr[i] > arr[i - 1]) {
      ++up;
      ans = ans + up;
      ++i;
    }
    let down = 0;
    while (i < n && arr[i] < arr[i - 1]) {
      ++down;
      ans += down;
      ++i;
    }
    ans = ans - Math.min(up, down);
  }
  return ans;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
