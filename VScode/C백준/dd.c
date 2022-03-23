#include<stdio.h>
//Prosto
int main(void) {
    int sum=0,n;
    scanf("%d",&n);

    for(int i =0; i<n;i++){
        for(int j=i;j<n;j++){
            sum+=i+j;
        }
        
    }

    printf("%d",sum);
 return 0;
}

