#include <stdio.h>
#include <stdlib.h>

int main(void){
    int M, N, memnum, num;
    int arr[10000];
    int size;
    int sum = 0;
    int n = 0;
    int min;

    scanf("%d %d", &M, &N);
        for (int i = M; i<=N; i++){
            if(i==1) continue;
            for(int j = 2; j<=i;j++){
                if(i%j ==0){  
                    if(i==j){
                        arr[n]= j;
                        sum = sum + arr[n];
                        n++;
                        break;             
                    }
                    else break;
                }        
            }     
        }
    if(sum !=0){
        min = arr[0];
        printf("%d\n%d",sum, min);
    }
    if(sum ==0){
        printf("-1");
    }
return 0;
}