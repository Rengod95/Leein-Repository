#include <stdio.h>

void recurse(int i);

int main(){
    recurse(1);
    printf("asdasd");

    return 0;

}


void recurse(int i) {
if(i <= 3){ recurse(i + 1);
printf ("i : %d \n", i); }
else
printf("함수 탈출 시작. \n");
}