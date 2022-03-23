#include <iostream>


void main(void){
    int n = 0;
    
    scanf("%d", &n);
    if (0< n <101){
        for (int i = 0; i< n; i++){
            int j = i;
            for (int k = i+1; k<n; k++){
                if (array[k] < array[j]){
                    j=k;
                } 
            swab(array[i], array[j]);
            }
        }
    }
}    

