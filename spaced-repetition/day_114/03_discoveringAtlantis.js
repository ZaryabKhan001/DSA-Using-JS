//? Discovering Atlantis (gfg)

// Jack and Jelly are on the ship en route to discover Atlantis.
// The distance between their starting point and the city of Atlantis is N kilometers. They take turns manning the ship and each of them can steer the ship for 1, 2 or 4 kilometers** in one turn. This should never exceed the remaining distance.

// If Jelly starts as the captain-in-charge of the ship, find who will be in charge of the ship when they reach Atlantis.

//? Example 1:
// Input: N = 2
// Output: JELLY
// Explanation: Jelly can cover 2 Km in his first turn itself.

//? Thought Process:
// This problem is very simple.
// Just dry run the problem for some values of N and you will find a pattern.
//* N = 1, Jelly can cover 1 Km in his first turn itself. So Jelly will be in charge of the ship when they reach Atlantis.
//* N = 2, Jelly can cover 2 Km in his first turn itself. So Jelly will be in charge of the ship when they reach Atlantis.
//* N = 3, Jelly can only cover 1, 2 and 4 km. So Jelly can cover 1 or 2 km in his first turn. If he covers 1 km, then Jack can cover 2 km in his turn and reach Atlantis. If he covers 2 km, then Jack can cover 1 km in his turn and reach Atlantis. So Jack will be in charge of the ship when they reach Atlantis. 4 is invalid because it exceeds the remaining distance.
//* N = 4, Jelly can cover 4 Km in his first turn itself. So Jelly will be in charge of the ship when they reach Atlantis.
//* N = 5, Jelly can cover 1, 2 and 4 km. So Jelly can cover 1 or 2 or 4 km in his first turn. If he covers 1 km, then Jack can cover 4 km in his turn and reach Atlantis. If he covers 2 km, then Jack can cover 2 km in his turn and reach Atlantis. If he covers 4 km, then Jack can cover 1 km in his turn and reach Atlantis. So Jack will be in charge of the ship when they reach Atlantis.
//* N = 6, Jelly can cover 1, 2 and 4 km. So Jelly can cover 1 or 2 or 4 km in his first turn. If he covers 1 km, then Jack can cover 4 km in his

// Pattern is making sense. If N is divisible by 3, then Jack will be in charge of the ship when they reach Atlantis. Otherwise, Jelly will be in charge of the ship when they reach Atlantis.

//? Code:
class Solution {
    discoveringAtlantis(N) {    
        return (N % 3 == 0) ? "JACK" : "JELLY";
    }
}

//? Time Complexity: O(1) as we are using constant time to find the winner of the game.
//? Space Complexity: O(1) as we are using constant space.