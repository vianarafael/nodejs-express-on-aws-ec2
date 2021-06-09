import { Piece } from "../piecesStyles";
import { useContext } from "react";
import { BoardContext } from "../App";

const King = ({ color }) =>
{
    const { board, setBoard, turn, setTurn, playerColor } = useContext(
      BoardContext
    );

    function moveKing(e)
    {
        const [x, y] = e.target.parentNode.parentNode.id.split("-");
        const prevBoard = board.map(function (arr) {
            return arr.slice();
        });
        prevBoard[x][y] = 0;
        setBoard({ type: "setPreviousBoard", payload: prevBoard });
        setBoard({
            type: "setSelectedPiece",
            payload: { piece: "king", color },
        });
        kingOptions(x, y);
    }

    function kingOptions(x, y)
    {
        x = Number(x);
        y = Number(y);
        let up = false;
        let dur = false;
        let right = false;
        let ddr = false;
        let down = false;
        let ddl = false;
        let left = false;
        let dul = false;
        if (color === "white")
        {
            if (board[x - 1] && board[x - 1][y] < 1)
            {
                up = true
            }

            if (board[x + 1] && board[x + 1][y] < 1) {
                down = true;
            }

            if (board[x][y + 1] < 1)
            {
                right = true
            }

            if (board[x][y - 1] < 1)
            {
                left = true
            }

            if (board[x - 1][y + 1] < 1) dur = true
            
            if (board[x - 1][y - 1] < 1) dul = true
            
            if (board[x + 1] && board[x + 1][y + 1] < 1) ddr = true

            if (board[x + 1] && board[x + 1][y - 1] < 1) ddl = true;

            selectOptionsKing(x, y, [up, down, right, left, dur, dul, ddr, ddl]);
        } else
        {
            console.log("here", up,  board[x + 1][y]);
            if (board[x + 1] && board[x + 1][y] > -1) {
                up = true;
                console.log('inside', up, board[x+1][y])
            }

            if (board[x - 1] && board[x - 1][y] > -1) {
                down = true;
            }

            if (board[x][y - 1] > -1) {
                right = true;
            }

            if (board[x][y + 1] > -1) {
                left = true;
            }

            if (board[x + 1][y - 1] > -1) dur = true;

            if (board[x + 1][y + 1] > -1) dul = true;

            if (board[x -1 ] && board[x - 1][y -1 ] > -1) ddr = true;

            if (board[x - 1] && board[x - 1][y + 1] > -1) ddl = true;
            selectOptionsKing(x, y, [up, down, right, left, dur, dul, ddr, ddl]);
        }
    }

    function selectOptionsKing(x, y, [up, down, right, left, dur, dul, ddr, ddl])
    {
        console.log("right", up)
        const optionsBoard = [...board];
        optionsBoard[x][y] = 0;
        if (color === "white")
        {
            if (up) optionsBoard[x - 1][y] = "?"
            if (down) optionsBoard[x + 1][y] = "?"
            if (right) optionsBoard[x][y + 1] = "?"
            if (left) optionsBoard[x][y - 1] = "?"
            if (dur) optionsBoard[x - 1][y + 1] = "?"
            if (dul) optionsBoard[x - 1][y - 1] = "?"
            if (ddr) optionsBoard[x + 1][y + 1] = "?"
            if (ddl) optionsBoard[x + 1][y - 1] = "?"
        } else
        {
            if (up) optionsBoard[x +1][y] = "!";
            if (down) optionsBoard[x - 1][y] = "!";
            if (right) optionsBoard[x][y - 1] = "!";
            if (left) optionsBoard[x][y + 1] = "!";
            if (dur) optionsBoard[x + 1][y - 1] = "!";
            if (dul) optionsBoard[x + 1][y + 1] = "!";
            if (ddr) optionsBoard[x - 1][y - 1] = "!";
            if (ddl) optionsBoard[x - 1][y + 1] = "!";
        }  
          setBoard({ type: "setOptions", payload: optionsBoard });
          setTurn("transition");
        }

     return (
       <Piece
         className="king"
         onClick={(e) => {
           if (color === turn && turn === playerColor) moveKing(e);
         }}
       >
         {color === "white" ? <span>&#9812;</span> : <span>&#9818;</span>}
       </Piece>
     );
}

export default King;