//? Print N-bit binary numbers having more 1s than 0s (gfg)

// Given a positive integer n. Your task is to generate a string list of all n-bit binary numbers where, for any prefix of the number, there are more or an equal number of 1's than 0's. The numbers should be sorted in decreasing order of magnitude.

//? Example 1:

// Input:
// n = 2
// Output:
// {"11", "10"}
// Explanation: Valid numbers are those where each prefix has more 1s than 0s:
// 11: all its prefixes (1 and 11) have more 1s than 0s.
// 10: all its prefixes (1 and 10) have more 1s than 0s.
// So, the output is "11, 10".

//? Example 2:

// Input:
// n = 3
// Output:
// {"111", "110", "101"}
// Explanation: Valid numbers are those where each prefix has more 1s than 0s.
// 111: all its prefixes (1, 11, and 111) have more 1s than 0s.
// 110: all its prefixes (1, 11, and 110) have more 1s than 0s.
// 101: all its prefixes (1, 10, and 101) have more 1s than 0s.
// So, the output is "111, 110, 101".
// User Task:
// Your task is to complete the function NBitBinary() which takes a single integer n as input and returns the list of strings in decreasing order. You need not take any input or print anything.

//? Constraints:
// 1 <= n <= 15

//? Approach:
// 1. We can use a recursive function to generate all possible binary strings of length n.
// 2. We will keep track of the number of 1s and 0s in the current string.
// 3. If at any point the input becomes 0, we will return the current string as a valid binary number.
// 4. When the number of 1s is equal to the number of 0s, we can only add a 1 to the current string. Otherwise, we can add either a 0 or a 1.
// 5. Finally, we will sort the result list in decreasing order and return it.

//? Code:
class Solution {
	NBitBinary(n) {
		const result = [];
		
		const recursive = (input, output, ones, zeros) => {
			if (input == 0) {
				result.push(output);
				return;
			}
			
			if (ones == zeros) {
				recursive(input - 1, output + '1', ones + 1, zeros);
			}
			else {
				recursive(input - 1, output + '1', ones + 1, zeros);
				recursive(input - 1, output + '0', ones, zeros + 1);
			}
		}
		
		recursive(n, '', 0, 0);
		return result;
	}
}

//? Time Complexity: O(n * 2^n) where n is for string concatentaion and 2^n is for generating all possible binary strings of length n
//? Space Complexity: O(n * 2n) where n is the length of the string and 2^n is for storing all possible binary strings of length n 