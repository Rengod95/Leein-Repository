
export class TagObject{
  constructor(tagName,nestedCount) {
    this.tagName = tagName;
    this.nestedCount = nestedCount;
    this.nodeLink = {};
  }

  linkNode(tagObj){
    this.nodeLink = {...this.nodeLink,tagObj}

  }

}

export const Parser = (array) => {
  let parsed = {}
  array = array.reverse()
  while (array.length === 1){
    let current = 0;
    let next = current +1;

    if(array[current].nestedCount < array[next].nestedCount){
      array.slice(0,current).map(value => {
        parsed = {...parsed, }
      })
    }


  }


}