#include<stdio.h>
int arr[1001]; //i번째 단계에서 이동할 수 있는 숫자
int dp[1001]; //i번째 단계에 도달하기까지의 최소 점프 수
int main() {
	int n; scanf("%d", &n);
	for (int i = 1; i <= n; i++) {
		scanf("%d", &arr[i]);
	}
	int num; int index;
	//n==1일때 
	num = arr[1]; index = 1;
	while (num > 0) {
		if (dp[index + num] == 0) dp[index + num] = dp[index] + 1;
		else if (dp[index + num] > dp[index] + 1) {
			dp[index + num] = dp[index] + 1;
		}
		num--;
	}
	for (int i = 2; i <= n; i++) {
		num = arr[i];
		index = i;
		while (num > 0 && dp[i] > 0) { 

			if (dp[index + num] == 0) dp[index + num] = dp[index] + 1;
			else if (dp[index + num] > dp[index] + 1) {
				dp[index + num] = dp[index] + 1;
			}
			num--;
		}
	}
	if (dp[n] == 0 && n != 1) 
        printf("-1"); 
	else 
        printf("%d", dp[n]);

return 0;
}
