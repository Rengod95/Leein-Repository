#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>


typedef struct STUDENT{
	char name[30];
	int ID;
	int semester;
	char classname[30];
}STUDENT;

void print_student_list(struct STUDENT* student, int listsize);
void find_student(struct STUDENT* student);
int compnum(char* temp, char* names);
void addstu(struct STUDENT* student, struct STUDENT* preslist, int *listnumptr, int size);
void remstu(struct STUDENT *student, struct STUDENT* preslist, int* listnumptr,int size);
void print_presentation_list(struct STUDENT* student, struct STUDENT* preslist, int* listnumptr,int size);

int main(void) {

	struct STUDENT preslist[5];
	int preslistnum = 0;
    int size;
	struct STUDENT student[8] = {
	{"Minsu", 2021001, 2, "class1"},
	{"Ayoung", 2021015, 2, "class2"},
	{"jihoon", 2018016, 8, "class5"},
	{"Minsu", 2020013, 4, "class5"},
	{"Sojung", 2021033, 2, "class3"},
	{"Eunmi", 2019010, 3, "class4"},
	{"Eunmi", 2018022, 5, "class1"},
	{"heejoon", 2018001, 7, "class4"}
	};
    size = sizeof(student)/sizeof(STUDENT);

	print_student_list(student, size);
	print_presentation_list(student,preslist,&preslistnum,size);
	
return 0;
}

void print_student_list(struct STUDENT* student, int listsize) {
	struct STUDENT temp;

	for (int i = 0; i < listsize; i++) {
		for (int j = 0; j < listsize; j++)
			if (student[i].semester < student[j].semester) {
				temp = student[i];
				student[i] = student[j];
				student[j] = temp;
			}
			else
				continue;
	}
	for (int i = 0; i < listsize; i++) {
		printf("%d번 이름: %s 학번: %d 학기: %d	수강과목: %s\n", i+1, student[i].name, student[i].ID, student[i].semester, student[i].classname);
	}

}

void find_student(struct STUDENT* student) {
	char temp[30];
	int choose;
	int count= 0 ;
	while(1){
		printf("찾으려는 학생의 이름 또는 수강과목을 입력하세요:");
		scanf("%s",&temp);
		
		if (compnum(temp,"exit")) {
			exit(0);
		}

		for(int i = 0; i<8; i++){
			if(compnum(temp, student[i].name) == 1){
				printf("%d번 이름: %s 학번: %d 학기: %d	수강과목: %s\n", i, student[i].name, student[i].ID, student[i].semester, student[i].classname);
				count++;
			}
			if(compnum(temp, student[i].classname)==1){
				printf("%d번 이름: %s 학번: %d 학기: %d	수강과목: %s\n", i, student[i].name, student[i].ID, student[i].semester, student[i].classname);
				count++;
			}
			if (i == 7 && count==0) {
				printf("해당 학생 정보를 찾을 수 없습니다.\n");
			}
		}
		count=0;
	}
}

void print_presentation_list(struct STUDENT *student, struct STUDENT *preslist, int *listnumptr,int size) {
	
	while(1){
	int choose = 0;
	printf("발표리스트에 추가하려면 1번 삭제하려면 2번, 종료하려면 3번을 누르세요 :");
	scanf("%d",&choose);

		switch (choose) {

		case 1 :
			addstu(student,preslist,listnumptr,size);
			continue;
		case 2 :
			remstu(student,preslist,listnumptr,size);
			continue;
		case 3 :
			exit(0);
        case 4:
            find_student(student);
		}

	}
}

void addstu(struct STUDENT* student, struct STUDENT* preslist, int *listnumptr, int size) {
	int studentnum;
	printf("발표리스트에 추가할 학생 번호를 입력하세요:");
	scanf("%d",&studentnum);
	studentnum -= 1;
	if (studentnum < 0 || studentnum>size-1) {
		printf("잘못된 번호입니다.\n");
		print_presentation_list(student, preslist, listnumptr,size);
	}
	int preslistnum = *listnumptr;

	if (preslistnum >= 1) {
		for (int i = 0; i < (*listnumptr); i++) {
			if (preslist[i].ID == student[studentnum].ID) {
				printf("이미 발표리스트에 있는 학생입니다.\n");
				print_presentation_list(student, preslist, listnumptr,size);
			}
		}
		preslist[preslistnum] = student[studentnum];
		// 발표자배열[발표자배열인덱스] = 기존 학생정보가 있는 배열[사용자 입력 값]

		printf("<< 발표리스트 >>\n");
		for (int i = 0; i <= preslistnum; i++) {
			printf("%d번 이름: %s 학번: %d 학기: %d	수강과목: %s\n", i + 1, preslist[i].name, preslist[i].ID, preslist[i].semester, preslist[i].classname);
		}
			
		if (*listnumptr == 4) {
			printf("총 발표자 수 : %d\n",*listnumptr+1);
			exit(0);
		}
		(*listnumptr) += 1;
		printf("총 발표자 수 : %d\n",*listnumptr); //발표리스트 인덱스를 의미
	}

	if (preslistnum == 0) {

		preslist[preslistnum] = student[studentnum];

		printf("<< 발표리스트 >>\n");
		printf("%d번 이름: %s 학번: %d 학기: %d	수강과목: %s\n", 1, preslist[preslistnum].name, preslist[preslistnum].ID, preslist[preslistnum].semester, preslist[preslistnum].classname);
		// 발표리스트 배열의 0번째 원소에 1번 학생 추가

		(*listnumptr) += 1;
		printf("총 발표자 수 : %d\n",*listnumptr); //다음 원소로 이동
	}
}

void remstu(struct STUDENT *student, struct STUDENT* preslist, int* listnumptr, int size) {

	if ((*listnumptr) == 0) {
		printf("삭제할 학생이 없습니다.\n");
		print_presentation_list(student, preslist, listnumptr,size);
	}

	struct STUDENT temp;
	int preslistnum;
	printf("발표리스트에서 삭제할 학생 번호를 입력하세요:");
	scanf("%d", &preslistnum);
	preslistnum -= 1; // 배열의 단위와 맞춰줌


	if ((*listnumptr) == 1) { // 1명만 있을 때
		if (preslistnum == 0) { //사용자 입력이 1이면
			--(*listnumptr);
			printf("총 발표자 수 : %d\n",*listnumptr);
			print_presentation_list(student, preslist, listnumptr,size);
		}
		else {// 입력이 1이 아니면
			printf("삭제할 학생이 없습니다.\n");
			print_presentation_list(student, preslist, listnumptr,size);
		}
	}

	if ((*listnumptr) >1){ // 한명 이상일 때

		if (preslistnum < 0 || preslistnum>(*listnumptr)-1) { // 1번~listnumptr에서 벗어난 경우
			printf("삭제할 학생이 없습니다.\n");
			print_presentation_list(student, preslist, listnumptr,size);
		}
		if (preslistnum == (*listnumptr)-1){ //끝번호일 경우
			printf("<< 발표리스트 >>\n");
			for (int i = 0; i < (*listnumptr)-1; i++) {
				printf("%d번 이름: %s 학번: %d 학기: %d	수강과목: %s\n", i + 1, preslist[i].name, preslist[i].ID, preslist[i].semester, preslist[i].classname);
			}
			--(*listnumptr);
			printf("총 발표자 수 : %d\n",*listnumptr);
			print_presentation_list(student, preslist, listnumptr,size);

		}
		else{ //범위안에 포함 되는 경우
			for (; preslistnum < (*listnumptr)-1; preslistnum++) {
				preslist[preslistnum] = preslist[preslistnum + 1];			
				if (preslistnum == (*listnumptr) - 2) {
					printf("<< 발표리스트 >>\n");
					for (int i = 0; i < (*listnumptr)-1; i++) {
						printf("%d번 이름: %s 학번: %d 학기: %d	수강과목: %s\n", i + 1, preslist[i].name, preslist[i].ID, preslist[i].semester, preslist[i].classname);
					}
					--(*listnumptr);
					printf("총 발표자 수 : %d\n",*listnumptr);
					print_presentation_list(student, preslist, listnumptr,size);
				}
			}
	
			

		}
	}
}

int compnum(char* temp, char* names) {
	while (*temp) {
		if (*temp != *names) {
			return 0;
		}
		temp++;
		names++;

	}

	if (*names == '\0') {
		return 1;
	}
	return 0;
}