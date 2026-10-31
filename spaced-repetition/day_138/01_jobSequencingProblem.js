//? Job Sequencing Problem (gfg)

// You are given two arrays: deadline[], and profit[], which represent a set of jobs, where each job is associated with a deadline, and a profit. Each job takes 1 unit of time to complete, and only one job can be scheduled at a time. You will earn the profit associated with a job only if it is completed by its deadline.

// Your task is to return the following two values

// Number of jobs selected for the maximum profit.
// The total maximum profit by completing those jobs.

//? Examples :

// Input: deadline[] = [4, 1, 1, 1], profit[] = [20, 10, 40, 30]
// Output: [2, 60]
// Explanation: Job1 and Job3 can be done with maximum profit of 60 (20 + 40).

// Input: deadline[] = [2, 1, 2, 1, 1], profit[] = [100, 19, 27, 25, 15]
// Output: [2, 127]
// Explanation: Job1 and Job3 can be done with maximum profit of 127 (100 + 27).

// Input: deadline[] = [3, 1, 2, 2], profit[] = [50, 10, 20, 30]
// Output: [3, 100]
// Explanation: Job1, Job3 and Job4 can be completed with a maximum profit of 100 (50 + 20 + 30).

//? Constraints:
// deadline.size() ≤ 105
// 1 ≤ deadline[i] ≤ deadline.size()
// 1 ≤ profit[i] ≤ 500
// profit.size() = deadline.size()

//? Thought Process:
// Intuition:
// We want to complete jobs that give us maximum profit.

// 1. Sort jobs by profit in descending order so we consider
//    the most profitable jobs first.

// 2. Each job must be completed before or on its deadline,
//    and each time slot can contain only one job.

// 3. Schedule each job in the latest available slot before
//    its deadline, keeping earlier slots free for other jobs.

// 4. If no slot is available before the deadline, skip the job.

//? Code:
class Solution {
  jobSequencing(deadline, profit) {
    let n = deadline.length;

    // Store each job's deadline and profit
    let jobs = [];

    for (let i = 0; i < n; i++) {
      // O(n)
      jobs.push([deadline[i], profit[i]]);
    }

    // Sort jobs by profit in descending order
    jobs.sort((a, b) => b[1] - a[1]); // O(nlogn)

    // Find the maximum deadline
    let maxDeadline = Math.max(...deadline); // O(n)

    // Create slots for scheduling jobs
    let slots = new Array(maxDeadline + 1).fill(false);

    let jobsDone = 0;
    let totalProfit = 0;

    // Schedule the most profitable jobs first
    for (let [deadline, profit] of jobs) {
      // O(n^2)
      // Find the latest available slot
      for (let slot = deadline; slot >= 1; slot--) {
        if (!slots[slot]) {
          slots[slot] = true;

          jobsDone++;
          totalProfit += profit;

          break;
        }
      }
    }

    return [jobsDone, totalProfit];
  }
}

//? Time Complexity: O(nlogn + (n * n)) where nlogn is for sorting and (n * n) for nested loops.
//? Space Complexity: O(n + n) for storing jobs and scheduling slots.

// But this code will give us TLE, so how can we improve it?
// Sorting is compulsory but for the other nested loop we can skip and get to know whether we can complete the job before or on the deadline or not using parent array.

// Intuition:
// We want to complete jobs that give us maximum profit.

// 1. Sort jobs by profit in descending order.
// 2. Use DSU to find the latest available slot before the deadline.
// 3. If a slot is available, complete the job and add its profit.
// 4. After using a slot, link it to the previous slot.
// 5. Use path compression to find available slots faster.

//? Code:
class Solution {
  findSlot(deadline, parents) {
    if (parents[deadline] == deadline) {
      return deadline;
    }

    // Path compression
    parents[deadline] = this.findSlot(parents[deadline], parents);

    return parents[deadline];
  }

  jobSequencing(deadline, profit) {
    let n = deadline.length;

    // Store each job's deadline and profit
    let jobs = [];

    for (let i = 0; i < n; i++) {
      jobs.push([deadline[i], profit[i]]);
    }

    // Sort jobs by profit in descending order
    jobs.sort((a, b) => b[1] - a[1]);

    // Find the maximum deadline
    let maxDeadline = Math.max(...deadline);

    // Initialize DSU parents
    let parents = new Array(maxDeadline + 1);

    for (let i = 0; i <= maxDeadline; i++) {
      parents[i] = i;
    }

    let jobsDone = 0;
    let totalProfit = 0;

    // Schedule the most profitable jobs first
    for (let [deadline, profit] of jobs) {
      let slot = this.findSlot(deadline, parents);

      if (slot != 0) {
        jobsDone++;
        totalProfit += profit;

        // Mark this slot as occupied by linking it
        // to the previous available slot
        parents[slot] = slot - 1;
      }
    }

    return [jobsDone, totalProfit];
  }
}

//? Time Complexity: O(n log n)
//? Space Complexity: O(n)
