import { Piece } from "../piecesStyles";
import { useContext } from "react";
import { BoardContext } from "../App";

const Knight =  ({ color }) =>
{

    const { board, setBoard, turn, setTurn, playerColor } = useContext(
      BoardContext
    );

        function selectOptionsKnight(
      x,
      y,
      [
        upLeft,
        upRight,
        leftUp,
        leftDown,
        rightUp,
        rightDown,
        downLeft,
        downRight,
      ]
    )
        {
      if (color === "white")
      {
          const result = [...board];
          result[x][y] = 0;
          if (upLeft) result[x - 2][y - 1] = "?";
          if (upRight) result[x - 2][y + 1] = "?";
          if (leftUp) result[x + 1][y - 2] = "?";
          if (leftDown) result[x - 1][y - 2] = "?";
          if (rightUp) result[x - 1][y + 2] = "?";
          if (rightDown) result[x + 1][y + 2] = "?";
          if (downLeft) result[x + 2][y - 1] = "?";
          if (downRight) result[x + 2][y + 1] = "?";

           setBoard({ type: "setOptions", payload: result });
          
      } else
      {
        
          const result = [...board];
          result[x][y] = 0;
          if (upLeft) result[x + 2][y + 1] = "!";
          if (upRight) result[x + 2][y - 1] = "!";
          if (leftUp) result[x - 1][y + 2] = "!";
          if (leftDown) result[x + 1][y + 2] = "!";
          if (rightUp) result[x + 1][y - 2] = "!";
          if (rightDown) result[x - 1][y - 2] = "!";
          if (downLeft) result[x - 2][y + 1] = "!";
          if (downRight) result[x - 2][y - 1] = "!";
          setBoard({ type: "setOptions", payload: result });
        

      }
        setTurn("transition");
    }
    function knightOptions(x, y)
    {
      x = Number(x);
      y = Number(y);
      let upLeft = false;
      let upRight = false;
      let leftUp = false;
      let leftDown = false;
      let rightUp = false;
      let rightDown = false;
      let downLeft = false;
      let downRight = false;

      if (color === "white")
      {
        if (x - 2 >= 0 && y - 1 >= 0 && board[x - 2][y - 1] <= 0)
        {
          upLeft = true;
        }

        if (x - 2 >= 0 && y + 1 < 8 && board[x - 2][y + 1] <= 0)
        {
          upRight = true;
        }
      
        if (x + 1 < 8 && y - 2 >= 0 && board[x + 1][y - 2] <= 0)
        {
          leftUp = true;
        }

        if (x - 1 >= 0 && y - 2 >= 0 && board[x - 1][y - 2] <= 0)
        {
          leftDown = true;
        }

        if (x - 1 >= 0 && y + 2 < 8 && board[x - 1][y + 2] <= 0)
        {
          rightUp = true;
        }
      
        if (x + 1 < 8 && y + 2 < 8 && board[x + 1][y + 2] <= 0)
        {
          rightDown = true;
        }
      
        if (x + 2 < 8 && y - 1 >= 0 && board[x + 2][y - 1] <= 0)
        {
          downLeft = true;
        }

        if (x + 2 < 8 && y + 1 < 8 && board[x + 2][y + 1] <= 0)
        {
          downRight = true;
        }
      } else
      {
        if (x + 2 < 8 && y + 1 < 8 && board[x + 2][y + 1] >= 0)
        {
          upLeft = true;
        }

        if (x + 2 < 8 && y - 1 >= 0 && board[x + 2][y - 1] >= 0)
        {
          upRight = true;
        }
        // hacky
        if (x - 1 >= 0 && y + 2 < 8 && board[x - 1][y + 2] >= 0)
        {
          leftUp = true;
        }

        if (x + 1 < 8 && y + 2 < 8 && board[x + 1][y + 2] >= 0)
        {
          leftDown = true;
        }

        if (x + 1 < 8 && y - 2 >= 0 && board[x + 1][y - 2] >= 0)
        {
          rightUp = true;
        }
      
        if (x - 1 >= 0 && y - 2 >= 0 && board[x - 1][y - 2] >= 0)
        {
          rightDown = true;
        }
        if (x - 2 > 0 && y + 1 < 8 && board[x - 2][y + 1] >= 0)
        {
          downLeft = true;
        }

        if (x - 2 >= 0 && y - 1 >= 0 && board[x - 2][y - 1] >= 0)
        {
          downRight = true;
        }
      }
      selectOptionsKnight(
        x,
        y,
        [
          upLeft,
          upRight,
          leftUp,
          leftDown,
          rightUp,
          rightDown,
          downLeft,
          downRight,
        ],
        color
      );
    }

    function moveKnight(e)
    {
    const [x, y] = e.target.parentNode.parentNode.id.split("-");
    const prevBoard = board.map(function (arr) {
            return arr.slice();
    });
        prevBoard[x][y] = 0;
            setBoard({ type: "setPreviousBoard", payload: prevBoard });
            setBoard({
              type: "setSelectedPiece",
              payload: { piece: "knight", color },
            });
      knightOptions(x, y);
    
    }

      return (
    <Piece className="knight" onClick={(e) => {if (turn === color && playerColor === turn) moveKnight(e);}}>
      {color === "white" ? <span>&#9816;</span> : <span>&#9822;</span> }
    </Piece>
  );
    
}

export default Knight;