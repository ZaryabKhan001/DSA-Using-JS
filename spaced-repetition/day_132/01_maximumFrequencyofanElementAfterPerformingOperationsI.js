//? LeetCode #3346
//? Maximum Frequency of an Element After Performing Operations I

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
// Adding 0 to nums[1]. nums becomes [1, 4, 5].
// Adding -1 to nums[2]. nums becomes [1, 4, 4].

//? Example 2:
// Input: nums = [5,11,20,20], k = 5, numOperations = 1
// Output: 2

// Explanation:
// We can achieve a maximum frequency of two by:
// Adding 0 to nums[1].

//? Constraints:
// 1 <= nums.length <= 105
// 1 <= nums[i] <= 105
// 0 <= k <= 105
// 0 <= numOperations <= nums.length

//? Thought Process:
/*
Problem Understanding:
- We are given an array nums, an integer k, and numOperations.
- In one operation, we can choose an element and change it to a value
  within the range [nums[i] - k, nums[i] + k].
- We can perform at most numOperations operations.
- We need to find the maximum frequency of any number after these operations.

1. How do I start thinking about this problem?
- We need to make as many elements equal as possible.
- So, instead of thinking about which element to change first,
  think about which target value we should choose.
- For every target value, we need to find how many elements can
  become equal to that value.

2. How do we find the range?
- Suppose nums[i] = 5 and k = 2.
- We can change 5 to any value from 3 to 7.
- So, this element can contribute to the frequency of 3, 4, 5, 6, or 7.

- In general:
  left = nums[i] - k
  right = nums[i] + k

- If the problem restricts values to be non-negative, we can use:
  left = Math.max(nums[i] - k, 0)

- Every value inside this range is a possible target for this element.

3. Why do we need a difference array?
- For each element, we need to increase the count of every target
  value inside its range.

- One way is to loop through the complete range and increase
  the count of every value.
- But this repeats a lot of work when ranges overlap.

- For example, if an element can reach values from 3 to 7,
  we would need to update five positions.

- Instead of updating every position, we use a difference array.
- We mark where the range starts and where it ends.
- Later, we calculate prefix sums to get the total count for
  every target value.

- This allows us to process each range using only two updates.

4. How does the difference array work?
- Suppose an element can reach values from 3 to 7.

- We do:
  diff[3] += 1
  diff[8] -= 1

- Why 8?
- Because we want to include 3 to 7, but not 8.
- So, we subtract 1 at right + 1.

- When we calculate the prefix sum:
  values 3, 4, 5, 6, and 7 will have this element counted.
- After position 7, the subtraction at position 8 removes
  its contribution.

- After processing all elements, the running prefix sum at
  target value x tells us how many elements can become x.

5. Why do we need a frequency map separately?
- The difference array tells us how many elements CAN become
  a target value.
- But some elements already have that value.
- We should not spend operations on elements that are already
  equal to the target.

- So, we store the original frequency of every number in a map.

- For example:
  nums = [5, 5, 6]
  target = 5

- Two elements are already equal to 5.
- We should count those two without using any operations.

- The frequency map helps us find these existing occurrences.

6. How do we calculate the final frequency?
- runningSum tells us how many elements can reach the target.
- elemOwnFreq tells us how many elements already equal the target.

- So:
  needConversion = runningSum - elemOwnFreq

- This gives us the number of elements that need to be changed
  to make them equal to the target.

- But we cannot perform unlimited operations.
- We can perform at most numOperations operations.

- Therefore:
  maxPossibleOperation = Math.min(needConversion, numOperations)

- The final frequency for this target is:
  totalFrequency = elemOwnFreq + maxPossibleOperation

- We check every target and keep the maximum frequency.

7. Why do we check every possible target?
- We do not know which target will give us the maximum frequency.
- One target may already have many occurrences.
- Another target may have fewer existing occurrences but many
  elements that can be converted to it.

- So, we calculate the possible frequency for every target
  and keep the maximum answer.

8. How would I explain the complete approach to an interviewer?
- First, I noticed that each element can be converted to any value
  inside its range [nums[i] - k, nums[i] + k].

- For every target value, I need to know how many elements can
  reach that value.

- Updating every value inside every range would take too much time.
  Since these are range updates and I only need the final count
  at each target, I can use a difference array.

- For each element, I increase the difference array at the left
  boundary and decrease it at right + 1.

- Then I calculate the prefix sum to get the number of elements
  that can reach each target.

- I also maintain a frequency map to count the elements that
  already equal the target.

- I subtract the existing frequency from the reachable count
  to find how many elements need conversion.

- I limit those conversions using numOperations, add them to
  the existing frequency, and keep the maximum answer.

9. Counter questions an interviewer may ask:
Q1. Why use a difference array instead of a normal array?

- A normal array would require updating every value in each range.
- A difference array lets us represent each range using only
  two updates.
- We calculate the final counts later using prefix sums.

Q2. Why do we use right + 1 instead of right?

- We want the range to include the right boundary.
- Subtracting at right + 1 ensures the contribution ends after
  the right boundary.

Q3. Why do we need the frequency map?

- The difference array counts elements that can reach a target.
- The map tells us how many elements already equal that target.
- Existing occurrences do not require any operations.

Q4. Why is needConversion equal to runningSum - elemOwnFreq?

- runningSum includes all elements that can reach the target,
  including elements already equal to it.
- We subtract the existing occurrences to count only the
  elements that need to be changed.

Q5. Why use Math.min(needConversion, numOperations)?

- We cannot convert more elements than are available.
- We also cannot perform more than numOperations operations.
- So, we take the smaller of these two values.

Q6. Why not use a sliding window?

- A sliding window is useful when we can maintain a valid
  contiguous window under the problem's constraints.
- Here, we are counting how many elements' value ranges cover
  each possible target.
- The difference array directly handles these overlapping ranges.

Q7. What is the time complexity?

- Let M = max(nums) + k.
- Building the difference array and processing its ranges takes O(n).
- Traversing the difference array takes O(M).
- Total time complexity: O(n + M).

Q8. What is the space complexity?

- The difference array takes O(M) space.
- The frequency map takes O(n) space in the worst case.
- Total auxiliary space complexity: O(M + n).

Q9. What is the limitation of this approach?

- The difference array depends on the size of the value range,
  not just the number of elements.
- If the values are very large, the array can consume too much
  memory.
- In that case, a sorted or map-based approach may be better.

Q10. Can we count an element that already equals the target
     as an operation?

- No. It already has the target value.
- We count it in elemOwnFreq and only use operations for the
  remaining elements.


10. Important implementation detail:

- The difference array approach assumes target values are
  represented by valid array indices.
- The code uses Math.max(nums[i] - k, 0), which assumes the
  allowed target values cannot be negative.
- If negative targets are allowed, we need an offset or another
  approach to represent them correctly.

- Also, numOperations is a TOTAL operation limit.
- We must not use more than numOperations conversions for
  any one target.
*/

//? Code:
var maxFrequency = function (nums, k, numOperations) {
  // Find the maximum value that any number can reach.
  let maxElement = Math.max(...nums) + k;

  // Difference array to count how many numbers can reach each value.
  let diff = new Array(maxElement + 2).fill(0);

  // Store the actual frequency of each number.
  let freq = new Map();
  for (let i = 0; i < nums.length; i = i + 1) {
    // Each number can be changed to any value in this range.
    let l = Math.max(nums[i] - k, 0);
    let r = nums[i] + k;

    // Mark the start and end of the range using a difference array.
    diff[l] += 1;
    diff[r + 1] -= 1;

    // Count how many times this number already exists.
    freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
  }

  let maxFreq = 0;

  // Running sum tells us how many numbers can reach the current value.
  let runningSum = 0;
  for (let i = 0; i < diff.length; i = i + 1) {
    // Calculate the total number of elements whose range includes i.
    runningSum += diff[i];

    // Count how many times i already exists in the array.
    let elemOwnFreq = freq.get(i) || 0;

    // These elements can be changed to i, except those already equal to i.
    let needConversion = runningSum - elemOwnFreq;

    // We cannot perform more conversions than numOperations.
    let maxPossibleOperation = Math.min(needConversion, numOperations);

    // Existing occurrences + occurrences created through conversions.
    let totalFreqAcheived = elemOwnFreq + maxPossibleOperation;

    // Keep track of the highest frequency found so far.
    maxFreq = Math.max(maxFreq, totalFreqAcheived);
  }

  return maxFreq;
};

//? Time Complexity: O(n + m) where n is the length of nums array and m is the length of diff array.
//? Space Complexity: O(n + m) n for storing nums elements frequency and m is for diff array.

//? The 5-step revision
//* 1: Find the target
// We want as many elements as possible to become the same number. So, imagine choosing a target value x.

//* 2: Find the range
// An element num can become any value from num - k to num + k.
// Example: num = 5, k = 2 → range [3, 7].

//* 3: Count overlapping ranges
// For each target, we need to know how many ranges contain it. Since we have range updates and need the final counts, we use a difference array.

// diff[left]++, diff[right + 1]--

//* 4: Separate existing elements from conversions
// runningSum = elements that can reach the target.
// elemOwnFreq = elements already equal to the target.
// needConversion = runningSum - elemOwnFreq

//* 5: Respect the operation limit
// answer = existing frequency + Math.min(needConversion, numOperations)
// Repeat for each target and keep the maximum.
