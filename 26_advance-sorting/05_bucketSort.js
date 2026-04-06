//? Bucket Sort — Notes

// Bucket Sort is a sorting algorithm that:

//* Distributes elements into multiple buckets
//* Sorts each bucket individually
//* Concatenates all buckets to get the final sorted array

// Works best when data is uniformly distributed over a range

// ## ⚙️ How It Works (Steps)

// 1. Create `k` empty buckets
// 2. Put each element into a bucket based on a formula
// 3. Sort each bucket (usually using insertion sort)
// 4. Merge all buckets

//? Use when:
//* Data is uniformly distributed
//* Range is known (e.g., 0 to 1, or small range)
//* Input is mostly floating-point numbers

//? Avoid when:

//* Data is not uniformly distributed
//* Range is very large
//* Data is integers with huge gaps
//* Too many empty buckets → wasted space

//? Code:
function bucketSort(arr) {
  let n = arr.length;
  if (n <= 0) return arr;

  // Step 1: Create buckets
  let buckets = Array.from({ length: n }, () => []);

  // Step 2: Insert elements into buckets
  for (let i = 0; i < n; i++) {
    let index = Math.floor(n * arr[i]); // assuming values in range [0,1)
    buckets[index].push(arr[i]);
  }

  // Step 3: Sort each bucket
  for (let i = 0; i < n; i++) {
    buckets[i].sort((a, b) => a - b);
  }

  // Step 4: Concatenate buckets
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(...buckets[i]);
  }

  return result;
}

//? Time Complexity
// | Average: O(n + k)
// | Worst Case: O(n²)

//* Worst case happens when all elements go into one bucket

//? Space Complexity
// O(n + k)
// Where: `n` = number of elements, `k` = number of buckets
