//? DIFFERENCE ARRAY

//? 1. INTRODUCTION
// A Difference Array is a technique used to perform range updates efficiently.

// A range update means adding or subtracting a value from multiple elements
// between two given indexes.

// Instead of updating every element in the range, we mark where the change
// starts and where the change ends.

// After processing all updates, we use a prefix sum to calculate the final
// value of every element.

//* Difference Array is mainly useful when we have many range updates.
// It is also called the Difference Array Technique.

//? 2. WHY DO WE NEED IT?
// Suppose we have an array [1, 2, 3, 4, 5].
// We need to add 10 to every element from index 1 to index 3.
// The updated array should be [1, 12, 13, 14, 5].
// The normal approach updates every element inside the range.
// If a range contains many elements, we have to perform many operations.
// If we have many range updates, the total work can become very large.
// Difference Array avoids updating every element separately.
// It records only where the change starts and where the change stops.
// This makes each range update take O(1) time.

//? 3. WHY USE DIFFERENCE ARRAY INSTEAD OF SEGMENT TREE?
// Both techniques can handle range updates, but they are designed for
// different situations.

// Difference Array is simpler when we have many range updates and only
// need the final array after all updates.
// Each range update takes O(1) time.
// After all updates, building the final array takes O(n) time.
// Total time complexity is O(n + q), where:
// n = number of array elements
// q = number of range updates

// A Segment Tree is more useful when we need to update ranges and also
// answer range queries during the process.
// For example, we may need to find the sum of a range after each update.

// A Segment Tree can support range updates and range queries efficiently,
// usually in O(log n) time per operation with lazy propagation.

// Difference Array does not directly answer range sum queries after
// every update.

//* IMPORTANT:
// Difference Array is not always better than Segment Tree.

// Use Difference Array when updates are simple and the final array is needed
// after processing the updates.

// Use Segment Tree when updates and queries must be handled dynamically.

//? 4. THE MAIN IDEA
// The main idea is to record changes instead of updating every element.
// Suppose we have an array of size 5.
// We want to add 10 to the range from index 1 to index 3.
// Instead of adding 10 to indexes 1, 2 and 3, we do two operations.
// First, add 10 at the starting index.
// Second, subtract 10 immediately after the ending index.

// In other words:
// diff[l] += value
// diff[r + 1] -= value

// The first operation tells us that the increase starts at index l.
// The second operation tells us that the increase stops after index r.
// The subtraction cancels the effect of the addition for later indexes.

// If r + 1 is outside the array, we do not need to record the subtraction
// when we only need to build the final array.

//? 5. HOW DOES IT WORK?
// Original array:
// [1, 2, 3, 4, 5]

// We want to add 10 from index 1 to index 3.
//* Step 1: Create a difference array filled with zeros.
// diff = [0, 0, 0, 0, 0]
//* Step 2: Add 10 at the starting index 1.
// diff[1] += 10
// diff = [0, 10, 0, 0, 0]
//* Step 3: Subtract 10 at index 4, which is r + 1.
// diff[4] -= 10
// diff = [0, 10, 0, 0, -10]
// We have recorded the range update using only two operations.
// We have not updated the original array yet.

//? 6. WHY DO WE USE PREFIX SUM?
// The difference array stores only the changes at certain indexes.
// It does not directly store the total change for every index.
// We use a running sum to find the total change at each position.
// Start with a running sum of zero.
// At each index, add diff[i] to the running sum.
// The running sum tells us how much the original element has changed.
// Add that change to the original element to get its final value.

// Example:
// Original array:
// [1, 2, 3, 4, 5]

// Difference array:
// [0, 10, 0, 0, -10]

// Running changes:
// Index 0: 0
// Index 1: 0 + 10 = 10
// Index 2: 10 + 0 = 10
// Index 3: 10 + 0 = 10
// Index 4: 10 + (-10) = 0

// Total changes:
// [0, 10, 10, 10, 0]

// Add these changes to the original array.

// Final array:
// [1, 12, 13, 14, 5]

//? 7. WHY DOES DIFFERENCE ARRAY WORK?
// When we add a value at index l, the running sum includes that value
// from index l onwards.
// When we subtract the same value at index r + 1, the running sum
// no longer includes that value from index r + 1 onwards.
// Therefore, the value affects only the indexes from l to r.
// The prefix sum carries the recorded change forward until it is cancelled.
// This is why we do not need to update every element inside the range.
// The two boundary changes are enough to represent the whole range update.

//? 8. MULTIPLE RANGE UPDATES
// We can process many range updates using the same difference array.
// For every update [l, r, value]:
// Add value at diff[l].
// Subtract value at diff[r + 1], if that index is valid.
// We process all updates before building the final array.
// After all updates are recorded, calculate the running sum from left
// to right.
// Add the running sum to each original array element.
// This gives the final array after applying all updates.
// Each update takes O(1) time.
// Applying all updates takes O(q) time.
// Building the final array takes O(n) time.
// Total time complexity is O(n + q).

//? 9. IMPORTANT RULES
// Difference Array is especially useful for range addition and subtraction.
// It works best when the range updates are known in advance.
// The standard approach is for inclusive ranges, from index l to index r.
// Always check whether r + 1 is a valid index before subtracting.
// If you need to answer range queries between updates, a Difference Array
// alone may not be sufficient.
// If you need the final array only, Difference Array can avoid unnecessary
// repeated work.

//* Remember:
// Mark the beginning of the change.
// Cancel the change immediately after the range.
// Use prefix sum to spread the change across the range.

//? 10. FINAL SUMMARY
//* Normal approach:
// Update every element inside every range.

//* Difference Array approach:
// Record changes at the range boundaries and use prefix sum afterward.

// Difference Array reduces each range update from O(n) in the worst case
// to O(1).

// For n elements and q range updates:
// Normal approach can take O(n * q) time in the worst case.
// Difference Array takes O(n + q) time.

//* Segment Tree is preferable when range queries and updates must be
//* handled efficiently throughout the process.

//? The key idea to remember:
// We do not record every change separately for every element.
// We record where the change begins and where it ends.
