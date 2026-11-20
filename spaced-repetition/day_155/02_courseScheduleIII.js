//? LeetCode #630
//? Course Schedule III

// There are n different online courses numbered from 1 to n. You are given an array courses where courses[i] = [durationi, lastDayi] indicate that the ith course should be taken continuously for durationi days and must be finished before or on lastDayi.

// You will start on the 1st day and you cannot take two or more courses simultaneously.

// Return the maximum number of courses that you can take.

//? Example 1:
// Input: courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]
// Output: 3

// Explanation:
// There are totally 4 courses, but you can take 3 courses at most:
// First, take the 1st course, it costs 100 days so you will finish it on the 100th day, and ready to take the next course on the 101st day.
// Second, take the 3rd course, it costs 1000 days so you will finish it on the 1100th day, and ready to take the next course on the 1101st day.
// Third, take the 2nd course, it costs 200 days so you will finish it on the 1300th day.
// The 4th course cannot be taken now, since you will finish it on the 3300th day, which exceeds the closed date.

//? Example 2:
// Input: courses = [[1,2]]
// Output: 1

//? Example 3:
// Input: courses = [[3,2],[4,3]]
// Output: 0

//? Constraints:
// 1 <= courses.length <= 104
// 1 <= durationi, lastDayi <= 104

//? Thought Process:
// 1. Sorting by first parameter (duration):
// Shorter courses come first, but their deadlines might be earlier or later.
// This doesn't guarantee a valid scheduling order.

// Example:
// [[2, 3], [5, 16], [6, 11]]
// Sorting by duration gives the above order.
// We select [2,3] and [5,16], but cannot select [6,11].
// Output = 2, whereas the optimal answer is 3.

// 2. Sorting by second parameter (deadline):
// Courses with earlier deadlines come first.
// But selecting a course might prevent us from selecting other courses later.

// Example:
// [[5, 5], [4, 6], [2, 6]]
// Sorting by deadline gives the above order.
// We select [5,5], but then cannot select the other two courses.
// Output = 1, whereas the optimal answer is 2.

// Main problem:
// Once we select a course, we never reconsider or remove it.
// A previously selected longer course might prevent us from taking more courses.

// Solution:
// Sort by deadline + Max Heap.
// If total time exceeds the current deadline, remove the course with maximum duration.
// This allows us to reconsider previous selections and maximize the number of courses.

//? Code:
var scheduleCourse = function (courses) {
  let n = courses.length;

  courses.sort((a, b) => a[1] - b[1]);

  let time = 1;
  let choosen = 0;
  let choosedCourses = {};

  while (1) {
    let choosed = false;

    for (let i = 0; i < n; i = i + 1) {
      let course = courses[i];
      if (time + course[0] <= course[1] && !choosedCourses[i]) {
        time = time + course[0];
        choosen++;
        choosed = true;
        choosedCourses[i] = true;
      }
    }

    if (choosed === false) {
      return choosen;
    }
  }

  return choosen;
};

// This above code will not work.

//? Actual Solution:
//? 1. Smallest deadline first: Sort courses by their second parameter (lastDay) in ascending order.
//? 2. Largest duration removal: Use a Max Heap based on the first parameter (duration).
//? Why?
// - We process courses with the earliest deadlines first so we don't miss them.
// - If our total time exceeds a deadline, we remove the course with the largest duration because it frees up the most time.

//? Code:
var scheduleCourse = function (courses) {
  // Sort courses by deadline (ascending order).
  courses.sort((a, b) => a[1] - b[1]);

  let time = 0;
  let pq = new MaxPriorityQueue((course) => course[0]);

  for (let course of courses) {
    time = time + course[0];
    pq.enqueue(course);

    // If we exceed the current deadline,
    // remove the course with the largest duration.
    if (time > course[1]) {
      let removedCourse = pq.dequeue();
      time = time - removedCourse[0];
    }
  }

  return pq.size();
};

//? Time Complexity: O(n log n)
// Sorting: O(n log n)
// Heap operations: O(n log n)

//? Space Complexity: O(n)
// Max Heap: O(n)

//? Remember:
// - Sort by smallest deadline.
// - Remove the course with the largest duration whenever the deadline is exceeded.
// - The number of courses remaining in the heap is our answer.
