import Board from "@/components/Board";
import { agentCPU, calculateWinner } from "@/utils/utils";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  // const [history, setHistory] = useState([Array(9).fill(null)]);
  const [disabled, setDisabled] = useState(true);
  const [xIsNext, setXIsNext] = useState<boolean | null>(true);
  const [currentSquares, setCurrentSquares] = useState(Array(9).fill(null));

  const handlePlay = (nextSquares: any) => {
    setCurrentSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleCPUPlay = () => {
    if (calculateWinner(currentSquares)) {
      return;
    }

    const nextSquares = currentSquares.slice();

    const bestSquare = agentCPU.act(nextSquares) as number;

    if (bestSquare !== -1) {
      nextSquares[bestSquare] = xIsNext ? "X" : "O";

      handlePlay(nextSquares);
    }
  };

  const handleCPU = (mark: string) => {
    agentCPU.act(mark);
    if (mark === "X") {
      const nextSquares = currentSquares.slice();
      const bestSquare = agentCPU.act(nextSquares) as number;

      if (bestSquare !== -1) {
        nextSquares[bestSquare] = xIsNext ? "X" : "O";
        handlePlay(nextSquares);
      }
    }
    setDisabled(false);
  };

  useEffect(() => {
    if (
      (agentCPU.mark === "X" && xIsNext) ||
      (agentCPU.mark === "O" && !xIsNext)
    ) {
      handleCPUPlay();
    }
  }, [xIsNext]);

  return (
    <>
      <Head>
        <title>Triqui</title>
        <meta name="description" content="Triqui para sistemas inteligentes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="game">
          <div className="game-board">
            <Board
              isDisabled={disabled}
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          </div>
          <div className="game-info">
            <button
              className="buttonInfo"
              onClick={() => {
                setCurrentSquares(Array(9).fill(null));
                agentCPU.act("");
                setDisabled(true);
                setXIsNext(true);
              }}
            >
              Reiniciar
            </button>
            <button
              className={disabled ? "disabled" : "noUse"}
              onClick={() => handleCPU("X")}
            >
              CPU juega con X
            </button>
            <button
              className={disabled ? "disabled" : "noUse"}
              onClick={() => handleCPU("O")}
            >
              CPU juega con O
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
