#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void){
    char words[1000001];
    scanf("%s",words);
    int tempc=0;
    int indexnum[1000001]= {'0',};
    int maxc=0;
    int doublenum=0;
    //대문자 소문자로 전환
    for(int i = 0; words[i] != '\0'; i++){
        if('A'<= words[i] && words[i]<='Z'){
            words[i]=words[i]+32;
        }
        else
            continue;
    }
    //같은 문자가 있으면 tempc++ 그러나 j가 i보다 작은 경우에 발생하면 중단
    for(int i = 0; words[i]!='\0'; i++){
        for(int j = 0; words[j]!='\0'; j++){
            if( words[i]==words[j]){
                if(j<i)
                    break;
                else
                    tempc++;
            }
        }
        indexnum[i]= tempc;
        tempc=0;
    }
// 최대 갯수의 단어 찾기
    for(int i = 0; words[i]!='\0'; i++){
        if(maxc<indexnum[i]){
            maxc=indexnum[i];
        }
    }
// 중복일 경우 ? 출력
    for(int i = 0; words[i]!='\0'; i++){
        if(maxc==indexnum[i]){
            doublenum++;
            if(doublenum>=2){
                printf("?");
                exit(0);
            }
        }
    }
// 최대 갯수 단어 출력 소문자일 경우 -32
    for(int i = 0; words[i]!='\0'; i++){
        if(indexnum[i]==maxc){
            if(words[i]>='a' && words[i]<='z'){
                printf("%c",words[i]-32);
            }
        }
    }
return 0;
}