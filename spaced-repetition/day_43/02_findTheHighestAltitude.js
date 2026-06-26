//? LeetCode #1732
//? Find the Highest Altitude

// There is a biker going on a road trip. The road trip consists of n + 1 points at different altitudes. The biker starts his trip on point 0 with altitude equal 0.

// You are given an integer array gain of length n where gain[i] is the net gain in altitude between points i​​​​​​ and i + 1 for all (0 <= i < n). Return the highest altitude of a point.

//? Example 1:
// Input: gain = [-5,1,5,0,-7]
// Output: 1
// Explanation: The altitudes are [0,-5,-4,1,1,-6]. The highest is 1.

//? Example 2:
// Input: gain = [-4,-3,-2,-1,4,3,2]
// Output: 0
// Explanation: The altitudes are [0,-4,-7,-9,-10,-6,-3,-1]. The highest is 0.

//? Constraints:
// n == gain.length
// 1 <= n <= 100
// -100 <= gain[i] <= 100

//? Approach:
// We can solve this problem by iterating through the gain array and keeping track of the current altitude and the highest altitude seen so far.
// We start at altitude 0 and add the gain at each point to get the current altitude.
// We then compare the current altitude with the highest altitude seen so far and update the highest altitude if the current altitude is greater.
// Finally, we return the highest altitude.

//? Code:
var largestAltitude = function (gain) {
  let altitude = 0;
  let highestAltitude = 0;

  for (let i = 0; i < gain.length; i = i + 1) {
    const currAltitude = altitude + gain[i];
    altitude = currAltitude;
    highestAltitude = Math.max(highestAltitude, currAltitude);
  }

  return highestAltitude;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
