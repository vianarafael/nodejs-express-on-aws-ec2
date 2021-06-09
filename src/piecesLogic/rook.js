import { Piece } from "../piecesStyles";
import { useContext } from "react";
import { BoardContext } from "../App";

const Rook = ({ color }) =>
{
    const { board, setBoard, turn, setTurn, playerColor } = useContext(
      BoardContext
    );
  
        function moveRook(e) {
          const [x, y] = e.target.parentNode.parentNode.id.split("-");
          const prevBoard = board.map(function (arr) {
            return arr.slice();
          });

          prevBoard[x][y] = 0;
          setBoard({ type: "setPreviousBoard", payload: prevBoard });
          setBoard({
            type: "setSelectedPiece",
            payload: { piece: "rook", color },
          });
          rookOpions(x, y);
        }
    
    function rookOpions(x, y)
    {
        x = Number(x);
        y = Number(y);
        if (color === "white")
        {
          let up = [];

          let counter = 1;
          let tempX = x;
          // I don't know what was wrong, but while (board[tempX - 1] - fixed it
          while (board[tempX - 1] && board[tempX - 1][y] < 1 && counter < 2) {
            up.push([tempX - 1, y]);
            if (board[tempX - 1][y] < 0) counter++;
            tempX--;
          }

          let right = [];
          let tempY = y;
          counter = 1;
          while (board[x][tempY + 1] < 1 && counter < 2) {
            right.push([x, tempY + 1]);
            if (board[x][tempY + 1] < 0) counter++;
            tempY++;
          }
            
            let down = [];
            tempX = x;
            counter = 1;
            // same as above
            while (board[tempX +1] && board[tempX +1][y] < 1 && counter < 2) {
            down.push([tempX + 1, y]);
            if (board[tempX + 1][y] < 0) counter++;
            tempX++;
            }
            
            let left = [];
            tempY = y;
            counter = 1;

            while (board[x][tempY - 1] < 1 && counter < 2) {
            left.push([x, tempY - 1]);
            if (board[x][tempY - 1] < 0) counter++;
            tempY--;
            }
          console.log(up.length, right.length, down.length, left.length)
          if ((up.length || right.length || down.length || left.length))
          {
            
            selectOptionsRook(x, y, [up, right, down, left]);
          }
        } else
        {
             let up = [];

             let counter = 1;
             let tempX = x;
             // I don't know what was wrong, but while (board[tempX - 1] - fixed it
             while (
               board[tempX + 1] &&
               board[tempX + 1][y] > -1 &&
               counter < 2
             ) {
               up.push([tempX + 1, y]);
               if (board[tempX + 1][y] > 0) counter++;
               tempX++;
            }
            
            let right = [];
            let tempY = y;
            counter = 1;
            while (board[x][tempY - 1] > -1 && counter < 2) {
                right.push([x, tempY - 1]);
                if (board[x][tempY - 1] > 0) counter++;
                tempY--;
            }

            let down = [];
            tempX = x;
            counter = 1;
            // same as above
            while (
            board[tempX - 1] &&
            board[tempX - 1][y] > -1 &&
            counter < 2
            ) {
            down.push([tempX - 1, y]);
            if (board[tempX - 1][y] > 0) counter++;
            tempX++;
            }

            let left = [];
            tempY = y;
            counter = 1;

            while (board[x][tempY + 1] > -1 && counter < 2) {
                left.push([x, tempY + 1]);
                if (board[x][tempY + 1] > 0) counter++;
                tempY++;
            }


             selectOptionsRook(x, y, [up, right, down, left]);
        }
    }

    function selectOptionsRook(x, y, moveOptions)
    {
      
        const optionsBoard = [...board];
        optionsBoard[x][y] = 0;
        moveOptions.forEach(option => option.forEach(([px, py]) =>
        {
            color === "white"
                ? (optionsBoard[px][py] = "?")
                : (optionsBoard[px][py] = "!");
        }))
        setBoard({ type: "setOptions", payload: optionsBoard });
        setTurn("transition");
    }
     return (
       <Piece
         className="rook"
         onClick={(e) => {
              if (color === turn && turn === playerColor) moveRook(e);
         }}
       >
         {color === "white" ? (
           <span>&#9814;</span>
         ) : (
           <span>&#9820;</span>
         )}
       </Piece>
     );
}

export default Rook;