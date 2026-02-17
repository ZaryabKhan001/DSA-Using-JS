//? LeetCode #1094
//? Car Pooling

// There is a car with capacity empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west).

// You are given the integer capacity and an array trips where trips[i] = [numPassengersi, fromi, toi] indicates that the ith trip has numPassengersi passengers and the locations to pick them up and drop them off are fromi and toi respectively. The locations are given as the number of kilometers due east from the car's initial location.

// Return true if it is possible to pick up and drop off all passengers for all the given trips, or false otherwise.

//? Example 1:
// Input: trips = [[2,1,5],[3,3,7]], capacity = 4
// Output: false

//? Example 2:
// Input: trips = [[2,1,5],[3,3,7]], capacity = 5
// Output: true

//? Approach:
// 1. Use a difference array to record passenger changes at pickup and drop locations.
// 2. For each trip, add passengers at `from` index and

//? Code:
var carPooling = function (trips, carCapacity) {
  let changes = Array(1001).fill(0);
  let requiredCapacity = 0;

  for (let i = 0; i < trips.length; i = i + 1) {
    let [numPassengers, from, to] = trips[i];
    changes[from] = changes[from] + numPassengers;
    changes[to] = changes[to] - numPassengers;
  }

  for (let i = 0; i < changes.length; i = i + 1) {
    requiredCapacity = requiredCapacity + changes[i];
    if (requiredCapacity > carCapacity) {
      return false;
    }
  }

  return true;
};

//? Time Complexity: O(n)
//? Space Complexity: O(1)
