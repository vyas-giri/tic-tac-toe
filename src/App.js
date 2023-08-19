import React, {Fragment} from "react";
import { useState } from "react";
import "./styles.css";

function Square({value, onSquareClick}) {

  return (<button onClick={onSquareClick} className="square border-white bg-black text-white">{value}</button>);

}


function Board({xisnext, squares, onPlay}) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquare = squares.slice();
    if (xisnext) {
      nextSquare[i] = "X";
    }
    else {
      nextSquare[i] = "O";
    }
    onPlay(nextSquare);
  }

  const winner = calculateWinner(squares);
  let stat;
  if (winner) {
    stat = "Winner: " +  winner;
  }
  else {
    stat = "Next player: " + (xisnext ? "X" : "O");
  }

  return (
    <Fragment>
    <div className="status text-white">{stat}</div>
    <div className="board-row flex">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
    </Fragment>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xisnext = currentMove % 2 === 0;

  function handlePlay (nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move)=>{
    let description;
    if (move>0) {
      description = "Go to move #" + move;
    }
    else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button className="text-white underline underline-offset-2" onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xisnext = {xisnext} squares = {currentSquares} onPlay = {handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      
      return squares[a];
  }
  return null;
  }}
