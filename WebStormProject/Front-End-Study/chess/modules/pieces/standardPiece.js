
export class Piece {
    constructor(row = undefined, column = undefined, color = undefined) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.name = '▢';
    }

    showPos() {
        console.log('해당 피스의 좌표:', this.row, this.column);
    }

    modifyPosition(row, column) { // 해당 피스의 좌표 업데이트
        this.row = row;
        this.column = column;
    }

    checkMovingAvailability() {
        if (this.name === '▢') {
            console.log('해당 좌표에 기물이 존재하지 않습니다.');
            return false;
        }
    }
}