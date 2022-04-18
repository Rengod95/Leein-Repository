#include "iostream"

class testClass{
private:
    int xPos;
    int yPos;
public:
    testClass(int x, int y){
        std::cout << "constructor 호출 됨" << std::endl;
    }

    ~testClass(){
        std::cout << "destructor 호출 됨" << std::endl;
    }

    testClass showAll(testClass& t){
        std::cout << "x:" << xPos << "y:" << yPos << std::endl;
        std::cout << "x2:" << t.xPos << "y2:" << t.yPos << std::endl;
    }

    testClass operator+(const testClass&)

};

testClass testClass::operator+(const testClass& t1){
    testClass tmp(xPos+t1.xPos,yPos+t1.yPos);
    return tmp;
}

int main(){
    testClass t1(1,2);
    testClass t2(3,4);
    testClass t3 (0,0);

    t3 = t1+t2;

    t3.showAll(t1);

}