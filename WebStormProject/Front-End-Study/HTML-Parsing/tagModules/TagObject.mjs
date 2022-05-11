
export class TagObject{
  constructor(tagName,nestedCount) {
    this.tagName = tagName;
    this.nestedCount = nestedCount;
    this.nodeLink = {};
  }
  linkNode = (tagObj) =>{
    this.nodeLink = {...this.nodeLink,...tagObj}
  }

}

export const Parser = (array) => {
  let parsed = {}
  array = array.reverse()
  while (array.length !== 1){
    let current = 0;
    let next = current +1;

    if(array[current].nestedCount < array[next].nestedCount){
      array.slice(0,current).forEach(value => {
        parsed = {parsed, value};
      })
      array[next].linkNode(parsed);
      array = array.slice(0,current);
    }
    current+=1;
  }

  return parsed;
}