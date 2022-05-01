import 'readline'
import * as readline from "readline";
//입력을 위한 const 객체

const rL = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//체스판 files를 배열의 column으로 변환하기 위해 선언
const FILES = ["A","B","C","D","E","F","G","H"];

class ChessBoard{
    constructor(){
        this.board = new Array(8).fill(null).map((value) => value = new Array(8).fill({}));
        this.initalizeBoard()
    };

    initalizeBoard(){
        this.board = this.board.map((row,rowIndex) =>{
            let firstRow = new Array(8);
            if(rowIndex ===0 || rowIndex===7){
                let tmpColor = rowIndex===0 ? "black":"white";
                firstRow[0] = new Rook(rowIndex,0,tmpColor); firstRow[7]= new Rook(rowIndex,7,tmpColor);
                firstRow[1] = new Knight(rowIndex,1,tmpColor); firstRow[6] = new Knight(rowIndex,6,tmpColor);
                firstRow[2] = new Bishop(rowIndex,2,tmpColor); firstRow[5] = new Bishop(rowIndex,5,tmpColor);
                firstRow[3] = new Queen(rowIndex,3,tmpColor); firstRow[4] = new Piece(rowIndex,4,tmpColor);
                return firstRow;
            }
            else if(rowIndex===1||rowIndex===6){
                let tmpColor = rowIndex===1 ? "black":"white";
                firstRow = row.map((col,colIndex)=>{ return new Pawn(rowIndex,colIndex,tmpColor) })
                return firstRow;
            }
            else{
                firstRow = row.map((col,colIndex) => {return new Piece(rowIndex,colIndex)});
                return firstRow;
            }
        })
    };

    showBoard(){
        let tmpString = JSON.stringify(this.board).replaceAll('],[', '\n').replaceAll(',', ' ').replaceAll('[[', '').replaceAll(']]', '').replaceAll("name",'');
        //console.log(tmpString);
        console.log(this.board)
    };

    getMovement(){ // 이동 입력 받기
        let tmpString = [];
        let movement1 = [];
        let movement2 = [];
        rL.on("line",(inputs)=>{
            tmpString = inputs.split(' ').map(value => value.split(''));
            movement1= tmpString[0];
            movement2 = tmpString[1];
            console.log(movement1,movement2);
            this.setPiece(movement1,movement2);
            rL.close();
        })

    };

    setPiece([rowFrom,colFrom],[rowTo,colTo]){ // 피스 이동
        if(this.board[rowFrom][colFrom] === Piece){
            console.log("캐치")
        }
        this.board[rowTo][colTo] = this.board[rowFrom][colFrom]
    };

};

class Piece{
    constructor(row=undefined,column=undefined,color="black") {
        this.row = row;
        this.column = column;
        this.color = color;
        this.name = "piece";
    }

};

class Pawn extends Piece{
    constructor(row=undefined,column=undefined,color="black") {
        super(row, column,color="black");
        this.name = "P";
    }
};
class Rook extends Piece{
    constructor(row=undefined,column=undefined,color="black") {
        super(row, column,color="black");
        this.name = "R";
    }
};
class Queen extends Piece{
    constructor(row=undefined,column=undefined,color="black") {
        super(row, column,color="black");
        this.name = "Q";
    }
};
class Knight extends Piece{
    constructor(row=undefined,column=undefined,color="black") {
        super(row, column,color="black");
        this.name = "K";
    }
};
class Bishop extends Piece{
    constructor(row=undefined,column=undefined,color="black") {
        super(row, column,color="black");
        this.name = "B";
    }
};


let test_board = new ChessBoard();
test_board.showBoard();
test_board.getMovement();
