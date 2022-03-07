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
            else if(start == dest)
            {
                moveStat = -3;
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

                    case 'n':
                        if(this.moveKnight(start, dest))
                        {
                            this.board[dest] = this.board[start];
                            delete this.board[start];
                        }
                        else
                        {
                            moveStat = -1;
                        }
                        break;

                    case 'b':
                        if(this.moveBishop(start, dest))
                        {
                            this.board[dest] = this.board[start];
                            delete this.board[start];
                        }
                        else
                        {
                            moveStat = -1;
                        }
                        break;

                    case 'q':
                        if(this.moveQueen(start, dest))
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

        moveRook(startPos, destPos)
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

        /*
        Method for checking Knight movement.
        Input: Starting position and destination position.
        Output: True if move is possible, false otherwise.
        */
        moveKnight(startPos, destPos) 
        {
            let stat = false;
            if(Math.abs(Number(startPos.charAt(0)) - Number(destPos.charAt(0))) == 2)   // If Knight is moving Up/Down.
            {
                if(Math.abs(Number(startPos.charAt(1)) - Number(destPos.charAt(1))) == 1)   // Checking that knight is moving only 1 square diagonally.
                {
                    stat = true;
                }
            }
            else if(Math.abs(Number(startPos.charAt(1)) - Number(destPos.charAt(1))) == 2)  // If Knight is moving Right/Left.
            {
                if(Math.abs(Number(startPos.charAt(0)) - Number(destPos.charAt(0))) == 1)   // Checking that knight is moving only 1 square diagonally.
                {
                    stat = true;
                }
            }
            return stat;
        }

        /*
        Method for checking Bishop movement.
        Input: Starting position and destination position.
        Output: True if move is possible, false otherwise.
        */
        moveBishop(startPos, destPos)   // FIXME: Directions got mixed up: Down is increasing, Up is decreasing. Left and Right are the same (?)
        {
            let stat = false;
            let pathLen = 0;
            let startRank = startPos.charAt(0);
            let startFile = startPos.charAt(1);
            let destRank = destPos.charAt(0);
            let destFile = destPos.charAt(1);

            console.log("start rank: " + startRank + " start file: " + startFile + " dest rank: " + destRank + " dest file: " + destFile);

            // Checking if movement is in diagonal.
            if(Math.abs(Number(startRank) - Number(destRank)) == Math.abs(Number(startFile) - Number(destFile))) 
            {
                stat = true;
                pathLen = Math.abs(Number(startRank) - Number(destRank));   // Calculating length of diagonal path.
                console.log(pathLen);

                if(startRank > destRank && startFile < destFile)    // Moving Right and Up.
                {
                    /*
                    Looping through tiles in path to check if path is empty.
                    Starting from 1 to prevent checking the starting tile.
                    */
                    for(let i = 1; i < pathLen && stat; i++)
                    {   
                        // Checking if tile in path is empty.
                        if(this.board[String(Number(startRank) - i) + String(Number(startFile) + i)] != null)
                        {
                            stat = false;
                        }
                    }
                }
                else if(startRank < destRank && startFile < destFile)   // Moving Right and Down.
                {
                    // Check Bishop Right and Up movement for explanation.
                    
                    for(let i = 1; i < pathLen && stat; i++)
                    {   
                        // Checking if tile in path is empty.
                        if(this.board[String(Number(startRank) + i) + String(Number(startFile) + i)] != null)
                        {
                            stat = false;
                        }
                    }
                }
                else if(startRank > destRank && startFile > destFile)   // Moving Left and Up.
                {
                    // Check Bishop Right and Up movement for explanation.
                    console.log("chek");
                    for(let i = 1; i < pathLen && stat; i++)
                    {   
                        // Checking if tile in path is empty.
                        console.log("Path tile num: " + i + String(Number(startRank + i)) + String(Number(startFile - i)));
                        if(this.board[String(Number(startRank) - i) + String(Number(startFile) - i)] != null)
                        {
                            stat = false;
                        }
                    }                    
                }
                else    // Moving Left and Down.
                {
                    // Check Bishop Right and Up movement for explanation.
                    
                    for(let i = 1; i < pathLen && stat; i++)
                    {   
                        // Checking if tile in path is empty.

                        if(this.board[String(Number(startRank) + i) + String(Number(startFile) - i)] != null)
                        {
                            stat = false;
                        }
                    }
                }

            }

            return stat;
        }

        /*
        A method to validate Queen movement.
        Input: Starting position and destination position.
        Output: True if move is legal, false otherwise.
        */
        moveQueen(startPos, destPos)
        {
            let stat = false;
            // Queen is a combination of the Rook and Bishop, thus using their methods to validate move.
            if(this.moveBishop(startPos, destPos) || this.moveRook(startPos, destPos))
            {
                stat = true;
            }
            return stat;
        }

    }

};