#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void){
    char arr[1000001] = {' '};
    int count = 0;
    int wordcheck=0;
    gets(arr);

    if(arr[0]== ' '){
        wordcheck=0;
    }
    else{
        wordcheck=1;
    }
    for(int i = 0; i<1000000;i++){
        if(arr[i] != ' '){// 공백아닐 때 wordcheck==1
            wordcheck = 1;
        }
        if(wordcheck == 1 && arr[i]==' '){// 공백을 만났을 때
                count++;
                wordcheck=0;
                if(wordcheck == 0 && arr[i+1]== '\0'){// _\0 거르기                  
                    break;
                }

        }
        if(wordcheck==1 && arr[i+1]=='\0'){ // _a_a
            count++;
            break;
        }
        if(arr[i]==' ' && (arr[i+1]=='\0' || arr[i+1]==' ')){
            printf("%d",0);
            exit(0);
        }
    }
    printf("%d",count);
return 0;
}