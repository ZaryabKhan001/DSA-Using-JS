//? LeetCode #735
//? Asteroid Collision

// We are given an array asteroids of integers representing asteroids in a row. The indices of the asteroid in the array represent their relative position in space.

// For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

// Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

//? Example 1:
// Input: asteroids = [5,10,-5]
// Output: [5,10]
// Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.

//? Example 2:
// Input: asteroids = [8,-8]
// Output: []
// Explanation: The 8 and -8 collide exploding each other.

//? Example 3:
// Input: asteroids = [10,2,-5]
// Output: [10]
// Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

//? Example 4:
// Input: asteroids = [3,5,-6,2,-1,4]​​​​​​​
// Output: [-6,2,4]
// Explanation: The asteroid -6 makes the asteroid 3 and 5 explode, and then continues going left. On the other side, the asteroid 2 makes the asteroid -1 explode and then continues going right, without reaching asteroid 4.

//? Constraints:
// 2 <= asteroids.length <= 104
// -1000 <= asteroids[i] <= 1000
// asteroids[i] != 0

//? Approach:
// We can use a stack to keep track of the asteroids that are still in play. We iterate through the list of asteroids and for each asteroid, we check if it collides with the top of the stack. If it does, we determine which one survives based on their sizes and directions. We continue this process until we have processed all asteroids and return the remaining ones in the stack as the final state after all collisions.

//? Code:
//* utility functions
const isCollisionHappend = (curr, top) => {
  return curr < 0 && top > 0;
};

const whoSurvived = (a, b) => {
  if (Math.abs(a) > Math.abs(b)) {
    return a;
  } else if (Math.abs(b) > Math.abs(a)) {
    return b;
  } else {
    return null;
  }
};

var asteroidCollision = function (asteroids) {
  let stack = [];
  stack.push(asteroids[0]);

  for (let i = 1; i < asteroids.length; i = i + 1) {
    let curr = asteroids[i];
    let destroyed = false;

    //* collision case
    while (
      stack.length > 0 &&
      isCollisionHappend(curr, stack[stack.length - 1])
    ) {
      let top = stack[stack.length - 1];
      let survived = whoSurvived(curr, top);

      //* both destroyed
      if (survived === null) {
        stack.pop();
        destroyed = true;
        break;
      }

      //* current aestroid destroyed
      if (survived === top) {
        destroyed = true;
        break;
      }

      //* top destroyed
      stack.pop();
    }

    if (!destroyed) {
      stack.push(curr);
    }
  }

  return stack;
};

//? Time Complexity: O(n)
//? Space Complexity: O(n)
