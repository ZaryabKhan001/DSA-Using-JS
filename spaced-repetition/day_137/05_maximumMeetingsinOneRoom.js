//? Maximum Meetings in One Room

// Given two arrays s[] and f[], where s[i] and f[i] denote the start time and finish time of the ith meeting, respectively. There is only one meeting room. A meeting can be scheduled only if its start time is strictly greater than the finish time of the previously selected meeting.

// Find the maximum number of meetings that can be scheduled in the room such that no two selected meetings overlap. Return the indices (1-based) of the selected meetings in sorted (increasing) order.

// Note: If multiple schedules are possible, prefer meetings with earlier finish times. If two meetings have the same finish time, prefer the meeting with the smaller index.

//? Examples:

// Input: s[] = [1, 3, 0, 5, 8, 5], f[] = [2, 4, 6, 7, 9, 9]
// Output: [1, 2, 4, 5]
// Explanation: We can attend the 1st meeting from (1 to 2), then the 2nd meeting from (3 to 4), then the 4th meeting from (5 to 7), and the last meeting we can attend is the 5th from (8 to 9). It can be shown that this is the maximum number of meetings we can attend.

// Input: s[] = [3], f[] = [7]
// Output: [1]
// Explanation: Since there is only one meeting, we can attend the meeting.

//? Constraints:
// 1 ≤ s.size() ≤ 105
// f.size() = s.size()
// 0 ≤ s[i] ≤ f[i] ≤ 109

//? Thought Process:
//  Maximum Meetings — Why Greedy by Finish Time?

//*  1. Why choosing the earliest start time fails?
// Initially, we might think:
// Select the meeting that starts earliest.
// But this strategy does not guarantee the maximum number of meetings.

// Consider:
// Meeting 1: [1, 10]
// Meeting 2: [2, 3]
// Meeting 3: [4, 5]
// Meeting 4: [6, 7]

// If we choose the earliest starting meeting:
// - We select Meeting 1 (starts at 1).
// - It finishes at 10.
// - All other meetings are rejected.

// Total meetings = 1.
// But if we choose Meeting 2, Meeting 3, and Meeting 4:
// - Meeting 2 finishes at 3.
// - Meeting 3 starts at 4.
// - Meeting 4 starts at 6.
// Total meetings = 3.

//* Problem: An early starting meeting might occupy the room for a very long time.
// Therefore, earliest start time is not a reliable greedy choice.

//*  2. Why choosing the earliest finish time works?
// Instead of asking:
// "Which meeting starts earliest?"

// Ask:
// "Which meeting finishes earliest?"

//* Why?
// Because our goal is to leave the meeting room available for as much remaining time as possible.
// A meeting that finishes earlier gives us more opportunities to schedule other meetings.

// For example:
// Meeting 1: [1, 10]
// Meeting 2: [2, 3]
// Meeting 3: [4, 5]
// Meeting 4: [6, 7]

// If we select the meeting with the earliest finish time:
// - Meeting 2 finishes at 3.
// - Meeting 3 finishes at 5.
// - Meeting 4 finishes at 7.
// We successfully schedule 3 meetings.

//*  3. Why is this greedy choice optimal?
// Imagine two possible choices:

// - Meeting A finishes at time 5.
// - Meeting B finishes at time 8.

// Both are compatible with the meetings already selected.
// If we choose Meeting A, the room becomes available at time 5.
// If we choose Meeting B, the room becomes available at time 8.
// Choosing Meeting A can never reduce our future scheduling opportunities compared with choosing Meeting B.
// Any meeting that can start after time 8 can also start after time 5.
// Therefore, choosing the earliest finishing meeting is always at least as good as choosing a later finishing meeting.
// This is the key greedy property.

//*  4. Final Interview Takeaway
// - Earliest start time: Fails because a meeting might occupy the room for too long.
// - Shortest duration: Also not guaranteed to maximize the number of meetings.
// - Earliest finish time: Works because it frees the room as early as possible, maximizing the remaining scheduling opportunities.

//* Greedy Rule: Always select the compatible meeting with the earliest finish time.

//? Code:
class Solution {
  maxMeetings(s, f) {
    let n = s.length;
    let timer = [];

    for (let i = 0; i < n; i++) {
      timer.push([s[i], f[i], i + 1]);
    }

    // Sort by finish time, then original index
    timer.sort((a, b) => a[1] - b[1] || a[2] - b[2]);

    let meetings = [];
    let previousMeetingEnd = -1;

    for (let i = 0; i < n; i++) {
      let [start, end, index] = timer[i];

      if (start > previousMeetingEnd) {
        meetings.push(index);
        previousMeetingEnd = end;
      }
    }

    // Return indices in increasing order
    return meetings.sort((a, b) => a - b);
  }
}

//? Time Complexity: O(n log n)
//? Space Complexity: O(n)
