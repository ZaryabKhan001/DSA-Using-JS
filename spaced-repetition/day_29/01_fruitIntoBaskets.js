//? LeetCode #904
//? Fruit Into Baskets

// You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

// You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

// You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
// Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
// Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
// Given the integer array fruits, return the maximum number of fruits you can pick.

//? Example 1:
// Input: fruits = [1,2,1]
// Output: 3
// Explanation: We can pick from all 3 trees.

//? Example 2:
// Input: fruits = [0,1,2,2]
// Output: 3
// Explanation: We can pick from trees [1,2,2].
// If we had started at the first tree, we would only pick from trees [0,1].

//? Example 3:
// Input: fruits = [1,2,3,2,2]
// Output: 4
// Explanation: We can pick from trees [2,3,2,2].
// If we had started at the first tree, we would only pick from trees [1,2].

//? Constraints:
// 1 <= fruits.length <= 105
// 0 <= fruits[i] < fruits.length

//? Approach: Sliding Window
// We can use a sliding window approach to solve this problem. We will maintain a window that contains at most 2 different types of fruits. We will expand the window by moving the right pointer and adding fruits to our map until we have more than 2 types of fruits. When we have more than 2 types, we will shrink the window from the left until we have at most 2 types again. During this process, we will keep track of the maximum window size that contains at most 2 types of fruits.

//? Code:
var totalFruit = function (fruits) {
  let maxW = 0;
  let map = {};

  let i = 0;
  let j = 0;
  while (j < fruits.length) {
    //* add current fruit in window
    let curr = fruits[j];
    map[curr] = (map[curr] || 0) + 1;

    //* shrink invalid window untill, window becomes valid
    while (Object.keys(map).length > 2) {
      map[fruits[i]]--;

      if (map[fruits[i]] === 0) {
        delete map[fruits[i]];
      }

      i++;
    }

    //* expand when window is valid,
    maxW = Math.max(maxW, j - i + 1);
    j++;
  }

  return maxW;
};

//? Time Complexity: O(n) where n is the length of fruits array
//? Space Complexity: O(1) since the map can only have at most 2 keys at any time
