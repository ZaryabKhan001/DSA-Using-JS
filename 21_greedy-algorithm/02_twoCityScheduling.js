//? LeetCode #1029
//? Two City Scheduling

// A company is planning to interview 2n people. Given the array costs where costs[i] = [aCosti, bCosti], the cost of flying the ith person to city a is aCosti, and the cost of flying the ith person to city b is bCosti.

// Return the minimum cost to fly every person to a city such that exactly n people arrive in each city.

//? Example 1:
// Input: costs = [[10,20],[30,200],[400,50],[30,20]]
// Output: 110
// Explanation:
// The first person goes to city A for a cost of 10.
// The second person goes to city A for a cost of 30.
// The third person goes to city B for a cost of 50.
// The fourth person goes to city B for a cost of 20.

// The total minimum cost is 10 + 30 + 50 + 20 = 110 to have half the people interviewing in each city.

//? Example 2:
// Input: costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]
// Output: 1859

//? Example 3:
// Input: costs = [[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]]
// Output: 3086

//? Approach
// For each person, calculate the cost difference between going to city A and city B.
// Sort people based on this difference, those who save more by going to city A come first.
// Send the first half of people to city A and the second half to city B.
// Add up the total cost accordingly and return the answer.

//? Code:
var twoCitySchedCost = function (costs) {
  costs.sort((a, b) => b[1] - b[0] - (a[1] - a[0]));
  let ans = 0;
  let n = costs.length / 2;

  for (let i = 0; i < n; i++) {
    ans += costs[i][0];
  }
  for (let i = n; i < 2 * n; i++) {
    ans += costs[i][1];
  }

  return ans;
};

//? Time Complexity: O(nlogn+n)=O(nlogn)
//? Space Complexity: O(n) Due to sort implementation
