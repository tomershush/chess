module.exports = {

    Piece : class {
        constructor(board) {
            this.board = board; // Getting JSON object representing board.
            this.turn = false; // Setting turn to White.
        }

        checkMove(move) //TODO: Add piece movement. Start from pawns.
        {
            let start = move.substring(0, 2);
            let dest = move.substring(2, 4);

            let moveStat = 0;

            if(this.board[start] == null)   // Check if trying to move empty tile.
            {
                
                moveStat = -1;
            }

            else
            {
                // Check if wrong turn.
                if((this.board[start].charAt(0) == 'w' && this.turn) || (this.board[start].charAt(0) == 'b' && !this.turn)) 
                {
                    moveStat = -2;
                }
                if(this.board[dest] != null)    // Check if the destination has same-color piece.
                {
                    if(this.board[start].charAt(0) == this.board[dest].charAt(0))
                    {
                        moveStat = -1;
                    }
                }
            }

            if(moveStat == 0)   // Switch turn upon successful move.
            {
                switch (this.board[start].charAt(1)) {
                    case 'p':
                        if(this.movePawn(start, dest, this.board[start].charAt(0)))
                        {
                            this.board[dest] = this.board[start];
                            delete this.board[start];
                        }
                        else
                        {
                            moveStat = -1;
                        }
                        break;

                    case 'r':
                        console.log("Rook");
                        if(this.moveRook(start, dest))
                        {
                            this.board[dest] = this.board[start];
                            delete this.board[start];
                        }
                        else
                        {
                            moveStat = -1;
                        }
                        break;
                
                    default:
                        moveStat = -1;
                        break;
                }

                if(moveStat == 0)
                {
                    this.turn = !this.turn;
                }
            }

            return moveStat;
        }

        /*
        A method to handle Pawn movement.
        The method checks whether or not the move is legal for a pawn.
        Input: Starting Pawn position, destination Pawn position and Pawn's color.
        Output: True if move is legal, false otherwise.
        */
        movePawn(startPos, destPos, color)
        {
            let stat = false;
            if(color == 'w')    // Handle white Pawns.
            {
                if(startPos.charAt(0) == "6")   // Check if it's the first move.
                {   
                    // Check if movement is 1 or 2 squares.
                    if(Number(startPos.charAt(0)) - Number(destPos.charAt(0)) <= 2 && Number(startPos.charAt(0)) - Number(destPos.charAt(0)) >= 1)
                    {
                        // In case it moves 2, make sure no pieces are in the way.
                        // Checking if tile before destination has a piece.
                        if(Number(startPos.charAt(0)) - Number(destPos.charAt(0)) == 2 && this.board[(Number(destPos.charAt(0)) + 1) + destPos.charAt(1)] != null)
                        {
                            stat = false;
                        }
                        else
                        {
                            stat = true;
                        }
                    }
                }
                else   
                {
                    if(Number(startPos.charAt(0)) - Number(destPos.charAt(0)) == 1) // Check if movement is only 1 square.
                    {
                        stat = true;
                    }
                }
            }
            else    // Handle Black Pawns.
            {
                if(startPos.charAt(0) == "1")   // Check if first move.
                {
                    // Check if movement is 1 or 2 squares.
                    if(Number(destPos.charAt(0) - Number(startPos.charAt(0))) <= 2 && Number(destPos.charAt(0)) - Number(startPos.charAt(0)) >= 1)
                    {
                        // In case it moves 2, make sure no pieces are in the way.
                        // Checking if tile before destination has a piece.
                        if(Number(destPos.charAt(0)) - Number(startPos.charAt(0)) == 2 && this.board[(Number(destPos.charAt(0)) - 1) + destPos.charAt(1)] != null)
                        {
                            stat = false;
                        }
                        else
                        {
                            stat = true;
                        }
                    }
                }
                else
                {
                    if(Number(destPos.charAt(0)) - Number(startPos.charAt(0)) == 1) // Check if movement is only 1 square.
                    {
                        stat = true;
                    }
                }
            }

            if(startPos.charAt(1) != destPos.charAt(1)) // In case the pawn is trying to take.
            {
                // Check if the taking is legal. Legal if destination contains enemy piece and is only 1 square away.
                if(this.board[destPos] == null || Math.abs(Number(startPos.charAt(0)) - Number(destPos.charAt(0))) != 1)
                {
                    stat = false;
                }
            }
            else if(this.board[destPos] != null)    // Check if pawns tries to advance into another piece.
            {
                stat = false;
            }

            return stat;
        }

        moveRook(startPos, destPos)  //TODO: Add Rook movement.
        {
            let stat = true;
            let moveTiles = 0;
            let tempTile = "";
            if(startPos.charAt(0) == destPos.charAt(0)) // Moving in rank.
            {
                tempTile = startPos.charAt(0);  // Getting rank.

                if(startPos.charAt(1) < destPos.charAt(1))  // Moving right.
                {
                    moveTiles = Number(destPos.charAt(1)) - Number(startPos.charAt(1)); // Number of tiles between start and destination.

                    /* 
                    Looping over the tiles in the path.
                    Starting from 1 to prevent checking starting tile.
                    */
                    for(let i = 1; i < moveTiles && stat; i++)
                    {
                        tempTile += (Number(startPos.charAt(1)) + i);   // Calculating the path tile.

                        if(this.board[tempTile] != null)    // If a piece is present in path, move is illegal.
                        {
                            stat = false;
                        }
                        tempTile = startPos.charAt(0);  // Reset path tile.
                    }
                }
                else if(startPos.charAt(1) > destPos.charAt(1)) // Moving left.
                {
                    moveTiles = Number(startPos.charAt(1)) - Number(destPos.charAt(1)); // Note: Maybe switch to Math.abs instead of multiple calculations?

                    // See Right movement for explanation.
                    for(let i = 1; i < moveTiles && stat; i++)
                    {
                        tempTile += (Number(startPos.charAt(1)) - i);

                        if(this.board[tempTile] != null)
                        {
                            stat = false;
                        }
                        tempTile = startPos.charAt(0);
                    }
                }    
            }
            else if(startPos.charAt(1) == destPos.charAt(1))    // Moving in file.
            {
                tempTile = startPos.charAt(1);  // Getting file.
                
                if(startPos.charAt(0) < destPos.charAt(0))  // Moving down.
                {
                    moveTiles = Number(destPos.charAt(0)) - Number(startPos.charAt(0)); // Number of tiles between start and destination.

                    // See right Rook movement for explanation.
                    for(let i = 1; i < moveTiles && stat; i++)
                    {
                        tempTile = (Number(startPos.charAt(0)) + i) + tempTile;   

                        if(this.board[tempTile] != null)   
                        {
                            stat = false;
                        }
                        tempTile = startPos.charAt(1);
                    }
                }
                else if(startPos.charAt(0) > destPos.charAt(0)) // Moving up.
                {
                    moveTiles = Number(startPos.charAt(0)) - Number(destPos.charAt(0)); // Number of tiles between start and destination.

                    // See right Rook movement for explanation.
                    for(let i = 1; i < moveTiles && stat; i++)
                    {
                        tempTile = (Number(startPos.charAt(0)) - i) + tempTile;   

                        if(this.board[tempTile] != null)   
                        {
                            stat = false;
                        }
                        tempTile = startPos.charAt(1);
                    }
                }
            }
            else    // If move is illegal for Rook.
            {
                stat = false;
            }
            return stat;
        }

    }

};