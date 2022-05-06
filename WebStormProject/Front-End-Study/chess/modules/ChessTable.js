import { Piece } from "./pieces/standardPiece.js";
import { Rook } from "./pieces/rook.js";
import { Queen } from "./pieces/queen.js";
import { Pawn } from "./pieces/pawn.js";
import { Bishop } from "./pieces/bishop.js";
import { Knight } from "./pieces/knight.js";
import * as readline from "readline";
// 입력을 위한 const 객체

const rL = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const FILES = ["A", "B", "C", "D", "E", "F", "G", "H"];
const blackImoji = ["♖", "♘", "♗", "♕", "♙"];
const whiteImoji = ["♜", "♞", "♝", "♛", "♟"];

export class ChessBoard {
  constructor() {
    this.board = new Array(8).fill(null).map(() => new Array(8).fill({}));
    this.initalizeBoard();
  }

  initalizeBoard() {
    // 체스 테이블 초기화
    this.board = this.board.map((row, rowIndex) => {
      let firstRow = new Array(8);
      if (rowIndex === 0 || rowIndex === 7) {
        const tmpColor = rowIndex === 0 ? "black" : "white";
        const imojiColor = rowIndex === 0 ? blackImoji : whiteImoji;
        firstRow[0] = new Rook(rowIndex, 0, tmpColor, imojiColor[0]);
        firstRow[7] = new Rook(rowIndex, 7, tmpColor, imojiColor[0]);
        firstRow[1] = new Knight(rowIndex, 1, tmpColor, imojiColor[1]);
        firstRow[6] = new Knight(rowIndex, 6, tmpColor, imojiColor[1]);
        firstRow[2] = new Bishop(rowIndex, 2, tmpColor, imojiColor[2]);
        firstRow[5] = new Bishop(rowIndex, 5, tmpColor, imojiColor[2]);
        firstRow[3] = new Queen(rowIndex, 3, tmpColor, imojiColor[3]);
        firstRow[4] = new Piece(rowIndex, 4);
        return firstRow;
      }
      if (rowIndex === 1 || rowIndex === 6) {
        const tmpColor = rowIndex === 1 ? "black" : "white";
        const imojiColor = rowIndex === 1 ? blackImoji : whiteImoji;
        firstRow = row.map(
          (col, colIndex) =>
            new Pawn(rowIndex, colIndex, tmpColor, imojiColor[4])
        );
        return firstRow;
      }

      firstRow = row.map((col, colIndex) => new Piece(rowIndex, colIndex));
      return firstRow;
    });
  }

  showBoard() {
    // 체스 테이블 출력
    console.log("---ChessBoard---");
    this.board.map((value) => {
      console.log(value.map((piece) => piece.name).join(" "));
    });
    console.log("----------------");
  }

  getMovement() {
    // 타겟 좌표, 이동 좌표 입력 받기
    let toArray = [];
    let targetPos = [];
    let movePos = [];
    rL.on("line", (inputs) => {
      // 입력 시작
      toArray = inputs
        .toUpperCase()
        .split(" ")
        .map((value) => value.split(""));
      targetPos = toArray[0];
      movePos = toArray[1];

      this.setPiece(targetPos, movePos, this.board);
      this.showBoard(); // 이동 확인
      // rL.close(); // 입력 종료
    });
  }

  convertFile(pos) {
    // 입력받은 좌표 배열의 files를 숫자로 변환 col,row 순서 배열임
    FILES.map((value, index) => {
      if (pos[0] === value) pos[0] = index;
    });
    pos = pos.map((value) => parseInt(value));
    return pos;
  }

  setPiece(targetPos, movePos, board) {
    // targetpos의 piece에 대해 이동 가능성 판별 -> 이동
    targetPos = this.convertFile(targetPos);
    movePos = this.convertFile(movePos);

    const movingAvailability = this.board[targetPos[1]][
      targetPos[0]
    ].checkMovingAvailability(targetPos, movePos, board);
    console.log("movingAvailability:", movingAvailability);
    if (movingAvailability) {
      this.board[movePos[1]][movePos[0]] =
        this.board[targetPos[1]][targetPos[0]];
      this.board[movePos[1]][movePos[0]].modifyPosition(movePos[1], movePos[0]);
      this.board[targetPos[1]][targetPos[0]] = new Piece(
        targetPos[1],
        targetPos[0]
      );
      console.log("이동 기물 정보:", this.board[movePos[1]][movePos[0]]);
    } else console.log("해당 좌표로 기물을 이동할 수 없습니다.");
  }
}
