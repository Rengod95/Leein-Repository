#include <stdio.h>

int main(void){
    unsigned int ten;
    scanf("%u",&ten);
    int index = 0;
    int arr[100];
    while(1){
        if(ten/2 < 1) {
            arr[index]= ten%2;
            break;
        }
        arr[index]= ten%2;
        ten = ten/2;
        index +=1;
    }

    for(; index>=0; index--){
        printf("%d",arr[index]);
    }
    return 0;
}
