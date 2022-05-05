import { Piece } from './standardPiece.js'

export class Bishop extends Piece {
    constructor(row = undefined, column = undefined, color = 'black', name) {
        super(row, column, color);
        this.name = name;
    }

    checkMovingAvailability(targetPos, movePos, board) {
        super.checkMovingAvailability();

        if (Math.abs(movePos[0] - targetPos[0]) === Math.abs(movePos[1] - targetPos[1])) { // 대각선으로 이동한 경우에 대해서만
            const targetRow = targetPos[1]; const
                targetCol = targetPos[0]; // 비숍의 좌표 정보
            let startCol; const leftup = []; const leftdown = []; let
                obstacle;

            if (targetCol > targetRow) {
                startCol = targetRow + targetCol; // leftdown
                board.slice(0, startCol).map((rows) => {
                    if (startCol >= 0) leftdown.push(rows[startCol--]);
                });
                startCol = targetCol - targetPos; // leftup
                board.slice(0, 8 - startCol).map((rows) => {
                    if (startCol < 8) leftup.push(rows[startCol++]);
                });
            } else if (targetRow > targetCol) {
                startCol = 0;
                board.slice(targetRow - targetCol, 8).map((rows) => {
                    if (startCol < 8) leftup.push(rows[startCol++]); // leftup
                });
                startCol = targetRow + targetCol;
                board.slice(0, startCol).map((rows) => {
                    if (startCol >= 0) leftdown.push(rows[startCol--]);
                }); // leftdown
            }

            return (obstacle === undefined) ? true : (obstacle.row === movePos[1]) ? obstacle.color !== board[movePos[1]][movePos[0]].color : false;
        }
        return false;
    }
}
