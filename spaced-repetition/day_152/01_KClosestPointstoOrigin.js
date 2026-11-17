//? LeetCode #973
// K Closest Points to Origin

// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

//? Example 1:
// Input: points = [[1,3],[-2,2]], k = 1
// Output: [[-2,2]]

// Explanation:
// The distance between (1, 3) and the origin is sqrt(10).
// The distance between (-2, 2) and the origin is sqrt(8).
// Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
// We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].

//? Example 2:
// Input: points = [[3,3],[5,-1],[-2,4]], k = 2
// Output: [[3,3],[-2,4]]
// Explanation: The answer [[-2,4],[3,3]] would also be accepted.

//? Constraints:
// 1 <= k <= points.length <= 104
// -104 <= xi, yi <= 104

//? Thought Process:
// First of all understand the problem statement.
// k closest points nikalo jo origin k qareeb hain. origin=(0, 0).
// distance formula use kr k pata chal skta hai k kons point qareeb hai konsa dor.
// Bs, phir us formula ko use karo.
// sqrt((x1 - x2)2 + (y1 - y2)2) yahan x1 and y1 (0) hain becuase they are origin poits.
// Simply use, sqrt((x2)2 + (y2)2).
//* One important point is not take sqrt simply use (sqrt) becuase direct 81 store kro yah sqrt ly k 9. Aik e bat hai. formula affect nahi hoga.
// So, use maxheap to keep k closest points in heap at every stage while processing.
// Key ban jay ga distance and sath point store krna hai because we need to return points in answer.

//? Code:
var kClosest = function (points, k) {
  let pq = new MaxPriorityQueue((pair) => pair[0]);

  for (let i = 0; i < points.length; i = i + 1) {
    let x = points[i][0];
    let y = points[i][1];
    let distance = Math.pow(x, 2) + Math.pow(y, 2);

    pq.enqueue([distance, points[i]]);

    if (pq.size() > k) {
      pq.dequeue();
    }
  }

  let result = [];
  while (!pq.isEmpty()) {
    let element = pq.dequeue();
    result.push(element[1]);
  }

  return result;
};

//? Time Complexity: O(n log k)
//? Space Complexity: O(k)
