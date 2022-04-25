#include "iostream"
#include "math.h"

class sparseMatrix;

class MatrixTerm{
    friend class sparseMatrix;
private:
    int row;
    int column;
    int value;
};

class sparseMatrix{
    int totalRow, totalCol, totalTerms, capacity;
    MatrixTerm* matrix;

    sparseMatrix(){
        total
    }
    sparseMatrix(const int& rows,const int& columns,const int capacity){
        this->totalRow = rows;
        this->totalCol = columns;
        this->matrix = new MatrixTerm[capacity];
    };

    ~sparseMatrix(){
        delete[] matrix;
    }

    static sparseMatrix transposeFaster(sparseMatrix& origin){
        sparseMatrix transporsed(origin.totalCol,origin.totalRow,origin.totalTerms);
        if(origin.totalTerms>0){
            int *rowSize = new int[origin.totalCol];
            int *rowStart= new int[origin.totalCol];

            for(int i = 0; i<origin.totalTerms; i++){
                rowSize[i] = 0;
            }

            for( int i = 0; i<origin.totalTerms; i++){
                rowSize[origin.matrix[i].column]++;
            };


            rowStart[0] = 0;
            for(int i = 1; i<origin.totalCol;i++){
                rowStart[i] = rowStart[i-1]+rowSize[i-1];
            }

            for(int i=0; i<origin.totalTerms; i++){
                int transIndex = rowStart[origin.matrix[i].column];
                transporsed.matrix[transIndex].column = origin.matrix[i].row;
                transporsed.matrix[transIndex].row = origin.matrix[i].column;
                transporsed.matrix[transIndex].value = origin.matrix[i].value;
            }



        }




        return transporsed;
    }




};
