// const openTagRegEx = /<[.*]*>/g;
// const flexibleRegEx = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
// const closeTagRegEx = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+(?<!\\s*)>/g;

const voidTag = ['area','base','br','col','command','embed','hr','img','input','keygen','link','meta','param','source','track','wbr','!','strong']

export const seperateTag = (string) =>{
  let tmpArray = string.split('>').map(value => value.replaceAll('\n',' ').split('<')[1])
  return tmpArray.slice(1, tmpArray.length);
}

export const delVoidTag  = (array) => {
  array.forEach((arrayV,index) => {
    for (let i = 0; i<voidTag.length;i++){
      if(String(arrayV).includes(voidTag[i])) {
        array[index] = undefined;
      }
    }
  })
  return array;
}

export const deleteTag = (array, tag) =>{ //html 태그 리스트중 undefined 형 삭제
  return (array.filter((value)=> value !== tag));
}

export const findTag = (array) => {
  return array.map(value =>{
    return value.split(' ')[0]
  })
}