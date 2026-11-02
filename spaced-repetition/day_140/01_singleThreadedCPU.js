//? LeetCode #1834
//? Single-Threaded CPU

// You are given n​​​​​​ tasks labeled from 0 to n - 1 represented by a 2D integer array tasks, where tasks[i] = [enqueueTimei, processingTimei] means that the i​​​​​​th​​​​ task will be available to process at enqueueTimei and will take processingTimei to finish processing.

// You have a single-threaded CPU that can process at most one task at a time and will act in the following way:

// If the CPU is idle and there are no available tasks to process, the CPU remains idle.
// If the CPU is idle and there are available tasks, the CPU will choose the one with the shortest processing time. If multiple tasks have the same shortest processing time, it will choose the task with the smallest index.
// Once a task is started, the CPU will process the entire task without stopping.
// The CPU can finish a task then start a new one instantly.
// Return the order in which the CPU will process the tasks.

//? Example 1:
// Input: tasks = [[1,2],[2,4],[3,2],[4,1]]
// Output: [0,2,3,1]
// Explanation: The events go as follows:
// - At time = 1, task 0 is available to process. Available tasks = {0}.
// - Also at time = 1, the idle CPU starts processing task 0. Available tasks = {}.
// - At time = 2, task 1 is available to process. Available tasks = {1}.
// - At time = 3, task 2 is available to process. Available tasks = {1, 2}.
// - Also at time = 3, the CPU finishes task 0 and starts processing task 2 as it is the shortest. Available tasks = {1}.
// - At time = 4, task 3 is available to process. Available tasks = {1, 3}.
// - At time = 5, the CPU finishes task 2 and starts processing task 3 as it is the shortest. Available tasks = {1}.
// - At time = 6, the CPU finishes task 3 and starts processing task 1. Available tasks = {}.
// - At time = 10, the CPU finishes task 1 and becomes idle.

//? Example 2:
// Input: tasks = [[7,10],[7,12],[7,5],[7,4],[7,2]]
// Output: [4,3,2,0,1]
// Explanation: The events go as follows:
// - At time = 7, all the tasks become available. Available tasks = {0,1,2,3,4}.
// - Also at time = 7, the idle CPU starts processing task 4. Available tasks = {0,1,2,3}.
// - At time = 9, the CPU finishes task 4 and starts processing task 3. Available tasks = {0,1,2}.
// - At time = 13, the CPU finishes task 3 and starts processing task 2. Available tasks = {0,1}.
// - At time = 18, the CPU finishes task 2 and starts processing task 0. Available tasks = {1}.
// - At time = 28, the CPU finishes task 0 and starts processing task 1. Available tasks = {}.
// - At time = 40, the CPU finishes task 1 and becomes idle.

//? Constraints:​​​​​​​
// 1 <= tasks.length <= 105
// tasks[i] = [enqueueTimei, processingTimei]
// 1 <= enqueueTimei, processingTimei <= 109

//? Thought Process:
/*
1. We need to process tasks based on two conditions:
   first, only tasks whose enqueue time has arrived are available;
   second, among available tasks, choose the smallest processing time.

2. We can check all tasks every time to find available tasks,
   but repeatedly scanning all tasks would be inefficient.

3. So, let's sort tasks by enqueue time.
   This allows us to visit tasks in chronological order and
   easily identify which tasks have become available.

4. But sorting alone cannot help us choose the task with the
   smallest processing time among all available tasks.

5. We need a data structure that efficiently gives us the
   smallest processing time. A Min Heap is suitable here.

6. We insert all available tasks into the Min Heap and extract
   the task with the smallest processing time.
   If processing times are equal, we choose the smaller index.

7. If the heap is empty, no task is available, so we jump
   the timer to the next task's enqueue time.
*/

//* APPROACH:
// 1. Add the original index to every task.
//    - We need the original index because we have to return
//      the order in which tasks are processed.

// 2. Sort all tasks according to their enqueue time.
//    - This helps us find which tasks are available to process.

// 3. Create a Min Heap.
//    - Store processing time and original index in the heap.
//    - Smaller processing time gets higher priority.
//    - If processing times are equal, smaller original index
//      gets higher priority.

// 4. Start the timer from the enqueue time of the first task.

// 5. Run a loop while there are tasks remaining or the heap
//    is not empty.

// 6. Add all available tasks to the Min Heap.
//    - A task is available if its enqueue time <= timer.

// 7. If the Min Heap is empty:
//    - It means no task is currently available.
//    - Jump the timer to the next task's enqueue time.

// 8. If the Min Heap is not empty:
//    - Remove the task with the smallest processing time.
//    - If processing times are equal, choose the smaller index.
//    - Add its original index to the answer.
//    - Increase the timer by its processing time.

// 9. Return the answer.

//? Code:
var getOrder = function (tasks) {
  let n = tasks.length;
  //* adding index to each and every task.
  for (let i = 0; i < n; i = i + 1) {
    tasks[i].push(i);
  }

  //* sort the task on the basis of enqueue time.
  tasks.sort((a, b) => a[0] - b[0]);

  let ans = [];
  let timer = tasks[0][0];
  let i = 0;

  //* Min heap: first processing time, then original index.
  let pq = new MinPriorityQueue((task) => {
    return task[0] * 100000 + task[1];
  });

  while (i < n || !pq.isEmpty()) {
    //* put all the tasks into min heap, whose enqueue time is less than or equal to timer.
    while (i < n && tasks[i][0] <= timer) {
      pq.enqueue([tasks[i][1], tasks[i][2]]);
      i = i + 1;
    }

    //* if min heap is empty
    if (pq.isEmpty()) {
      timer = tasks[i][0];
    }
    //* not empty
    else {
      let task = pq.dequeue();

      //* process the task
      ans.push(task[1]);
      timer += task[0];
    }
  }
  return ans;
};

//? Time Complexity: O(n log n)
// 1. Adding original indexes:
//    - We visit every task once.
//    - O(n)

// 2. Sorting tasks by enqueue time:
//    - O(n log n)

// 3. Min Heap operations:
//    - Every task enters the heap exactly once.
//    - Every task leaves the heap exactly once.
//    - Each insertion and removal takes O(log n).
//    - Total: O(n log n)

// Overall:
// O(n) + O(n log n) + O(n log n)

// We ignore smaller terms.

//* Final: O(n log n)

//? Space Complexity: O(n)
// 1. Answer array:
//    - Stores n original indexes.
//    - O(n)

// 2. Min Heap:
//    - At most n tasks can be inside the heap.
//    - O(n)

//* Final: O(n)
