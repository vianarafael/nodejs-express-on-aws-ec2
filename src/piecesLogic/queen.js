import { Piece } from "../piecesStyles";
import { useContext } from "react";
import { BoardContext } from "../App";

const Queen = ({ color }) => {
  const { board, setBoard, turn, setTurn, playerColor } =
    useContext(BoardContext);

  function moveQueen(e) {
    const [x, y] = e.target.parentNode.parentNode.id.split("-");
    const prevBoard = board.map(function (arr) {
      return arr.slice();
    });
    prevBoard[x][y] = 0;
    setBoard({ type: "setPreviousBoard", payload: prevBoard });
    setBoard({
      type: "setSelectedPiece",
      payload: { piece: "queen", color },
    });
    QueenOpions(x, y);
  }

  function QueenOpions(x, y) {
    x = Number(x);
    y = Number(y);
    if (color === "white") {
      let up = [];
      let right = [];
      let down = [];
      let left = [];
      let counter = 1;
      let tempX = x;

      while (board[tempX - 1] && board[tempX - 1][y] < 1 && counter < 2) {
        up.push([tempX - 1, y]);
        if (board[tempX - 1][y] < 0) counter++;
        tempX--;
      }

      let tempY = y;
      counter = 1;
      while (board[x][tempY + 1] < 1 && counter < 2) {
        right.push([x, tempY + 1]);
        if (board[x][tempY + 1] < 0) counter++;
        tempY++;
      }

      tempX = x;
      counter = 1;
      // same as above
      while (board[tempX + 1] && board[tempX + 1][y] < 1 && counter < 2) {
        down.push([tempX + 1, y]);
        if (board[tempX + 1][y] < 0) counter++;
        tempX++;
      }

      tempY = y;
      counter = 1;

      while (board[x][tempY - 1] < 1 && counter < 2) {
        left.push([x, tempY - 1]);
        if (board[x][tempY - 1] < 0) counter++;
        tempY--;
      }
      // Bishop Logic

      tempX = x;
      tempY = y;
      let leftUp = [];
      counter = 1;
      while (
        board[tempX - 1] &&
        board[tempX - 1][tempY - 1] < 1 &&
        counter < 2
      ) {
        if (board[tempX - 1][tempY - 1] < 0) counter++;
        leftUp.push([tempX - 1, tempY - 1]);
        tempX--;
        tempY--;
      }

      tempX = x;
      tempY = y;
      let rightUp = [];
      counter = 1;
      while (
        board[tempX - 1] &&
        board[tempX - 1][tempY + 1] < 1 &&
        counter < 2
      ) {
        if (board[tempX - 1][tempY + 1] < 0) counter++;
        rightUp.push([tempX - 1, tempY + 1]);
        tempX--;
        tempY++;
      }

      tempX = x;
      tempY = y;
      let leftDown = [];
      counter = 1;
      while (
        board[tempX + 1] &&
        board[tempX + 1][tempY - 1] < 1 &&
        counter < 2
      ) {
        if (board[tempX + 1][tempY - 1] < 0) counter++;
        leftDown.push([tempX + 1, tempY - 1]);
        tempX++;
        tempY--;
      }

      tempX = x;
      tempY = y;
      let rightDown = [];
      counter = 1;
      while (
        board[tempX + 1] &&
        board[tempX + 1][tempY + 1] < 1 &&
        counter < 2
      ) {
        if (board[tempX + 1][tempY + 1] < 0) counter++;
        rightDown.push([tempX + 1, tempY + 1]);
        tempX++;
        tempY++;
      }
      selectOptionsQueen(x, y, [
        up,
        right,
        down,
        left,
        leftUp,
        rightUp,
        leftDown,
        rightDown,
      ]);
    } else {
      let up = [];
      let right = [];
      let down = [];
      let left = [];
      let counter = 1;
      let tempX = x;

      while (board[tempX + 1] && board[tempX + 1][y] > -1 && counter < 2) {
        up.push([tempX + 1, y]);
        if (board[tempX + 1][y] > 0) counter++;
        tempX++;
      }

      let tempY = y;
      counter = 1;
      while (board[x][tempY - 1] > -1 && counter < 2) {
        right.push([x, tempY - 1]);
        if (board[x][tempY - 1] > 0) counter++;
        tempY--;
      }

      tempX = x;
      counter = 1;
      while (board[tempX - 1] && board[tempX - 1][y] > -1 && counter < 2) {
        down.push([tempX - 1, y]);
        if (board[tempX - 1][y] > 0) counter++;
        tempX--;
      }

      tempY = y;
      counter = 1;

      while (board[x][tempY + 1] > -1 && counter < 2) {
        left.push([x, tempY + 1]);
        if (board[x][tempY + 1] > 0) counter++;
        tempY++;
      }

      // Bishop Logic

      tempX = x;
      tempY = y;
      let leftUp = [];
      counter = 1;
      while (
        board[tempX + 1] &&
        board[tempX + 1][tempY + 1] > -1 &&
        counter < 2
      ) {
        if (board[tempX + 1][tempY + 1] > 0) counter++;
        leftUp.push([tempX + 1, tempY + 1]);
        tempX++;
        tempY++;
      }

      tempX = x;
      tempY = y;
      let rightUp = [];
      counter = 1;
      while (
        board[tempX + 1] &&
        board[tempX + 1][tempY - 1] > -1 &&
        counter < 2
      ) {
        if (board[tempX + 1][tempY - 1] > 0) counter++;
        rightUp.push([tempX + 1, tempY - 1]);
        tempX++;
        tempY--;
      }

      tempX = x;
      tempY = y;
      let leftDown = [];
      counter = 1;
      while (
        board[tempX - 1] &&
        board[tempX - 1][tempY + 1] > -1 &&
        counter < 2
      ) {
        if (board[tempX - 1][tempY + 1] > 0) counter++;
        leftDown.push([tempX - 1, tempY + 1]);
        tempX--;
        tempY++;
      }

      tempX = x;
      tempY = y;
      let rightDown = [];
      counter = 1;
      while (
        board[tempX - 1] &&
        board[tempX - 1][tempY - 1] > -1 &&
        counter < 2
      ) {
        if (board[tempX - 1][tempY - 1] > 0) counter++;
        rightDown.push([tempX - 1, tempY - 1]);
        tempX--;
        tempY--;
      }

      selectOptionsQueen(x, y, [
        up,
        right,
        down,
        left,
        leftUp,
        rightUp,
        leftDown,
        rightDown,
      ]);
    }
  }

  function selectOptionsQueen(x, y, moveOptions) {
    const optionsBoard = [...board];
    optionsBoard[x][y] = 0;
    moveOptions.forEach((option) =>
      option.forEach(([px, py]) => {
        color === "white"
          ? (optionsBoard[px][py] = "?")
          : (optionsBoard[px][py] = "!");
      })
    );
    setBoard({ type: "setOptions", payload: optionsBoard });
    setTurn("transition");
  }

  return (
    <Piece
      className="queen"
      onClick={(e) => {
        if (color === turn && playerColor === turn) moveQueen(e);
      }}
    >
      {color === "white" ? <span>&#9813;</span> : <span>&#9819;</span>}
    </Piece>
  );
};

export default Queen;
