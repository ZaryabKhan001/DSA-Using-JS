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
PROBLEM: Task Scheduler

GOAL:
- We have tasks represented by characters A to Z.
- Each task takes 1 unit of time.
- The same task must have at least n units of cooldown before it can run again.
- We need to find the minimum total time to complete all tasks.

--------------------------------------------------
1. FIRST, THINK ABOUT THE PROBLEM
--------------------------------------------------

- We can execute tasks in any order.
- The same task cannot run again until its cooldown is finished.
- If we cannot execute any task, we have to stay idle.

- Our goal is to minimize idle time.

--------------------------------------------------
2. WHAT IF WE JUST EXECUTE TASKS RANDOMLY?
--------------------------------------------------

Example:

tasks = ["A", "A", "A", "B", "B", "B"]
n = 2

If we execute them randomly:

A -> A -> A -> B -> B -> B

This is not valid because we cannot execute A again
until 2 units of cooldown have passed.

We need to arrange tasks carefully.

--------------------------------------------------
3. FIRST IDEA: PICK THE HIGHEST FREQUENCY TASK
--------------------------------------------------

- Instead of arranging tasks randomly, let's count
  how many times each task appears.

Example:

A = 3
B = 3

n = 2

- A and B both appear 3 times.
- Let's first pick the task with the highest frequency.
- We can start by arranging A:

A -> _ -> _ -> A -> _ -> _ -> A

- We have created gaps between the same tasks.
- Now we can fill these gaps with other tasks.

Let's fill them with B:

A -> B -> _ -> A -> B -> _ -> A -> B

We still have two empty positions.

But there are no more tasks.

So we have to stay idle:

A -> B -> idle -> A -> B -> idle -> A -> B

Total time = 8

This is the basic idea:
- Pick the most frequent task first.
- Keep enough space between its occurrences.
- Fill empty spaces with other tasks.
- If no task is available, stay idle.

--------------------------------------------------
4. HOW DO WE CALCULATE THE ANSWER?
--------------------------------------------------

Let's take another example:

tasks = ["A", "A", "A", "B", "B", "C"]
n = 2

Frequencies:

A = 3
B = 2
C = 1

A has the highest frequency.

First, arrange A:

A -> _ -> _ -> A -> _ -> _ -> A

There are 2 gaps between the 3 occurrences of A.

Each gap needs n + 1 positions.

Why n + 1?

Because:
- 1 position is occupied by A.
- n positions are the cooldown space after A.

So:

n + 1 = 3

Number of complete gaps:

highestFreq - 1 = 3 - 1 = 2

Now:

2 * 3 = 6

We have 6 positions in these two complete blocks.

Now add the last A:

A -> _ -> _ -> A -> _ -> _ -> A

Total positions = 7

Formula:

(highestFreq - 1) * (n + 1) + 1

= (3 - 1) * (2 + 1) + 1

= 2 * 3 + 1

= 7

--------------------------------------------------
5. FILL THE GAPS WITH SMALLER FREQUENCY TASKS
--------------------------------------------------

We have:

A = 3
B = 2
C = 1

Our arrangement:

A -> _ -> _ -> A -> _ -> _ -> A

Now fill B and C:

A -> B -> C -> A -> B -> idle -> A

Total time = 7

Notice:
- We used B and C to fill empty positions.
- We still have one empty position.
- So we need one idle time.

Our formula also gives 7.

--------------------------------------------------
6. EDGE CASE: MULTIPLE TASKS HAVE THE SAME
   HIGHEST FREQUENCY
--------------------------------------------------

Now consider:

tasks = ["A", "A", "A", "B", "B", "B"]
n = 2

Frequencies:

A = 3
B = 3

Both tasks have the highest frequency.

Let's arrange them:

A -> B -> _ -> A -> B -> _ -> A -> B

Now:

- A appears 3 times.
- B also appears 3 times.
- Both need to be placed in the final block.

We have:

A -> B

This is our final block.

So instead of adding 1, we add 2.

Why?

Because there are 2 characters with the highest frequency.

Formula:

(highestFreq - 1) * (n + 1) + count

= (3 - 1) * (2 + 1) + 2

= 2 * 3 + 2

= 8

Here:
count = Number of characters having the highest frequency.

--------------------------------------------------
7. WHY DO WE USE Math.max(tasks.length, formulaAnswer)?
--------------------------------------------------

This is another important part.

Consider:

tasks = ["A", "A", "A", "B", "B", "B", "C", "D", "E"]
n = 2

Frequencies:

A = 3
B = 3
C = 1
D = 1
E = 1

Our formula:

(highestFreq - 1) * (n + 1) + count

= (3 - 1) * (2 + 1) + 2

= 8

But wait!

We have 9 tasks.

Can we finish all tasks in 8 units of time?

NO!

Every task takes 1 unit of time.

So even if there is no idle time, we need at least 9 units.

Let's arrange them:

A -> B -> C -> A -> B -> D -> A -> E

We have 8 positions in this example's arrangement.
Actually, we have 8 tasks placed in the first 8 positions,
and one task still needs to be placed.

We can arrange all 9 tasks without idle time:

A -> B -> C -> A -> B -> D -> A -> E -> (remaining task)

The key idea is that when enough different tasks are available,
they can fill all the cooldown spaces.

Therefore:

- Formula answer = Minimum time based on frequency and cooldown.
- tasks.length = Minimum time required to execute every task.

We must take the maximum of both.

return Math.max(tasks.length, formulaAnswer);

--------------------------------------------------
8. COMPLETE MINDSET
--------------------------------------------------

When solving this problem, think like this:

1. Random execution can create unnecessary idle time.

2. The task with the highest frequency is the biggest problem
   because it needs the most cooldown space.

3. So first, arrange the task with the highest frequency.

4. Create gaps between its occurrences.

5. Fill those gaps with other tasks having smaller frequencies.

6. If multiple tasks have the same highest frequency,
   they all need to be included in the final block.

7. Calculate the minimum time using:

   (highestFreq - 1) * (n + 1) + count

8. But we cannot finish faster than the total number of tasks.

9. Therefore, return:

   Math.max(tasks.length, formulaAnswer)

--------------------------------------------------
9. COMPLEXITY
--------------------------------------------------

N = Total number of tasks.

Time Complexity: O(N + 26) = O(N)

- First loop counts frequencies.
- Second loop checks 26 characters.

Space Complexity: O(26) = O(1)

- We use a frequency array of size 26.

*/

//? Code:
var leastInterval = function (tasks, n) {
    let highestFreq = 0;

    //* Calculate the frequency of each character and keep a track of highest frequency
    let freq = new Array(26).fill(0);
    for (let i = 0; i < tasks.length; i = i + 1) {
        let task = tasks[i];

        freq[task.charCodeAt(0) - 65]++;
        highestFreq = Math.max(highestFreq, freq[task.charCodeAt(0) - 65]);
    };

    //* Count how many characters have highest frequency
    let count = 0;
    for (let i = 0; i < freq.length; i = i + 1) {
        if (freq[i] === highestFreq) {
            count++;
        }
    };

    let formulaAnswer = (highestFreq - 1) * (n + 1) + count;

    return Math.max(tasks.length, formulaAnswer);
};

//? Time Complexity: O(n) where n is the length of the tasks array
//? Space Complexity: O(1) since the frequency array is of fixed size 26