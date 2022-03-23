#include <stdio.h>

int main(void){
    int n,num;
    int arr[1000] = {0,};
    int count = 0;
    int total = 0;

    scanf("%d",&n);
    for(int i = 0; i<n; i++){
        scanf("%d",&num);
        arr[i]=num;
    }

    for(int i = 0; i<n; i++){
        if(arr[i]==1 || arr[i]== 0){
            continue;
        }
        for(int j=2; j<=arr[i]; j++){
            if(arr[i]%j==0){
                if(j==arr[i]){
                    total+=1;
                }
                else break;
            }
        }
    }

    printf("%d",total);

return 0;
}