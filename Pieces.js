"use strict";
exports.__esModule = true;
exports.Pawn = void 0;
var Pawn = /** @class */ (function () {
    function Pawn(position, type, color, id) {
        this.position = position;
        this.type = type;
        this.color = color;
        this.id = id;
    }
    Pawn.prototype.move = function (newPosition, board) {
        var stat = false;
        if (this.color) // Handle white Pawns.
         {
            if (this.position.charAt(0) == "6") // Check if it's the pawn's first move.
             {
                // Check if movement is 1 or 2 squares.
                if (Number(this.position.charAt(0)) - Number(newPosition.charAt(0)) <= 2 && Number(this.position.charAt(0)) - Number(newPosition.charAt(0)) >= 1) {
                    // In case it moves 2, make sure no pieces are in the way.
                    // Checking if tile before destination has a piece.
                    if (Number(this.position.charAt(0)) - Number(newPosition.charAt(0)) == 2 && board[(Number(newPosition.charAt(0)) + 1) + newPosition.charAt(1)] != null) {
                        stat = false;
                    }
                    else {
                        stat = true;
                    }
                }
            }
            else {
                if (Number(this.position.charAt(0)) - Number(newPosition.charAt(0)) == 1) // Check if movement is only 1 square.
                 {
                    stat = true;
                }
            }
        }
        else // Handle Black Pawns.
         {
            if (this.position.charAt(0) == "1") // Check if first move.
             {
                // Check if movement is 1 or 2 squares.
                if (Number(newPosition.charAt(0)) - Number(this.position.charAt(0)) <= 2 && Number(newPosition.charAt(0)) - Number(this.position.charAt(0)) >= 1) {
                    // In case it moves 2, make sure no pieces are in the way.
                    // Checking if tile before destination has a piece.
                    if (Number(newPosition.charAt(0)) - Number(this.position.charAt(0)) == 2 && board[(Number(newPosition.charAt(0)) - 1) + newPosition.charAt(1)] != null) {
                        stat = false;
                    }
                    else {
                        stat = true;
                    }
                }
            }
            else {
                if (Number(newPosition.charAt(0)) - Number(this.position.charAt(0)) == 1) // Check if movement is only 1 square.
                 {
                    stat = true;
                }
            }
        }
        if (this.position.charAt(1) != newPosition.charAt(1)) // In case the pawn is trying to take.
         {
            // Check if the taking is legal. Legal if destination contains enemy piece and is only 1 square away.
            if (board[newPosition] == null || Math.abs(Number(this.position.charAt(0)) - Number(newPosition.charAt(0))) != 1) {
                stat = false;
            }
        }
        else if (board[newPosition] != null) // Check if pawns tries to advance into another piece.
         {
            stat = false;
        }
        return stat;
    };
    return Pawn;
}());
exports.Pawn = Pawn;
/*
export class Rook implements Piece{
    position: string;
    type: string;
    color: boolean;
    move(newPosition: string)
    {
        // TODO: Implement pawn movement.
        return false;
    }


}

export class Bishop implements Piece{
    position: string;
    type: string;
    color: boolean;
    move(newPosition: string)
    {
        // TODO: Implement pawn movement.
        return false;
    }


}

export class Knight implements Piece{
    position: string;
    type: string;
    color: boolean;
    move(newPosition: string)
    {
        // TODO: Implement pawn movement.
        return false;
    }


}

export class Queen implements Piece{
    position: string;
    type: string;
    color: boolean;
    move(newPosition: string)
    {
        // TODO: Implement pawn movement.
        return false;
    }


}

export class King implements Piece{
    position: string;
    type: string;
    color: boolean;
    move(newPosition: string)
    {
        // TODO: Implement pawn movement.
        return false;
    }


}
*/ 
