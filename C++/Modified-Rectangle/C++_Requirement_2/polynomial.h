#include <iostream>
#include <string>
#include <cmath>

using namespace std;

class Polynomial; //전방참조

class Term{
private:
    float coefficient=0; //coefficient
    int exponent=0; //exponent
    friend class Polynomial;
public:
    Term(): coefficient(0), exponent(0){};
    ~Term()=default;
};

class Polynomial
{
private:
    Term *termArray;
    int capacity; //1로 초기화
    int terms ; //저장된 항의 수로 0으로 초기화
public:
    Polynomial(){
        capacity = 1;
        terms = 0;
        termArray = new Term[capacity];
    };

    static Polynomial mul(const Polynomial& A,const Polynomial& B){
        int aPos=0, bPos=0;
        Polynomial C;
        while (aPos<=A.terms and bPos <= B.terms){
            if(A.termArray[aPos].exponent == B.termArray[bPos].exponent){
                float tmpCoef = A.termArray[aPos].coefficient + B.termArray[bPos].coefficient;
                if(tmpCoef != 0) C.newTerm(tmpCoef,A.termArray[aPos].exponent); // 계수가 0일때는 제외
                aPos++; bPos++;
            }
            else if (A.termArray[aPos].exponent < B.termArray[bPos].exponent) {
                C.newTerm(B.termArray[bPos].coefficient, B.termArray[bPos].exponent);
                bPos++;
            }
            else {
                C.newTerm(A.termArray[aPos].coefficient, A.termArray[aPos].exponent);
                aPos++;
            }
        }
        for (; aPos<=A.terms; aPos++) C.newTerm(A.termArray[aPos].coefficient, A.termArray[aPos].exponent);
        for (; bPos<=B.terms; aPos++) C.newTerm(B.termArray[bPos].coefficient, B.termArray[bPos].exponent);

        return C;
    }

    int eval(const int& X){ //정상
        int sumOfPol = 0;
        for(int i = 0; i<this->terms;i++){
            sumOfPol += this->termArray[i].coefficient * pow(X,this->termArray[i].exponent);
        }
        return sumOfPol;
    }


    void newTerm(const float theCoeff, const int theExp)
    {
        if (terms == capacity-1)
        {
            //double capacity of termArray
            capacity *= 2;
            Term *temp = new Term[capacity]; //new array
            copy(termArray, termArray + terms, temp);
            delete[]termArray; //deallocate old memory
            termArray = temp;
        }
        termArray[terms].coefficient = theCoeff;
        termArray[terms++].exponent = theExp;
    };

    friend ostream &operator<<(ostream& os, Polynomial& poly){
        for(int i = 0; i<poly.terms;i++){
            if(poly.termArray[i].coefficient>0){ //계수가 양수인 경우
                if (i==0) os << poly.termArray[i].coefficient << "x^" << poly.termArray[i].exponent; // 첫 노드
                else{
                    os << "+" << poly.termArray[i].coefficient << "x^" << poly.termArray[i].exponent;
                }

            }
            else{ //계수가 음수인 경우
                 os << poly.termArray[i].coefficient << "x^" << poly.termArray[i].exponent;
            }
        }
        cout <<endl;
        return os;
    };


    friend istream &operator>>(istream& _is, Polynomial& poly){
        float tmpCoef =0;
        int tmpExp = 0;
        while(true){
            _is >> tmpCoef;

            if (cin.get() == '\n'){
                poly.newTerm(tmpCoef, 0);
                break;
            }
            _is >> tmpExp;

            if(cin.get() == '\n') {
                if(tmpExp >0)
                    poly.newTerm(tmpCoef,tmpExp);
                break;
            }

            if(tmpExp >0)
                poly.newTerm(tmpCoef,tmpExp);
        };

        return _is;
    };

    Polynomial& operator=(const Polynomial &A){
        this->termArray = A.termArray;
        this->terms = A.terms;
        this->capacity = A.capacity;

        return *this;
    }

};



