#include <iostream>
#include "polynomial.h"

using namespace std;

int main(){
    Polynomial A,B,C;
    int x;

    cout << "A(x) 입력:";
    cin >> A;

    cout << "B(x) 입력:";
    cin >> B;

    cout << "A(x)=" << A;
    cout << "B(x)=" << B;

    C = Polynomial::mul(A, B);

    cout << "A(x) * B(x) =" << C;
    cout << "대입 값 x 입력:";
    cin >> x;

    cout <<"A("<<x<<")="<<A.eval(x)<<endl<< "B(" << x << ")=" << B.eval(x) << " C(" << x << ")=" << C.eval(x) << endl;

    return 0;
}