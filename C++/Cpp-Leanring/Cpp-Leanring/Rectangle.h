#pragma once

#include <iostream>

class Rectangle

{
private:
	static int id;
	int width;
	int height;
	int xLow, yLow;

public:
	Rectangle(int, int, int, int);
	~Rectangle();

	friend std::ostream& operator <<(std::ostream&, Rectangle&);

	Rectangle operator +(Rectangle&);
};