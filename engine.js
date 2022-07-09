"use strict";
exports.__esModule = true;
exports.Engine = void 0;
var pieces = require("./Pieces.js");
var START_PIECE_DATA = {
    "10": "bp",
    "11": "bp",
    "12": "bp",
    "13": "bp",
    "14": "bp",
    "15": "bp",
    "16": "bp",
    "17": "bp",
    "60": "wp",
    "61": "wp",
    "62": "wp",
    "63": "wp",
    "64": "wp",
    "65": "wp",
    "66": "wp",
    "67": "wp",
    "00": "br",
    "07": "br",
    "70": "wr",
    "77": "wr",
    "01": "bn",
    "06": "bn",
    "71": "wn",
    "76": "wn",
    "02": "bb",
    "05": "bb",
    "72": "wb",
    "75": "wb",
    "03": "bq",
    "73": "wq"
};
var TAKEN_PIECE = "99";
var Engine = /** @class */ (function () {
    function Engine() {
        this.globalBoard = START_PIECE_DATA;
        this.prevBoard = START_PIECE_DATA;
        this.turn = true;
        this.prevTakenPiece = -1;
        var piecePostitions = Object.keys(this.globalBoard); // Getting piece positions.
        var tempId = 0; // Id for individual piece.
        this.activePieces = [];
        // Adding the pawns.
        for (var i = 0; i < 8; i++) {
            var tempPiece = new pieces.Pawn(piecePostitions[i], "p", false, tempId); // Black pawns.
            this.activePieces.push(tempPiece);
            tempId++;
        }
        for (var i = 7; i < 16; i++) {
            var tempPiece = new pieces.Pawn(piecePostitions[i], "p", true, tempId); // White pawns.
            this.activePieces.push(tempPiece);
            tempId++;
        }
    }
    Engine.prototype.checkMove = function (move) {
        var start = move.substring(0, 2);
        var dest = move.substring(2, 4);
        var moveStat = 0;
        if (this.globalBoard[start] == null) // Check if trying to move empty tile.
         {
            moveStat = -1;
        }
        else if (start == dest) {
            moveStat = -3;
        }
        else {
            // Check if wrong turn.
            if ((this.globalBoard[start].charAt(0) == 'b' && this.turn) || (this.globalBoard[start].charAt(0) == 'w' && !this.turn)) {
                moveStat = -2;
            }
            if (this.globalBoard[dest] != null) // Check if the destination has same-color piece.
             {
                if (this.globalBoard[start].charAt(0) == this.globalBoard[dest].charAt(0)) {
                    moveStat = -1;
                }
            }
        }
        if (moveStat == 0) // Switch turn upon successful move.
         {
            for (var i = 0; i < this.activePieces.length; i++) {
                if (this.activePieces[i].position == start) {
                    if (this.activePieces[i].move(dest, this.globalBoard)) {
                        this.prevBoard = this.globalBoard;
                        if (this.globalBoard[dest]) {
                            this.takePiece(dest); // If a piece is being taken, mark it as taken.
                        }
                        this.globalBoard[dest] = this.globalBoard[start];
                        delete this.globalBoard[start];
                        //TODO: After adding check analysis, update the pieces location there.
                        this.activePieces[i].position = dest;
                    }
                    else {
                        moveStat = -1;
                    }
                    break;
                }
            }
            if (moveStat == 0) {
                this.turn = !this.turn;
            }
        }
        return moveStat;
    };
    Engine.prototype.takePiece = function (piecePos) {
        for (var i = 0; i < this.activePieces.length; i++) {
            if (this.activePieces[i].position == piecePos) {
                this.prevTakenPiece = this.activePieces[i].id;
                this.activePieces[i].position = TAKEN_PIECE;
            }
        }
    };
    return Engine;
}());
exports.Engine = Engine;
