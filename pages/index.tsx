import Head from "next/head";
import Board from "@/components/Board";
import { useState } from "react";
import { calculateWinner, findBestSquare } from "@/utils/utils";

export default function Home() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: any) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const handleCPUPlay = () => {
    if (calculateWinner(currentSquares)) {
      return;
    }

    const nextSquares = currentSquares.slice();

    const bestSquare = findBestSquare(nextSquares, xIsNext ? "X" : "O");

    if (bestSquare !== -1) {
      nextSquares[bestSquare] = xIsNext ? "X" : "O";

      handlePlay(nextSquares);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="game">
          <div className="game-board">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          </div>
          <div className="game-info">
            <button className="buttonInfo" onClick={() => jumpTo(0)}>
              Reiniciar
            </button>
            <button className="buttonInfo" onClick={handleCPUPlay}>
              Turno CPU
            </button>
          </div>
        </div>
      </main>
    </>
  );
}