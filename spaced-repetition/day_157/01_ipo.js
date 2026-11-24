//? LeetCode #502
//? IPO

// Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most k distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most k distinct projects.

// You are given n projects where the ith project has a pure profit profits[i] and a minimum capital of capital[i] is needed to start it.

// Initially, you have w capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

// Pick a list of at most k distinct projects from given projects to maximize your final capital, and return the final maximized capital.

// The answer is guaranteed to fit in a 32-bit signed integer.

//? Example 1:
// Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
// Output: 4

// Explanation: Since your initial capital is 0, you can only start the project indexed 0.
// After finishing it you will obtain profit 1 and your capital becomes 1.
// With capital 1, you can either start the project indexed 1 or the project indexed 2.
// Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.
// Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.

//? Example 2:
// Input: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
// Output: 6

//? Constraints:
// 1 <= k <= 105
// 0 <= w <= 109
// n == profits.length
// n == capital.length
// 1 <= n <= 105
// 0 <= profits[i] <= 104
// 0 <= capital[i] <= 109

//? Thought Process:
// Simple tha, profits and capitals ko apas me bind kardo and phir sort krlo based on maximum profit to minimum profit.
// Phir k times loop chalao aur dekhlo k kons best project hum ly skty hain.
// Usko uthao, use kro and mark it as used.

//? Code:
var findMaximizedCapital = function (k, w, profits, capital) {
  let n = profits.length;

  let values = [];
  for (let i = 0; i < n; i = i + 1) {
    values.push([profits[i], capital[i]]);
  }

  values.sort((a, b) => b[0] - a[0]);

  let capitalAvailable = w;
  let used = 0;
  let usedIndexes = {};

  while (used < k) {
    let changed = false;
    for (let i = 0; i < n; i = i + 1) {
      let curr = values[i];

      if (capitalAvailable >= curr[1] && !usedIndexes[i]) {
        capitalAvailable = capitalAvailable + curr[0];
        used++;
        usedIndexes[i] = true;
        changed = true;
        break;
      }
    }

    if (changed === false) {
      break;
    }
  }

  return capitalAvailable;
};

// This code for sure gives us TLE.
//? Time Complexity: O(n log n + n * k)
//? Space Complexiyt: O(n)

//? Better Approach:
// 1. Create pairs of [capital, profit] for every project.
// 2. Sort projects in ascending order of required capital.
// 3. Initialize index = 0 to track unchecked projects.
// 4. Create a Max Heap based on project profit.
// 5. Run a loop until we complete k projects:
// 5.1 Add all projects to the Max Heap whose required capital <= current money (w).
// 5.2 If the Max Heap is empty, no project is affordable.
//     Return current money (w).
// 5.3 Pick the project with maximum profit from the Max Heap.
// 5.4 Add its profit to current money (w).
// 5.5 Decrease k because we completed one project.
// 6. Return the maximum capital (w).

//? Code:
var findMaximizedCapital = function (k, w, profits, capital) {
  let n = profits.length;

  let projects = [];
  for (let i = 0; i < n; i = i + 1) {
    projects.push([capital[i], profits[i]]);
  }

  projects.sort((a, b) => a[0] - b[0]);

  let index = 0;
  let pq = new MaxPriorityQueue((pair) => pair[1]);

  while (k > 0) {
    while (index < n) {
      if (projects[index][0] > w) {
        break;
      }
      pq.push(projects[index]);
      index++;
    }

    if (pq.isEmpty()) {
      return w;
    }

    let bestFit = pq.dequeue();
    k--;
    w = w + bestFit[1];
  }

  return w;
};

// Sorting: O(n log n)
// Adding projects to Max Heap: O(n log n) total
// Removing k projects from Max Heap: O(k log n)
//? Total Time Complexity: O(n log n + k log n)
//? = O((n + k) log n)

//? Space Complexity: O(n)
