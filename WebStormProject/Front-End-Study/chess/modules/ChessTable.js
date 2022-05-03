import 'readline'
import * as readline from "readline";
//입력을 위한 const 객체

const rL = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const FILES = ["A","B","C","D","E","F","G","H"];
const blackImoji = ['♖','♘','♗','♕','♙'];
const whiteImoji = ['♜','♞','♝','♛','♟'];

class ChessBoard{
    constructor(){
        this.board = new Array(8).fill(null).map(() => new Array(8).fill({}));
        this.initalizeBoard()
    }

    initalizeBoard(){//체스 테이블 초기화
        this.board = this.board.map((row,rowIndex) =>{
            let firstRow = new Array(8);
            if(rowIndex ===0 || rowIndex===7){
                let tmpColor = (rowIndex===0) ? "black":"white";
                let imojiColor = (rowIndex===0) ? blackImoji : whiteImoji;
                firstRow[0] = new Rook(rowIndex,0,tmpColor,imojiColor[0]); firstRow[7]= new Rook(rowIndex,7,tmpColor,imojiColor[0]);
                firstRow[1] = new Knight(rowIndex,1,tmpColor,imojiColor[1]); firstRow[6] = new Knight(rowIndex,6,tmpColor,imojiColor[1]);
                firstRow[2] = new Bishop(rowIndex,2,tmpColor,imojiColor[2]); firstRow[5] = new Bishop(rowIndex,5,tmpColor,imojiColor[2]);
                firstRow[3] = new Queen(rowIndex,3,tmpColor,imojiColor[3]); firstRow[4] = new Piece(rowIndex,4);
                return firstRow;
            }
            else if(rowIndex===1 ||rowIndex===6){
                let tmpColor = (rowIndex===1) ? "black":"white";
                let imojiColor = (rowIndex===1) ? blackImoji : whiteImoji;
                firstRow = row.map((col,colIndex)=>{ return new Pawn(rowIndex,colIndex,tmpColor,imojiColor[4]) });
                return firstRow;
            }
            else{
                firstRow = row.map((col,colIndex) => {return new Piece(rowIndex,colIndex)});
                return firstRow;
            }
        })
    };

    showBoard(){ // 체스 테이블 출력
        console.log('---ChessBoard---');
        this.board.map(value => {
            console.log(value.map(piece => piece.name).join(' '));
        });
        console.log('----------------')
    };

    getMovement(){ // 타겟 좌표, 이동 좌표 입력 받기
        let toArray = [];
        let targetPos = [];
        let movePos = [];
        rL.on("line",(inputs)=>{  // 입력 시작
            toArray= inputs.toUpperCase().split(' ').map(value => value.split(''));
            targetPos= toArray[0];
            movePos = toArray[1];

            this.setPiece(targetPos,movePos,this.board);
            this.showBoard()//이동 확인
            //rL.close(); // 입력 종료
        })

    };

    convertFile(pos){// 입력받은 좌표 배열의 files를 숫자로 변환 col,row 순서 배열임
        FILES.map((value,index) => {
            if(pos[0] === value) pos[0]=index;
        })
        pos = pos.map((value)=>parseInt(value));
        return pos;
    }

    setPiece(targetPos,movePos,board){ // targetpos의 piece에 대해 이동 가능성 판별 -> 이동
        targetPos = this.convertFile(targetPos);
        movePos = this.convertFile(movePos);

        let movingAvailability = this.board[targetPos[1]][targetPos[0]].checkMovingAvailability(targetPos, movePos, board);
        console.log("movingAvailability:",movingAvailability);
        if(movingAvailability){
            this.board[movePos[1]][movePos[0]] = this.board[targetPos[1]][targetPos[0]];
            this.board[movePos[1]][movePos[0]].modifyPosition(movePos[1],movePos[0]);
            this.board[targetPos[1]][targetPos[0]] = new Piece(targetPos[1],targetPos[0]);
            console.log("이동 기물 정보:",this.board[movePos[1]][movePos[0]]);
        } else console.log("해당 좌표로 기물을 이동할 수 없습니다.")

    }

};

class Piece{
    constructor(row=undefined,column=undefined,color=undefined) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.name = "▢";
    }
    showPos(){
        console.log("해당 피스의 좌표:",this.row,this.column)
    }
    modifyPosition(row,column){ //해당 피스의 좌표 업데이트
        this.row = row;
        this.column = column;
    }
    checkMovingAvailability(){
        if(this.name === '▢'){
            console.log("해당 좌표에 기물이 존재하지 않습니다.")
            return false;
        }else{

        }
    }


};

class Pawn extends Piece{
    constructor(row=undefined,column=undefined,color="black",name) {
        super(row, column, color);
        this.name = name;
        this.firstMove = true;

    }
    checkMovingAvailability(targetPos,movePos,board) { // col, row 순서
        super.checkMovingAvailability();
        let canMove = false;

        let horizontalMoving = Math.abs(targetPos[0] - movePos[0]); // 1이면 대각선, 0 전진
        if (horizontalMoving === 0) {// 수평 이동 없음 => only 전진
            if (this.firstMove && Math.abs(targetPos[1] - movePos[1]) === 2) {// 2칸 전진
                this.firstMove = false;
                canMove =true;
            } else if (Math.abs(targetPos[1] - movePos[1]) === 1) { // 1칸 전진
                this.firstMove = false;
                canMove = true;
            } else if (Math.abs(targetPos[1] - movePos[1]) > 2) return false;  // 2보다 높은 전진
        } else if (horizontalMoving === 1) { // 수평 이동 있음 => 대각선 이동
            canMove = (Math.abs(targetPos[1] - movePos[1])===0) ?  false : (Math.abs(targetPos[1] - movePos[1])===1) ? (board[movePos[1]][movePos[0]].name !== '▢') : false; // only 수평, 대각선 한 칸,  한칸 초과
        } else canMove =false;
        canMove = this.color !== board[movePos[1]][movePos[0]].color && canMove === true; // 컬러판별

        return canMove;
    }
};

class Rook extends Piece{
    constructor(row=undefined,column=undefined,color="black",name) {
        super(row, column, color);
        this.name = name;
    }
    checkMovingAvailability(targetPos,movePos,board){ // col row
        super.checkMovingAvailability()
        let canMove = false;
        let horizontalMoving = Math.abs(targetPos[0] - movePos[0]); // 0 == 수직이동 x, 0 != 수평이동 col에 대한 식
        let verticalMoving = targetPos[1]- movePos[1]  //음수 : 아래로 이동 row가 1->3 예시, 양수 : 위로이동 row가 3->1 row에 대한 식
        let arrayOfCol = board.map(value => value[targetPos[0]]); //룩의 같은 col의 배열
        let arrayOfRow = board[targetPos[1]].map(value => value); // 룩의 같은 row의 배열

            if(horizontalMoving===0){ // 수직 이동
                let minRow, maxRow;
                if(targetPos[1]===0){
                    minRow = 0;
                    maxRow = Math.min(...(arrayOfCol.slice(targetPos[1]+1,8).map(value => { return (value.name !== '▢' ) ? value.row-1 : 9})));
                }else if(targetPos[1]===7){
                    maxRow = 7;
                    minRow = Math.max(...(arrayOfCol.slice(0,targetPos[1]).reverse().map(value => {return (value.name !== '▢' ) ? value.row+1 :-1;})));
                }else{
                    minRow = Math.max(...(arrayOfCol.slice(0,targetPos[1]).reverse().map(value => {return (value.name !== '▢' ) ? value.row+1 :-1;})));
                    maxRow = Math.min(...(arrayOfCol.slice(targetPos[1]+1,8).map(value => { return (value.name !== '▢' ) ? value.row-1 : 9})));
                }
                minRow = minRow === -1 ? 0 : minRow;
                maxRow = maxRow === 9 ? 7 : maxRow;
                if(board[movePos[1]][movePos[0]].color !== board[targetPos[1]][targetPos[0]].color){
                    if(maxRow === movePos[1]-1) maxRow++;
                    else if(minRow === movePos[1]+1) minRow++;
                }
                //console.log("수직 이동 가능 범위(Row):",minCol,"~", maxCol);
                canMove = movePos[1] <= maxRow && movePos[1] >= minRow;
            }
            else{ // 수평이동
                if(verticalMoving !== 0) return canMove; // row 변화가 있으면
                let minCol,maxCol;

                if(targetPos[0]===0){
                    minCol = 0;
                    maxCol = Math.min(...(arrayOfRow.slice(targetPos[0]+1,8).map(value => { return (value.name !== '▢' ) ? value.column-1 : 9})));
                } else if(targetPos[0]===7) {
                    maxCol = 7;
                    minCol = Math.max(...(arrayOfRow.slice(0, targetPos[0]).reverse().map(value => {
                        return (value.name !== '▢' && value.color === this.color) ? value.column +1 : -1;
                    })));
                }else{
                    maxCol = Math.min(...(arrayOfRow.slice(targetPos[0]+1,8).map(value => { return (value.name !== '▢') ? value.column-1 : 9})));
                    minCol = Math.max(...(arrayOfRow.slice(0,targetPos[0]).reverse().map(value => {return (value.name !== '▢' ) ? value.column+1 :-1;})));
                }
                minCol = minCol === -1 ? 0 : minCol;
                maxCol = maxCol === 9 ? 7 : maxCol;
                if(board[movePos[1]][movePos[0]].color !== board[targetPos[1]][targetPos[0]].color){
                    if(maxCol === movePos[0]-1) maxCol++;
                    else if(minCol === movePos[0]+1) minCol++;
                }
                console.log("수평 이동 가능 범위(Col):",minCol,"~", maxCol);
                canMove = movePos[0] <= maxCol && movePos[0] >= minCol;
                }

        return canMove;
    }
};

class Queen extends Piece{
    constructor(row=undefined,column=undefined,color="black",name) {
        super(row, column, color);
        this.name = name;
    }
    checkMovingAvailability(targetPos,movePos,board) {
        super.checkMovingAvailability()
    }

};
class Knight extends Piece{
    constructor(row=undefined,column=undefined,color="black",name) {
        super(row, column, color);
        this.name = name;
    }
    checkMovingAvailability(targetPos,movePos,board) {
        super.checkMovingAvailability()
    }

};
class Bishop extends Piece{
    constructor(row=undefined,column=undefined,color="black",name) {
        super(row, column, color);
        this.name = name;
    }

    checkMovingAvailability(targetPos,movePos,board) {
        super.checkMovingAvailability()

        if(Math.abs(movePos[0]-targetPos[0]) === Math.abs(movePos[1]-targetPos[1]) ) { //대각선으로 이동한 경우에 대해서만
            let targetRow = targetPos[1], targetCol = targetPos[0]; // 비숍의 좌표 정보
            let startCol, leftup = [], leftdown = [], obstacle = undefined;

            if (targetCol > targetRow) {
                startCol = targetRow + targetCol; //leftdown
                board.slice(0, startCol).map(rows => {
                    if (startCol >= 0) leftdown.push(rows[startCol--])
                })
                startCol = targetCol - targetPos; //leftup
                board.slice(0, 8 - startCol).map(rows => {
                    if (startCol < 8) leftup.push(rows[startCol++])
                })
            }
            else if (targetRow > targetCol) { //

                startCol = 0;
                board.slice(targetRow - targetCol, 8).map(rows => {
                    if (startCol < 8) leftup.push(rows[startCol++]); //leftup
                })
                startCol = targetRow + targetCol;
                board.slice(0, startCol).map(rows => {
                    if (startCol >= 0) leftdown.push(rows[startCol--])
                }) //leftdown
            }

            if (targetCol > movePos[0] && targetRow > movePos[1]) {
                leftup.map(piece => {
                    if ((piece.row > movePos[1] && piece.column > movePos[0]) && (piece.row < targetRow && piece.column < targetCol)) obstacle = piece;
                })
            } else if (targetCol < movePos[0] && targetRow < movePos[1]) {
                leftup.map(piece => {
                    if ((piece.row < movePos[1] && piece.column < movePos[0]) && (piece.row > targetRow && piece.column > targetCol)) obstacle = piece;
                })
            } else if (targetCol > movePos[0] && targetRow < movePos[1]) {
                leftdown.map(piece => {
                    if ((piece.row < movePos[1] && piece.column > movePos[0]) && (piece.row > targetRow && piece.column < targetCol)) obstacle = piece;
                })
            } else if (targetCol < movePos[0] && targetRow > movePos[1]) {
                leftdown.map(piece => {
                    if ((piece.row > movePos[1] && piece.column < movePos[0]) && (piece.row < targetRow && piece.column > targetCol)) obstacle = piece;
                })
            }

            if (obstacle.row === movePos[1]) return obstacle.color === board[movePos[1]][movePos[0]].color;
            return false;
        }
        else return false;
    }
};


let test_board = new ChessBoard();
test_board.showBoard();
test_board.getMovement();
