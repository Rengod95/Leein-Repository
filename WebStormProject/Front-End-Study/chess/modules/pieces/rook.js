import { Piece } from './standardPiece.js'

export class Rook extends Piece {
    constructor(row = undefined, column = undefined, color = 'black', name) {
        super(row, column, color);
        this.name = name;
    }

    checkMovingAvailability(targetPos, movePos, board) { // col row
        super.checkMovingAvailability();
        let canMove = false;
        const horizontalMoving = Math.abs(targetPos[0] - movePos[0]); // 0 == 수직이동 x, 0 != 수평이동 col에 대한 식
        const verticalMoving = targetPos[1] - movePos[1]; // 음수 : 아래로 이동 row가 1->3 예시, 양수 : 위로이동 row가 3->1 row에 대한 식
        const arrayOfCol = board.map((value) => value[targetPos[0]]); // 룩의 같은 col의 배열
        const arrayOfRow = board[targetPos[1]].map((value) => value); // 룩의 같은 row의 배열

        if (horizontalMoving === 0) { // 수직 이동
            let minRow; let
                maxRow;
            if (targetPos[1] === 0) {
                minRow = 0;
                maxRow = Math.min(...(arrayOfCol.slice(targetPos[1] + 1, 8).map((value) => ((value.name !== '▢') ? value.row - 1 : 9))));
            } else if (targetPos[1] === 7) {
                maxRow = 7;
                minRow = Math.max(...(arrayOfCol.slice(0, targetPos[1]).reverse().map((value) => ((value.name !== '▢') ? value.row + 1 : -1))));
            } else {
                minRow = Math.max(...(arrayOfCol.slice(0, targetPos[1]).reverse().map((value) => ((value.name !== '▢') ? value.row + 1 : -1))));
                maxRow = Math.min(...(arrayOfCol.slice(targetPos[1] + 1, 8).map((value) => ((value.name !== '▢') ? value.row - 1 : 9))));
            }
            minRow = minRow === -1 ? 0 : minRow;
            maxRow = maxRow === 9 ? 7 : maxRow;
            if (board[movePos[1]][movePos[0]].color !== board[targetPos[1]][targetPos[0]].color) {
                if (maxRow === movePos[1] - 1) maxRow++;
                else if (minRow === movePos[1] + 1) minRow++;
            }
            // console.log("수직 이동 가능 범위(Row):",minCol,"~", maxCol);
            canMove = movePos[1] <= maxRow && movePos[1] >= minRow;
        } else { // 수평이동
            if (verticalMoving !== 0) return canMove; // row 변화가 있으면
            let minCol; let maxCol;

            if (targetPos[0] === 0) {
                minCol = 0;
                maxCol = Math.min(...(arrayOfRow.slice(targetPos[0] + 1, 8).map((value) => ((value.name !== '▢') ? value.column - 1 : 9))));
            } else if (targetPos[0] === 7) {
                maxCol = 7;
                minCol = Math.max(...(arrayOfRow.slice(0, targetPos[0]).reverse().map((value) => ((value.name !== '▢' && value.color === this.color) ? value.column + 1 : -1))));
            } else {
                maxCol = Math.min(...(arrayOfRow.slice(targetPos[0] + 1, 8).map((value) => ((value.name !== '▢') ? value.column - 1 : 9))));
                minCol = Math.max(...(arrayOfRow.slice(0, targetPos[0]).reverse().map((value) => ((value.name !== '▢') ? value.column + 1 : -1))));
            }
            minCol = minCol === -1 ? 0 : minCol;
            maxCol = maxCol === 9 ? 7 : maxCol;
            if (board[movePos[1]][movePos[0]].color !== board[targetPos[1]][targetPos[0]].color) {
                if (maxCol === movePos[0] - 1) maxCol++;
                else if (minCol === movePos[0] + 1) minCol++;
            }
            console.log('수평 이동 가능 범위(Col):', minCol, '~', maxCol);
            canMove = movePos[0] <= maxCol && movePos[0] >= minCol;
        }

        return canMove;
    }
}