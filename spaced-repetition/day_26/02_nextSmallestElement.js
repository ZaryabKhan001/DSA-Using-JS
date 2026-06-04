//? GFG - Next Smaller Element

// You are given an integer array arr[ ]. For every element in the array, your task is to determine its Next Smaller Element (NSE).

// The Next Smaller Element (NSE) of an element x is the first element that appears to the right of x in the array and is strictly smaller than x.

// If no such element exists, assign -1 as the NSE for that position.
// Examples:

//? Example 1:
// Input: arr[] = [4, 8, 5, 2, 25]
// Output: [2, 5, 2, -1, -1]
// Explanation:
// The first element smaller than 4 having index > 0 is 2.
// The first element smaller than 8 having index > 1 is 5.
// The first element smaller than 5 having index > 2 is 2.
// There are no elements smaller than 4 having index > 3.
// There are no elements smaller than 4 having index > 4.

//? Example 2:
// Input: arr[] = [4, 1]
// Output: [1, -1]
// Explanation: 4 will be updated to 1 and 1 will be updated to -1.

//? Constraints:
// 1 ≤ arr.size() ≤ 105
// 1 ≤ arr[i] ≤ 105

//? Approach: Stack
// We can use a stack to keep track of the elements for which we are trying to find the next smaller element. We will iterate through the array from right to left, and for each element, we will pop elements from the stack until we find an element that is smaller than the current element. The top of the stack will be the next smaller element for the current element. If the stack is empty, then there is no smaller element, and we will assign -1.

var nextSmallerElement = function (arr) {
  let n = arr.length;
  let result = new Array(n).fill(-1);
  let stack = [];

  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] >= arr[i]) {
      stack.pop();
    }
    if (stack.length > 0) {
      result[i] = stack[stack.length - 1];
    }
    stack.push(arr[i]);
  }

  return result;
};

//? Time Complexity: O(n) where n is the length of the input array. Each element is pushed and popped from the stack at most once.
//? Space Complexity: O(n) in the worst case when the input array is sorted in increasing order, the stack will contain all the elements.
