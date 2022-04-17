
#include <iostream>
#include "Rectangle.h"

int main()
{
    Rectangle r1(1, 1, 3, 4);
    std::cout << r1;
    
    Rectangle* r2 = new Rectangle(2, 3, 5, 5);
    std::cout << *r2;

    r1 = r1 + *r2;

    std::cout << r1;

    delete r2;
}
