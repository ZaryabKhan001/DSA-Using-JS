//? First of all let's understand XOR Operation.

// XOR (exclusive OR) is a bitwise operation that returns 1 if the bits are different and 0 if they are the same.

// For example:
// 0 XOR 0 = 0
// 0 XOR 1 = 1
// 1 XOR 0 = 1
// 1 XOR 1 = 0

// A = 1011010
// B = 0111001
// Result = A XOR B = 1100011

//* One interesting thing for XOR operation is that it is commutative and associative. This means that the order of the operands does not matter, and we can group them in any way we want.
// And when multiple XOR operations are performed, the result will be the same regardless of the order in which they are performed.

// If we XOR Even numbers of 1's, the result will be 0.
// If we XOR Odd numbers of 1's, the result will be 1.

//* For example:
// 1011010
// 0111001
// 0001001
// 1011011
// Result = 0110001

//* If we XOR all the above numbers, the result will be 1. But if we XOR the first three numbers, the result will be 0. And if we XOR the last two numbers, the result will be 0. So, the order of the operands does not matter.

//? Minimum Excludant (Mex)
// Mex is the smallest non-negative number (>= 0) which is not present in the set.
// Mex denotes the First move that you can not play.

// mex({}) => 0
// mex({0, 1, 2}) => 3
// mex({0, 2, 3}) => 1
// mex({1, 2, 3}) => 0
// mex({0, 1}) => 2
// mex({0, 2, 4}) => 1
// mex({0, 1, 2, 3, 4, 5, ......, x}) => x + 1

//? How to calculate Mex of a set?
// To calculate the Mex of a set, we can follow these steps:
// 1. Sort the set in ascending order.
// 2. Initialize a variable `mex` to 0.
// 3. Iterate through the sorted set and check if the current element is equal to `mex`. If it is, increment `mex` by 1. If it is not, break the loop and return `mex`.

// For example:
// Set = {0, 1, 2, 4}
// Sorted Set = {0, 1, 2, 4}
// mex = 0
// Iterating through the sorted set:
// - Current element = 0, mex = 0 => Increment mex to 1
// - Current element = 1, mex = 1 => Increment mex to 2
// - Current element = 2, mex = 2 => Increment mex to 3
// - Current element = 4, mex = 3 => Break the loop and return mex = 3

//? Why Mex is important in Game Theory?
// Because Mex gives us the first move, that we cannot play. And in Game Theory, we want to find the winning strategy for a player. So, if we know the Mex of a set, we can find the winning strategy for a player.

//? Grundy Numbers (Nimbers)
// Grundy numbers / Nimbers are used to define a game state.
//* Why are Grundy numbers important?
// Because impartial games can be easily solved using Sprague Grundy Theorem. And this theorem uses Grundy Numbers.

//? How to calculate Grundy Numbers?
// To calculate Grundy numbers, we can follow these steps:
// 1. For each game state, find the set of all possible moves.
// 2. For each move, find the Grundy number of the resulting game state.
// 3. Calculate the Mex of the set of Grundy numbers obtained in step 2. This Mex is the Grundy number of the current game state.

//? Let's take an example of Discovering Atlantis.
// In this game, we have two players, Jack and Jelly. They take turns manning the ship and each of them can steer the ship for 1, 2 or 4 kilometers in one turn. The distance between their starting point and the city of Atlantis is N kilometers. This should never exceed the remaining distance.

//? Now if we take N = 5, then the possible moves for current player are:
// 1. Move 1 km => Remaining distance = 4 km
// 2. Move 2 km => Remaining distance = 3 km
// 3. Move 4 km => Remaining distance = 1 km

//? Now we can calculate the Grundy numbers for each of the remaining distances:
// For remaining distance = 4 km, the possible moves are:
// 1. Move 1 km => Remaining distance = 3 km
// 2. Move 2 km => Remaining distance = 2 km
// 3. Move 4 km => Remaining distance = 0 km

// For remaining distance = 3 km, the possible moves are:
// 1. Move 1 km => Remaining distance = 2 km
// 2. Move 2 km => Remaining distance = 1 km
// 3. Move 4 km => Invalid move

// For remaining distance = 2 km, the possible moves are:
// 1. Move 1 km => Remaining distance = 1 km
// 2. Move 2 km => Remaining distance = 0 km
// 3. Move 4 km => Invalid move

// For remaining distance = 1 km, the possible moves are:
// 1. Move 1 km => Remaining distance = 0 km
// 2. Move 2 km => Invalid move
// 3. Move 4 km => Invalid move

// For remaining distance = 0 km, the possible moves are:
// No possible moves

//? Now we can calculate the Grundy numbers for each of the remaining distances:
// For remaining distance = 0 km, Grundy number = mex({}) = 0
// For remaining distance = 1 km, Grundy number = mex({0}) = 1
// For remaining distance = 2 km, Grundy number = mex({1, 0}) = 2
// For remaining distance = 3 km, Grundy number = mex({2, 1}) = 0
// For remaining distance = 4 km, Grundy number = mex({0, 2, 1}) = 3
// For remaining distance = 5 km, Grundy number = mex({3, 0, 2}) = 1

//? Now we can see that the Grundy numbers for each of the remaining distances are:
// Remaining distance = 0 km => Grundy number = 0
// Remaining distance = 1 km => Grundy number = 1
// Remaining distance = 2 km => Grundy number = 2
// Remaining distance = 3 km => Grundy number = 0
// Remaining distance = 4 km => Grundy number = 3
// Remaining distance = 5 km => Grundy number = 1

//* For N = 5, the Grundy number is 1. Since the Grundy number is not 0, it means that the current player (Jelly) has a winning strategy. Therefore, Jelly will be in charge of the ship when they reach Atlantis.

//? Programmatically we can calculate the Grundy numbers like below:
function mex(values) {
    const set = new Set(values);

    let mexValue = 0;
    while (set.has(mexValue)) {
        mexValue++;
    }

    return mexValue;
};

const getNextStates = (state) => {
    return [state - 1, state - 2, state - 4].filter(nextState => nextState >= 0);
}

function calculateNimber(state) {
    const memo = new Map();

    const solve = (state) => {
        const key = JSON.stringify(state);

        // Already calculated
        if (memo.has(key)) {
            return memo.get(key);
        }

        // Calculate nimbers of all reachable states
        const nextNimbers = [];
        for (const nextState of getNextStates(state)) {
            nextNimbers.push(solve(nextState));
        }

        // Current state's nimber
        const nimber = mex(nextNimbers);
        memo.set(key, nimber);

        return nimber;
    };

    return solve(state);
};

console.log(calculateNimber(5)); // Output: 1

//? Now, what is Sprague-Grundy Theorem?
// We can predict the winner of impartial games using Sprague Grundy Theorem.

// For a composite game, It is a winning state, if the XOR of the Grundy numbers of all the reachable positions is not equal to 0. Otherwise, it is a losing state.

//? Steps:
// Break the composite game into sub-games.
// Calculate the Grundy number for each sub-game.
// XOR all the Grundy numbers of the sub-games.
// If the result is 0, then the current player is in a losing position. Otherwise, the current player is in a winning position.