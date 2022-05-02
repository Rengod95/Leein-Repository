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
        this.board = new Array(8).fill(null).map((value) => value = new Array(8).fill({}));
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
                firstRow = row.map((col,colIndex)=>{ return new Pawn(rowIndex,colIndex,tmpColor,imojiColor[4]) })
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
            let tmp = value.map(piece => piece.name).join(' ');
            console.log(tmp);
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
            this.convertFile(targetPos,movePos);
            this.setPiece(targetPos,movePos);
            this.showBoard()//이동 확인
            rL.close(); // 입력 종료
        })

    };

    convertFile(targetPos,movePos){// 입력받은 좌표 배열의 files를 숫자로 변환 col,row 순서 배열임
        FILES.map((value,index) => {
            if(targetPos[0] === value) targetPos[0]=index;
        })
        FILES.map((value,index) => {
            if(movePos[0] === value) movePos[0]=index;
        })

        targetPos = targetPos.map((value)=>parseInt(value));
        movePos= movePos.map((value)=>parseInt(value));

    }

    setPiece(targetPos,movePos){ // 피스 이동
        //targetPos의 Piece 객체에 대해 이동 가능성을 판별해야 함
        let movingAbility = this.board[targetPos[1]][targetPos[0]].checkMovingAvailability(targetPos,movePos);
        if(movingAbility){
            this.board[movePos[1]][movePos[0]] = this.board[targetPos[1]][targetPos[0]]
            this.board[movePos[1]][movePos[0]].modifyPosition(movePos[1],movePos[0]);
            this.board[targetPos[1]][targetPos[0]] = new Piece(targetPos[1],targetPos[0])
        } else console.log("해당 좌표로 기물을 이동할 수 없습니다.")



    };

};

class Piece{
    constructor(row=undefined,column=undefined,color=undefined) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.name = "▢";
    }
    modifyPosition(row,column){ //해당 피스의 좌표 업데이트
        this.row = row;
        this.column = column;
    }
    checkMovingAvailability(){
        console.log("해당 좌표에 기물이 존재하지 않습니다.")
        return false;
    }


};

class Pawn extends Piece{
    constructor(row=undefined,column=undefined,color="black",name) {
        super(row, column, color);
        this.name = name;
        this.firstMove = true;

    }
    checkMovingAvailability(targetPos,movePos){ // col, row 순서
        let kindOfmoving = Math.abs(targetPos[1]-movePos[1]); // 1이면 대각선, 0 전진
        if(kindOfmoving === 0){// 직진의 경우
            if(this.firstMove && Math.abs(targetPos[0]-movePos[0])=== 2){// 2칸 전진
                this.firstMove = false;
                return true;
            }
            else if(Math.abs(targetPos[0]-movePos[0])===1){ // 1칸 전진
                this.firstMove = false;
                return true;
            }
            else if(Math.abs(targetPos[0]-movePos[0])>2) return false;  // 2보다 높은 전진
        }
        else if(kindOfmoving===1){ // 대각선

        }
        else return false;
    }


};
class Rook extends Piece{
    constructor(row=undefined,column=undefined,color="black",name) {
        super(row, column, color);
        this.name = name;
    }
};
class Queen extends Piece{
    constructor(row=undefined,column=undefined,color="black",name) {
        super(row, column, color);
        this.name = name;
    }
    modifyPosition(row,column){
        super.modifyPosition(row, column);
    }
};
class Knight extends Piece{
    constructor(row=undefined,column=undefined,color="black",name) {
        super(row, column, color);
        this.name = name;
    }
    modifyPosition(row,column){
        super.modifyPosition(row, column);
    }
};
class Bishop extends Piece{
    constructor(row=undefined,column=undefined,color="black",name) {
        super(row, column, color);
        this.name = name;
    }
    modifyPosition(row,column){
        super.modifyPosition(row, column);
    }
    //대각선으로 칸수 제한 없음
    //시작된 칸의 색갈에서만 이동가능,타겟 좌표 - 이동좌표 의 절댓값이 row col 모두 일치해야 함
};


let test_board = new ChessBoard();
test_board.showBoard();
test_board.getMovement();
