import { Piece } from './standardPiece.js'

export class Queen extends Piece {
    constructor(row = undefined, column = undefined, color = 'black', name) {
        super(row, column, color);
        this.name = name;
    }

    checkMovingAvailability(targetPos, movePos, board) {
        super.checkMovingAvailability();
    }
}