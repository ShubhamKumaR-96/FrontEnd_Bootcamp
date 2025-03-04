import React, { useState } from "react";
import "./Grid.css";
import Card from "../cards/Card";
import isWinner from "../../helper/Winner";

const Grid = ({ numberofCards }) => {
  const [board, setBoard] = useState(Array(numberofCards).fill(""));
  const [turn, setTurn] = useState(true); // true => 0 and false X
  const [Winner, setWinner] = useState(null);

  const play = (index) => {
    if (board[index] !== "" || Winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = turn ? "O" : "X";
    setBoard(newBoard);

    if (isWinner(newBoard, newBoard[index])) {
      setWinner(newBoard[index]);
    } else {
      setTurn(!turn);
    }
  };
  const resetGame = () => {
    setBoard(Array(numberofCards).fill(""));
    setWinner(null);
    setTurn(true);
  };

  return (
    <div className="grid-wrapper">
      {Winner && (
        <>
          <h1 className="turn-highlight">Winner is {Winner}</h1>
          <button className="reset" onClick={resetGame}>
            Reset Game
          </button>
        </>
      )}
      {!Winner && (
        <h1 className="turn-highlight">Current Turn = {turn ? "O" : "X"}</h1>
      )}
      <div className="grid">
        {board.map((val, idx) => (
          <Card key={idx} onPlay={play} player={val} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
