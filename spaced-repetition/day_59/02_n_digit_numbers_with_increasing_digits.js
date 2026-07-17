//? N-Digit Numbers with Increasing Digits (gfg)

// Given an integer n, return all the n digit numbers in increasing order, such that their digits are in strictly increasing order(from left to right).

//? Examples :

// Input: n = 1
// Output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// Explanation: Single digit numbers are considered to be strictly increasing order.

// Input: n = 2
// Output: [12, 13, 14, 15, 16, 17, 18, 19, 23....79, 89]
// Explanation: For n = 2, the correct sequence is 12 13 14 15 16 17 18 19 23 and so on up to 89.

// Input: n = 15
// Output: []
// Explanation: No such number exist. 

//? Constraints:
// 1 ≤ n ≤ 105

//? Approach:
// recursive backtracking approach is used to generate all the n digit numbers with increasing digits. The function `solve` is defined to explore all possible combinations of digits from 1 to 9, ensuring that each subsequent digit is greater than the previous one. The base case checks if the required number of digits has been reached, at which point the current combination is added to the result list. The function handles the special case for n = 1 separately, returning all single-digit numbers from 0 to 9.

//? Code:
class Solution {
	increasingNumbers(n) {
		if (n == 1) {
			return Array.from({length: 10}, (_, index) => index);
		}
		
		let result = [];
		const solve = (n, output, start) => {
			// base case
			if (n == 0) {
				result.push(output);
				return;
			}
			
			// explore choices
			for (let i = start; i <= 9; i = i + 1) {
				solve(n - 1, output + i, i + 1);
			}
		};
		
		solve(n, [], 1);
		return result;
	}
}

//? Time Complexity: O(number of valid answers × n)
//? Space including output: O(number of valid answers × n)