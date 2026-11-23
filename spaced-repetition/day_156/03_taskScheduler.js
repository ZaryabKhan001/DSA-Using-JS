//? LeetCode #621
//? Task Scheduler

// You are given an array of CPU tasks, each labeled with a letter from A to Z, and a number n. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of at least n intervals between two tasks with the same label.

// Return the minimum number of CPU intervals required to complete all tasks.

//? Example 1:
// Input: tasks = ["A","A","A","B","B","B"], n = 2
// Output: 8

// Explanation: A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.
// After completing task A, you must wait two intervals before doing A again. The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle. By the 4th interval, you can do A again as 2 intervals have passed.

//? Example 2:
// Input: tasks = ["A","C","A","B","D","B"], n = 1
// Output: 6

// Explanation: A possible sequence is: A -> B -> C -> D -> A -> B.
// With a cooling interval of 1, you can repeat a task after just one other task.

//? Example 3:
// Input: tasks = ["A","A","A", "B","B","B"], n = 3
// Output: 10

// Explanation: A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.
// There are only two types of tasks, A and B, which need to be separated by 3 intervals. This leads to idling twice between repetitions of these tasks.

//? Constraints:

// 1 <= tasks.length <= 104
// tasks[i] is an uppercase English letter.
// 0 <= n <= 100

//? Thought Process:
/*
 * ---------------------------------------------------------------------
 * STEP 1: UNDERSTAND THE PROBLEM
 * ---------------------------------------------------------------------
 *  - Every task takes exactly 1 interval. Same-label tasks need at least
 *    n intervals between them. If nothing can run, the CPU idles.
 *  - Total time = (number of tasks) + (number of idle slots).
 *    The task count is fixed, so the real goal is: MINIMIZE IDLE SLOTS.
 *  - The labels themselves don't matter, only how many copies of each
 *    we have. So the first thing to do is COUNT FREQUENCIES.
 *
 * ---------------------------------------------------------------------
 * STEP 2: THINK IN BOXES OF SIZE n + 1
 * ---------------------------------------------------------------------
 *  - If a task runs at time t, it can run again at time t + n + 1.
 *  - So split the timeline into BOXES of n + 1 slots. Inside one box,
 *    every task can appear AT MOST ONCE, so no task ever breaks its
 *    cooldown inside a box.
 *
 *      tasks = A A A B B B, n = 2   ->  box size = 3
 *
 *      [A B _] [A B _] [A B]
 *
 *  - Each box: run up to n + 1 DIFFERENT tasks. If fewer than n + 1
 *    tasks are available, the empty slots are idle time.
 *
 * ---------------------------------------------------------------------
 * STEP 3: WHICH TASKS GO INTO A BOX?  (greedy intuition)
 * ---------------------------------------------------------------------
 *  - Idea: ALWAYS PICK THE TASKS WITH THE MOST COPIES LEFT.
 *      Why? The task with the most copies is the one that will be left
 *      alone at the end, with nothing to fill its cooldown gaps.
 *      Using it early spreads it out while other tasks are still around
 *      to fill the gaps.
 *  - Counter-example of a bad choice: A=3, B=1, C=1, D=1, n = 1 (box = 2)
 *      Few copies first:   [B C] [D A] [A _] [A]   = 7
 *      Most copies first:  [A B] [A C] [A D]       = 6
 *
 * ---------------------------------------------------------------------
 * STEP 4: PICK THE DATA STRUCTURE
 * ---------------------------------------------------------------------
 *  - We repeatedly need "the task with the most copies left right now",
 *    and the counts change after every box.
 *  - That's exactly what a MAX-HEAP is for. We only store COUNTS, not
 *    labels, because the answer is a length, not the actual schedule.
 *
 * ---------------------------------------------------------------------
 * STEP 5: HOW THE CODE DOES IT
 * ---------------------------------------------------------------------
 *  1. Count each task in freq, then push every count into the max-heap.
 *  2. While the heap is not empty, build one box:
 *     a. Dequeue up to n + 1 counts (most copies first). Each dequeue
 *        runs one copy, so store count - 1 in used.
 *        Dequeuing (not peeking) guarantees a task can't be picked
 *        twice in the same box.
 *     b. Push back every count in used that is still > 0. They must
 *        wait for the NEXT box, which is exactly their cooldown.
 *     c. Add time for this box:
 *        - Heap NOT empty -> more work comes later, so this box counts
 *          as the full n + 1 (the empty slots are idle time).
 *        - Heap empty -> this is the LAST box. Nothing has to wait
 *          after the final task, so count only used.length.
 *  3. Return time.
 *
 * ---------------------------------------------------------------------
 * STEP 6: DRY RUNS
 * ---------------------------------------------------------------------
 *  Example 1: A A A B B B, n = 2  (box = 3)
 *
 *  heap       box takes   used     back in heap   time added   time
 *  [3,3]      3,3         [2,2]    [2,2]          3 (full)     3
 *  [2,2]      2,2         [1,1]    [1,1]          3 (full)     6
 *  [1,1]      1,1         [0,0]    []             2 (last)     8   ✔
 *
 *  Example 3: same tasks, n = 3 (box = 4)  ->  4 + 4 + 2 = 10       ✔
 *
 *  More tasks than gaps: A A A B B B C C D D, n = 2  (box = 3)
 *
 *  heap         box takes   used      back in heap   added   time
 *  [3,3,2,2]    3,3,2       [2,2,1]   [2,2,2,1]      3       3
 *  [2,2,2,1]    2,2,2       [1,1,1]   [1,1,1,1]      3       6
 *  [1,1,1,1]    1,1,1       [0,0,0]   [1]            3       9
 *  [1]          1           [0]       []             1       10  ✔
 *
 *  Every box was full, so there was no idle time: answer = number of tasks.
 *
 * ---------------------------------------------------------------------
 * STEP 7: EDGE CASES
 * ---------------------------------------------------------------------
 *  - n = 0         -> box = 1, one task per box, no idles -> tasks.length.
 *  - One label     -> A A A, n = 2 -> [A _ _] [A _ _] [A] = 3 + 3 + 1 = 7
 *  - All distinct  -> everything fits without idles -> tasks.length.
 *  - The last box must NOT add n + 1, or we'd count idle slots after
 *    the final task (Example 1 would wrongly give 9).
 *
 * ---------------------------------------------------------------------
 * STEP 8: COMPLEXITY
 * ---------------------------------------------------------------------
 *  - N = tasks.length, k = number of different tasks (k <= 26).
 *  - Time:  O(N log k) = O(N)
 *      - Counting frequencies: O(N).
 *      - Every dequeue runs exactly one real task, so there are exactly
 *        N dequeues in total, and at most N enqueues. Each heap
 *        operation costs O(log k) on a heap of at most 26 items.
 *      - Idle slots are added as a number (time += n + 1) and never
 *        looped over, so a large n doesn't slow it down.
 *      - Since k <= 26, log k is a constant, so this is O(N).
 *  - Space: O(k) = O(1)
 *      - freq, the heap, and used each hold at most 26 entries.
 *
 * ---------------------------------------------------------------------
 * STEP 9: ALTERNATIVE APPROACH (math formula, no heap)
 * ---------------------------------------------------------------------
 *  - The task with the highest frequency (maxFreq) decides how many
 *    boxes there are: (maxFreq - 1) full boxes + a final box that holds
 *    every task sharing maxFreq (count of them).
 *
 *      formula = (maxFreq - 1) * (n + 1) + count
 *      answer  = Math.max(tasks.length, formula)
 *
 *  - Math.max handles the case with more tasks than gaps: there are no
 *    idles, so the answer is just the number of tasks.
 *  - Also O(N) time and O(1) space, but it gives only the number. The
 *    heap version shows the general "greedy + priority queue" pattern
 *    and can be changed to build the actual schedule.
 *
 * ---------------------------------------------------------------------
 * QUICK REVISION CHECKLIST
 * ---------------------------------------------------------------------
 *  [ ] Count frequencies, push the counts into a max-heap.
 *  [ ] Each box = up to n + 1 DIFFERENT tasks, most copies first.
 *  [ ] Push back the counts that are still > 0 AFTER filling the box.
 *  [ ] Middle box adds n + 1; the last box adds only used.length.
 *
 *  SIMILAR PROBLEMS (same pattern):
 *  - #767  Reorganize String
 *  - #358  Rearrange String k Distance Apart
 *  - #1054 Distant Barcodes
 * =====================================================================
 */

//? Code:
var leastInterval = function (tasks, n) {
    // Count how many times each task appears.
    let freq = {};
    for (let t of tasks) {
        freq[t] = (freq[t] || 0) + 1;
    }

    // Max-heap of counts: the task with the most copies left comes out first.
    let pq = new MaxPriorityQueue((count) => count);
    for (let key in freq) {
        pq.enqueue(freq[key]);
    }

    let time = 0;

    // Keep making boxes until no tasks are left.
    while (!pq.isEmpty()) {
        let used = [];      // tasks placed in this box (their counts after running once)
        let slots = n + 1;  // size of one box

        // STEP 1: Fill the box with different tasks, most copies first.
        while (slots > 0 && !pq.isEmpty()) {
            used.push(pq.dequeue() - 1);  // run one copy of this task
            slots--;
        }

        // STEP 2: Put tasks that still have copies back, for the next box.
        for (let count of used) {
            if (count > 0) {
                pq.enqueue(count);
            }
        }

        // STEP 3: Add this box's minutes to the total.
        if (pq.isEmpty()) {
            // Last box: the work is finished, so count only the tasks in it.
            time += used.length;
        } else {
            // Middle box: count the whole box, including the waiting spots.
            time += n + 1;
        }
    }

    return time;
};

//? Time Complexity: O(N log 26) = O(N), where N = tasks.length (N dequeues, heap holds at most 26 counts)
//? Space Complexity: O(1) since freq, the heap and used hold at most 26 entries