#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>


struct STUDENT {
	char name[30];
	int ID;
	int semester;
	char classname[30];
};

void print_student_list(struct STUDENT* student, int listsize);
int compnum(char* temp, char* names);
void find_student(struct STUDENT* student);

void main(void) {
	
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
	
	print_student_list(student,8);
	find_student(student);
	

}

void print_student_list(struct STUDENT* student, int listsize) {
	struct STUDENT temp;

	for (int i = 0; i<listsize; i++){
		for(int j = 0; j<listsize; j++)
		if (student[i].semester < student[j].semester) {
			temp = student[i];
			student[i] = student[j];
			student[j] = temp;
		}
		else
			continue;
	}

	for (int i = 0; i < listsize; i++) {
		printf("%d번 이름: %s 학번: %d 학기: %d	수강과목: %s\n",i, student[i].name, student[i].ID, student[i].semester, student[i].classname);
	}

}

void find_student(struct STUDENT* student) {
	char temp[30];
	int choose;
	int count= 0 ;
	while(1){
		printf("찾으려는 학생의 이름 또는 수강과목을 입력하세요:");
		scanf("%s",&temp);
		
		if (temp == "exit") {
			exit;
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
			if (i == 8 && count==0) {
				printf("해당 학생 정보를 찾을 수 없습니다.");
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