//? Friends Pairing Problem (gfg)

// Given n friends, each one can remain single or can be paired up with some other friend. Each friend can be paired only once. Find out the total number of ways in which friends can remain single or can be paired up.

//? Examples:

// Input: n = 3
// Output: 4
// Explanation:
// {1}, {2}, {3} : All single
// {1}, {2,3} : 2 and 3 paired but 1 is single.
// {1,2}, {3} : 1 and 2 are paired but 3 is single.
// {1,3}, {2} : 1 and 3 are paired but 2 is single.
// Note that {1,2} and {2,1} are considered same.

// Input: n = 2
// Output: 2
// Explanation:
// {1} , {2} : All single.
// {1,2} : 1 and 2 are paired.

// Input: n = 1
// Output: 1

//? Constraints:
// 1 ≤ n ≤ 18

//? Thought Process:
// After reading this problem, I was initially confused about how to count all possible ways.
// The key is to focus on ONE friend and ask:

//* "What can this friend do?"
// There are only two possibilities:
// 1. The friend stays SINGLE.
// 2. The friend PAIRS with someone.

// So, I broke the problem into these two cases and tried to find the recurrence.

//? Step 1: Take 1 friend
// If we have only 1 friend, there is only one possibility:
// single = {A}
// So:
// ways(1) = 1

//? Step 2: Take 2 friends
// If we have 2 friends: A, B
// There are two possibilities:
// Case 1: A stays SINGLE
//      A   B
// B also has to stay single.
// So this gives us 1 way.
// Case 2: A pairs with B
//      AB
// This gives us 1 way.
// Therefore:
// ways(2) = 2

//? Step 3: Take 3 friends
// Now take 3 friends: A, B, C
// Again, focus on friend A.
// A has two choices:
//* Case 1: A stays SINGLE
//      A   B   C
// If A stays single,
// then I only need to arrange the remaining n - 1 friends.
// So this gives:
// single = solve(n - 1)
// For n = 3:
// single = solve(2)

//* Case 2: A PAIRS with someone
// A can pair with any one of the remaining friends.
// For 3 friends:
//      A pairs with B
//      AB   C
// or
//      A pairs with C
//      AC   B
// So A has n - 1 choices for a partner.
// After choosing A's partner,
// those two friends are already handled.
// So we are left with n - 2 friends.
// Therefore:
// pair = solve(n - 2)  (n - 1)

//? Why n - 1 for the PAIR case?
// This is the most important part.
// Suppose we have n friends and we focus on friend A.
// A needs to choose exactly ONE partner.
// There are n - 1 other friends available.
// For example, if we have:
//      A B C D
// A can pair with:
//      B
//      C
//      D
// So there are:
// n - 1 choices
// for A's partner.
// After selecting the partner,
// both A and that partner are removed from consideration.
// Therefore, we solve the remaining:
// n - 2 friends.
// So:
// pair = solve(n - 2)  (n - 1)

//? Why n - 1 for the SINGLE case?
// If A stays single,
// I don't need to make any pairing decision for A.
// I simply remove A.
// The remaining friends are:
// n - 1
// So I solve:
// solve(n - 1)
// Therefore:
// single = solve(n - 1)

//? Therefore, the recurrence relation is:
// single = solve(n - 1)
// pair = solve(n - 2)  (n - 1)
// total = single + pair
//* solve(n) = solve(n - 1) + solve(n - 2)  (n - 1)

//? Base Cases:
// solve(1) = 1
// solve(2) = 2


//? DP:
// The recurrence is:
//* solve(n) = solve(n - 1) + solve(n - 2)  (n - 1)
// So the current answer only depends on the previous two answers.
// Therefore, I can use DP to avoid recalculating the same subproblems.
//* dp[i] = number of ways to arrange i friends
// dp[i] = dp[i - 1] + dp[i - 2]  (i - 1)

//? Memoization:
// In the recursive approach,
// solve(n - 1) and solve(n - 2) can lead to the same subproblems being calculated multiple times.
// So I store the result of each solve(n) in dp[n].
// If dp[n] is already calculated,
// I simply return it.
// This reduces the time complexity from exponential to:
//      O(n)
// But the dp array stores n values,
// so the space complexity is:
//      O(n)

//? Bottom-Up DP:
// Instead of recursively calculating solve(n),
// I can build the answer from the smallest cases.
// dp[1] = 1
// dp[2] = 2
// Then for every i from 3 to n:
// dp[i] = dp[i - 1] + dp[i - 2]  (i - 1)
// Finally:
//      return dp[n]
// Time Complexity: O(n)
// Space Complexity: O(n)

//? Space Optimization:
// The recurrence is:
// solve(i) = solve(i - 1) + solve(i - 2)  (i - 1)
// I don't need the entire dp array.
// I only need:
//      solve(i - 1)
//      solve(i - 2)
// So I store only two variables:
// prev1 = solve(i - 1)
// prev2 = solve(i - 2)
// Then:
// ans = prev1 + prev2  (i - 1)
// After calculating the current answer,
// I shift the values:
// prev2 = prev1
// prev1 = ans

//? Space Optimization:
// Normal DP uses O(n) space because we store all dp values.
// But the current value only depends on the previous two values.
// Therefore, we only store those two values.
//* Time Complexity: O(n)
//* Space Complexity: O(1)

//? Code: (Bottom Up Approach)
class Solution {
	countFriendsPairings(n) {
		let dp = new Array(n).fill(undefined);
		const solve = (n) => {
			if (n == 1 || n == 2) {
				return n;
			}
			
			if (dp[n] != undefined) {
				return dp[n];
			}
			
			return dp[n] = solve(n - 1) + solve(n - 2)  (n - 1);
		};
		
		return solve(n);
	}
}

//? Time Complexity: O(n)
//? Space Complexity: O(n)

//? Code: (Top Down Approach)
class Solution {
    countFriendsPairings(n) {
        if (n <= 2) return n;

        let dp = new Array(n + 1).fill(0);

        dp[1] = 1;
        dp[2] = 2;

        for (let i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2]  (i - 1);
        }

        return dp[n];
    }
}

//? Time Complexity: O(n)
//? Space Complexity: O(n)

//? Space Optimized Code: (Top Down Approach) 
// We only need the last two values to calculate the current value, so we can optimize the space complexity to O(1).

class Solution {
	countFriendsPairings(n) {
		if (n <= 2) {
			return n;
		}
		
		let prev1 = 2;
		let prev2 = 1;
		let ans = 0;
		
		for (let i = 3; i <= n; i = i + 1) {
			ans = prev1 + prev2  (i - 1);
			prev2 = prev1;
			prev1 = ans;
		};
		
		return ans;
	}
}

//? Time Complexity: O(n)
//? Space Complexity: O(1)