//? Fractional Knapsack (gfg)

// Given two arrays, val[] and wt[] , representing the values and weights of items, and an integer capacity representing the maximum weight a knapsack can hold, determine the maximum total value that can be achieved by putting items in the knapsack. You are allowed to break items into fractions if necessary.
// Return the maximum value as a double, rounded to 6 decimal places.

//? Examples :

// Input: val[] = [60, 100, 120], wt[] = [10, 20, 30], capacity = 50
// Output: 240.000000
// Explanation: By taking items of weight 10 and 20 kg and 2/3 fraction of 30 kg. Hence total price will be 60+100+(2/3)(120) = 240

// Input: val[] = [500], wt[] = [30], capacity = 10
// Output: 166.670000
// Explanation: Since the item’s weight exceeds capacity, we take a fraction 10/30 of it, yielding value 166.670000.

//? Constraints:
// val.size() ≤ 105
// 1 ≤ val[i], wt[i] ≤ 104
// 1 ≤ capacity ≤ 109
// wt.size() = val.size()

//? Thought Process:
// First my mind thinks about processing maximumval items first.
// val[] = [60, 100, 120], wt[] = [10, 20, 30], capacity = 50
// take item 3 of wt 30 and val 120, then take item 2 of wt 20 and val 100, total value = 220
// But this is not the optimal solution, because if we take item 1 of wt 10 and val 60, then take item 2 of wt 20 and val 100, then we can take 2/3 fraction of item 3 of wt 30 and val 120, total value = 240
// So we need to do greedy approach but in a different style.
// Fill every kg in the bag with the maximum value per kg.

// First, check the value per bag offered by each and every item. Then process the items in decreasing order of value per kg. If the item can fit completely, take it. Otherwise, take the fraction that can fit in the bag.

//? Code:
class Solution {
  fractionalKnapsack(val, wt, capacity) {
    let n = val.length;
    let values = [];

    // * Store value, weight and value per kg.
    for (let i = 0; i < n; i = i + 1) {
      values.push([val[i], wt[i], val[i] / wt[i]]);
    }

    // * Sort according to maximum value per kg.
    values.sort((a, b) => b[2] - a[2]);

    let maxValue = 0;

    for (let i = 0; i < n; i = i + 1) {
      let [currVal, currWt, perKgVal] = values[i];

      // * If bag is full, stop.
      if (capacity == 0) {
        break;
      }

      // * If complete item can fit.
      if (currWt <= capacity) {
        capacity = capacity - currWt;
        maxValue = maxValue + currVal;
      }
      // * Otherwise, take only the required fraction.
      else {
        let fraction = capacity * perKgVal;

        maxValue = maxValue + fraction;
        capacity = 0;
      }
    }

    return maxValue;
  }
}

//? Time Complexity: O(n log n)
// O(n) for sorting the items based on value per kg and O(n) for iterating through the items to calculate the maximum value.
// O(n log n) for sorting elements in values array.
// Finally, O(n) fir iterating through the sorted values array to calculate the maximum value that can be obtained within the given capacity.
//* Overall: O(n log n)

//? Space Complexity: O(n) because we are storing the value, weight and value per kg in a separate array called values.
