int BinarySearch(int *a, const int x, const int n) {
     // 정렬된 배열 a[0], ..., a[n-1]에서 x를 탐색
     int left = 0, right = n-1; 
     
     while (left <= right) { 
         // 원소가 더 있는 한
        int middle = (left + right) / 2; 
        if (x < a[middle]) right = middle - 1; 
        else if (x > a[middle]) left = middle + 1; 
        else return middle; } // while 의 끝
        return -1;  // 발견되지 않음
        }