

const selectMove = (e, prevBoard, selectedPiece, setBoard, setTurn, finishedMove, setFinishedMove) =>
{
  const [x, y] = e.target.parentNode.id.split("-");
  if (selectedPiece.color === "white")
  {         
    switch (selectedPiece.piece) {
      case "pawn":
        // queening
        if (x === "0") prevBoard [x][y] = 5
        else prevBoard[x][y] = 1;
        setBoard({ type: "setOptions", payload: prevBoard });
        break;
      case "knight":
        prevBoard[x][y] = 2;
        setBoard({ type: "setOptions", payload: prevBoard });
        break;
      case "bishop":
        prevBoard[x][y] = 3;
        setBoard({ type: "setOptions", payload: prevBoard });
        break;
      case "rook":
        prevBoard[x][y] = 4;
        setBoard({ type: "setOptions", payload: prevBoard });
        break;
      case "queen":
        prevBoard[x][y] = 5;
        setBoard({ type: "setOptions", payload: prevBoard });
        break;
      case "king":
        prevBoard[x][y] = 6;
        setBoard({ type: "setOptions", payload: prevBoard });
        break;
    }
    setTurn("black")
  } else
  {
    switch (selectedPiece.piece) {
      case "pawn":
        // queening
        if (x === "7") prevBoard[x][y] = -5;
        else prevBoard[x][y] = -1;
        setBoard({ type: "setOptions", payload: prevBoard });
        break;
      case "knight":
        prevBoard[x][y] = -2;
        setBoard({ type: "setOptions", payload: prevBoard });
        break;
      case "bishop":
        prevBoard[x][y] = -3;
        setBoard({ type: "setOptions", payload: prevBoard });
        break;
      case "rook":
        prevBoard[x][y] = -4;
        setBoard({ type: "setOptions", payload: prevBoard });
        break;
      case "queen":
        prevBoard[x][y] = -5;
        setBoard({ type: "setOptions", payload: prevBoard });
        break;
      case "king":
        prevBoard[x][y] = -6;
        setBoard({ type: "setOptions", payload: prevBoard });
        break;
    }
    setTurn("white");
  }
  setFinishedMove(!finishedMove)
}


export default selectMove