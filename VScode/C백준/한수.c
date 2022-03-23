#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
	int n=0;
	int hanarr[3] = {0, };
	int count=0;
    int total;
    int temp;
	scanf("%d",&n);
    if(n==1000){
        printf("144");
        exit(0);
    } 
	if(0<n && n<1001){
        if (n < 100) {
		    total =n;
	    }
        else if(100<= n && n<1000) {
            for (int i = 100; i <= n; i++) { 
                temp = i;              
                hanarr[0] = temp%10;
                temp= temp/10;
                hanarr[1] = temp%10;
                temp= temp/10;
                hanarr[2] = temp % 10;

                if (hanarr[0] - hanarr[1] == hanarr[1] - hanarr[2]) {
                    count++;
                }
            }
        total = count+99;
        }
	printf("%d",total);
	}

return 0;
}



