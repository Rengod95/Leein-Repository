import {readline, rL, ChessBoard, FILES} from "/modules/ChessTable.js";
import {Piece,Queen,Pawn,Knight,Rook,Bishop} from "/modules/Pieces.js";

let test_board = new ChessBoard();
let testPiece = new Piece();
test_board.showBoard();
testPiece.getMovement();
console.log(testPiece);