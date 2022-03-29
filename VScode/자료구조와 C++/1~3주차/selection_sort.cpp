#include <iostream>
   
   
    void selection_sort(const int n, int*a){ // n은 배열의 길이, 포인터a는 배열의 주소
        for (int i = 0; i<n; i++){ //기준 포인터는 i
            int j = i; //반환 받을 인덱스 만들어놓기
            for (int k = i+1; k<n; k++){ //움직일 포인터는 k
                if (a[k] < a[j]){ //움직이는 놈보다 기준놈이 크다면
                    j = k; // 반환 받을 인덱스에 작은 놈 인덱스를 할당
                }
            }
            //swap(a[i],a[j]); // 다 돌고 젤 작은 값의 인덱스를 반환 받아 스왑 함수를 통해 해당 인덱스의 값 바꿔치기
        }



    }

using namespace ::std;

void main(void){
    int array[] = random(30);
    
    for (int i = 0; i<n; i++)
        cout << array[i] << endl
}