//? Painting the Fence (gfg)

// Given a fence with n posts and k colours, find out the number of ways of painting the fence so that not more than two consecutive posts have the same colours.
// Answers are guaranteed to be fit into a 32 bit integer.

//? Examples:

// Input: n = 3, k = 2
// Output: 6
// Explanation: Let the 2 colours be 'R' and 'B'. We have following possible combinations:
// 1. RRB
// 2. RBR
// 3. RBB
// 4. BRR
// 5. BRB
// 6. BBR

// Input: n = 2, k = 4
// Output: 16
// Explanation: After coloring first post with 4 possible combinations, you can still color next posts with all 4 colors. Total possible combinations will be 4x4=16

//? Constraints:
// 1 ≤ n ≤ 300
// 1 ≤ k ≤ 105

//? Thought Process:
// After reading this problem, I was clueless.
// The problem statement is easy to understand, but thinking of the solution is hard.
// So, I simply broke the problem into smaller cases and tried to find a pattern.

//? Step 1: Take 1 post
// For 1 post, we have k choices because we can paint it with any of the k colors.

// ways(1) = k


//? Step 2: Take 2 posts
// For 2 posts, there are two cases:

// Case 1: Both posts have the SAME color
// First post has k choices, and the second post must have the same color.
// So:
// same = k

// Case 2: Both posts have DIFFERENT colors
// First post has k choices.
// Second post has k - 1 choices because it must be different from the first.
// So:
// diff = k * (k - 1)

// Therefore:
// ways(2) = k + (k * (k - 1))


//? Step 3: Take 3 posts
// For 3 posts, we can think about the last two posts.

// If the last two posts are SAME:
//      ... R R
// Then the post before them MUST be different:
//      B R R

// So, to create this case, I take a valid solution for n - 2 posts
// and add the same color twice.

// If the last two posts are DIFFERENT:
//      ... R B
// Then I can take any valid solution for n - 1 posts
// and add one new post with a different color.

// This gives us the recurrence for n >= 3.

//? Why n - 2 for SAME case?
// This is the most important part.

// If the last two posts are the same:

//      ... X X

// I cannot simply solve n - 1 and add X,
// because I need to make sure that the previous post is NOT X.

// For example:

//      R R R  ❌

// is not allowed.

// Therefore, when I decide that the last two posts are the same,
// I treat those TWO posts as a pair and go back to n - 2.

// From the n - 2 solution, I can choose any of the k colors
// for those two posts.

// So:

// same = solve(n - 2) * k

//? Why n - 1 for DIFFERENT case?
// If the last two posts are different:

//      ... X Y

// I only need to add ONE new post.

// I take any valid solution for n - 1 posts,
// look at its last color,
// and choose any different color for the new post.

// There are k - 1 choices.

// So:

// diff = solve(n - 1) * (k - 1)


//? Therefore, the recurrence relation is:
// same = solve(n - 2) * k
// diff = solve(n - 1) * (k - 1)

// total = same + diff
//
// solve(n) = solve(n - 2) * k + solve(n - 1) * (k - 1)


//? Base Cases:
// solve(1) = k

// solve(2) = k + (k * (k - 1))


//? Example:
// k = 3 colors: R, G, B

// If the last two posts are SAME:

//      ... R R
//      ... G G
//      ... B B

// There are k choices for the color.

// If the last two posts are DIFFERENT:

//      If previous color is R:
//          G or B  -> k - 1 choices

//      If previous color is G:
//          R or B  -> k - 1 choices

//      If previous color is B:
//          R or G  -> k - 1 choices


//? DP:
// This recurrence only depends on the previous two values:

// solve(n) = solve(n - 2) * k + solve(n - 1) * (k - 1)

// So, instead of storing the entire DP array,
// I only need the last two values.

// prev2 = solve(i - 2)
// prev1 = solve(i - 1)

// ans = prev2 * k + prev1 * (k - 1)

// Then shift:

// prev2 = prev1
// prev1 = ans


//? Space Optimization:
// Normal DP would use O(n) space because we store all values.

// But since we only need the previous two values,
// we can store only those two values.

// Time Complexity:  O(n)
// Space Complexity: O(1)


//? Important Interview Intuition:
// If the last two posts are SAME:
//     I need to look back 2 posts.
//     Therefore -> n - 2

// If the last two posts are DIFFERENT:
//     I only need to look back 1 post.
//     Therefore -> n - 1

// The key idea is:
// "How many posts am I adding at the end?"

// SAME     -> add 2 posts -> n - 2
// DIFFERENT -> add 1 post  -> n - 1


//? Final Recurrence:
// solve(n) = solve(n - 2) * k + solve(n - 1) * (k - 1)

// This is similar to Fibonacci because the current answer
// depends only on the previous two answers.
// But it is NOT exactly Fibonacci because the previous values
// are multiplied by k and (k - 1).
 

//? Code: (Bottom Up Approach)
class Solution {
	countWays(n, k) {
		let dp = new Array(n).fill(undefined);
		const solve = (n) => {
			if (n == 1) {
				return k;
			}
			if (n == 2) {
				return k + (k * (k - 1));
			}
			
			if (dp[n] != undefined) {
				return dp[n];
			}
			
			const same = solve(n - 2) * (k - 1);
			const diff = solve(n - 1) * (k - 1);
			
			return dp[n] = same + diff;
		};
		
		return solve(n);
	}
}

//? Time Complexity: O(n)
//? Space Complexity: O(n) for dp array and O(n) for recursion stack

//? Code: (Top Down Approach)
class Solution {
	countWays(n, k) {
		let dp = new Array(n + 1).fill(undefined);
		dp[1] = k;
		dp[2] = k + (k * (k - 1)); ;
		
		for (let i = 3; i <= n; i = i + 1) {
			dp[i] = dp[i - 2] * (k - 1) + dp[i - 1] * (k - 1);
		}
		
		return dp[n];
	};
}

//? Time Complexity: O(n)
//? Space Complexity: O(n)

//? Space Optimization:
// We don't need to store all the values of dp array, we can just store the last two values and calculate the next value using them.
// It only works in tabuar approach because we are calculating the values in a bottom up manner and we are only using the last two values to calculate the next value.

//? Code: (Space Optimized Approach)
/**
* @param {number} n
* @param {number} k
* @return s {number}
*/
class Solution {
	countWays(n, k) {
		let prev1 = k + (k * (k - 1));
		let prev2 = k;
		let ans = 0;
		
		if (n == 1) {
			return prev2;
		}
		if (n == 2) {
			return prev1;
		}
		
		for (let i = 3; i <= n; i = i + 1) {
			ans = prev2 * (k - 1) + prev1 * (k - 1);
			prev2 = prev1;
			prev1 = ans;
		}
		
		return ans;
	};
}

//? Time Complexity: O(n)
//? Space Complexity: O(1)