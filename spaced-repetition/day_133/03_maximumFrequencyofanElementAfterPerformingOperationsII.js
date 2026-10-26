//? LeetCode #3347
//? Maximum Frequency of an Element After Performing Operations II

// You are given an integer array nums and two integers k and numOperations.

// You must perform an operation numOperations times on nums, where in each operation you:

// Select an index i that was not selected in any previous operations.
// Add an integer in the range [-k, k] to nums[i].
// Return the maximum possible frequency of any element in nums after performing the operations.

//? Example 1:
// Input: nums = [1,4,5], k = 1, numOperations = 2
// Output: 2

// Explanation:
// We can achieve a maximum frequency of two by:

// Adding 0 to nums[1], after which nums becomes [1, 4, 5].
// Adding -1 to nums[2], after which nums becomes [1, 4, 4].

//? Example 2:
// Input: nums = [5,11,20,20], k = 5, numOperations = 1
// Output: 2

// Explanation:
// We can achieve a maximum frequency of two by:
// Adding 0 to nums[1].

//? Constraints:
// 1 <= nums.length <= 105
// 1 <= nums[i] <= 109
// 0 <= k <= 109
// 0 <= numOperations <= nums.length

//? Thought Process:
//* Problem understanding:

// We are given an array nums, an integer k, and numOperations.

// In one operation, we can select an element and change it to any
// integer in the range [num - k, num + k].

// We can perform at most numOperations operations.

// We need to return the maximum frequency of any element after
// performing these operations.

//* Step 1: What are we actually trying to do?
// We want to make as many elements as possible equal to the same value.

// For example:

// nums = [1, 4, 5]
// k = 2
// numOperations = 2

// We can change 1 to 3 because 3 is in the range [1 - 2, 1 + 2].
// We can change 4 to 3 because 3 is in the range [4 - 2, 4 + 2].

// The array becomes [3, 3, 5].

// The frequency of 3 becomes 2.

// So the answer is 2.

//* Step 2: Think about a possible target value
// Instead of trying to change every element one by one,
// let's think in the opposite direction.

// What if we choose a target value first?

// Then we ask:
// How many elements can reach this target?

// For example:

// nums = [1, 4, 5]
// k = 2

// If our target is 3:

// 1 can reach 3.
// 4 can reach 3.
// 5 can reach 3.

// All three elements can reach 3.

// But we have another condition:
// We can perform at most numOperations operations.

// So we cannot change every element if the number of required
// changes is greater than numOperations.

// This gives us two important things:

// 1. How many elements can reach our target?
// 2. How many elements are already equal to our target?

//* Step 3: Why do we need a frequency Map?
// Some elements may already be equal to our target.

// We don't need to perform operations on those elements.

// For example:

// nums = [1, 3, 3, 5]
// target = 3

// Two elements are already equal to 3.

// We can store their frequencies in a Map.

// freq = {
//     1: 1,
//     3: 2,
//     5: 1
// }

// Now freq.get(3) tells us that two elements are already equal to 3.

// These elements contribute to our answer without using any operations.

//* Step 4: How do we find how many elements can reach a target?
// Every number can reach any integer in the range:

// [num - k, num + k]

// For example:

// num = 5
// k = 2

// This number can reach:

// 3, 4, 5, 6, 7

// Instead of checking every possible target separately,
// we can mark the range where this number is available.

// We can use a difference array technique for this.

// For the range [3, 7]:

// diff[3] += 1
// diff[8] -= 1

//* Why 8?
// Because we want to include 7 but stop counting after 7.

// When we calculate the prefix sum:

// At 3, the count increases by 1.
// The count remains increased through 7.
// At 8, the count decreases by 1.

// This is the basic idea of a difference array.

//* Step 5: But why are we using a Map instead of an array?
// Normally, we could create a difference array.

//* But the possible numbers can be very large.

// Creating an array up to the maximum possible number would waste memory.

// We don't need to store every number.

// We only need to store positions where something changes.

// So we use a Map to store these changes.

// diff.set(num - k, (diff.get(num - k) || 0) + 1);

// This marks the beginning of the range.

// diff.set(num + k + 1, (diff.get(num + k + 1) || 0) - 1);

// This marks the end of the range.

// We use num + k + 1 because the range includes num + k.

// We also add the original number as a position:

// diff.set(num, diff.get(num) || 0);

//* This ensures that the original number is considered as a possible target,
// even if no range boundary exists at that position.

// Important:
// This line does not increase the number of elements that can reach
// the target. It only ensures that the target position is included.

//* Step 6: Why do we sort the positions?
// A Map does not automatically keep its keys sorted numerically.

// But we need to process the difference changes from smallest
// position to largest position.

// So we sort the keys:

// let positions = [...diff.keys()].sort((a, b) => a - b);

//* Now we can calculate the prefix sum in the correct order.

//* Step 7: How does runningSum help us?
// We process the sorted positions one by one.

// runningSum += diff.get(position);

// The running sum tells us how many numbers have ranges covering
// the current position.

// In other words:

//* runningSum = number of elements that can reach this target.

// For example:

// If runningSum is 4 at target 5,
// then four elements can potentially become 5.

// But remember, we cannot perform unlimited operations.

//* Step 8: How do we calculate the final frequency?
// runningSum tells us how many elements can reach our target.

// elemOwnFreq tells us how many elements are already equal to our target.

// We don't need to perform operations on elements that are already
// equal to the target.

// So, first we calculate how many elements need conversion:

// let needConversion = runningSum - elemOwnFreq;

// We can convert only numOperations elements at most.

// So, we take the minimum of needConversion and numOperations:

// let maxPossibleOperation = Math.min(needConversion, numOperations);

// Now, we add the elements already equal to the target and the
// elements we can convert:

// let totalFreqAcheived = elemOwnFreq + maxPossibleOperation;

// Example:

// runningSum = 5
// elemOwnFreq = 2
// numOperations = 2

// 5 elements can reach the target.
// 2 elements are already equal to the target.

// So, we need to convert 5 - 2 = 3 elements.

// But we can perform only 2 operations.

// Therefore:

// maxPossibleOperation = Math.min(3, 2) = 2

// totalFreqAcheived = 2 + 2 = 40

// Our maximum frequency for this target is 4.

//* Step 9: How do we get the maximum answer?
// We calculate totalFreqAcheived for every possible target.

// Then, we compare it with the maximum frequency found so far:

// maxFreq = Math.max(maxFreq, totalFreqAcheived);

// This keeps the highest frequency we can achieve.

// After checking all possible target positions, we return maxFreq.

//* Final interview explanation:
// First, I count the frequency of every existing number using a Map.

// Then I use a difference Map to mark the ranges that each number
// can reach. Each number adds 1 at num - k and subtracts 1 at
// num + k + 1.

// I also include each original number as a possible target.

// Next, I sort all the positions because a Map does not keep its
// keys in numerical order.

// I calculate a running sum over these positions to find how many
// elements can reach each target.

// Finally, I limit that count by both the available elements and
// the number of operations we can perform.

// I check every target and return the maximum frequency.

//? Code:
var maxFrequency = function (nums, k, numOperations) {
  let freq = new Map();
  let diff = new Map();

  for (let num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
    diff.set(num, diff.get(num) || 0);
    diff.set(num - k, (diff.get(num - k) || 0) + 1);
    diff.set(num + k + 1, (diff.get(num + k + 1) || 0) - 1);
  }

  let positions = [...diff.keys()].sort((a, b) => a - b);

  let runningSum = 0;
  let maxFreq = 0;
  for (let position of positions) {
    runningSum += diff.get(position);

    let elemOwnFreq = freq.get(position) || 0;

    let needConversion = runningSum - elemOwnFreq;

    let maxPossibleOperation = Math.min(needConversion, numOperations);

    let totalFreqAcheived = elemOwnFreq + maxPossibleOperation;

    maxFreq = Math.max(maxFreq, totalFreqAcheived);
  }

  return maxFreq;
};

//? Time complexity: O(n log n)
//? Space complexity: O(n)

//? Follow-up questions interviewer might ask:
//* 1. Why are we using a Map instead of a normal difference array?
//    Because the values in nums can be very large. A normal array
//    might waste memory, so we store only the important positions in a Map.

//* 2. Why do we add +1 at num - k and -1 at num + k + 1?
//    Because each number can reach every integer in the range
//    [num - k, num + k]. We add 1 at the start and subtract 1
//    just after the end to mark this range.

//* 3. Why do we add the original number to the difference Map?
//    Because an original number can be the best target even if it
//    is not a range boundary. We need to consider its existing frequency.

//* 4. Why do we sort the Map keys before calculating runningSum?
//    Because a Map does not automatically sort keys numerically.
//    We must process positions in increasing order to calculate
//    the correct prefix sum.

//* 5. Why do we calculate needConversion = runningSum - elemOwnFreq?
//    Because runningSum counts all elements that can reach the target,
//    including elements already equal to it. We subtract the existing
//    frequency to find how many elements need to be changed.
//    Then we limit conversions using numOperations.
