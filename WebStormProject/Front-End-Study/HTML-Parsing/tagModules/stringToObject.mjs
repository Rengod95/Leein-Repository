import { TagObject } from "./tagObject.mjs";

export const toObject = (array) => {
  let stack = [] // 임시 파싱된 객체를 담음
  let currentIndex = 0; // 원소 지목
  let tmpIndex = 0;
  let nestedCount= 0;// 중첩 횟수
  let targetTag = undefined;
  while(!(array.length-1 === currentIndex)) {
    if (array[currentIndex].charAt() ==='/'){ // closing tag 만나먄 stop
      tmpIndex = currentIndex-1; // </> current -1 인덱스
      while(tmpIndex>=0){
        if(targetTag === array[tmpIndex]){
          stack.push(new TagObject(targetTag, nestedCount,undefined));
          array.splice(array.indexOf(array[currentIndex]), 1);
          array.splice(array.indexOf(array[tmpIndex]), 1);
          nestedCount -= 1;
          currentIndex -= 1; //2개를 delete 하면 current가 가르키는 원소는
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