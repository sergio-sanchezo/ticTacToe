export function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const minimax = (squares: string[] | null[], isMaximizing: boolean) => {
  const winner = calculateWinner(squares);
  if (winner === "X") {
    return -1;
  } else if (winner === "O") {
    return 1;
  } else if (winner === "tie") {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = "O";
        bestScore = Math.max(bestScore, minimax(squares, false));
        squares[i] = null;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    let moveFound = false;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        moveFound = true;
        squares[i] = "X";
        bestScore = Math.min(bestScore, minimax(squares, true));
        squares[i] = null;
      }
    }
    if (!moveFound) {
      // no hay ningún movimiento posible, el juego termina en empate
      return 0;
    }
    return bestScore;
  }
};

function isBoardFilled(squares: any) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      return false;
    }
  }
  return true;
}

export function findBestSquare(squares: any, player: any) {
  // 'player' is the maximizing player
  // 'opponent' is the minimizing player
  const opponent = player === "X" ? "O" : "X";

  const minimax = (squares: any, isMax: Boolean) => {
    const winner = calculateWinner(squares);

    // If player wins, score is +1
    if (winner === player) return { square: -1, score: 1 };

    // If opponent wins, score is -1
    if (winner === opponent) return { square: -1, score: -1 };

    // If Tie, score is 0
    if (isBoardFilled(squares)) return { square: -1, score: 0 };

    // Initialize 'best'. If isMax, we want to maximize score, and minimize otherwise.
    const best = { square: -1, score: isMax ? -1000 : 1000 };

    // Loop through every square on the board
    for (let i = 0; i < squares.length; i++) {
      // If square is already filled, it's not a valid move so skip it
      if (squares[i]) {
        continue;
      }

      // If square is unfilled, then it's a valid move. Play the square.
      squares[i] = isMax ? player : opponent;
      // Simulate the game until the end game and get the score,
      // by recursively calling minimax.
      const score = minimax(squares, !isMax).score;
      // Undo the move
      squares[i] = null;

      if (isMax) {
        // Maximizing player; track the largest score and move.
        if (score > best.score) {
          best.score = score;
          best.square = i;
        }
      } else {
        // Minimizing opponent; track the smallest score and move.
        if (score < best.score) {
          best.score = score;
          best.square = i;
        }
      }
    }

    // The move that leads to the best score at end game.
    return best;
  };

  // The best move for the 'player' given current board
  return minimax(squares, true).square;
}
