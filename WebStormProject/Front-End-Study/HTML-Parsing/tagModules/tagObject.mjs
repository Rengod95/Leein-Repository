
export class TagObject{
  constructor(tagName,nestedCount,nodeLink) {
    this.tagName = tagName;
    this.nestedCount = nestedCount;
    this.nodeLink = nodeLink;
  }

}
function insertObj(target,insertObj){
  return {...tar}
}
export const toObject = (array) => {
  let nestedCount= 0;
  let parsed = {};
  let stack = { }

  for(let i = 0; i<array.length; i++) {
    if (array[i].charAt(0) ==='/'){ // closing tag 만나먄 stop
      let targetTag = array[i].slice(1,array[i].length); // 짝 맞추기 위한 / 삭제
      let tmpIndex = i-1; // </> 기준 한칸 씩 뒤로
      while(tmpIndex>=0){
        if(targetTag===array[tmpIndex]){
          stack.(new TagObject(targetTag, nestedCount,undefined))
          nestedCount=1;
        }else{
          tmpIndex--;
        }

      }
    }else{ // closing tag 전까지 탐색, 중첩 횟수+
      nestedCount+=1;
    }



  }
}