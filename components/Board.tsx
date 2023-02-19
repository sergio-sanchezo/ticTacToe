import { calculateWinner } from "@/utils/utils";
import { message } from "antd";
import { useEffect, useState } from "react";

//@ts-ignore
const Board = ({ xIsNext, squares, onPlay, isDisabled }) => {
  const [status, setStatus] = useState("");

  const handleClick = (i: any) => {
    if (calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (nextSquares[i] !== null) {
      message.error({ content: "Movimiento ilegal", key: "loading" });
    } else {
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }

      onPlay(nextSquares);
    }
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus("Ganador: " + winner);
    } else {
      setStatus("Turno actual: " + (xIsNext ? "X" : "O"));
    }
  }, [squares]);

  return (
    <>
      <div className="status">{status}</div>
      {isDisabled && (
        <p style={{ fontStyle: "italic", marginBottom: 10 }}>
          Por favor seleccionar modo de CPU
        </p>
      )}

      <div className="board-row">
        <button
          className="square"
          disabled={isDisabled}
          onClick={() => handleClick(0)}
        >
          {squares[0]}
        </button>
        <button
          className="square"
          disabled={isDisabled}
          onClick={() => handleClick(1)}
        >
          {squares[1]}
        </button>
        <button
          className="square"
          disabled={isDisabled}
          onClick={() => handleClick(2)}
        >
          {squares[2]}
        </button>
      </div>
      <div className="board-row">
        <button
          className="square"
          disabled={isDisabled}
          onClick={() => handleClick(3)}
        >
          {squares[3]}
        </button>
        <button
          className="square"
          disabled={isDisabled}
          onClick={() => handleClick(4)}
        >
          {squares[4]}
        </button>
        <button
          className="square"
          disabled={isDisabled}
          onClick={() => handleClick(5)}
        >
          {squares[5]}
        </button>
      </div>
      <div className="board-row">
        <button
          className="square"
          disabled={isDisabled}
          onClick={() => handleClick(6)}
        >
          {squares[6]}
        </button>
        <button
          className="square"
          disabled={isDisabled}
          onClick={() => handleClick(7)}
        >
          {squares[7]}
        </button>
        <button
          className="square"
          disabled={isDisabled}
          onClick={() => handleClick(8)}
        >
          {squares[8]}
        </button>
      </div>
    </>
  );
};

export default Board;
