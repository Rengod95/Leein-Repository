#include <stdio.h>
#include <stdlib.h>

int main(void){
    int m, n;
    scanf("%d %d",&m,&n);
    int arr[1000001];

    for(int i = 2;i<=1000000; i++){
        arr[i]= i;
    }

    for(int i = 2; i <= n; i++){
        if(arr[i]==0 || arr[i]==1)
            continue;
        for(int j = i*2 ; j<=n ; j=j+i){
            arr[j]=0;
        }
    }

    for(int i = m; i <= n ; i++){
        if(arr[i] != 0)
            printf("%d\n",arr[i]);
    }

return 0;
}