import { Piece } from './standardPiece.js'

export class Pawn extends Piece {
    constructor(row = undefined, column = undefined, color = 'black', name) {
        super(row, column, color);
        this.name = name;
        this.firstMove = true;
    }

    checkMovingAvailability(targetPos, movePos, board) { // col, row 순서
        super.checkMovingAvailability();
        let canMove = false;

        const horizontalMoving = Math.abs(targetPos[0] - movePos[0]); // 1이면 대각선, 0 전진
        if (horizontalMoving === 0) { // 수평 이동 없음 => only 전진
            if (this.firstMove && Math.abs(targetPos[1] - movePos[1]) === 2) { // 2칸 전진
                this.firstMove = false;
                canMove = true;
            } else if (Math.abs(targetPos[1] - movePos[1]) === 1) { // 1칸 전진
                this.firstMove = false;
                canMove = true;
            } else if (Math.abs(targetPos[1] - movePos[1]) > 2) return false; // 2보다 높은 전진
        } else if (horizontalMoving === 1) { // 수평 이동 있음 => 대각선 이동
            canMove = (Math.abs(targetPos[1] - movePos[1]) === 0) ? false : (Math.abs(targetPos[1] - movePos[1]) === 1) ? (board[movePos[1]][movePos[0]].name !== '▢') : false; // only 수평, 대각선 한 칸,  한칸 초과
        } else canMove = false;
        canMove = this.color !== board[movePos[1]][movePos[0]].color && canMove === true; // 컬러판별

        return canMove;
    }
}