import { TagObject } from "./TagObject.mjs";

export const toObject = (array) => {
  let stack = [] // 임시 파싱된 객체를 담음
  let currentIndex = 0; // 순차 탐색 index
  let tmpIndex = 0; // 클로즈 태그 앞 원소 탐색을 위한 index
  let nestedCount= 0;// 중첩 횟수

  while(!(array.length === 0)) {
    if (array[currentIndex].charAt() ==='/'){ // closing tag 만나먄 stop
      tmpIndex = currentIndex-1; // </> current -1 인덱스
      while(tmpIndex>=0){
        if(array[currentIndex].slice(1,array[currentIndex].length) === array[tmpIndex]){
          stack.push(new TagObject(array[tmpIndex], nestedCount,undefined));
          array.splice(array.indexOf(array[currentIndex]), 1);
          array.splice(array.indexOf(array[tmpIndex]), 1);
          nestedCount -= 1;
          currentIndex -= 1; //2개를 delete 하면 current가 가르키는 원소는
          console.log(array.length)
          break;
        }else tmpIndex--;
      }
    }
    else{ // closing tag 아닐 때, 중첩 횟수+
      currentIndex += 1;
      nestedCount+=1;
    }
  }

  return stack;
}