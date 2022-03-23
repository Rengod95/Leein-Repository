#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>

typedef struct words{
    char m1[51];
    int len; //길이별 정렬
}words;

int main(void){

    words word[20001];//구조체배열
    int n, tmplen; //단어 갯수, 같은 길이 단어 끼리 알파벳 순서 정렬
    char tmps[51];
    scanf("%d",&n);

    for(int i = 0; i<n; i++){//n개의 수의 단어를 입력받음
        scanf("%s",word[i].m1);
        word[i].len = strlen(word[i].m1); // 길이 입력
        if(i==(n-1)){
            *(word[n].m1) = '\0';//마지막에 \0를 넣어 끝을 구분함
        }
    }

    for(int i = 0; i < n; i++){// 오름차순 정렬
        for(int j = 0; j<i; j++){

            if(word[i].len<word[j].len){
                strcpy(tmps,word[i].m1);
                strcpy(word[i].m1, word[j].m1);
                strcpy(word[j].m1, tmps);

                tmplen=word[i].len;
                word[i].len=word[j].len;
                word[j].len=tmplen;
            }
            else
                continue;
        }
    }

    for(int i = 0; i < n; i++){
        for(int j = 0; j<i; j++){
            int cha = strncmp(word[i].m1, word[j].m1,1); //첫 자리 비교
            if(word[i].len == word[j].len && cha<0){    
                strcpy(tmps,word[i].m1);
                strcpy(word[i].m1, word[j].m1);
                strcpy(word[j].m1, tmps);
            }
            else
                continue;
        }
    }

    for(int i = 0; i < n; i++){    
        printf("%s\n",word[i].m1);
        if(strcmp(word[i+1].m1,"\0")==0)
            exit(0);
        
    }

return 0;
}

void nodouble(char *str1, int *n){
    for(int i =0; i<(*n); i++){
        for(int j=i+1; j<(*n); j++){
            if(strcmp(word[i].m1, word[j].m1)==0){
                
                word[j].m1 = word[j+1];
        }
        if(i==(*n)-1)
            strcpy(word[*n].m1, "\0");
    }

}