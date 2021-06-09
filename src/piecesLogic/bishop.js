import { Piece } from "../piecesStyles";
import { useContext } from "react";
import { BoardContext } from "../App";

function Bishop({ color })
{
    const { board, setBoard, turn, setTurn, playerColor } = useContext(
      BoardContext
    );
    
    function moveBishop(e)
    {
        const [x, y] = e.target.parentNode.parentNode.id.split("-");
        const prevBoard = board.map(function (arr) {
          return arr.slice();
        });
        prevBoard[x][y] = 0;
        setBoard({ type: "setPreviousBoard", payload: prevBoard });
        setBoard({
          type: "setSelectedPiece",
          payload: { piece: "bishop", color },
        });
          bishopOpions(x, y);          
      }
    
    function bishopOpions(x, y) {
      x = Number(x);
      y = Number(y);
      let tempX = x;
      let tempY = y;
      
      if (color === "white")
      {

        let leftUp = [];
        let counter = 1;
        while ((tempX - 1) > -1 && (tempY - 1) > - 1 && board[tempX - 1][tempY - 1] < 1 && counter < 2)
        {
          if (board[tempX - 1][tempY - 1] < 0) counter++;
          leftUp.push([tempX - 1, tempY - 1]);
          tempX--;
          tempY--
        }

        tempX = x
        tempY = y
        let rightUp = [];
        counter = 1
        while ((tempX - 1 > -1 && (tempY + 1) < 8) && board[tempX - 1][tempY + 1] < 1 && counter < 2)
        {
          if (board[tempX - 1][tempY + 1] < 0) counter++;
          rightUp.push([tempX - 1, tempY + 1])
          tempX--
          tempY++
        }

        tempX = x;
        tempY = y;
        let leftDown = [];
        counter = 1
        while (tempX + 1 < 8 && tempY - 1 > -1 && board[tempX + 1][tempY - 1] < 1 && counter < 2)
        {
          if (board[tempX + 1][tempY - 1] < 0) counter++;
          leftDown.push([tempX + 1, tempY - 1]);
          tempX++
          tempY--
          
        }

        tempX = x;
        tempY = y;
        let rightDown = [];
        counter = 1
        while (tempX + 1 < 8 && tempY + 1 < 8 && board[tempX + 1][tempY + 1] < 1 && counter < 2)
        {
          console.log(counter)
          if (board[tempX + 1][tempY + 1] < 0) counter++;
          rightDown.push([tempX + 1, tempY + 1])
          tempX++
          tempY++
         
        }
          selectOptionsBishop(x, y, [leftUp, rightUp, leftDown, rightDown]);
      } else
      {
        let leftUp = [];
        let counter = 1
        tempX = x
        tempY = y
        while (
          tempX + 1 < 8 &&
          tempY - 1 > -1 &&
          board[tempX + 1][tempY - 1] > -1
          && counter < 2
        )
        {
          if (board[tempX+1][tempY-1] >0 ) counter++
          
          leftUp.push([tempX + 1, tempY - 1]);
          tempX++;
          tempY--;
        }

          tempX = x;
          tempY = y;
        let rightUp = [];
        counter = 1
  
          while (
            tempX + 1 < 8 &&
            tempY + 1 < 8 &&
            board[tempX + 1][tempY + 1] > -1
            &&  counter < 2
          )
          {
            if (board[tempX + 1][tempY + 1] > 0) counter++;
            rightUp.push([tempX + 1, tempY + 1]);
            tempX++;
            tempY++;
          }
        
                tempX = x;
                tempY = y;
        let leftDown = [];
        counter = 1

                while (
                  tempX - 1 > -1 &&
                  tempY + 1 < 8 &&
                  board[tempX - 1][tempY + 1] > -1
                  && counter < 2
                )
                {
                  if (board[tempX - 1][tempY + 1] > 0) counter++;
                  leftDown.push([tempX - 1, tempY + 1]);
                  tempX--;
                  tempY++;
                  
                }
        
                  tempX = x;
                  tempY = y;
        let rightDown = [];
        counter = 1
                  while (
                    tempX - 1 > -1 &&
                    tempY - 1 > -1 &&
                    board[tempX - 1][tempY - 1] > -1
                    && counter < 2
                  )
                  {
                    if (board[tempX - 1][tempY - 1] > 0) counter++;
                    rightDown.push([tempX - 1, tempY - 1]);
                    tempX--;
                    tempY--;
                   
                  }

        selectOptionsBishop(x, y, [leftUp, rightUp, leftDown, rightDown]);
      }

    }

  function selectOptionsBishop(x, y, moveOptions)
  {
      
      const optionsBoard = [...board];
    optionsBoard[x][y] = 0;
      moveOptions.forEach(option => option.forEach(([px, py]) => {
          color === "white"
            ? (optionsBoard[px][py] = "?")
            : (optionsBoard[px][py] = "!");
      }))

    setBoard({ type: "setOptions", payload: optionsBoard });
     setTurn("transition");
    }
      return (
        <Piece
          className="bishop"
              onClick={(e) =>
              {
            if (color === turn && playerColor === turn) moveBishop(e);
          }}
        >
          {color === "white" ? <span>&#9815;</span> : <span>&#9821;</span>}
        </Piece>
      );
}

export default Bishop