//? Josephus problem (gfg)

// You are playing a game with n people standing in a circle, numbered from 1 to n. Starting from person 1, every kth person is eliminated in a circular fashion. The process continues until only one person remains.
// Given integers n and k, return the position (1-based index) of the person who will survive.

//? Examples :

// Input: n = 5, k = 2
// Output: 3
// Explanation: Firstly, the person at position 2 is killed, then the person at position 4 is killed, then the person at position 1 is killed.
// Finally, the person at position 5 is killed. So the person at position 3 survives.

// Input: n = 7, k = 3
// Output: 4
// Explanation: The elimination order is 3 → 6 → 2 → 7 → 5 → 1, and the person at position 4 survives.

//? Constraints:
// 1 ≤ n, k ≤ 500

//? Approach 01:
// 1. We can create an array of size n and fill it with numbers from 1 to n.
// 2. We can use a variable count to keep track of the number of people eliminated.
// 3. We can use a for loop to iterate through the array and eliminate every kth person.
// 4. When the count reaches k, we can remove the person from the array and reset the count to 0.
// 5. We can continue this process until only one person remains in the array.
// 6. Finally, we can return the position of the last remaining person.

//? Code:
class Solution {
	josephus(n, k) {
		let arr = Array.from({length: n}, (_, idx) => idx + 1);
		
		let count = 0;
		for (let i = 0; i < arr.length; i = (arr.length + i + 1) % arr.length) {
			if (arr.length == 1) {
				return arr[0];
			}
			
			if (count == k - 1) {
				arr.splice(i, 1);
				i--; // back to original
				count = 0;
			}
			else {
				count++;
			}
		}
		
	}
}

//? Time Complexity: O(n*k)
//? Space Complexity: O(n)

//? Approach 02:
// 1. We can use recursion to solve this problem.
// 2. We can define a recursive function that takes n and k as parameters.
// 3. If n is 1, we can return 0 (base case).
// 4. Otherwise, we can return (recursive(n - 1, k) + k) % n.
// 5. Finally, we can return the result of the recursive function + 1 (to convert from 0-based index to 1-based index).

//? Code:
class Solution {
	josephus(n, k) {
		let arr = Array.from({length: n}, (_, index) => index + 1);
		
		const solve = (arr, index) => {
			if (arr.length == 1) {
				return arr[0];
			}
			
			let removedIndex = (index + k - 1) % arr.length;
			arr.splice(removedIndex, 1);
			
			return solve(arr, removedIndex);
		};
		
		return solve(arr, 0);
	}
}

//? Time Complexity: O(n)
//? Space Complexity: O(n) (due to recursion stack)