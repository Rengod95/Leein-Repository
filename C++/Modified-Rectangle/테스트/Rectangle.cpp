#include "Rectangle.h" // Rectangle 헤더 불러오기
#include <iostream> // 라이브러리 iostream 불러오기
//using namespace std;

int Rectangle::id = 0;  //Rectangle 객체가 몇 번 생성 되었는지 나타낸다.

Rectangle::Rectangle(int x, int y, int w, int h) { //생성자가 int 매개변수 4개를 받음
    xLow = x;
    yLow = y;
    width = w;
    height = h;

    std::cout << ++id << "번째 Rectangle 객체 생성\n\n"; //생성자 실행 시 호출되게 함
}

Rectangle::~Rectangle() { // 파괴자 생성
    std::cout << "좌표 (" << xLow << ',' << yLow << ')' // 객체 소멸시 호출됨
              << "Rectangle 객체 소멸\n\n";
}

std::ostream& operator <<(std::ostream& os, Rectangle& r) { // << 연산자 오버로딩 ostream의 객체와 rectangle 객체의 참조를 받는다
    os << "height : " << r.height << std::endl
       << "width : " << r.width << std::endl
       << "x : " << r.xLow << std::endl
       << "y : " << r.yLow << std::endl << std::endl;

    return os;
}

Rectangle Rectangle::operator +(Rectangle& r) { //>> 연산자 오버로딩 istream의 객체와 rectangle 객체의 참조를 받는다

    int sum_x, sum_y, sum_w, sum_h;

    sum_x = xLow + r.xLow;
    sum_y = yLow + r.yLow;
    sum_w = this->width + r.width;  //this를 통해 피연산되는 객체의 멤버변수에 접근
    sum_h = this->height + r.height;

    return Rectangle(sum_x, sum_y, sum_w, sum_h);
}