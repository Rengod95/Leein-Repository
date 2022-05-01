
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
