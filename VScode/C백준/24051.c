#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void){
    int n,j, k;
    scanf("%d",&n);
    scanf("%d",&k);
    int arr[n]; //vla 이용해 원하는 만큼의 수를 입력받기
    int checkpoint;
    int checkcount=0;

    for(int i = 0; i<n;i++){
        scanf("%d",&arr[i]);
    }
    for(int i = 0; i<n-1 ; i++){
//배열 원소 수가 n이면 인덱스 끝은 n-1이고, checkpoint는 항상 i+1값을 가지므로 마지막 원소가 체크포인트가 되기 위해선 최대 값이 n-1 
//즉 인덱스가 n-2가 되야 함
        checkpoint = arr[i+1]; //무조건 비교 기준 수는 한칸 뒤에서 시작
        for (j =i; j>-1; j--){ // checkpoint 직전부터 맨 처음까지로 이동
            if(arr[j]>checkpoint){// 도중에 체크포인트 보다 큰 값이 있다면   
                arr[j+1] = arr[j];
                checkcount++;
                if(checkcount>k){
                    printf("%d",arr[j]);
                    exit(0);
                }     //그 뒷자리 수에 임시로 j번째의 값을 땡겨옴 12453 , check==3-> 12455 j값이 4, --> 12445 2<check == j+1지점에 check값 할당   
            }
            else{             
                break;
            }
        }
        arr[j+1]=checkpoint;
        checkcount++;
        if(checkcount>k){
            printf("%d",checkpoint);
            exit(0);
        }
    }
    if(checkcount<=k){
        printf("-1");
    }

return 0;
}