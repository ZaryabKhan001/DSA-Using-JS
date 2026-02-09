//? LeetCode #134
//? Gas Station

// There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].

// You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.

// Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.

//? Example 1:
// Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
// Output: 3
//? Explanation:
// Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 4. Your tank = 4 - 1 + 5 = 8
// Travel to station 0. Your tank = 8 - 2 + 1 = 7
// Travel to station 1. Your tank = 7 - 3 + 2 = 6
// Travel to station 2. Your tank = 6 - 4 + 3 = 5
// Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
// Therefore, return 3 as the starting index.

//? Example 2:
// Input: gas = [2,3,4], cost = [3,4,3]
// Output: -1
//? Explanation:
// You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
// Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 0. Your tank = 4 - 3 + 2 = 3
// Travel to station 1. Your tank = 3 - 3 + 3 = 3
// You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
// Therefore, you can't travel around the circuit once no matter where you start.

//? Approach:
// Calculate the net gain (gas[i] - cost[i]) at each station.
// Keep two sums:
// totalGain: total net gain for the whole circuit.
// currGain: running sum for the current starting point.
// If currGain becomes negative, it means you cannot start from the current segment. So, reset currGain = 0 and set the next station (i+1) as the new candidate starting point.
// After the loop:
// If totalGain < 0, return -1 (not possible to complete circuit).
// Otherwise, return ans (the valid starting station index).

//? Code:
var canCompleteCircuit = function (gas, cost) {
  let currGain = 0;
  let totalGain = 0;
  let ans = 0;
  for (let i = 0; i < gas.length; i++) {
    let gain = gas[i] - cost[i];
    currGain += gain;
    totalGain += gain;

    if (currGain < 0) {
      ans = i + 1;
      currGain = 0;
    }
  }
  return totalGain < 0 ? -1 : ans;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
