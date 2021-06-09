import "./App.css";
import { useState, createContext, useReducer, useEffect } from "react";

import Clock from "./clock";

import selectMove from "./piecesLogic/selectMove";
import Pawn from "./piecesLogic/pawn";
import Knight from "./piecesLogic/knight";
import Bishop from "./piecesLogic/bishop";
import Rook from "./piecesLogic/rook";
import Queen from "./piecesLogic/queen";
import King from "./piecesLogic/king";

import socketIOClient from "socket.io-client";

let socket;

// socket = socketIOClient("https://rafachess.xyz");

socket = socketIOClient("https://chess-backend-2021-rafa.herokuapp.com/");

export const BoardContext = createContext();
const resetBoard = [
  [-4, -2, -3, -5, -6, -3, -2, -4],
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [4, 2, 3, 5, 6, 3, 2, 4],
];
const initialBoard = [
  [-4, -2, -3, -5, -6, -3, -2, -4],
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [4, 2, 3, 5, 6, 3, 2, 4],
];
//erase this
let prev;
let selectedPiece;
let setBoard = () => console.log("set board");
const reducer = (state, action) => {
  if (action) {
    switch (action.type) {
      case "setOptions":
        return action.payload;
      case "setPreviousBoard":
        prev = action.payload;
      case "setSelectedPiece":
        selectedPiece = action.payload;
    }
  }
};

function App() {
  const [board, dispatch] = useReducer(reducer, initialBoard);
  const [turn, setTurn] = useState("white");
  const [finishedMove, setFinishedMove] = useState(false);

  const [gameStarted, setGameStart] = useState(false);
  const [playerColor, setPlayerColor] = useState("black");
  const [gameRoom, setGameRoom] = useState(0);

  useEffect(() => {
    console.log("pc", playerColor);
    socket.on("move", (data) => {
      console.log(data);
      setTurn(data.turn);
      dispatch({ type: "setOptions", payload: data.board });
    });
    socket.emit("move", {
      board,
      turn,
      gameRoom,
    });

    socket.on("stats", ({ numClients, gameRoom }) => {
      setGameRoom(gameRoom);
      console.log("here", numClients);
      if (numClients === 1) setPlayerColor("white");
      else {
        setGameStart(true);
      }
    });
  }, [finishedMove]);

  const pieces = {
    1: <Pawn color="white" />,
    2: <Knight color="white" />,
    3: <Bishop color="white" />,
    4: <Rook color="white" />,
    5: <Queen color="white" />,
    6: <King color="white" />,
    "-1": <Pawn color="black" />,
    "-2": <Knight color="black" />,
    "-3": <Bishop color="black" />,
    "-4": <Rook color="black" />,
    "-5": <Queen color="black" />,
    "-6": <King color="black" />,
    "?": (
      <span
        className="selectable"
        onClick={(e) =>
          selectMove(
            e,
            prev,
            selectedPiece,
            (setBoard = dispatch),
            setTurn,
            finishedMove,
            setFinishedMove
          )
        }
      >
        &#8855;
      </span>
    ),
    "!": (
      <span
        className="selectable"
        onClick={(e) => {
          selectMove(
            e,
            prev,
            selectedPiece,
            (setBoard = dispatch),
            setTurn,
            finishedMove,
            setFinishedMove
          );
        }}
      >
        &#8855;
      </span>
    ),
  };

  function displayBoard() {
    const check = {};

    if (Array.isArray(board)) {
      const result = board.map((row, indexRow) => {
        let firstColor, secondColor;
        if (indexRow % 2 === 0) {
          firstColor = "white";
          secondColor = "black";
        } else {
          firstColor = "black";
          secondColor = "white";
        }
        return row.map((square, indexSquare) => {
          check[square] = square;
          return (
            <div
              style={{
                transform: (() =>
                  playerColor === "black" ? "rotate(180deg)" : "")(),
              }}
              id={`${indexRow}-${indexSquare}`}
              className={indexSquare % 2 === 0 ? firstColor : secondColor}
            >
              {pieces[square]}
            </div>
          );
        });
      });
      // if there are no ? && !
      // && if there are no kings 6 || -6 -> end game
      if (!check["?"] && !check["!"]) {
        if (!check[6] || !check["-6"]) {
          //dry - change this
          return resetBoard.map((row, indexRow) => {
            let firstColor, secondColor;
            if (indexRow % 2 === 0) {
              firstColor = "white";
              secondColor = "black";
            } else {
              firstColor = "black";
              secondColor = "white";
            }
            return row.map((square, indexSquare) => {
              check[square] = square;
              return (
                <div
                  id={`${indexRow}-${indexSquare}`}
                  className={indexSquare % 2 === 0 ? firstColor : secondColor}
                >
                  {pieces[square]}
                </div>
              );
            });
          });
        }
      }
      return result;
    }
  }

  return (
    <>
      {gameStarted ? (
        <>
          <BoardContext.Provider
            value={{ board, setBoard: dispatch, turn, setTurn, playerColor }}
          >
            <div
              className="chessboard"
              style={{
                transform: (() =>
                  playerColor === "black" ? "rotate(180deg)" : "")(),
              }}
            >
              {displayBoard()}
            </div>
          </BoardContext.Provider>
          <Clock playerColor={playerColor} turn={turn} />
        </>
      ) : (
        <>
          <h1>Wait for your adversary...</h1>
        </>
      )}
    </>
  );
}

export default App;
