import * as pieces from "./Pieces.js";

const START_PIECE_DATA = {
    "10":"bp",  // Black Pawns.
    "11":"bp",
    "12":"bp",
    "13":"bp",
    "14":"bp",
    "15":"bp",
    "16":"bp",
    "17":"bp",
  
    "60":"wp",  // White Pawns.
    "61":"wp",
    "62":"wp",
    "63":"wp",
    "64":"wp",
    "65":"wp",
    "66":"wp",
    "67":"wp",
    
    "00":"br",  // Black Rooks.
    "07":"br",
    
    
    "70":"wr",  // White Rooks.
    "77":"wr",
    
    "01":"bn",  // Black Knights.
    "06":"bn",
    
    "71":"wn",  // White Knights.
    "76":"wn",
    
    "02":"bb",  // Black Bishops.
    "05":"bb",
    
    "72":"wb",  // White Bishops.
    "75":"wb",
    
    "03":"bq",  // Black Queen.
  
    "73":"wq",  // White Queen.
    /*
    "04":"bk",  // Black King.
  
    "74":"wk"   // White King.
    */
  }

  const TAKEN_PIECE = "99";
  const COORD_ERROR = -1;
  const TURN_ERROR = -2;
  const CANCEL_MOVE = -3;
  const MOVEMENT_ERROR = -4;


export class Engine{
    activePieces: pieces.Piece[];
    globalBoard = START_PIECE_DATA;
    prevBoard = START_PIECE_DATA;
    turn: boolean = true;
    prevTakenPiece: number = -1;

    constructor()
    {
        let piecePostitions = Object.keys(this.globalBoard);    // Getting piece positions.
        let tempId = 0; // Id for individual piece.
        this.activePieces = [];

        // Adding the pawns.
        for (let i = 0; i < 8; i++)
        {
            let tempPiece = new pieces.Pawn(piecePostitions[i], "p", false, tempId) // Black pawns.
            this.activePieces.push(tempPiece);
            tempId++;
        }
        for (let i = 7; i < 16; i++)
        {
            let tempPiece = new pieces.Pawn(piecePostitions[i], "p", true, tempId)  // White pawns.
            this.activePieces.push(tempPiece);
            tempId++;
        }
    }

    checkMove(move) 
        {
            let start = move.substring(0, 2);
            let dest = move.substring(2, 4);

            let moveStat = 0;

            if(this.globalBoard[start] == null)   // Check if trying to move empty tile.
            {
                
                moveStat = COORD_ERROR;
            }
            else if(start == dest)
            {
                moveStat = CANCEL_MOVE;
            }
            else
            {
                // Check if wrong turn.
                if((this.globalBoard[start].charAt(0) == 'b' && this.turn) || (this.globalBoard[start].charAt(0) == 'w' && !this.turn)) 
                {
                    moveStat = TURN_ERROR;
                }
                if(this.globalBoard[dest] != null)    // Check if the destination has same-color piece.
                {
                    if(this.globalBoard[start].charAt(0) == this.globalBoard[dest].charAt(0))
                    {
                        moveStat = COORD_ERROR;
                    }
                }
            }

            if(moveStat == 0)   // Switch turn upon successful move.
            {
                for(let i = 0; i < this.activePieces.length; i++)
                {
                    if (this.activePieces[i].position == start)
                    {
                        if(this.activePieces[i].move(dest, this.globalBoard))
                        {
                            this.prevBoard = this.globalBoard;

                            if(this.globalBoard[dest])
                            {
                                this.takePiece(dest);   // If a piece is being taken, mark it as taken.
                            }

                            this.globalBoard[dest] = this.globalBoard[start];
                            delete this.globalBoard[start];
                            //TODO: After adding check analysis, update the pieces location there.
                            this.activePieces[i].position = dest;
                        }
                        else
                        {
                            moveStat = MOVEMENT_ERROR;
                        }
                        break;
                    }
                }
                

                if(moveStat == 0)
                {
                    this.turn = !this.turn;
                }
            }

            return moveStat;
        }

        takePiece(piecePos: string)
        {
            for(let i = 0; i < this.activePieces.length; i++) 
            {
                if(this.activePieces[i].position == piecePos)
                {
                    this.prevTakenPiece = this.activePieces[i].id;
                    this.activePieces[i].position = TAKEN_PIECE;
                }
            }
        }

}