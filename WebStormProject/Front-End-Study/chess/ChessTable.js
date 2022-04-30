
//입력을 위한 const 객체
const readline = require('readline');
const rL = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//체스판 files를 배열의 column으로 변환하기 위해 선언
const FILES = ["A","B","C","D","E","F","G","H"];

class ChessBoard{
    constructor(){
        this.board = new Array(8).fill(null).map((value) => value = new Array(8).fill({}));
        this.Turn = "White";
        this.initalizeBoard()
    }
    initalizeBoard(){
        this.board = this.board.map((row,rowIndex) =>{
            let firstRow = new Array(8);
            firstRow[0] = new Rook(); firstRow[7]= new Rook;
            firstRow[1] = new Knight; firstRow[6] = new Knight;
            firstRow[2] = new Bishop; firstRow[5] = new Bishop;
            firstRow[3] = new Queen; firstRow[4] = {name : "null"};
            return (rowIndex === 0) ? firstRow : (rowIndex===1 || rowIndex===6) ? new Array(8).fill(new Pawn) : (rowIndex===7) ? firstRow.reverse() : new Array(8).fill(new Pawn);
        })
    };
    showBoard(){
        let tmpString = JSON.stringify(this.board).replaceAll('],[', '\n').replaceAll(',', ' ').replaceAll('[[', '').replaceAll(']]', '').replaceAll("name",'');
        console.log(tmpString);
        //console.log(this.board)
    }

}

class Piece{

    constructor(row=undefined,column=undefined) {
        this.name = "piece";
        this.row = row;
        this.column = column;
    }
    getMovement(){
        let tmpString = [];
        let movement1 = [];
        let movement2 = [];
        rL.on("line",(inputs)=>{
            tmpString = inputs.split(' ').map(value => value.split(''));
             movement1= tmpString[0];
             movement2 = tmpString[1];
             console.log(movement1,movement2);
            rL.close();
        })


    }
    setPiece(row,column){

    }
}

class Pawn extends Piece{
    constructor(row,column) {
        super(row, column);
        this.name = "P";
    }
}
class Rook extends Piece{
    constructor() {
        super();
        this.name = "R";
    }
}
class Queen extends Piece{
    constructor() {
        super();
        this.name = "Q";
    }
}
class Knight extends Piece{
    constructor() {
        super();
        this.name = "K";
    }
}
class Bishop extends Piece{
    constructor() {
        super();
        this.name = "B";
    }
}

let test_board = new ChessBoard();
let testPiece = new Piece();
test_board.showBoard();
testPiece.getMovement();
console.log(testPiece);