//? Assign Mice Holes (gfg)

// You are given two arrays mices[] and holes[] of the same size. The array mices[] represents the positions of the mice on a straight line, while the array holes[] represents the positions of the holes on the same line. Each hole can accommodate exactly one mouse. A mouse can either stay in its current position, move one step to the right, or move one step to the left, and each move takes one minute. The task is to assign each mouse to a distinct hole in such a way that the time taken by the last mouse to reach its hole is minimized.

//? Examples:

// Input: mices[] = [4, -4, 2], holes[] = [4, 0, 5]
// Output: 4
// Explanation: Assign the mouse at position 4 to the hole at position 4, so the time taken is 0 minutes. Assign the mouse at position −4 to the hole at position 0, so the time taken is 4 minutes. Assign the mouse at position 2 to the hole at position 5, so the time taken is 3 minutes. Hence, the maximum time required by any mouse is 4 minutes.

// Input: mices[] = [1, 2], holes[] = [20, 10]
// Output: 18
// Explanation: Assign the mouse at position 1 to the hole at position 10, so the time taken is 9 minutes. Assign the mouse at position 2 to the hole at position 20, so the time taken is 18 minutes. Hence, the maximum time required by any mouse is 18 minutes.

//? Constraints:
// 1 ≤ mices.size() = holes.size() ≤ 105
// -105 ≤ mices[i] , holes[i] ≤ 105

//? Thought Process:
// 1. Sort mice and holes by their positions.
// 2. Assign each mouse to the hole at the same sorted index.
// 3. Calculate the time each mouse takes to reach its assigned hole (absolute distance).
// 4. The maximum distance among all mice is the minimum time required for all mice to reach their holes.

// Mouse apny kareebi hole me jay ga, that's it. That is why we are sorting both.

//? Code:
class Solution {
  assignHole(mices, holes) {
    let n = mices.length;
    mices.sort((a, b) => a - b);
    holes.sort((a, b) => a - b);
    let minTimeTaken = 0;

    for (let i = 0; i < n; i = i + 1) {
      minTimeTaken = Math.max(minTimeTaken, Math.abs(holes[i] - mices[i]));
    }

    return minTimeTaken;
  }
}

//? Time Complexity: O(nlogn)
//? Space Complexity: O(1)
