//? Meeting Rooms II

// Given two arrays start[] and end[] such that start[i] is the starting time of ith meeting and end[i] is the ending time of ith meeting. Return the minimum number of rooms required to attend all meetings.

// Note: A person can also attend a meeting if it's starting time is same as the previous meeting's ending time.

//? Examples:
// Input: start[] = [1, 10, 7], end[] = [4, 15, 10]
// Output: 1
// Explanation: Since all the meetings are held at different times, it is possible to attend all the meetings in a single room.

// Input: start[] = [2, 9, 6], end[] = [4, 12, 10]
// Output: 2
// Explanation: 1st and 2nd meetings at one room but for 3rd meeting one another room required.

//? Constraints:
// 1 ≤ start.size() = end.size() ≤ 105
// 0 ≤ start[i] < end[i] ≤ 106

//? Thought Process:
// First of all, undestand the problem statement. We are given two arrays start[] and end[] such that start[i] is the starting time of ith meeting and end[i] is the ending time of ith meeting. We have to return the minimum number of rooms required to attend all meetings. A person can also attend a meeting if it's starting time is same as the previous meeting's ending time.

// Think like this, we have zero rooms initially when any user comes we build a room for meeting and when the meeting ends we can free the room.
// So, we are sure to think about this properly we somehow have to go liner in time.
// Lile at 1pm meeting start, at 3 new meeting starts, at 4pm meeting ends, at 5pm new meeting starts, at 6pm meeting ends. So, we can see that we have to keep track of the number of rooms required at any point of time. So, we can sort the start and end arrays and then use two pointers to keep track of the number of rooms required at any point of time. If the start time of the next meeting is less than the end time of the current meeting then we need a new room otherwise we can free a room. We can keep track of the maximum number of rooms required at any point of time and return that as the answer.

// Just use two pointer like merge two sorted arrays. 
// Minimum time between i and j ko resolve karo and increment it. Simple.
// Start time hai tu rooms++ and increment i, otherwise rooms-- and increment j. Keep track of maxRoomsSeenSoFar and return that as the answer.

//? Code:
class Solution {
  minMeetingRooms(start, end) {
    let n = start.length;
    start.sort((a, b) => a - b);
    end.sort((a, b) => a - b);

    let i = 0;
    let j = 0;
    let rooms = 0;
    let maxRoomsSeenSoFar = 0;

    while (i < n && j < n) {
      if (start[i] < end[j]) {
        rooms++;
        i++;
      } else {
        rooms--;
        j++;
      }
      maxRoomsSeenSoFar = Math.max(maxRoomsSeenSoFar, rooms);
    }

    return maxRoomsSeenSoFar;
  }
}

//? Time Complexity: O(n log n)
//? Space Complexity: O(1)
