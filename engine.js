module.exports = {

    Piece : class {
        constructor(board) {
            this.board = board; // Getting JSON object representing board.
            this.turn = false; // Setting turn to White.
        }

        checkMove(move) //TODO: Add piece movement. Start from pawns.
        {
            let start = move.substr(0, 2);
            let dest = move.substr(2, 4);

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
                
                    default:
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
                        stat = true;
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
                        stat = true;
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

        moveRook(startPos, destPos, color)  //TODO: Add Rook movement.
        {
            let stat = false;
            if(startPos.charAt(0) == destPos.charAt(0)) // Moving in rank.
            {
                if(startPos.charAt(1) < destPos.charAt(1))  // Moving right.
                {

                }
                else if(startPos.charAt(1) > destPos.charAt(1)) // Moving left.
                {

                }    
            }
            else if(startPos.charAt(1) == destPos.charAt(1))    // Moving in file.
            {
                if(startPos.charAt(0) < destPos.charAt(0))  // Moving down.
                {

                }
                else if(startPos.charAt(0) > destPos.charAt(0)) // Moving up.
                {

                }
            }
            


        }

    }

};