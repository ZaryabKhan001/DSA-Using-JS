// ==========================================
// DIFFERENCE ARRAY WITH JUMPS (K)
// ==========================================

// 1. SIMPLE DIFFERENCE ARRAY
// --------------------------

// Suppose we have a query [l, r, v].
// We have to add v to every element from index l to index r.

// Instead of updating every element, we mark the changes.

// diff[l] += v;
// diff[r + 1] -= v;

// Why?
// Starting from index l, we want to add v.
// After index r, we want to stop adding v.

// Example:
// Array = [0, 0, 0, 0, 0]
// Query = [1, 3, 2]

// diff[1] += 2;
// diff[4] -= 2;

// diff = [0, 2, 0, 0, -2]

// Now, calculate cumulative sum.

// a[i] += a[i - 1];

// Result = [0, 2, 2, 2, 0]

// ==========================================
// 2. DIFFERENCE ARRAY WITH JUMPS (K)
// ==========================================

// Now suppose we don't update every index.
// We update only indices that are K steps apart.

// Example:
// l = 1, r = 7, v = 3, k = 2

// The indices we want to update are:
// 1, 3, 5, 7

// We add v at these indices only.

// Instead of updating every index,
// we mark where the updates start and stop.

// diff[l] += v;

// Calculate how many complete jumps fit between l and r.
// steps = Math.floor((r - l) / k);

// Find the first index after the last valid update.
// next = l + (steps + 1) * k;

// diff[next] -= v;

// Example:
// l = 1, r = 7, v = 3, k = 2

// steps = (7 - 1) / 2 = 3
// next = 1 + (3 + 1) * 2 = 9

// diff[1] += 3;
// diff[9] -= 3;

// We have marked the start and end of the updates.

// IMPORTANT:
// We must use an array large enough to store diff[next].
// If next is outside the original array,
// we may need extra space in the difference array.

// ==========================================
// 3. CUMULATIVE SUM WITH JUMPS
// ==========================================

// In a normal difference array, we use the previous index.

// a[i] += a[i - 1];

// But with jumps, the previous relevant index is K steps behind.

// a[i] += a[i - k];

// Why?
// Because updates move from one index to another
// by jumping K positions.

// Example:
// k = 2

// Relevant index sequence:
// 0 -> 2 -> 4 -> 6
// 1 -> 3 -> 5 -> 7

// Each sequence has its own cumulative sum.

// IMPORTANT:
// The formula is not simply a[i] = a[i - k].
// We must add the current difference value.

// Correct formula:
// a[i] += a[i - k];

// For indices smaller than k, there is no previous
// relevant index, so we use their initial values.

// ==========================================
// 4. COMPLETE EXAMPLE: SUM WITH JUMPS
// ==========================================

// Array size = 8
// Query = [1, 5, 3]
// k = 2

// We update indices:
// 1, 3, 5

// Step 1: Mark the changes.

// diff[1] += 3;
// steps = (5 - 1) / 2 = 2;
// next = 1 + (2 + 1) * 2 = 7;
// diff[7] -= 3;

// diff = [0, 3, 0, 0, 0, 0, 0, -3]

// Step 2: Calculate cumulative values using jumps.

// For indices less than k, keep their initial values.

// a[0] = diff[0];
// a[1] = diff[1];

// For i >= k:
// a[i] += a[i - k];

// i = 2: a[2] += a[0];  // 0
// i = 3: a[3] += a[1];  // 3
// i = 4: a[4] += a[2];  // 0
// i = 5: a[5] += a[3];  // 3
// i = 6: a[6] += a[4];  // 0
// i = 7: a[7] += a[5];  // -3 + 3 = 0

// Final result:
// [0, 3, 0, 3, 0, 3, 0, 0]

// Only indices 1, 3, and 5 were updated.

// ==========================================
// 5. WHAT IF WE NEED TO CALCULATE A PRODUCT?
// ==========================================

// For addition, the neutral value is 0.
// For multiplication, the neutral value is 1.

// So, for a product-based difference array,
// initialize the difference array with 1.

// diff[l] *= v;

// Calculate the first index after the last valid update.

// steps = Math.floor((r - l) / k);
// next = l + (steps + 1) * k;

// diff[next] /= v;

// WHY DIVISION?
// We multiply by v starting at index l.
// After the last valid update, we divide by v
// to cancel the multiplication.

// Example:
// l = 1, r = 5, v = 2, k = 2

// Update indices: 1, 3, 5

// diff[1] *= 2;

// steps = (5 - 1) / 2 = 2;
// next = 1 + (2 + 1) * 2 = 7;

// diff[7] /= 2;

// IMPORTANT:
// Product-based difference arrays are not as simple
// as sum-based difference arrays.

// The technique above requires special care:
// 1. Values must support division.
// 2. Dividing by zero is not allowed.
// 3. Modular arithmetic may require modular inverses.
// 4. Cumulative product must use the correct
//    recurrence for the problem.

// Do not blindly replace += with *= and -= with /=
// without checking the problem's requirements.

// ==========================================
// 6. QUICK REVISION
// ==========================================

// NORMAL SUM DIFFERENCE ARRAY:
// diff[l] += v;
// diff[r + 1] -= v;
// a[i] += a[i - 1];

// SUM DIFFERENCE ARRAY WITH JUMPS:
// diff[l] += v;
// steps = Math.floor((r - l) / k);
// next = l + (steps + 1) * k;
// diff[next] -= v;
// a[i] += a[i - k];

// PRODUCT DIFFERENCE ARRAY WITH JUMPS:
// Initialize diff with 1.
// diff[l] *= v;
// steps = Math.floor((r - l) / k);
// next = l + (steps + 1) * k;
// diff[next] /= v;

// Product-based difference arrays need additional
// mathematical conditions and careful handling.

// THE MAIN IDEA:
// 1. Initialize the difference array.
// 2. Mark where each update starts.
// 3. Mark where each update stops.
// 4. Reconstruct the result using cumulative operations.

// Normal difference array:
// Move one index at a time.

// Difference array with jumps:
// Move K indices at a time.
// Each index belongs to a sequence determined by its
// remainder when divided by K.
