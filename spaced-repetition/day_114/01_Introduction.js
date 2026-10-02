//? Why Game Theory:
// Predict the winner of the game without actually playing the Game.
// Game theory in general has very vasr applications.
// Majorly focuses on optimal Decision Making.

//? Type of Games:
// Combinatorial Games: Two players take turns to make a move. The game ends when there are no more moves left. The player who cannot make a move loses the game.
// The game ends in a finite number of moves. There is no chance involved in the game. Both players have complete information about the game.
// Only three states are possible in combinatorial games: Win, Lose, or Draw. The game is played optimally by both players.

//? Combinatorial Games Types:
// 1. Impartial Games: The available moves depend only on the state of the game and not on which player is currently moving. Both players have the same set of available moves from any given position.
// 2. Partisan Games: The available moves depend on which player is currently moving. Each player has their own set of available moves from any given position. For example, in chess, the moves available to a player depend on the pieces they control and their position on the board. black player can only move black pieces, and white player can only move white pieces. The available moves for each player are different, and the game is not impartial.

//? How to play optimally?
// Every player will try to make their opponent lose.

//? States:
// Win State: If the current player can give a losing state to the opponent.
// Lose State: If the current player cannot have a chance to give a losing state to the opponent.

//? General Rule:
// If the current player can make a move that forces the opponent into a losing state, then the current player is in a winning state.

//* Current State
// Next State       // Next State       // Next State
// If you are at current state, and next all states are winning states for your opponent, then you are in a losing state.
// If you are at current state, and next at least one state is a losing state for your opponent, then you cleverly give losing states to your opponent, then you are in a winning state.

//? There are two types of impartial games:
// Simple Game: Like array game and discovering atlantis game. In these games, the player can make a move that directly affects the state of the game. The player can choose to remove a certain number of objects from a pile or make a move that changes the configuration of the game board. The player can also choose to pass their turn if they cannot make a move.
// Composite Game: Multiple simple game are played together. This type of game can be easily solved  using Sprague Grundy Theorem.
